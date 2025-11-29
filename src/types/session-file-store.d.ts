declare module 'session-file-store' {
  import { Store } from 'express-session';

  interface FileStoreOptions {
    path?: string;
    ttl?: number;
    retries?: number;
    factor?: number;
    minTimeout?: number;
    maxTimeout?: number;
    reapInterval?: number;
    logFn?: Function;
  }

  // Define a Classe que a biblioteca cria
 interface FileStoreConstructor {
    new (options?: FileStoreOptions): Store;
  }

  // Define a função principal exportada: (session) => Classe
  export default function init(session: any): FileStoreConstructor;
}