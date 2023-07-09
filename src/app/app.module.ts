import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'home', component: SearchComponent},
  {path: 'profile/:user_login', component: ProfileComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
