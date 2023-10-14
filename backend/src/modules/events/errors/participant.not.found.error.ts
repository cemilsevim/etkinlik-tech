import { AppError } from 'src/common/exceptions/app.error';

export class ParticipantNotFoundError extends AppError {
    code = 'PARTICIPANT_NOT_FOUND_ERROR';

    constructor(metadata?: unknown) {
        super('Participant not found.', metadata);
    }
}
