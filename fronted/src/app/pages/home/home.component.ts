//#region Imports

import { Component, OnInit } from '@angular/core';
import { MatButton, MatTableDataSource } from '@angular/material';
import * as Chartist from 'chartist';

import { Parser } from 'json2csv';

import { IndicatorsProxy } from '../../models/proxys/indicators.proxy';
import { PaginationShared } from '../../shared/pagination/pagination.shared';
import { JqueryHelper } from '../../utils/jquery';

//#endregion

//#region Component

@Component({
  selector: 'app-table-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

//#endregion

/**
 * A classe que representa o componente inicial
 */
export class HomeComponent extends PaginationShared<IndicatorsProxy> implements OnInit {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() {
    super();

    this.displayedColumns = [
      'name', 'goal', 'january', 'february', 'march', 'april', 'june', 'july', 'august', 'september', 'november', 'december'
    ];
  }

  //#endregion

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  //#region LifeCycle Events

  /**
   * Método que é executado ao iniciar o componente
   */
  public async ngOnInit(): Promise<void> {
    try {
      this.dataSource = new MatTableDataSource<IndicatorsProxy>([]);
    } catch {
      JqueryHelper.notify('add_alert', 'Ocorreu um erro ao buscar os indicadores, por favor, tente novamente!', 'danger');

      this.dataSource = new MatTableDataSource<IndicatorsProxy>([]);
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.isLoadingResults = false;


    const dataDailySalesChart: any = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [12, 17, 7, 17, 23, 18, 38, 23, 18, 38, 23, 18]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    this.startAnimationForLineChart(completedTasksChart);


    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    const datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    const responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    this.startAnimationForBarChart(websiteViewsChart);
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que exporta todos os itens
   */
  public exportDataToJson(el: MatButton, all: boolean = false): void {
    const emails = all ? this.dataSource.data : this.dataSource.connect().getValue();

    const fields = [{ label: 'Email', value: 'email' }, { label: 'Criado em', value: 'createdAt' }];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(emails);

    const data = 'text/csv;charset=utf-8,' + encodeURIComponent(csv);

    el._elementRef.nativeElement.setAttribute('href', 'data:' + data);
    el._elementRef.nativeElement.setAttribute('download', 'emails.csv');
  }

  //#endregion

}
