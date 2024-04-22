import { Point } from 'typeorm';
import {
    IsString,
    MinLength,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsDate,
    IsDateString,
    IsNotEmpty,
    IsObject,

} from 'class-validator';


export class CreateApplicationDto {

    @IsDateString()
    start: Date;

    @IsDateString()
    end: Date;

    @IsString()
    @MinLength(1)
    idApplication: string;

    @IsString()
    @IsOptional()
    buscar?: string;

    @IsString()
    @IsOptional()
    results?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    tipoPlan?: string;

    @IsNumber()
    kmRuta: number;

    @IsOptional()
    @IsBoolean()
    estado?: boolean;

    @IsObject()
    @IsNotEmpty()
    refInicio: Point;

    @IsObject()
    @IsNotEmpty()
    refFinal: Point;

    @IsNumber()
    pesoCarga: number;

    @IsString()
    @MinLength(1)
    eds: string;

    @IsNumber()
    @IsOptional()
    galones?: number;

    @IsDate()
    @MinLength(1)
    @IsOptional()
    fecha?: string;

    @IsNumber()
    @IsOptional()
    valorGalones?: number;

    @IsNumber()
    @IsOptional()
    odometro?: number;

    @IsNumber()
    @IsOptional()
    valorTotalTrans?: number;

    @IsNumber()
    @IsOptional()
    promedioRuta?: number;

    @IsNumber()
    @IsOptional()
    consumoIdeal?: number;

    @IsNumber()
    @IsOptional()
    perdidaGalones?: number;

    @IsNumber()
    @IsOptional()
    medidaSensor1?: number;

    @IsNumber()
    @IsOptional()
    medidaSensor2?: number;


    @IsString()
    @IsOptional()
    img?: string[];





}
