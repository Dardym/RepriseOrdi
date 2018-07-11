import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
const apiUrl = "/apiAdmin";
 
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }
 
    login(email: string, password: string) {
        return this.http.post<any>(apiUrl+'/authenticate', { email: email, password: password }, httpOptions,)
            .pipe(map((res:any) => {
                // login successful if there's a jwt token in the response
                if (res && res.success) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentAdmin', JSON.stringify({ email, token: res.token }));
                }
            }));
    }
 
    logout() {

        // remove user from local storage to log user out
        return this.http.get(apiUrl+'/logout',httpOptions)
        .pipe(map((res:any) => {
            if (res && res.success){
                console.log("déconnecté avec succès frr !");
                localStorage.removeItem('currentAdmin');
            }
        }));
        
    }

    isLoggedIn() {
        return localStorage.getItem('currentAdmin');
    }
}