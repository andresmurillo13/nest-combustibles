import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message:
  //     'The password must have a Uppercase, lowercase letter and a number',
  // })
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  @MinLength(1)
  @IsOptional()
  cargo?: string;

  @IsNumber()
  @IsOptional()
  telefono?: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  jefeInmediato?: string;

  @IsArray()
  roles: string[]

  @IsString()
  @MinLength(1)
  @IsOptional()
  residencia?: string;

  @IsString()
  @IsOptional()
  img?: string;




}
