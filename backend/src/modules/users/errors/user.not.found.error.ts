import { AppError } from 'src/common/exceptions/app.error';

export class UserNotFoundError extends AppError {
    code = 'USER_NOT_FOUND';

    constructor(metadata?: unknown) {
        super('User not found.', metadata);
    }
}
