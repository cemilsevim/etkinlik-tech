import { AppError } from 'src/common/exceptions/app.error';

export class EventNotFoundError extends AppError {
    code = 'EVENT_NOT_FOUND_ERROR';

    constructor(metadata?: unknown) {
        super('Event not found.', metadata);
    }
}
