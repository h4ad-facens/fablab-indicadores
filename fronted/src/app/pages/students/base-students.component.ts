//#region Imports

import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { StudentsEntity } from '../../models/entities/students.entity';

//#endregion

/**
 * A classe que é responsável por cadastrar e editar os alunos
 */
export class BaseStudentsComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() {
    this.formGroup = this.formBuilder.group(StudentsEntity, {
      name: undefined,
      email: undefined,
      phone: undefined,
      gender: undefined,
      age: undefined,
      type: undefined,
      invoice: undefined,
      month: undefined,
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
  public formGroup: DynamicFormGroup<StudentsEntity>;

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna o payload que será usado para enviar as informações para a API
   */
  public getCleanEntity(entity: StudentsEntity, setUndefined: boolean = false): Partial<StudentsEntity> {
    const payload: Partial<StudentsEntity> = {};
    const keys = Object.keys(entity);

    for (const key of keys) {
      if (entity[key] === undefined && !setUndefined)
        continue;

      payload[key] = entity[key];
    }

    return payload;
  }

  //#endregion

}
