import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import decode from 'jwt-decode';

import { Keys } from '../../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly router: Router,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que diz se pode ativar a rota
   */
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem(Keys.TOKEN);

    if (token && next.data.redirectIfLogged) {
      console.log(token);

      return true;
    }

    const notHavePermissions = () => {
      console.log(this);

      this.router.navigate(['login']);

      localStorage.removeItem(Keys.TOKEN);

      return false;
    };

    const jwt = new JwtHelperService();

    if (!token || jwt.isTokenExpired(token))
      return notHavePermissions();

    if (next.data.expectedRole) {
      const tokenPayload = decode(token);

      if (typeof tokenPayload.roles !== 'string')
        return notHavePermissions();

      if (typeof next.data.expectedRole !== 'string')
        return notHavePermissions();

      if (!tokenPayload.roles.split(',').some(role => next.data.expectedRole.includes(role)))
        return notHavePermissions();
    }

    return true;
  }

  //#endregion

}
