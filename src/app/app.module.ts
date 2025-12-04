import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { CoursesComponent } from './pages/courses/courses.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, UsersComponent, CoursesComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, RouterModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
