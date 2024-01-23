import {
    IsString,
    Matches,
    MaxLength,
    MinLength,
    IsEmail,
} from 'class-validator';

export class CreateEquipmentDto {

    @IsString()
    name: string;

    @IsString()
    modelo: string;

    @IsString()
    placa: string;

}
