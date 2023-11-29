import { Component, Inject, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { Observable } from 'rxjs';
import { FRIEND_SERVICE_TOKEN } from '../friend.service';


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
export class FriendPage implements OnInit {

  userId: string = 'MutVFJIp8zdSgsgHpVV49FBPuoS2';
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(@Inject(FRIEND_SERVICE_TOKEN) private friendService: FriendService) {}

  ngOnInit(): void {
    // Fetch the logged-in user details when the component initializes
    const loggedInUser = this.friendService.getLoggedInUser();

    if (loggedInUser) {
      this.userId = loggedInUser.UserUID;
      // Perform other actions with the logged-in user details if needed
    }
    // Initialize any variables here
    this.searchQuery = ''; // You can set a default value if needed
    this.searchUsers(); // Call the search method if needed on component initialization
  }

  async searchUsers(): Promise<void> {
    console.log('Search Query:', this.searchQuery);

    this.searchResults = await this.friendService.searchUsers(this.searchQuery);
    console.log('Search Results:', this.searchResults);
  }

  async updateUserProfile(user: any): Promise<void> {
    await this.friendService.updateUserProfile(user);
  }
}