import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RestService{
    constructor(private httpClient: HttpClient) { }

    BASEURL = environment.apiUrl;

    getRequest<T, R>(url: string): Observable<R>
    {
        return this.httpClient.get<R>(`${this.BASEURL}${url}`);
    }

    postRequest<T, R>(url: string, body: T): Observable<R>
    {
        return this.httpClient.post<R>( `${this.BASEURL}${url}`, body);
    }

    deleteRequest<T, R>(url: string, body: T): Observable<R>
    {
        return this.httpClient.delete<R>( `${this.BASEURL}${url}`, body);
    }

    putRequest<T, R>(url: string, body: T): Observable<R>
    {
        return this.httpClient.put<R>( `${this.BASEURL}${url}`, body);
    }
}
