import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private firestore: AngularFirestore) {}

  sendFriendRequest(senderId: string, recipientId: string): void {
    const senderRef = this.firestore.collection('users').doc(senderId);
    const recipientRef = this.firestore.collection('users').doc(recipientId);

    senderRef.collection('friendRequests').doc(recipientId).set({ status: 'pending' });
    recipientRef.collection('incomingFriendRequests').doc(senderId).set({ status: 'pending' });
  }

  searchUsers(query: string): any {
    return this.firestore.collection('users', ref =>
      ref.where('Identifier', '>=', query.toLowerCase()).where('Identifier', '<=', query.toLowerCase() + '\uf8ff')
    ).valueChanges().pipe(
      catchError(error => {
        console.error('Error searching users:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }
  
}