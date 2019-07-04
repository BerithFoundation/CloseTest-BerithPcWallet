import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggingService } from './services/logging.service';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector) { }

    handleError(error: Error) {

        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;

        // Client Error
        message = errorService.getClientMessage(error);
        stackTrace = errorService.getClientStack(error);
        notifier.showError(message);

        // Always log errors
        logger.logError(message, stackTrace);

        //console.error(error);
    }
}