import { Component, OnInit  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface Post {
  text: string;
  userId: string;
  imageURL?: string; // Optional property for image posts
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  userProfile: any = {}; // Object to store user profile information
  selectedImage: File | null = null; // Variable to store the selected image file
  downloadURL: string | null = null;

  userPosts: any[] = [];
  postText: string = '';

  textPosts: Post[] = []; // Array to store text posts
  imagePosts: Post[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}


  ngOnInit() {
    // Load user profile information and posts when the component initializes
    this.getUserProfile();
    this.loadUserPosts();
  }

  ionViewDidEnter() {
    // Fetch user profile information when the view is entered
    this.getUserProfile();
  }

  ionViewDidLoad() {
    // Load user posts when the view is loaded, including image posts
    this.loadUserPosts();
  }

  async getUserProfile() {
    // Fetch user profile information (customize this based on your user model)
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userProfile = {
        username: '',
        firstName: '',
        lastName: '',
        email: user.email,
      };

      // Load user's profile picture
      this.loadProfilePicture(user.uid);
    }
  }

  async updateProfile() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userRef = this.firestore.collection('users').doc(user.uid);
      await userRef.update({
        username: this.userProfile.username,
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
        // Add more fields as needed
      });
    }
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Create a text post
  async createTextPost() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const post: Post = {
        text: this.postText,
        userId: user.uid,
      };
      this.textPosts.unshift(post); // Add the text post to the beginning of the array
      this.savePost(post);
    }
  }

  // Create an image post
  async createImagePost() {
    const user = await this.afAuth.currentUser;
    if (user && this.selectedImage) {
      const post: Post = {
        userId: user.uid,
        text: '',
      };

      const filePath = `post_images/${user.uid}/${Date.now()}_${
        this.selectedImage.name
      }`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedImage);

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((downloadURL) => {
              post.imageURL = downloadURL;
              this.imagePosts.unshift(post); // Add the image post to the beginning of the array
              this.selectedImage = null; // Clear the selected image
              this.savePost(post);
            });
          })
        )
        .subscribe();
    }
  }

  private savePost(post: any) {
    // Add the post to Firestore
    this.firestore
      .collection('posts')
      .add(post)
      .then(() => {
        this.postText = ''; // Clear the post text input
        this.selectedImage = null; // Clear the selected image
        this.loadUserPosts(); // Reload the user's posts
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  }

  async loadUserPosts() {
    const user = await this.afAuth.currentUser;
  
    if (user) {
      // Query Firestore to get the user's posts ordered by timestamp in descending order
      this.firestore
        .collection('posts', (ref) =>
          ref.where('userId', '==', user.uid).orderBy('timestamp', 'desc')
        )
        .valueChanges()
        .subscribe((posts: Post[] | unknown[]) => {
          // Clear previous posts
          this.textPosts = [];
          this.imagePosts = [];
  
          // Separate text and image posts
          posts.forEach((post) => {
            if ((post as Post).text) {
              this.textPosts.push(post as Post);
            } else if ((post as Post).imageURL) {
              this.imagePosts.push(post as Post);
            }
          });
        });
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
        uploadTask
          .snapshotChanges()
          .pipe(
            finalize(() => {
              // Load the updated user's profile picture
              this.loadProfilePicture(user.uid);
            })
          )
          .subscribe();
      } else {
        console.error('Selected image is null or undefined.');
      }
    }
  }
}
