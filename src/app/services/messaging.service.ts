import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private firestore: AngularFirestore) { }

  getMessages(conversationId: string) {
    return this.firestore
      .collection('conversations')
      .doc(conversationId)
      .collection('messages', (ref) => ref.orderBy('timestamp'))
      .valueChanges({ idField: 'messageId' });
  }

  sendMessage(conversationId: string, senderId: string, content: string) {
    const timestamp = new Date();
    return this.firestore
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .add({ senderId, timestamp, content });
  }
}
