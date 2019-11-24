import { AfterContentInit, Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { StudentsProxy } from '../../models/proxys/students.proxy';
import { PaginationShared } from '../../shared/pagination/pagination.shared';

@Component({
  selector: 'app-student-source',
  templateUrl: './student-source.component.html',
  styleUrls: ['./student-source.component.scss']
})
export class StudentSourceComponent extends PaginationShared<StudentsProxy> implements AfterContentInit {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() {
    super();

    this.displayedColumns = ['date', 'name', 'email', 'phone', 'gender', 'age', 'type', 'invoice', 'month'];
  }

  //#endregion

  //#region Inputs

  /**
   * A lista de estudantes
   */
  @Input()
  public content: StudentsProxy[] = [];

  //#endregion

  //#region LifeCycle Events

  /**
   * Método que é executado ao iniciar o componente
   */
  public async ngAfterContentInit(): Promise<void> {
    this.dataSource = new MatTableDataSource<StudentsProxy>(this.content);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.isLoadingResults = false;
  }

  //#endregion


}
