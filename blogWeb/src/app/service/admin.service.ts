import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from './jwt.service';



const BASIC_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private jwtService: JwtService
  ) { }

  getAllUsers(): Observable<any> {
    const headers = this.jwtService.getAuthorizationHeader();
    return this.http.get(BASIC_URL + `admin/users`, { headers });
  }

  deleteUserById(userId: number): Observable<any> {
    const headers = this.jwtService.getAuthorizationHeader();
    return this.http.delete(BASIC_URL + `admin/delete/${userId}`, { headers });
  }

}
