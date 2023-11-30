import { Component, Inject, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { Observable, Subject } from 'rxjs';
import { FRIEND_SERVICE_TOKEN } from '../friend.service';
import { debounceTime } from 'rxjs/operators';


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

  userId: string = '';
  searchQuery: string = '';
  searchResults: any[] = [];

  // Introduce a Subject to handle debounce
  private searchSubject: Subject<string> = new Subject<string>();

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

    // Apply debounce time and subscribe to the searchSubject
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.searchUsers();
    });
  }

  // Trigger search when searchQuery changes after a small delay
  onSearchChange(): void {
    this.searchSubject.next('');
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