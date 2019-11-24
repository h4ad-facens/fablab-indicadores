//#region Imports

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpAsyncService } from '../../services/http-async/http-async.service';
import { JqueryHelper } from '../../utils/jquery';
import { BaseMembersComponent } from './base-members.component';

//#endregion

//#region Component

@Component({
  selector: 'app-create-member',
  templateUrl: 'members.component.html',
  styleUrls: ['./members.component.scss']
})

//#endregion

/**
 * A classe que é responsável por criar máquinas para o Fablab
 */
export class CreateMembersComponent extends BaseMembersComponent {

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
    const memberPayload = this.getCleanEntity(this.formGroup.value);
    const { error } = await this.http.post('/Members', memberPayload);

    if (error)
      return JqueryHelper.error(error.error && error.error.message || error.message);

    JqueryHelper.success('Operaçao executada com sucesso!');

    await this.router.navigateByUrl('/dashboard/members');
  }

  //#endregion

}
