import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { JwtService } from './service/jwt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blogWeb';
  showToolbar: boolean = true;
  isLoggedin: boolean = false;
  userData: any;
  email!: String;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private jwtService: JwtService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userData = {
      name: " ",
      role: " "
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showToolbar = !['/login', '/register'].includes(event.url);
      }
    });

    const jwtToken = this.cookieService.get('jwt');
    if (jwtToken) {
      this.isLoggedin = true;
    }

    this.checkToken();
  }


  logOut() {
    this.cookieService.deleteAll();
    this.router.navigateByUrl("/login").then(() => {
      window.location.reload();
    });
  }
  viewAll() {
    this.router.navigateByUrl("/view-all").then(() => {
      window.location.reload();
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

  getUserByEmail() {
    this.jwtService.getUserByEmail(this.email).subscribe(res => {
      this.userData = res;
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok")
    });
  }

  adminMenu() {
    this.router.navigateByUrl("/admin-menu").then(() => {
      window.location.reload();
    });
  }
}
