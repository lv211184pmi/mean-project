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
  isLoaded = false;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.isLoaded = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.postsUpdated
      .subscribe(newPosts => {
        this.isLoaded = false;
        this.posts = newPosts;
      });
  }

  deletePost(postId) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
