import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromPosts from '../store/post.reducer';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$: Post[] = [];

  constructor(
    private store: Store<fromPosts.PostsState>
  ) { }

  ngOnInit() {
    this.store.select('posts')
      .subscribe(data => {
        this.posts$ = data.posts;
      });
  }

}
