<?php

namespace App\Presenters;

use App\Forms;
use App\Model\AvatarStorage;
use App\Model\ConfereeManager;
use App\Model\ConfereeNotFound;
use App\Model\EventInfoProvider;
use App\Model\NoUserLoggedIn;
use App\Model\TalkManager;
use App\Model\TalkNotFound;
use App\Model\UserManager;
use App\Model\UserNotFound;
use App\Orm\Conferee;
use App\Orm\Talk;
use Nette\Application\UI\Form;
use Nette\Http\FileUpload;
use Nette\Http\IResponse;
use Nette\Http\Response;
use Tracy\Debugger;
use Tracy\ILogger;

class UserPresenter extends BasePresenter
{
    /**
     * ConferencePresenter constructor.
     * @param UserManager $userManager
     * @param ConfereeManager $confereeManager
     * @param TalkManager $talkManager
     * @param Forms\ConfereeForm $confereeForm
     * @param Forms\TalkForm $talkForm
     * @param EventInfoProvider $eventInfoProvider
     * @param AvatarStorage $avatarStorage
     */
    public function __construct(private readonly UserManager $userManager, private readonly ConfereeManager $confereeManager, private readonly TalkManager $talkManager, private readonly Forms\ConfereeForm $confereeForm, private readonly Forms\TalkForm $talkForm, private readonly EventInfoProvider $eventInfoProvider, private readonly AvatarStorage $avatarStorage)
    {
    }


    /**
     * @throws \Nette\Application\AbortException
     */
    protected function startup()
    {
        parent::startup();
        try {
            $this->userManager->getByLoginUser($this->user);
        } catch (NoUserLoggedIn) {
            $backlink = $this->storeRequest();
            $this->redirect(':Sign:conferee', ['backlink' => $backlink]);
        } catch (UserNotFound) {
            $this->user->logout();
            $backlink = $this->storeRequest();
            $this->redirect(':Sign:in', ['backlink' => $backlink]);
        }
    }


    /**
     * @throws NoUserLoggedIn
     * @throws UserNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function renderProfil(): void
    {
        $user = $this->userManager->getByLoginUser($this->user);
        $conferee = $user->conferee;
        $talks = $conferee ? $conferee->talk : [];

        $this->template->conferee = $conferee;
        $this->template->talks = $talks;

        $features = $this->eventInfoProvider->getFeatures();
        $this->template->allowRegisterConferee = $features['conferee'];
        $this->template->allowRegisterTalk = $features['talks'];
        $this->template->allowEditTalk = $features['talks_edit'];
    }


    /**
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function renderTalk(): void
    {
        if (!$this->eventInfoProvider->getFeatures()['talks_edit']) {
            $this->flashMessage('Upravování přednášek není v tuto chvíli povoleno, omlouváme se');
            $this->redirect('profil');
        }
    }


    /**
     * @return Form
     * @throws ConfereeNotFound
     * @throws NoUserLoggedIn
     * @throws UserNotFound
     */
    protected function createComponentConfereeForm()
    {
        /**
         * @param Conferee $conferee
         * @param $values
         * @throws \Nette\Application\AbortException
         */
        $onSubmitCallback = function (Conferee $conferee, $values): void {

            if ($conferee->id != $values->id) {
                Debugger::log(
                    'Security alert: ' . self::class . ':' . __METHOD__ . ' form send invalid $coferee->id',
                    ILogger::ERROR
                );
                throw new \InvalidArgumentException();
            }

            $conferee->user->name = $conferee->name;
            $conferee->user->email = $conferee->email;

            $this->confereeManager->save($conferee);

            $this->flashMessage('Váš profil byl upraven');
            $this->redirect('User:profil');
        };

        $conferee = $this->userManager->getByLoginUser($this->user)->getObligatoryConferee();

        $form = $this->confereeForm->create($onSubmitCallback, $conferee);

        //Additional form modification
        $form->addHidden('id', $conferee->id);

        return $form;
    }


    /**
     * @return Form
     * @throws ConfereeNotFound
     * @throws NoUserLoggedIn
     * @throws UserNotFound
     * @throws TalkNotFound
     * @throws \Nette\Utils\JsonException
     */
    protected function createComponentTalkForm()
    {
        /**
         * @param Talk $talk
         * @param $values
         * @throws \Nette\Application\AbortException
         */
        $onSubmitCallback = function (Talk $talk, $values): void {

            if ($talk->id != $values->id) {
                Debugger::log(
                    'Security alert: ' . self::class . ':' . __METHOD__ . ' form send invalid $coferee->id',
                    ILogger::ERROR
                );
                throw new \InvalidArgumentException();
            }

            $this->talkManager->save($talk);

            $this->flashMessage('Vaše přednáška byla upravena');
            $this->redirect('User:profil');
        };

        $conferee = $this->userManager->getByLoginUser($this->user)->getObligatoryConferee();

        $talk = null;
        foreach ($conferee->talk as $loopTalk) {
            $talk = $loopTalk;
            break;
        }

        if ($talk === null) {
            throw new TalkNotFound();
        }

        $categories = $this->talkManager->getCategories();
        $durations = $this->talkManager->getDurations();
        $form = $this->talkForm->create($onSubmitCallback, $categories, $durations, $talk);

        //Additional form modification
        $form->addHidden('id', $talk->id);

        return $form;
    }


    /**
     * @throws NoUserLoggedIn
     * @throws UserNotFound
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Application\BadRequestException
     * @throws \Nette\Utils\ImageException
     */
    public function handleUploadAvatar(): void
    {
        $user = $this->userManager->getByLoginUser($this->user);
        $conferee = $user->conferee;

        $files = $this->getRequest()->getFiles();
        if (!isset($files['file'])) {
            Debugger::log('Uploaded empty file', ILogger::WARNING);
            $this->error('Wrong reguest', IResponse::S400_BAD_REQUEST);
        }

        /** @var FileUpload $file */
        $file = $files['file'];

        if (!$file->isOk()) {
            Debugger::log('Uploaded corrupted file', ILogger::WARNING);
            $this->error('Wrong reguest', IResponse::S400_BAD_REQUEST);
        }

        if (!$file->isImage()) {
            Debugger::log('Uploaded non-image file', ILogger::WARNING);
            $this->error('Nelze nahrát jiný soubor než obrázek', IResponse::S403_FORBIDDEN);
        }

        [$url, $originalUrl] = $this->avatarStorage->saveUploaded($file, $user->name);

        $user->pictureUrl = $url;
        $conferee->pictureUrl = $url;
        $conferee->pictureOriginalUrl = $originalUrl;
        $this->user->getIdentity()->pictureUrl = $url;

        $this->userManager->save($user);

        $this->sendJson(['avatarUrl' => $url]);
    }
}
