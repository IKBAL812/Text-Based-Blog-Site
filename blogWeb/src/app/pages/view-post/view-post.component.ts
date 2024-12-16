import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {

  postId = this.activatedRoute.snapshot.params['id'];
  postData: any;
  userData: any;
  email!: string;

  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private jwtService: JwtService) { }

  ngOnInit() {
    this.userData = {
      id: " ",
      role: " "
    }
    this.getPostById();
    this.checkToken();
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(res => {
      this.postData = res;
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok")
    })
  }

  getUserByEmail() {
    this.jwtService.getUserByEmail(this.email).subscribe(res => {
      this.userData = res;
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok")
    });
  }

  //open the dialog for deleting a post
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      width: '300px',
      height: '200px',// Increase the height of the dialog
      data: { postId: this.postId }
    });
  }

  checkToken() {
    const jwtToken = this.cookieService.get('jwt');
    if (!jwtToken) {
      return;
    }

    try {
      const decodedToken: any = jwtDecode(jwtToken);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        // Token expired
        return;
      } else {
        this.email = decodedToken.sub; // Extract email from token
        this.getUserByEmail();
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return;
    }
  }

}