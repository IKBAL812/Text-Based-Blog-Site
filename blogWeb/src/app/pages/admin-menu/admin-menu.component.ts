import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent {
  allUsers: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'delete'];

  constructor(private adminService: AdminService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

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
  addAdmin() {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '500px',
      height: '600px',// Increase the height of the dialog
    });
  }

  deleteUser(userId: number) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '300px',
      height: '200px',// Increase the height of the dialog
      data: { userId: userId }
    });
  }
}
