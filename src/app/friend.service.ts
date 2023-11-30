import { Injectable, InjectionToken } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const FRIEND_SERVICE_TOKEN = new InjectionToken('FRIEND_SERVICE_TOKEN');

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private loggedInUser: any;
  private usersCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  async updateUserProfile(user: any): Promise<void> {
    const userRef = this.usersCollection.doc(user.uid);
    return userRef.set({
      username: user.username, 
      email: user.email
    });
  }

  async searchUsers(query: string): Promise<any[]> {
    const results = await this.usersCollection.ref
      .where('username', '>=', query)
      .where('username', '>=', query)
      .get();

    return results.docs.map((doc) => doc.data());
  }

  
}