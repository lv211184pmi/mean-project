import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSub: Subscription;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getUpdatedPostsListener()
      .subscribe(newPosts => {
        this.posts = newPosts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
