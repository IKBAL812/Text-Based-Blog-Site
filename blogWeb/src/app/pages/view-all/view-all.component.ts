import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {

  allPosts: any;

  constructor(private postService: PostService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.getAllPosts();
  }


  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => {
      this.allPosts = res;
    }, error => {
      this.snackbar.open("No post found!", "Ok")
    })
  }

  redirect(postId: number) {
    this.router.navigateByUrl(`/view-post/${postId}`).then(() => {
      window.location.reload();
    });
  }
}
