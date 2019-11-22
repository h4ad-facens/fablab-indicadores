//#region Imports

import { ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

//#endregion

/**
 * A classe que representa o conteúdo básico para uma página que irá conter páginação
 */
export class PaginationShared<TProxy> implements AfterViewInit, OnDestroy {

  //#region View Childs

  /**
   * O elemento responsável pela paginação
   */
  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator;

  /**
   * O element responsável pelo sorting
   */
  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

  /**
   * O elemento responsável pela pesquisa
   */
  @ViewChild('input', { static: true })
  public searchInput: ElementRef;

  //#endregion

  //#region Public Properties

  /**
   * A definição de colunas
   */
  public displayedColumns: string[] = [];

  /**
   * Diz se está carregando resultados
   */
  public isLoadingResults = true;

  /**
   * A lista de informações que serão paginadas
   */
  public dataSource: MatTableDataSource<TProxy>;

  //#endregion

  //#region Private Properties

  /**
   * A inscrição do evento para filtrar
   */
  private searchInputSubscription: Subscription;

  //#endregion

  //#region LifeCycle Events

  /**
   * Método que é executado após iniciar a view
   */
  public ngAfterViewInit(): void {
    if (!this.searchInput || !this.searchInput.nativeElement)
      return;

    this.searchInputSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          const value = this.searchInput.nativeElement.value;

          this.dataSource.filter = this.isString(value) && value.trim().toLocaleLowerCase() || '';
        })
      )
      .subscribe();
  }

  /**
   * Método chamado quando o componente é destruido
   */
  public ngOnDestroy(): void {
    this.searchInputSubscription && this.searchInputSubscription.unsubscribe();
  }

  //#endregion

  //#region Protected Methods

  /**
   * Diz se o valor da variável é uma string
   *
   * @param value O valor a ser verificado
   */
  protected isString(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object String]';
  }

  //#endregion

}
