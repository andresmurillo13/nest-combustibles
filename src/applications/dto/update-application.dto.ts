import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';
import {
    IsString,
    IsOptional,
} from 'class-validator';
export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    user?: string;

    @IsString()
    @IsOptional()
    equipment?: string
}
