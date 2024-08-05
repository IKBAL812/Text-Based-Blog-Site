import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const BASIC_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAllUsers(): Observable<any> {
    return this.http.get(BASIC_URL + `admin/users`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteUserById(userId: number): Observable<any> {
    return this.http.delete(BASIC_URL + `admin/delete/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
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
