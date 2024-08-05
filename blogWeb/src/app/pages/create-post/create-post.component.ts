import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  email!: string;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private postService: PostService,
    private cookieService: CookieService,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    this.checkToken();
    this.getUserByEmail();
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
    });
  }

  checkToken() {
    const jwtToken = this.cookieService.get('jwt');
    if (!jwtToken) {
      this.redirectToLogin();
      return;
    }

    try {
      const decodedToken: any = jwtDecode(jwtToken);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        // Token expired
        this.redirectToLogin();
      } else {
        this.email = decodedToken.sub; // Extract email from token
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    this.cookieService.delete('jwt');
    this.snackbar.open('You need to be logged in to create a post!', 'Ok');
    this.router.navigateByUrl('/login');
  }

  getUserByEmail() {
    this.jwtService.getUserByEmail(this.email).subscribe(res => {
      this.userData = res;
    }, error => {
      this.snackbar.open("Something went wrong!", "Ok")
    });
  }

  createPost() {
    this.checkToken(); // Ensure token is still valid before creating a post
    if (!this.email) return;
    const author = this.userData.name;
    const authorId = this.userData.id;

    const data = {
      ...this.postForm.value,
      author: author, // Ensure the author is set to the email from the token
      authorId: authorId
    };

    this.postService.createNewPost(data).subscribe(res => {
      this.snackbar.open('Post Created Successfully!', 'Ok');
      this.router.navigateByUrl('/view-all');
    }, error => {
      this.snackbar.open('Something went wrong!', 'Ok');
    });
  }
}
