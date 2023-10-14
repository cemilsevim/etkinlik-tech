import { AppError } from 'src/common/exceptions/app.error';

export class UserAlreadyExistsError extends AppError {
    code = 'USER_ALREADY_EXISTS';

    constructor(metadata?: unknown) {
        super('User already exists.', metadata);
    }
}
