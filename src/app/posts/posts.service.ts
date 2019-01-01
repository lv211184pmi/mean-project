import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Post } from './posts.model';

@Injectable()

export class PostsService {
  public posts: Post[] = [];
  public postsUpdated = new Subject<Post[]>();

  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  getUpdatedPostsListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http
      .get<{_id: string, title: string, content: string}>(`${environment.host}/api/posts/${id}`);
  }

  getPosts() {
    this.http
      .get<{message: string; posts: any}>(`${environment.host}/api/posts`)
      .pipe(
        map((postsData) => {
          return postsData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(posts => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  addPost(post: Post) {
    this.http
    .post<{message: string, postId: string}>(`${environment.host}/api/posts`, post)
    .subscribe(data => {
        const id = data.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  editPost(updatedPost: Post) {
    this.http.put(`${environment.host}/api/posts/${updatedPost.id}`, updatedPost)
      .subscribe(() => {
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(`${environment.host}/api/posts/${postId}`)
      .subscribe(() => {
        const upsatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = upsatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
