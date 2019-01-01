import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from './../posts.service';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  isLoaded = false;
  postTitle = '';
  postContent = '';
  postsForm: FormGroup;
  private mode = 'create';
  private postId: string;
  public post: Post = {id: '', title: '', content: ''};
  public imagePreview: string;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.isLoaded = true;
          this.postsService.getPost(this.postId)
            .subscribe(postData => {
              this.isLoaded = false;
              this.postsForm.patchValue({
                title: postData.title,
                content: postData.content
              });
            });
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  initForm() {
    this.postsForm = this.fb.group({
      title: [null, [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      content: [null, Validators.minLength(5)],
      image: [null, Validators.required]
    });
  }

  addPost(form: FormGroup, formDirective) {
    this.isLoaded = true;
    const post = Object.assign({}, form.value);
    this.postsService.addPost(post);
    formDirective.resetForm();
  }

  editPost(form: FormGroup, formDirective) {
    this.isLoaded = true;
    const post = Object.assign({id: this.postId}, form.value);
    this.postsService.editPost(post);
    formDirective.resetForm();
  }

  // image picker function
  onImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postsForm.patchValue({ image: file });
    this.postsForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
