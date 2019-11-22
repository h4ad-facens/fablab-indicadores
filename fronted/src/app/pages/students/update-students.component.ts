//#region Imports

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogLoadingService } from '../../components/dialog-loading/dialog.loading.service';
import { MachinesEntity } from '../../models/entities/machines.entity';
import { StudentsEntity } from '../../models/entities/students.entity';
import { APIWrapperSingleProxy } from '../../models/proxys/api-wrapper.proxy';
import { MachinesProxy } from '../../models/proxys/machines.proxy';
import { StudentsProxy } from '../../models/proxys/students.proxy';
import { HttpAsyncService } from '../../services/http-async/http-async.service';
import { JqueryHelper } from '../../utils/jquery';
import { BaseStudentsComponent } from './base-students.component';

//#endregion

//#region Component

@Component({
  selector: 'app-update-students',
  templateUrl: 'students.component.html',
  styleUrls: ['./students.component.scss']
})

//#endregion

/**
 * A classe que é responsável por atualizar os alunos para o Fablab
 */
export class UpdateStudentsComponent extends BaseStudentsComponent {

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

    this.isUpdate = route.snapshot.paramMap.has('studentId');
  }

  //#endregion

  //#region Life Cycle Events

  /**
   * Método que é executado quando esse componente é iniciado
   */
  public async ngOnInit(): Promise<void | boolean> {
    if (!this.isUpdate)
      return await this.router.navigateByUrl('/dashboard/students');

    this.loading.open();

    const studentId = this.route.snapshot.paramMap.get('studentId');
    const { error, success } = await this.http.get<APIWrapperSingleProxy<StudentsProxy>>(`/Students/${ studentId }`);

    this.loading.close();

    if (error) {
      JqueryHelper.error(error.error && error.error.message || error.message);

      return await this.router.navigateByUrl('/dashboard/students');
    }

    const cleaned = this.getCleanEntity(success.results, true);

    this.formGroup = this.formBuilder.group(StudentsEntity, cleaned);
  }

  //#endregion

  //#region Public Methods

  /**
   * Método executado ao enviar o comando de Submit no formulário
   */
  public async onSubmit(): Promise<void> {
    const machinePayload = this.getCleanEntity(this.formGroup.value);

    const { error } = await this.http.put('/Students', machinePayload);

    if (error)
      return JqueryHelper.error(error.error && error.error.message || error.message);

    JqueryHelper.success('Operaçao executada com sucesso!');

    await this.router.navigateByUrl('/dashboard/students');
  }

  //#endregion

}
