import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { AdminService } from '../../service/admin.service';

//dialog for deleting a user
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  userId = this.data.userId;

  constructor(private adminService: AdminService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogWindowComponent>,
    //getting user id data from the page that called this
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  deleteUser() {

    this.adminService.deleteUserById(this.userId).subscribe(
      (res) => {
        this.matSnackBar.open('User Deleted Successfully, refresh the page!', 'Ok');
      },
      (error) => {
        this.matSnackBar.open('Something went wrong!', 'Ok');
      }
    );
  }
}
//done