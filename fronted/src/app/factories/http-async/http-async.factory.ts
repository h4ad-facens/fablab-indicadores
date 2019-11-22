//#region Imports

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment } from '../../../environments/environment';

import { AsyncResult, HttpAsyncService } from '../../services/http-async/http-async.service';
import { Keys } from '../../utils/keys';

//#endregion

/**
 * A factory usada para criar o serviço de HttpAsync
 *
 * @param http O serviço nativo do angular para HTTP
 */
export function httpAsyncFactory (
  http: HttpClient,
) {
  const httpAsync: HttpAsyncService = new HttpAsyncService(http);

  httpAsync.setBaseUrl(environment.api_url);

  httpAsync.setBeforeValidations(async () => {
    return { error: undefined } as AsyncResult<any>;
  });

  httpAsync.setLoadHeaders(async () => {
    const token = localStorage.getItem(Keys.TOKEN);

    if (!token)
      return new HttpHeaders();

    return new HttpHeaders({ 'Authorization': token });
  });

  httpAsync.getOnAsyncResultError().subscribe((error: HttpErrorResponse) => {
    console.error(error);
  });

  return httpAsync;
}
