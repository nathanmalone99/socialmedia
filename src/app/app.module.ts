import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FRIEND_SERVICE_TOKEN, FriendService } from './services/friend.service';

@NgModule({
  declarations: [AppComponent], 
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    AngularFirestoreModule,
    AppRoutingModule, 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: FRIEND_SERVICE_TOKEN, useClass: FriendService },],  
  bootstrap: [AppComponent],
})
export class AppModule {}