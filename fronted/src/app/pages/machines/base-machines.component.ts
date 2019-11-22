//#region Imports

import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';

import { MachinesEntity } from '../../models/entities/machines.entity';

//#endregion

/**
 * A classe que é responsável por cadastrar e editar as maquinas
 */
export class BaseMachinesComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() {
    this.formGroup = this.formBuilder.group(MachinesEntity, {
      name: undefined,
      last_name: undefined,
      email: undefined,
      newsletter: undefined,
      gender: undefined,
      age: undefined,
      address: undefined,
      phone: undefined,
      website: undefined,
      job: undefined,
      interest: undefined,
      cad_software: undefined,
      group: undefined,
      signature: undefined,
      validated_training: undefined,
      tags: undefined,
      invoice_disabled: undefined,
      projects: undefined,
      facebook: undefined,
      twitter: undefined,
    });
  }

  //#endregion

  //#region Protected Properties

  /**
   * O construtor do formulário dinamico
   */
  protected formBuilder: DynamicFormBuilder = new DynamicFormBuilder();

  //#endregion

  //#region Default Properties

  /**
   * Diz se está atualizando uma máquina
   */
  public isUpdate: boolean = false;

  //#endregion

  //#region Public Properties

  /**
   * Os campos agrupados do formulário
   */
  public formGroup: DynamicFormGroup<MachinesEntity>;

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna o payload que será usado para enviar as informações para a API
   */
  public getCleanEntity(entity: MachinesEntity, setUndefined: boolean = false): Partial<MachinesEntity> {
    const payload: Partial<MachinesEntity> = {};
    const keys = Object.keys(entity);

    for (const key of keys) {
      if (!entity[key] && !setUndefined)
        continue;

      payload[key] = entity[key] || undefined;
    }

    return payload;
  }

  //#endregion

}
