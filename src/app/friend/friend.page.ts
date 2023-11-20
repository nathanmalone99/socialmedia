import { Component } from '@angular/core';
import { FriendService } from '../friend.service';
import { Observable } from 'rxjs';

interface User {
  Identifier: string;
  UserUID: string;
  // Add other necessary fields
}

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage {

  

  userId: string = 'MutVFJIp8zdSgsgHpVV49FBPuoS2'; 
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private friendService: FriendService) {}

  searchUsers(): void {
    this.friendService.searchUsers(this.searchQuery).subscribe((results: any[]) => {
      this.searchResults = results;
    });
  }

  sendFriendRequest(recipientId: string): void {
    this.friendService.sendFriendRequest(this.userId, recipientId);
  }

  searchResults$: Observable<User[]> = this.friendService.searchUsers(this.searchQuery);
}
