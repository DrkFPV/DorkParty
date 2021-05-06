import { Injectable } from '@angular/core';
import { UserLoginDto } from '../dtos/user-login.dto';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(private restService: RestService) { }

    login = (input: UserLoginDto) => {
        return this.restService.postRequest<UserLoginDto, any>(`/auth/login`, input);
    }
}
