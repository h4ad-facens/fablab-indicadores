//#region Imports

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogLoadingService } from '../../components/dialog-loading/dialog.loading.service';
import { MemberEntity } from '../../models/entities/member.entity';
import { APIWrapperSingleProxy } from '../../models/proxys/api-wrapper.proxy';
import { MemberProxy } from '../../models/proxys/member.proxy';
import { HttpAsyncService } from '../../services/http-async/http-async.service';
import { JqueryHelper } from '../../utils/jquery';
import { BaseMembersComponent } from './base-members.component';

//#endregion

//#region Component

@Component({
  selector: 'app-update-member',
  templateUrl: 'members.component.html',
  styleUrls: ['./members.component.scss']
})

//#endregion

/**
 * A classe que é responsável por atualizar máquinas para o Fablab
 */
export class UpdateMembersComponent extends BaseMembersComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    protected readonly http: HttpAsyncService,
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    protected readonly loading: DialogLoadingService,
  ) {
    super();

    this.isUpdate = route.snapshot.paramMap.has('memberId');
  }

  //#endregion

  //#region Life Cycle Events

  /**
   * Método que é executado quando esse componente é iniciado
   */
  public async ngOnInit(): Promise<void | boolean> {
    if (!this.isUpdate)
      return await this.router.navigateByUrl('/dashboard/members');

    this.loading.open();

    const machineId = this.route.snapshot.paramMap.get('memberId');
    const { error, success } = await this.http.get<APIWrapperSingleProxy<MemberProxy>>(`/Members/${ machineId }`);

    this.loading.close();

    if (error) {
      JqueryHelper.error(error.error && error.error.message || error.message);

      return await this.router.navigateByUrl('/dashboard/members');
    }

    const cleaned = this.getCleanEntity(success.results, true);

    this.formGroup = this.formBuilder.group(MemberEntity, cleaned);
  }

  //#endregion

  //#region Public Methods

  /**
   * Método executado ao enviar o comando de Submit no formulário
   */
  public async onSubmit(): Promise<void> {
    const memberPayload = this.getCleanEntity(this.formGroup.value);

    const { error } = await this.http.put('/Members', memberPayload);

    if (error)
      return JqueryHelper.error(error.error && error.error.message || error.message);

    JqueryHelper.success('Operaçao executada com sucesso!');

    await this.router.navigateByUrl('/dashboard/members');
  }

  //#endregion

}
