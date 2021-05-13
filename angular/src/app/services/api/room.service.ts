import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root',
  })
  export class RoomService {
    constructor(private restService: RestService) { }

    search = (query: string) => {
        return this.restService.getRequest<any, any>(`/rooms/search?q=${query}`);
    }

    // get(id){
    //   return this.restService.getRequest<any,any>(`/rooms/`);
    // }
}
