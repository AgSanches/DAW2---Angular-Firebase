import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SneakerHeaderComponent } from './components/sneaker-header/sneaker-header.component';
import { SneakerButtonComponent } from './components/sneaker-button/sneaker-button.component';
import { SneakerRegistrationComponent } from './components/sneaker-registration/sneaker-registration.component';
import { SneakerLoginComponent } from './components/sneaker-login/sneaker-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {RouterModule} from '@angular/router';
import {SneakerMainComponent} from './components/sneaker-main/sneaker-main.component';
import { SneakerLandingComponent } from './components/sneaker-landing/sneaker-landing.component';
import { SneakerSideMenuComponent } from './components/sneaker-side-menu/sneaker-side-menu.component';
import {AppRouting} from "./app-routing/app-routing";
import { SneakerContentPageComponent } from './components/sneaker-content-page/sneaker-content-page.component';
import { SneakerBoxComponent } from './components/sneaker-box/sneaker-box.component';
import { SneakerPostComponent } from './components/sneaker-post/sneaker-post.component';
import { SneakerFavoritesComponent } from './components/sneaker-favorites/sneaker-favorites.component';
import { SneakerComponent } from './components/sneaker/sneaker.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SneakerHeaderComponent,
    SneakerButtonComponent,
    SneakerRegistrationComponent,
    SneakerLoginComponent,
    UserProfileComponent,
    SneakerMainComponent,
    SneakerLandingComponent,
    SneakerSideMenuComponent,
    SneakerContentPageComponent,
    SneakerBoxComponent,
    SneakerPostComponent,
    SneakerFavoritesComponent,
    SneakerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRouting,
    SlickCarouselModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
