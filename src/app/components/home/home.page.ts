import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginPage } from 'app/components/login/login.page';
import { NavbarPage } from 'app/components/navbar/navbar.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rootPage = NavbarPage;


  posts = [
    {
      username: 'John Doe',
      avatar: 'assets/avatar.png',
      timestamp: new Date(),
      content: 'This is a sample post content.',
      likes: 10,
      comments: 5,
    },
    {
      username: 'Jane Smith',
      avatar: 'assets/avatar.png',
      timestamp: new Date(),
      content: 'Another post for the social media app.',
      likes: 15,
      comments: 8,
    },
    // Add more sample posts as needed
  ];

  
}
