import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
 private db!: IDBPDatabase<MyDB>;
constructor() {
  // this.connectToDb();
}

async connectToDb() {
  this.db = await openDB<MyDB>('my-db', 1, {
    upgrade(db) {
      db.createObjectStore('condition-store');
    },
  });
}

addCondition(codObj: any) {
  return this.db.put('condition-store', codObj, 'name');
}

}

interface MyDB extends DBSchema {
'condition-store': {
  key: string;
  value: string;
};
}
