//#region Imports

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogLoadingService } from '../../components/dialog-loading/dialog.loading.service';
import { MachinesEntity } from '../../models/entities/machines.entity';
import { APIWrapperSingleProxy } from '../../models/proxys/api-wrapper.proxy';
import { MachinesProxy } from '../../models/proxys/machines.proxy';
import { HttpAsyncService } from '../../services/http-async/http-async.service';
import { JqueryHelper } from '../../utils/jquery';
import { BaseMachinesComponent } from './base-machines.component';

//#endregion

//#region Component

@Component({
  selector: 'app-update-machines',
  templateUrl: 'machines.component.html',
  styleUrls: ['./machines.component.scss']
})

//#endregion

/**
 * A classe que é responsável por atualizar máquinas para o Fablab
 */
export class UpdateMachinesComponent extends BaseMachinesComponent {

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

    this.isUpdate = route.snapshot.paramMap.has('machineId');
  }

  //#endregion

  //#region Life Cycle Events

  /**
   * Método que é executado quando esse componente é iniciado
   */
  public async ngOnInit(): Promise<void | boolean> {
    if (!this.isUpdate)
      return await this.router.navigateByUrl('/dashboard/machines');

    this.loading.open();

    const machineId = this.route.snapshot.paramMap.get('machineId');
    const { error, success } = await this.http.get<APIWrapperSingleProxy<MachinesProxy>>(`/Members/${ machineId }`);

    this.loading.close();

    if (error) {
      JqueryHelper.error(error.error && error.error.message || error.message);

      return await this.router.navigateByUrl('/dashboard/machines');
    }

    const cleaned = this.getCleanEntity(success.results, true);

    this.formGroup = this.formBuilder.group(MachinesEntity, cleaned);
  }

  //#endregion

  //#region Public Methods

  /**
   * Método executado ao enviar o comando de Submit no formulário
   */
  public async onSubmit(): Promise<void> {
    const machinePayload = this.getCleanEntity(this.formGroup.value);

    const { error } = await this.http.put('/Members', machinePayload);

    if (error)
      return JqueryHelper.error(error.error && error.error.message || error.message);

    JqueryHelper.success('Operaçao executada com sucesso!');

    await this.router.navigateByUrl('/dashboard/machines');
  }

  //#endregion

}
