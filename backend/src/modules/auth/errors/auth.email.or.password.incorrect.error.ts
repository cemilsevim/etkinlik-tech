import { AppError } from 'src/common/exceptions/app.error';

export class AuthEmailOrPasswordIncorrectError extends AppError {
    code = 'AUTH_EMAIL_OR_PASSWORD_INCORRECT';

    constructor(metadata?: unknown) {
        super('Email or password incorrect.', metadata);
    }
}
