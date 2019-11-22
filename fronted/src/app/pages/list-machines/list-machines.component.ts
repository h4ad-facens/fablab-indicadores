//#region Imports

import { Component } from '@angular/core';
import { DialogLoadingService } from '../../components/dialog-loading/dialog.loading.service';

import { APIWrapperProxy } from '../../models/proxys/api-wrapper.proxy';
import { MachinesProxy } from '../../models/proxys/machines.proxy';
import { HttpAsyncService } from '../../services/http-async/http-async.service';
import { PaginationShared } from '../../shared/pagination/pagination.shared';
import { MatTableDataSource } from '@angular/material';
import { JqueryHelper } from '../../utils/jquery';

//#endregion

//#region Component

@Component({
  selector: 'app-list-machines',
  templateUrl: 'list-machines.component.html',
  styleUrls: ['./list-machines.component.scss'],
})

//#endregion

/**
 * A classe que representa as informações da paǵina que lista as maquinas
 */
export class ListMachinesComponent extends PaginationShared<MachinesProxy> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly http: HttpAsyncService,
    private readonly loading: DialogLoadingService,
  ) {
    super();

    this.displayedColumns = [
      'name', 'email', 'phone', 'actions',
    ];
  }

  //#endregion

  //#region Life Cycle Events

  /**
   * Método que é executado quando esse componente é iniciado
   */
  public async ngOnInit(): Promise<void> {
    const { error, success } = await this.http.get<APIWrapperProxy<MachinesProxy>>('/Members');

    if (success && Array.isArray(success.results)) {
      this.dataSource = new MatTableDataSource<MachinesProxy>(success.results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      JqueryHelper.notify('add_alert', error && error.error && error.error.message || 'Ocorreu um erro ao buscar os items, por favor, tente novamente!', 'danger');
    }

    this.isLoadingResults = false;
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que remove um item do banco de dados
   */
  public async onClickDelete(item: MachinesProxy): Promise<void> {
    this.loading.open();

    const { error } = await this.http.delete(`/Members/${ item.id }`);

    this.loading.close();

    if (error)
      return JqueryHelper.error(error.error && error.error.message || error.message);

    JqueryHelper.success('Operação realizada com sucesso');

    this.isLoadingResults = true;

    await this.ngOnInit();
  }

  //#endregion

}
