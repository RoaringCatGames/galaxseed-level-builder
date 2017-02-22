import { DBSchema } from '@ngrx/db';


/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 2,
  name: 'books_app',
  stores: {
    books: {
      autoIncrement: true,
      primaryKey: 'id'
    },
    levels: {
      autoIncrement: true,
      primaryKey: 'id'
    }
  }
};