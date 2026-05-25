<?php

namespace App\ApiModule\Presenters;

use App\Model\ApiTokenManager;
use App\Model\TokenInvalidException;
use Nette\Application\UI\Presenter;
use Nette\Http\Response;
use Nextras\Application\UI\SecuredLinksPresenterTrait;

class BasePresenter extends Presenter
{
    private ApiTokenManager $apiTokenManager;


    public function injectApiTokenManager(ApiTokenManager $apiTokenManager): void
    {
        $this->apiTokenManager = $apiTokenManager;
    }

    #[\Override]
    protected function startup(): void
    {
        parent::startup();

        $token = $this->getHttpRequest()->getHeader('authtoken');

        try {
            $this->apiTokenManager->validateToken($token);
        } catch (TokenInvalidException) {
            $this->sendErrorResponse('Authentication failed', Response::S403_FORBIDDEN);
        }
    }


    protected function sendErrorResponse(string $message, ?int$code = null):never
    {
        if ($code) {
            $this->getHttpResponse()->setCode($code);
        }

        $this->sendJson([
            'status' => false,
            'errror' => [
                'message' => $message,
            ],
        ]);
    }


    protected function sendSuceessResponse(mixed $data = null, ?string $message = null):never
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
