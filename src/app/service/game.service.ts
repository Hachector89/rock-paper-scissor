import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { user } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private db: any;
  private user: user = {
    user: '',
    wins: 0,
    losses: 0,
    total: 0
  };

  constructor() {
    this.createDatabase();
  }

  //Create IndexedDB database
  private createDatabase() {
    this.db = new Dexie('GameDatabase');
    this.db.version(1).stores({
      users: 'user, wins, losses, total'
    });
  }

  //Private method to read all users
  private async readFromIndexedDb() {
    const allItems: user[] = await this.db.users.toArray();
    return allItems;

  }

  //Private method to add user to database
  private addToIndexedDb(user: user) {
    this.db.users
      .put(user)
      .then(async () => {
        const allItems: user[] = await this.db.users.toArray();
      })
      .catch((e: { stack: any; }) => {
        console.log('Error: ' + (e.stack || e));
      });
  }

  //Public method to add user to database
  addUser(user: user) {
    this.addToIndexedDb(user);
  }

  //Public method to search an user
  async readUser(userName: string): Promise<user> {

    const emptyUser: user = {
      user: '',
      wins: 0,
      losses: 0,
      total: 0
    }

    //Reinitializing user for avoiding cache error
    this.user = emptyUser;

    const allItems = await this.readFromIndexedDb();

    allItems.forEach((item: user) => {

      if (item.user === userName) {
        this.user = item;
      }

    });

    if (this.user.user === '') {
      this.user.user = userName;
    }
    return this.user;
  }

}
