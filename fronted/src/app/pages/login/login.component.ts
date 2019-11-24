//#region Imports

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { TokenProxy } from '../../models/proxys/token.proxy';
import { HttpAsyncService } from '../../services/http-async/http-async.service';
import { JqueryHelper } from '../../utils/jquery';
import { Keys } from '../../utils/keys';
import { DialogLoadingService } from 'app/components/dialog-loading/dialog.loading.service';

//#endregion

//#region JQuery

/**
 * JQuery instance
 */
declare const $: any;

//#endregion

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly router: Router,
    private readonly http: HttpAsyncService,
    private readonly loading: DialogLoadingService,
  ) {}

  //#endregion

  //#region Public Properties

  /**
   * O FormControl do e-mail
   */
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  /**
   * O FormControl da senha
   */
  public passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  /**
   * A classe que verifica se está ocorrendo algum erro de validação
   */
  public errorMatcher = new ErrorStateMatcher();

  /**
   * Diz se deve esconder a senha
   */
  public hidePassword = true;

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
   * Método que realiza o login de um usuário
   */
  public async onSubmit(): Promise<void> {
    if (!this.emailFormControl.valid || !this.passwordFormControl.valid)
      return;

    const { value: email } = this.emailFormControl;
    const { value: password } = this.passwordFormControl;

    this.loading.open();

    const { error, success } = await this.http.post<TokenProxy>('/Users/Auth', { email, password });

    this.loading.close();

    if (error)
      return JqueryHelper.error(error.error && error.error.message || error.message);

    localStorage.setItem(Keys.TOKEN, success.token);

    await this.router.navigateByUrl('dashboard');
  }

  //#endregion

}
