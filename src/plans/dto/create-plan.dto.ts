import { IsString, MinLength } from "class-validator";

export class CreatePlanDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    configuracion: string;

    @IsString()
    @MinLength(1)
    rendimiento: number;


}
