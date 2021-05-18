import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/api/auth.Interceptor';
import { RoomComponent } from './rooms/room/room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {  MatButtonModule } from '@angular/material/button';
import {  MatDividerModule } from '@angular/material/divider';
import {  MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MusicPickerComponent } from './music-picker/music-picker.component';
import { ToolbarComponent } from './toolbar/toolbar.component'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    FooterComponent,
    BodyComponent,
    MusicPickerComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
