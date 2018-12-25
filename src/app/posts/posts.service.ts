import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Post } from './posts.model';

@Injectable()

export class PostsService {
  public posts: Post[] = [];
  public postsUpdated = new Subject<Post[]>();

  constructor (private http: HttpClient) {}

  getUpdatedPostsListener() {
    return this.postsUpdated.asObservable();
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
    return this.http.post(`${environment.host}/api/posts`, post);
  }
}
