export type TParams = [string, string][];

export interface QueryParams {
  query?: TParams;
  order?: TParams;
  pagination?: TParams;
}
