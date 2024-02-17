import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';


import { HomePageRoutingModule } from './home-routing.module';
import { NavbarPageModule } from '../navbar/navbar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //NavbarPageModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
