import {
    IsString,
    MinLength,
    IsArray,
    IsNumber,
    IsOptional,
    IsBoolean,
} from 'class-validator';

export class CreateEquipmentDto {

    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    modelo?: string;

    @IsString()
    @MinLength(1)
    placa: string;

    @IsString()
    @MinLength(1)
    marcaMotor: string;

    @IsString()
    @MinLength(1)
    marcaVehiculo: string;

    @IsString()
    @IsOptional()
    img?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    referenciaMotor?: string;

    @IsBoolean()
    isActive: boolean;

    @IsNumber()
    @IsOptional()
    capacidadTanque1?: number;

    @IsNumber()
    @IsOptional()
    capacidadTanque2?: number;

    @IsNumber()
    @IsOptional()
    capacidadTanqueTotal?: number;

    @IsNumber()
    @IsOptional()
    horasTrabajo?: number;

    @IsNumber()
    @IsOptional()
    kilometraje?: number;

    @IsNumber()
    @IsOptional()
    vin?: number;

    @IsNumber()
    @IsOptional()
    peso?: number;

    @IsNumber()
    @IsOptional()
    numeroMotor?: number;

    @IsArray()
    @IsOptional()
    configuracion?: string[];

    @IsArray()
    @IsOptional()
    conductores?: string[];


}
