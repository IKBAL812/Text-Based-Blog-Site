import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';

//dialog for deleting a post
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
    //getting the post id from the page that called this
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
        if (error.status === 200) { // Handle 201 Created as a success case since it detects it as a error
          this.matSnackBar.open('Post Deleted Successfully!', 'Ok');
          this.router.navigateByUrl('/view-all');
        }
        else {
          this.matSnackBar.open('Something went wrong!', 'Ok');
        }

      }
    );
  }


}
