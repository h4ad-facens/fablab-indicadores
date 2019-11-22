/**
 * A interface que representa as informações base de um documento do firestore
 */
export interface FirestoreDocumentProxy {

  /**
   * A identificação do documento
   */
  id: string;

  /**
   * Diz se o documento existe
   */
  exists: boolean;

  /**
   * Diz se está ativo o documento
   */
  isActive: boolean;

}
