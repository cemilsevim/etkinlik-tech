import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateEventRequestDto } from '../dto/create.event.request.dto';
import { EventsService } from '../services/events.service';
import { ListEventsResponseDto } from '../dto/list.events.response.dto';
import { IAuthUser } from '../../auth/interfaces/auth.interface';
import { AuthUser } from 'src/common/decorators/auth.user.decorator';
import { AuthInterceptor } from 'src/modules/auth/interceptors/auth.interceptor';
import { CreateEventResponseDto } from '../dto/create.event.response.dto';
import { EventsTime } from '../enums/events.enum';
import { GetEventResponseDto } from '../dto/get.event.response.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AttendEventResponseDto } from '../dto/attend.event.response.dto';
import { DeleteAttendEventResponseDto } from '../dto/delete.attend.event.response.dto';
import { CreateFeedbackRequestDto } from '../dto/create.feedback.request.dto';
import { CreateFeedbackResponseDto } from '../dto/create.feedback.response.dto';
import { ListFeedbacksResponseDto } from '../dto/list.feedbacks.response.dto';

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @UseInterceptors(AuthInterceptor)
    @Get(':time')
    async listEventsByTime(
        @AuthUser() authUser: IAuthUser,
        @Param('time') time: EventsTime,
    ): Promise<ListEventsResponseDto[]> {
        const result = await this.eventsService.listEventsByTime(
            authUser?.user.id,
            time,
        );
        const response = result.map(
            (event) => new ListEventsResponseDto(event),
        );

        return response;
    }

    @Get('/detail/:eventId')
    async getEventDetail(
        @AuthUser() authUser: IAuthUser,
        @Param('eventId') eventId: number,
    ): Promise<GetEventResponseDto> {
        const result = await this.eventsService.getEventDetail(
            eventId,
            authUser?.user.id,
        );

        return new GetEventResponseDto(result);
    }

    @UseGuards(AuthGuard)
    @Post(':eventId/attend')
    async attendEvent(
        @AuthUser() authUser: IAuthUser,
        @Param('eventId') eventId: number,
    ): Promise<AttendEventResponseDto> {
        const result = await this.eventsService.attendEvent(
            eventId,
            authUser.user.id,
        );

        return new AttendEventResponseDto(result);
    }

    @UseGuards(AuthGuard)
    @Delete(':eventId/attend')
    async deleteAttendEvent(
        @AuthUser() authUser: IAuthUser,
        @Param('eventId') eventId: number,
    ): Promise<DeleteAttendEventResponseDto> {
        const result = await this.eventsService.deleteAttendEvent(
            eventId,
            authUser.user.id,
        );

        return new DeleteAttendEventResponseDto(result);
    }

    @Get(':eventId/feedbacks')
    async listFeedbacksByEventId(@Param('eventId') eventId: number) {
        const result = await this.eventsService.listFeedbacksByEventId(eventId);
        const response = result.map(
            (feedback) => new ListFeedbacksResponseDto(feedback),
        );

        return response;
    }

    @UseGuards(AuthGuard)
    @Post(':eventId/feedbacks')
    async createFeedback(
        @AuthUser() authUser: IAuthUser,
        @Param('eventId') eventId: number,
        @Body() createFeedbackRequestDto: CreateFeedbackRequestDto,
    ): Promise<CreateFeedbackResponseDto> {
        const result = await this.eventsService.createFeedback(
            createFeedbackRequestDto,
            eventId,
            authUser.user.id,
        );

        return new CreateFeedbackResponseDto(result);
    }

    @Post()
    async createEvent(
        @Body() eventCreateRequestDto: CreateEventRequestDto,
    ): Promise<CreateEventResponseDto> {
        const result = await this.eventsService.createEvent(
            eventCreateRequestDto,
        );

        return new CreateEventResponseDto(result);
    }
}
