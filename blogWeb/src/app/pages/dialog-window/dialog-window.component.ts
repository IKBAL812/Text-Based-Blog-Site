import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrl: './dialog-window.component.scss'
})

export class DialogWindowComponent {
  postId = this.data.postId;

  constructor(private postService: PostService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  deletePost() {
    this.postService.deletePostById(this.postId).subscribe(
      (res) => {
        this.matSnackBar.open('Post Deleted Successfully!', 'Ok');
        this.router.navigateByUrl('/view-all');
      },
      (error) => {
        this.matSnackBar.open('Something went wrong!', 'Ok');
      }
    );
  }


}
