<?php

namespace App\Presenters;

use App\Forms;
use App\Model\AvatarStorage;
use App\Model\ConfereeManager;
use App\Model\ConfereeNotFound;
use App\Model\EventInfoProvider;
use App\Model\GravatarImageProvider;
use App\Model\NoUserLoggedIn;
use App\Model\TalkManager;
use App\Model\TalkNotFound;
use App\Model\UserManager;
use App\Model\UserNotFound;
use App\Orm\Conferee\Conferee;
use App\Orm\Talk\Talk;
use Nette\Application\UI\Form;
use Nette\Http\FileUpload;
use Nette\Http\IResponse;
use Nette\Utils\ArrayHash;
use Tracy\Debugger;
use Tracy\ILogger;

class UserPresenter extends BasePresenter
{
    public function __construct(
        private readonly UserManager $userManager,
        private readonly ConfereeManager $confereeManager,
        private readonly TalkManager $talkManager,
        private readonly Forms\ConfereeForm $confereeForm,
        private readonly Forms\TalkForm $talkForm,
        private readonly EventInfoProvider $eventInfoProvider,
        private readonly AvatarStorage $avatarStorage,
        private readonly GravatarImageProvider $gravatar,
    ) {
        parent::__construct();
    }


    protected function startup(): void
    {
        parent::startup();
        try {
            $this->userManager->getByLoginUser($this->getUser());
        } catch (NoUserLoggedIn) {
            $backlink = $this->storeRequest();
            $this->redirect(':Sign:conferee', ['backlink' => $backlink]);
        } catch (UserNotFound) {
            $this->getUser()->logout();
            $backlink = $this->storeRequest();
            $this->redirect(':Sign:in', ['backlink' => $backlink]);
        }
    }


    public function renderProfil(): void
    {
        $user = $this->userManager->getByLoginUser($this->getUser());
        $conferee = $user->conferee;
        $talks = $conferee ? $conferee->talk : [];

        $this->template->conferee = $conferee;
        $this->template->talks = $talks;

        $this->template->profileImage = $user->pictureUrl ?? $this->gravatar->getGravatarUrl($user->email);

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

    protected function createComponentConfereeForm(): Form
    {
        $onSubmitCallback = function (Conferee $conferee, ArrayHash $values): void {
            if ($conferee->id !== (int)$values->id) {
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
            $this->redirect('profil');
        };

        $conferee = $this->userManager->getByLoginUser($this->getUser())->getObligatoryConferee();

        $form = $this->confereeForm->create($onSubmitCallback, $conferee);

        //Additional form modification
        $form->addHidden('id', $conferee->id);

        return $form;
    }


    protected function createComponentTalkForm(): Form
    {
        $onSubmitCallback = function (Talk $talk, ArrayHash $values): void {
            if ($talk->id !== (int)$values->id) {
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

        $conferee = $this->userManager->getByLoginUser($this->getUser())->getObligatoryConferee();

        /** @var ?Talk $talk */
        $talk = $conferee->talk->getIterator()->fetch();

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
        $user = $this->userManager->getByLoginUser($this->getUser());
        $conferee = $user->conferee;

        $files = $this->getRequest()->getFiles();
        if (!isset($files['file'])) {
            Debugger::log('Uploaded empty file', ILogger::WARNING);
            $this->error('Wrong reguest', IResponse::S400_BadRequest);
        }

        /** @var FileUpload $file */
        $file = $files['file'];

        if (!$file->isOk()) {
            Debugger::log('Uploaded corrupted file', ILogger::WARNING);
            $this->error('Wrong reguest', IResponse::S400_BadRequest);
        }

        if (!$file->isImage()) {
            Debugger::log('Uploaded non-image file', ILogger::WARNING);
            $this->error('Nelze nahrát jiný soubor než obrázek', IResponse::S403_Forbidden);
        }

        [$url, $originalUrl] = $this->avatarStorage->saveUploaded($file, $user->name);

        $user->pictureUrl = $url;
        $conferee->pictureUrl = $url;
        $conferee->pictureOriginalUrl = $originalUrl;
        $this->getUser()->getIdentity()->pictureUrl = $url;

        $this->userManager->save($user);

        $this->sendJson(['avatarUrl' => $url]);
    }
}
