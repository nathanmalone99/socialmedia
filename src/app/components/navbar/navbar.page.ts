import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage  {

  constructor(private afAuth: AngularFireAuth) {}

  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser; // Returns true if the user is logged in
  }

  logout() {
    this.afAuth.signOut(); // Log out the user
  }

}
