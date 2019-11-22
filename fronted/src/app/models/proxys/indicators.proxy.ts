//#region Imports

import { FirestoreDocumentProxy } from './base/firestore-document.proxy';

//#endregion

/**
 * A interface que representa as informações salvas dos indicadores
 */
export interface IndicatorsProxy extends FirestoreDocumentProxy {

  /**
   * O nome do indicador
   */
  name: string;

  /**
   * A meta atual
   */
  goal: string;

  /**
   * O mes de janeiro
   */
  january: string;

  /**
   * O mes de fevereiro
   */
  february: string;
}
