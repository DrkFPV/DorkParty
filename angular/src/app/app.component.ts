import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/api/auth.service';
import { RoomService } from './services/api/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DorkParty';
  rooms: any[] = [];

  constructor(private authService: AuthService,
              private roomService: RoomService){}

  ngOnInit(): void{
    this.authService.login({password : environment.testCreds.password ,
      username: environment.testCreds.username }).subscribe(res => console.log(res));
  }

  getRooms(): void{
    this.roomService.search('Bangersv2').subscribe(res => this.rooms = res);
  }
}
