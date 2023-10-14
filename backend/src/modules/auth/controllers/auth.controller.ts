import {
    Body,
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthRegisterResponseDto } from '../dto/auth.register.response.dto';
import { AuthRegisterRequestDto } from '../dto/auth.register.request.dto';
import { AuthService } from '../services/auth.service';
import { AuthLoginRequestDto } from '../dto/auth.login.request.dto';
import { AuthLoginResponseDto } from '../dto/auth.login.response.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(
        @Body() authLoginRequestDto: AuthLoginRequestDto,
    ): Promise<AuthLoginResponseDto> {
        const result = await this.authService.login(authLoginRequestDto);
        return new AuthLoginResponseDto(result);
    }

    @Post('register')
    async register(
        @Body() authRegisterRequestDto: AuthRegisterRequestDto,
    ): Promise<AuthRegisterResponseDto> {
        const result = await this.authService.register(authRegisterRequestDto);
        return new AuthRegisterResponseDto(result);
    }
}
