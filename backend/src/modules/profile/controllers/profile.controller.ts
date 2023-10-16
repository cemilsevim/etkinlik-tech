import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/auth.user.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { IAuthUser } from 'src/modules/auth/interfaces/auth.interface';
import { UsersService } from 'src/modules/users/services/users.service';
import { GetProfileResponseDto } from '../dto/get.profile.response.dto';
import { EventParticipantsService } from 'src/modules/events/services/event.participants.service';
import { EventFeedbacksService } from 'src/modules/events/services/event.feedbacks.service';
import { ListEventFeedbacksResponseDto } from '../dto/list.event.feedbacks.response.dto';
import { ListAttendedEventsResponseDto } from '../dto/list.attended.events.response.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(
        private usersService: UsersService,
        private eventParticipantService: EventParticipantsService,
        private eventFeedbackService: EventFeedbacksService,
    ) {}

    @ApiOkResponse({ type: GetProfileResponseDto })
    @Get()
    getProfile(@AuthUser() authUser: IAuthUser): GetProfileResponseDto {
        return new GetProfileResponseDto(authUser.user);
    }

    @ApiOkResponse({ type: ListAttendedEventsResponseDto })
    @Get('events/attended')
    async listAttendedEvents(@AuthUser() authUser: IAuthUser): Promise<any> {
        const result =
            await this.eventParticipantService.listParticipantsByUserId(
                authUser.user.id,
            );
        const response = result.map(
            (participant) => new ListAttendedEventsResponseDto(participant),
        );

        return response;
    }

    @ApiOkResponse({ type: ListEventFeedbacksResponseDto })
    @Get('events/feedbacks')
    async listEventFeedbacks(
        @AuthUser() authUser: IAuthUser,
    ): Promise<ListEventFeedbacksResponseDto[]> {
        const result = await this.eventFeedbackService.listFeedbacksByUserId(
            authUser.user.id,
        );
        const response = result.map(
            (feedback) => new ListEventFeedbacksResponseDto(feedback),
        );

        return response;
    }
}
