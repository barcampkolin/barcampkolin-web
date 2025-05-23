<?php

namespace App\Presenters;

use Nette;
use Nette\Application\Responses;
use Tracy\ILogger;

class ErrorPresenter implements Nette\Application\IPresenter
{
    use Nette\SmartObject;


    public function __construct(
        private ILogger $logger
    ) {
    }


    /**
     * @param Nette\Application\Request $request
     * @return Nette\Application\IResponse
     */
    public function run(Nette\Application\Request $request): Nette\Application\IResponse
    {
        $e = $request->getParameter('exception');

        if ($e instanceof Nette\Application\BadRequestException) {
            // $this->logger->log("HTTP code {$e->getCode()}: {$e->getMessage()} in {$e->getFile()}:{$e->getLine()}", 'access');
            [$module, , $sep] = Nette\Application\Helpers::splitName($request->getPresenterName());
            $errorPresenter = $module . $sep . 'Error4xx';
            return new Responses\ForwardResponse($request->setPresenterName($errorPresenter));
        }

        $this->logger->log($e, ILogger::EXCEPTION);
        return new Responses\CallbackResponse(function (): void {
            require __DIR__ . '/templates/Error/500.phtml';
        });
    }
}
