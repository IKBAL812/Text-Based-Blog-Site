import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const BASIC_URL = 'http://localhost:8080/'
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }


  register(signRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + 'signup', signRequest);
  }
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + 'login', loginRequest);
  }

  getUserByEmail(email: String): Observable<any> {
    return this.http.get(BASIC_URL + `user/${email}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  resetPassword(email: String, data: any): Observable<any> {
    return this.http.put(BASIC_URL + `signup/changePassword/${email}`, data);
  }

  private createAuthorizationHeader() {
    const jwtToken = this.cookieService.get('jwt');
    if (jwtToken) {
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    }
    return;
  }

}
