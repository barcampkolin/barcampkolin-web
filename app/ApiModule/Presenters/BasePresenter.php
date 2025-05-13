<?php

namespace App\ApiModule\Presenters;

use App\Model\ApiTokenManager;
use App\Model\TokenInvalidException;
use JetBrains\PhpStorm\NoReturn;
use Nette\Application\UI\Presenter;
use Nette\Http\IResponse;
use Nextras\Application\UI\SecuredLinksPresenterTrait;

class BasePresenter extends Presenter
{
    use SecuredLinksPresenterTrait;

    private ?ApiTokenManager $apiTokenManager = null;


    public function injectApiTokenManager(ApiTokenManager $apiTokenManager): void
    {
        $this->apiTokenManager = $apiTokenManager;
    }

    protected function startup(): void
    {
        parent::startup();

        $token = $this->getHttpRequest()->getHeader('authtoken');

        try {
            $this->apiTokenManager->validateToken($token);
        } catch (TokenInvalidException) {
            $this->sendErrorResponse('Authentication failed', IResponse::S403_Forbidden);
        }
    }


    #[NoReturn]
    protected function sendErrorResponse(string $message, ?int $code = null, mixed $details = null): void
    {
        if ($code) {
            $this->getHttpResponse()->setCode($code);
        }

        $response = [
            'status' => false,
            'errror' => [
                'message' => $message,
            ],
        ];
        if ($details) {
            $response['errror']['details'] = $details;
        }
        $this->sendJson($response);
    }


    #[NoReturn]
    protected function sendSuceessResponse(mixed $data = null, ?string $message = null): void
    {
        $response = [
            'status' => true,
        ];

        if ($data) {
            $response['data'] = $data;
        }
        if ($message) {
            $response['message'] = $message;
        }
        $this->sendJson($response);
    }
}
