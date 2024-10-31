import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

const BASIC_URL = 'http://localhost:8080/'
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  createNewPost(data: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/posts/create`, data);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts`);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/${postId}`);
  }

  updatePostById(postId: number, data: any): Observable<any> {
    const headers = this.jwtService.getAuthorizationHeader();
    return this.http.put(BASIC_URL + `api/posts/update/${postId}`, data, { headers });
  }

  deletePostById(postId: number): Observable<any> {
    const headers = this.jwtService.getAuthorizationHeader();
    return this.http.delete(BASIC_URL + `api/posts/delete/${postId}`, { headers });
  }
}
