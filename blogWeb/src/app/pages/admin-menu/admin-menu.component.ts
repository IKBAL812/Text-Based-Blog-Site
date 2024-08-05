import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from '../../service/jwt.service';

//admin menu that lists all the users
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent {
  allUsers: any;
  email!: String
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'delete'];//columns of the list
  userData: any;

  constructor(private adminService: AdminService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    const jwtToken = this.cookieService.get('jwt');
    if (!jwtToken) {
      this.router.navigateByUrl('/login')
      this.matSnackBar.open("You need to be logged in as admin to access this!", "Ok")
    }
    const decodedToken: any = jwtDecode(jwtToken);
    this.email = decodedToken.sub;
    this.jwtService.getUserByEmail(this.email).subscribe(res => {
      this.userData = res;
      if (this.userData.role !== "admin") {
        this.router.navigateByUrl('/view-all')
        this.matSnackBar.open("You need to be logged in as admin to access this!", "Ok")
      }
    })
    this.getAllUsers();
  }


  //getting all the user data
  getAllUsers() {
    this.adminService.getAllUsers().subscribe(res => {
      this.allUsers = res;
    }, error => {
      if (error.status === 403) {

      } else {
        console.error("Error: ", error)
        this.matSnackBar.open("No user found!", "Ok")
      }

    })
  }


  //opening dialog for adding new admin
  addAdmin() {

    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '500px',
      height: '600px',// Increase the height of the dialog
    });
  }

  //opening dialog for deleting a user
  deleteUser(userId: number) {

    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '300px',
      height: '200px',// Increase the height of the dialog
      data: { userId: userId }
    });
  }
}
