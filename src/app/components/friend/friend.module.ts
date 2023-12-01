import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FRIEND_REQUEST_SERVICE_TOKEN, FriendRequestService } from '../../services/friend-request.service';


import { IonicModule } from '@ionic/angular';

import { FriendPageRoutingModule } from './friend-routing.module';

import { FriendPage } from './friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    FriendPageRoutingModule
  ],
  providers: [
    // ... other services
    { provide: FRIEND_REQUEST_SERVICE_TOKEN, useClass: FriendRequestService },
  ],
  declarations: [FriendPage]
})
export class FriendPageModule {}
