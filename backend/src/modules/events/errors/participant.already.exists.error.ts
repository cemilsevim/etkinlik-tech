import { AppError } from 'src/common/exceptions/app.error';

export class ParticipantAlreadyExistsError extends AppError {
    code = 'PARTICIPANT_ALREADY_EXISTS_ERROR';

    constructor(metadata?: unknown) {
        super('Participant already exists.', metadata);
    }
}
