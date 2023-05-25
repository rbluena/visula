import { AsyncLocalStorage } from "node:async_hooks";

let asyncLocalStorage: AsyncLocalStorage<any> | null = null;

export function getAsyncLocalStorage() {
  if (!asyncLocalStorage) {
    asyncLocalStorage = new AsyncLocalStorage();
  }

  return asyncLocalStorage;
}
