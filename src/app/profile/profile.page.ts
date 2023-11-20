import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  userProfile: any = {}; // Object to store user profile information
  selectedImage: File | null = null; // Variable to store the selected image file
  downloadURL: string | null = null; 

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {}

  ionViewDidEnter() {
    // Fetch user profile information when the view is entered
    this.getUserProfile();
  }

  async getUserProfile() {
    // Fetch user profile information (customize this based on your user model)
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userProfile = {
        name: user.displayName,
        email: user.email,
        // Add more profile details as needed
      };

      // Load user's profile picture
      this.loadProfilePicture(user.uid);
    }
  }

  loadProfilePicture(uid: string) {
    const filePath = `profile_pictures/${uid}`;
    const fileRef = this.storage.ref(filePath);

    // Get the download URL of the user's profile picture
    fileRef.getDownloadURL().subscribe(
      (downloadURL) => {
        // Save the download URL to display in the UI
        this.downloadURL = downloadURL;
        console.log('Download URL:', downloadURL);
      },
      (error) => {
        console.error('Error getting download URL:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  async changeProfilePicture() {
    const user = await this.afAuth.currentUser;

    if (user) {
      const filePath = `profile_pictures/${user.uid}`;
      const fileRef = this.storage.ref(filePath);

      if (this.selectedImage) {
        // Proceed with the upload
        const uploadTask = this.storage.upload(filePath, this.selectedImage);

        // Get notified when the upload is complete
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            // Load the updated user's profile picture
            this.loadProfilePicture(user.uid);
          })
        ).subscribe();
      } else {
        console.error('Selected image is null or undefined.');
      }
    }
  }
}