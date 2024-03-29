import { Injectable, InjectionToken  } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export const FRIEND_REQUEST_SERVICE_TOKEN = new InjectionToken('FRIEND_REQUEST_SERVICE_TOKEN');


@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  private friendRequestsCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.friendRequestsCollection = this.firestore.collection('friendRequests');
  }

  sendFriendRequest(senderUid: string, receiverUid: string): Promise<DocumentReference<any>> {
    if (!senderUid || !receiverUid) {
      return Promise.reject(new Error('Invalid senderUid or receiverUid'));
    }
    return this.friendRequestsCollection.add({
      senderUid,
      receiverUid,
      status: 'pending',
    });
  }
}
