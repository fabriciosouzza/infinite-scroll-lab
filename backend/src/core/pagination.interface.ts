export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    hasNextPage: boolean;
    totalPages: number;
    totalItems: number;
  };
}
