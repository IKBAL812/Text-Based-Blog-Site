import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss'
})
export class UpdatePostComponent {
  postId = this.activatedRoute.snapshot.params['id'];
  postData: any;
  postForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private postService: PostService) { }


  ngOnInit() {

    this.postForm = this.fb.group({
      name: ["", Validators.required],
      content: ["", [Validators.required, Validators.maxLength(5000)]],
    })
    this.getPostById();
  }
  updatePost() {
    const data = {
      ...this.postForm.value,
      date: this.postData.date,
      author: this.postData.author
    }
    this.postService.updatePostById(this.postId, data).subscribe(res => {
      this.matSnackBar.open("Post Updated Succesfully!", "Ok");
      this.router.navigateByUrl(`/view-post/${this.postData.id}`)
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok")
    })
  }
  getPostById() {
    this.postService.getPostById(this.postId).subscribe(res => {
      this.postData = res;
      this.postForm.patchValue({
        name: this.postData.name,
        content: this.postData.content,
      });

    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok")
    })
  }
}
