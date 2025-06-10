import { KeyedMutator } from "swr";

export interface BaseHookResponse<T> {
  data: T | undefined;
  error: unknown;
  isLoading: boolean;
  mutate: KeyedMutator<T>;
  cacheKey: string;
}
