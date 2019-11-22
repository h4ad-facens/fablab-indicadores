import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

import { RouteInfo } from '../../models/interfaces/route-info';
import { Keys } from '../../utils/keys';

//#region JQuery

/**
 * JQuery instance
 */
declare const $: any;

//#endregion

//#region Components

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

//#endregion

/**
 * A classe que representa a barra de menu
 */
export class SidebarComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() {}

  //#endregion

  //#region Public Properties

  /**
   * Os itens do menu
   */
  public menuItems: RouteInfo[] = Keys.ROUTES;

  /**
   * O nome da aplicação
   */
  public appName: string = environment.app_name;

  /**
   * O icone da aplicação
   */
  public icon_name: string = environment.icon_name;

  //#endregion

  //#region Public Methods

  /**
   * Método que diz se a resolução da tela é mobile
   */
  public isMobileMenu(): boolean {
    return !($(window).width() > 991);
  };

  //#endregion

}
