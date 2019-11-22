//#region Imports

import { IsString, IsNumber, IsOptional, IsEmail, IsUrl, IsDefined } from 'class-validator';

import { DefaultValidationMessages } from '../enums/default-validation-messages';
import { MachinesProxy } from '../proxys/machines.proxy';

//#endregion

/**
 * A classe que representa a entidade de máquinas
 */
export class MachinesEntity implements MachinesProxy {

  public id: number;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public address: string;

  @IsOptional()
  @IsNumber({ }, { message: DefaultValidationMessages.IsNumber })
  public age: number;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public cad_software: string;

  @IsDefined({ message: 'É necessário enviar o endereço de e-mail' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsEmail({ }, { message: DefaultValidationMessages.IsEmail })
  public email: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({ }, { message: DefaultValidationMessages.IsUrl })
  public facebook: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public gender: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public group: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public interest: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public invoice_disabled: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public job: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public last_name: string;

  @IsDefined({ message: 'É necessário enviar o nome' })
  @IsString({ message: DefaultValidationMessages.IsString })
  public name: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public newsletter: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public phone: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public projects: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public signature: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public tags: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({ }, { message: DefaultValidationMessages.IsUrl })
  public twitter: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  public validated_training: string;

  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({ }, { message: DefaultValidationMessages.IsUrl })
  public website: string;

}
