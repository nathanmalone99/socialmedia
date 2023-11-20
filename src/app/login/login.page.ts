import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      // User logged in successfully
      console.log('User logged in:', userCredential.user);
      // Navigate to the main content of your app (e.g., home page)
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser; // Returns true if the user is logged in
  }

  logout() {
    this.afAuth.signOut(); // Log out the user
  }
  
}
