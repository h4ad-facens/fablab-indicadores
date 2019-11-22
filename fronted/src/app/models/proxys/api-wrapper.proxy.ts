export interface APIWrapperProxy<T> {
  message: string;
  results: T[];
}

export interface APIWrapperSingleProxy<T> {
  message: string;
  results: T;
}
