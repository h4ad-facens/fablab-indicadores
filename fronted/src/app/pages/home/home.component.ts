//#region Imports

import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as Chartist from 'chartist';

import * as XLSX from 'xlsx';

import { Parser } from 'json2csv';
import { DialogLoadingService } from '../../components/dialog-loading/dialog.loading.service';
import { IndicatorsGraph } from '../../models/proxys/indicators-graph.proxy';

import { IndicatorsProxy } from '../../models/proxys/indicators.proxy';
import { MemberProxy } from '../../models/proxys/member.proxy';
import { StudentsProxy } from '../../models/proxys/students.proxy';
import { HttpAsyncService } from '../../services/http-async/http-async.service';
import { PaginationShared } from '../../shared/pagination/pagination.shared';
import { JqueryHelper } from '../../utils/jquery';

//#endregion

type AOA = any[][];

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
  constructor(
    private readonly loading: DialogLoadingService,
    private readonly http: HttpAsyncService,
  ) {
    super();

    this.displayedColumns = [
      'name', 'goal', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'
    ];
  }

  //#endregion

  //#region LifeCycle Events

  /**
   * Método que é executado ao iniciar o componente
   */
  public async ngOnInit(): Promise<void> {
    const { success } = await this.http.get('/Indicators');

    if (success) {
      this.dataSource = new MatTableDataSource<IndicatorsProxy>(success);
    } else {
      JqueryHelper.notify('add_alert', 'Ocorreu um erro ao buscar os indicadores, por favor, tente novamente!', 'danger');

      this.dataSource = new MatTableDataSource<IndicatorsProxy>([]);
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const { success: graphProxy = {} as IndicatorsGraph } = await this.http.get<IndicatorsGraph>('/Indicators/Graph?selectedYear=2019');

    this.totalMembers = graphProxy.totalMembers || 0;
    this.totalStudents = graphProxy.totalStudents || 0;

    const month = graphProxy.totalStudentsPerMonth || {} as IndicatorsProxy;
    const monthsValues: number[] = [month.january || 0, month.february || 0, month.march || 0, month.april || 0, month.may || 0, month.june || 0, month.july || 0, month.august || 0, month.september || 0, month.october || 0, month.november || 0, month.december || 0].map(a => Number(a));
    const max = 20 + monthsValues.reduce((a, b) => a > b ? a : b);
    const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

    console.log(monthsValues);
    const dataDailySalesChart: any = {
      labels,
      series: [monthsValues],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: max, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.Line('#numberClassImpacted', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);

    this.isLoadingResults = false;
  }

  //#endregion

  //#region Public Properties

  /**
   * A lista de dados dos alunos
   */
  public importedStudentData: StudentsProxy[];

  /**
   * A lista de dados dos membros
   */
  public importedMembersData: MemberProxy[];

  /**
   * A quantidade de membros
   */
  public totalMembers: number;

  /**
   * A quantidade total de estudantes
   */
  public totalStudents: number;

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

  /**
   * Método que importa e formata os alunos de uma planilha do excel
   *
   * @param evt O evento lançado
   */
  public importStudentsToJson(evt: any): void {
    this.importedStudentData = undefined;
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1)
      throw new Error('Cannot use multiple files');

    this.loading.open();

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {
        type: 'binary',
        cellDates: true,
        cellNF: false,
        cellText: false
      });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const [resultHeaders, ...result] = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, dateNF: 'dd/mm/yyyy', }));

      const getIndex = header => resultHeaders.indexOf(header);
      const headers = [
        getIndex('Data'),
        getIndex('Usuário'),
        getIndex('Email'),
        getIndex('Telefone'),
        getIndex('Gênero'),
        getIndex('Idade'),
        getIndex('Tipo'),
        getIndex('Receita'),
        getIndex('MÊS'),
      ];
      const mapped = result.map(row => {
        return <StudentsProxy>{
          date: row[headers[0]] && row[headers[0]].toISOString && row[headers[0]].toISOString() || '-',
          name: row[headers[1]] || '-',
          email: row[headers[2]] || '-',
          phone: row[headers[3]] || '-',
          gender: row[headers[4]] || 'Não especificado',
          age: row[headers[5]] || '0',
          type: row[headers[6]] || '-',
          invoice: row[headers[7]] || '0',
          month: row[headers[8]] || '0',
        };
      });

      this.importedStudentData = mapped;

      this.loading.close();

      // @ts-ignore
      $('#studentDataModal').modal('show');
    };
    reader.readAsBinaryString(target.files[0]);
  }

  /**
   * Método que importa a planilha de membros para um json
   *
   * @param event O evento lançado
   */
  public importMembersToJson(event: any): void {
    this.importedMembersData = undefined;
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1)
      throw new Error('Cannot use multiple files');

    this.loading.open();

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const wb: XLSX.WorkBook = XLSX.read(e.target.result, {
        type: 'binary',
        cellDates: true,
        cellNF: false,
        cellText: false
      });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const [resultHeaders, ...result] = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, dateNF: 'dd/mm/yyyy', }));

      console.log(resultHeaders);

      const getIndex = header => resultHeaders.indexOf(header);
      const headers = [
        getIndex('Sobrenome'),
        getIndex('Primeiro nome'),
        getIndex('E-mail'),
        getIndex('Newsletter'),
        getIndex('Gênero'),
        getIndex('Idade'),
        getIndex('Endereço'),
        getIndex('Telefone'),
        getIndex('Website'),
        getIndex('Emprego'),
        getIndex('Interesses'),
        getIndex('CAD Softwares mastered'),
        getIndex('Grupo'),
        getIndex('Assinatura'),
        getIndex('Treinamentos validados'),
        getIndex('Tags'),
        getIndex('Número de faturas'),
        getIndex('Fatura desativada'),
        getIndex('Projetos'),
        getIndex('Facebook'),
        getIndex('Twitter'),
        getIndex('Ecociências'),
        getIndex('Organização'),
        getIndex('Endereço da organização'),
        getIndex('Aux (Grupo)'),
        getIndex('Aux (Treinamento)'),
        getIndex('Aux Grupo + Treinamento)'),
      ];
      const mapped = result.map(row => {
        return <MemberProxy>{
          last_name: row[headers[0]],
          name: row[headers[1]],
          email: row[headers[2]],
          newsletter: row[headers[3]],
          gender: row[headers[4]],
          age: row[headers[5]],
          address: row[headers[6]],
          phone: row[headers[7]],
          website: row[headers[8]],
          job: row[headers[9]],
          interest: row[headers[10]],
          cad_software: row[headers[11]],
          group: row[headers[12]],
          signature: row[headers[13]],
          validated_training: row[headers[14]],
          tags: row[headers[15]],
          number_invoices: row[headers[16]],
          invoice_disabled: row[headers[17]],
          projects: row[headers[18]],
          facebook: row[headers[19]],
          twitter: row[headers[20]],
          ecocience: row[headers[21]],
          organization: row[headers[22]],
          organization_address: row[headers[23]],
          aux_group: row[headers[24]],
          aux_training: row[headers[25]],
          aux_group_training: row[headers[26]],
        };
      });

      this.importedMembersData = mapped;

      this.loading.close();

      // @ts-ignore
      $('#membersDataModal').modal('show');
    };
    reader.readAsBinaryString(target.files[0]);
  }

  /**
   * Método que salva os estudantes no banco de dados
   */
  public async saveStudentsData(): Promise<void> {
    // @ts-ignore
    $('#studentDataModal').modal('hide');

    this.loading.open();

    let savedStudents = 0;

    for (let i = 0; i < this.importedStudentData.length; i++) {
      const { error } = await this.http.post('/Students', this.importedStudentData[i]);

      if (error)
        continue;

      savedStudents++;
    }

    this.loading.close();

    JqueryHelper.success(`Foram salvos ${ savedStudents } estudantes impactados.`);
  }

  /**
   * Método que salva os membros no banco de dados
   */
  public async saveMembersData(): Promise<void> {
    // @ts-ignore
    $('#membersDataModal').modal('hide');

    this.loading.open();

    let savedMembers = 0;

    for (let i = 0; i < this.importedMembersData.length; i++) {
      const { error } = await this.http.post('/Members', this.importedMembersData[i]);

      if (error)
        continue;

      savedMembers++;
    }

    this.loading.close();

    JqueryHelper.success(`Foram salvos ${ savedMembers } membros.`);
  }

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

  //#endregion

}
