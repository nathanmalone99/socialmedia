import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async signup() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      // User signed up successfully
      console.log('User signed up:', userCredential.user);
      // You can navigate to another page or perform other actions
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
}