//#region Imports

import { RouteInfo } from '../models/interfaces/route-info';

//#endregion

/**
 * A classe que representa as referências do app
 */
export class Keys {

  /**
   * As rotas da aplicação
   */
  public static readonly ROUTES: RouteInfo[] = [
    { path: '/dashboard/home', title: 'Início', icon: 'dashboard', class: '' },
    { path: '/dashboard/members', title: 'Membros', icon: 'dashboard', class: '' },
    { path: '/dashboard/students', title: 'Alunos', icon: 'dashboard', class: '' },
  ];

  /**
   * A key para acessar o token armazenado
   */
  public static readonly TOKEN: string = 'KEY_TOKEN';

  /**
   * A key para acessar o template de notificações
   */
  public static readonly NOTIFICATION_TEMPLATE: string = '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
    '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
    '<i class="material-icons" data-notify="icon">notifications</i> ' +
    '<span data-notify="title">{1}</span> ' +
    '<span data-notify="message">{2}</span>' +
    '<div class="progress" data-notify="progressbar">' +
    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
    '</div>' +
    '<a href="{3}" target="{4}" data-notify="url"></a>' +
    '</div>';

}
