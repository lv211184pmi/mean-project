import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import * as fromPosts from '../store/post.reducer';
import * as postsActions from '../store/posts.actions';

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
    private store: Store<fromPosts.PostsState>
  ) { }

  ngOnInit() {
    this.postsForm = this.fb.group({
      postTitle: ['', [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      postContent: ['', Validators.minLength(5)]
    });
  }

  addPost(form: FormGroup, formDirective) {
    this.store.dispatch(
      new postsActions.CreatePost(
        {
          title: form.value.postTitle,
          content: form.value.postContent
        }
      ));
      formDirective.resetForm();
      this.postsForm.reset();
    }
}
