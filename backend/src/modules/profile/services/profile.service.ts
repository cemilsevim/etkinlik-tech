import { Injectable } from '@nestjs/common';
import { IProfileService } from '../interfaces/profile.service.interface';

@Injectable()
export class ProfileService implements IProfileService {}
