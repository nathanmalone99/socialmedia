import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  
  email: string = '';
  password: string = '';
  username: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router, private friendService: FriendService, private firestore: AngularFirestore) {}

  async signup() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
  
      // User signed up successfully
      console.log('User signed up:', userCredential.user);
  
      // Store additional user information in Firestore
      const user = userCredential.user;
  
      // Add a null check for the user object
      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: user.email,
          // Add more fields as needed
        });
  
        // Navigate to another page or perform other actions
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
}