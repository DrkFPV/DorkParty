import { Injectable } from '@angular/core';
import { UserLoginResponseDto, UserLoginRequestDto } from '../dtos/user-login.dto';
import { RestService } from './rest.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(private restService: RestService) { }

     login = (input: UserLoginRequestDto) => {
        return this.restService.postRequest<UserLoginRequestDto, UserLoginResponseDto>(`/auth/login`, input)
        .pipe(tap(
          res => this.setSession(res)
        ));
    }

    private setSession(authResult: UserLoginResponseDto): void {
      localStorage.setItem('id_token', authResult.accessToken);
      localStorage.setItem('expires_at', JSON.stringify(new Date(authResult.expiresAt).getTime()) );
  }

  logout(): void {
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
  }

    public isLoggedIn(): boolean {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
      return !this.isLoggedIn();
  }

  getExpiration(): moment.Moment {
      const expiration = localStorage.getItem('expires_at') ?? '0';
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
  
}
