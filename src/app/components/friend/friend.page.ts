import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FriendService, FRIEND_SERVICE_TOKEN } from '../../services/friend.service';
import { FRIEND_REQUEST_SERVICE_TOKEN, FriendRequestService } from '../../services/friend-request.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})

export class FriendPage implements OnInit {
  userId: string = '';
  searchQuery: string = '';
  searchResults: any[] = [];

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(
    @Inject(FRIEND_SERVICE_TOKEN) private friendService: FriendService,
    @Inject(FRIEND_REQUEST_SERVICE_TOKEN) private friendRequestService: FriendRequestService
  ) {}

  ngOnInit(): void {
    this.friendService.getLoggedInUser().then((loggedInUser) => {
      if (loggedInUser) {
        this.userId = loggedInUser.uid;
        console.log('Logged-in User ID:', this.userId);
        this.setupSearchObservable();
      } else {
        console.log('No logged-in user found.');
      }
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  private setupSearchObservable(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((query) => {
          console.log('Searching for:', query);
          return this.friendService.searchUsers(query);
        })
      )
      .subscribe((results) => {
        console.log('Search Results:', results);
        this.searchResults = results;
      });
  }

  async updateUserProfile(user: any): Promise<void> {
    await this.friendService.updateUserProfile(user);
  }

  async sendFriendRequest(receiverUid: string): Promise<void> {
    const senderUid = this.userId;

    console.log('Sender UID:', senderUid);
    console.log('Receiver UID:', receiverUid);

    await this.friendRequestService.sendFriendRequest(senderUid, receiverUid);
    console.log('Friend request sent!');
  }
}