//#region Imports

import { DefaultValidationMessages } from '../enums/default-validation-messages';
import { StudentsProxy } from '../proxys/students.proxy';
import { IsOptional, IsString, IsNumber, IsDefined, IsEmail } from 'class-validator';

//#endregion

/**
 * A classe que representa as informações de um estudante
 */
export class StudentsEntity implements StudentsProxy {

  id: number;
  date: string;

  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public age: number;

  @IsDefined({ message: 'É necessário digitar o e-mail do estudante.' })
  @IsEmail({ }, { message: DefaultValidationMessages.IsEmail })
  @IsString({ message: DefaultValidationMessages.IsString })
  public email: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public gender: string;

  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public invoice: number;

  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public month: number;

  @IsDefined({ message: 'É necessário enviar o nome do estudante.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public name: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public phone: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public type: string;

}
