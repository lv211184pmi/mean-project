import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { PostsService } from './../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  postTitle = '';
  postContent = '';
  postsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.postsForm = this.fb.group({
      title: ['', [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      content: ['', Validators.minLength(5)]
    });
  }

  addPost(form: FormGroup, formDirective) {
    const post = Object.assign({}, form.value);
    this.postsService.addPost(post)
      .subscribe(data => {
        this.postsService.posts.push(post);
        this.postsService.postsUpdated.next([...this.postsService.posts]);
    });
    formDirective.resetForm();
  }
}
