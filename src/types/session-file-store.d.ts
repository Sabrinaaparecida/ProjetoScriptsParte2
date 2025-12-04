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

 interface FileStoreConstructor {
    new (options?: FileStoreOptions): Store;
  }

  export default function init(session: any): FileStoreConstructor;
}