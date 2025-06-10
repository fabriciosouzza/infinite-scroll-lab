export interface ApiBaseResponseFormat<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    hasNextPage: boolean;
    totalPages: number;
    totalItems: number;
  };
}
