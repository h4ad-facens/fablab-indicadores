import { AfterContentInit, Component, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MemberProxy } from '../../models/proxys/member.proxy';
import { StudentsProxy } from '../../models/proxys/students.proxy';
import { PaginationShared } from '../../shared/pagination/pagination.shared';

@Component({
  selector: 'app-member-source',
  templateUrl: './member-source.component.html',
  styleUrls: ['./member-source.component.scss']
})
export class MemberSourceComponent extends PaginationShared<MemberProxy> implements AfterContentInit {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() {
    super();

    this.displayedColumns = [
      'name',
      'last_name',
      'email',
      'newsletter',
      'gender',
      'age',
      'address',
      'phone',
      'website',
      'job',
      'interest',
      'cad_software',
      'group',
      'signature',
      'validated_training',
      'tags',
      'invoice_disabled',
      'projects',
      'facebook',
      'twitter',
      'number_invoices',
      'ecocience',
      'organization',
      'organization_address',
      'aux_group',
      'aux_training',
      'aux_group_training',
    ];
  }

  //#endregion

  //#region Inputs

  /**
   * A lista de estudantes
   */
  @Input()
  public content: MemberProxy[] = [];

  //#endregion

  //#region LifeCycle Events

  /**
   * Método que é executado ao iniciar o componente
   */
  public async ngAfterContentInit(): Promise<void> {
    this.dataSource = new MatTableDataSource<MemberProxy>(this.content);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.isLoadingResults = false;
  }

  //#endregion

}
