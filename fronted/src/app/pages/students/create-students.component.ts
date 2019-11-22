//#region Imports

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpAsyncService } from '../../services/http-async/http-async.service';
import { JqueryHelper } from '../../utils/jquery';
import { BaseStudentsComponent } from './base-students.component';

//#endregion

//#region Component

@Component({
  selector: 'app-create-students',
  templateUrl: 'students.component.html',
  styleUrls: ['./students.component.scss']
})

//#endregion

/**
 * A classe que é responsável por criar alunos para o Fablab
 */
export class CreateStudentsComponent extends BaseStudentsComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    protected readonly http: HttpAsyncService,
    protected readonly router: Router,
  ) {
    super();
  }

  //#endregion

  //#region Public Methods

  /**
   * Método executado ao enviar o comando de Submit no formulário
   */
  public async onSubmit(): Promise<void> {
    const machinePayload = this.getCleanEntity(this.formGroup.value);
    const { error } = await this.http.post('/Students', machinePayload);

    if (error)
      return JqueryHelper.error(error.error && error.error.message || error.message);

    JqueryHelper.success('Operaçao executada com sucesso!');

    await this.router.navigateByUrl('/dashboard/students');
  }

  //#endregion

}
