import { Action } from '@ngrx/store';

import { Post } from '../posts.model';

export const ADD_POST = 'ADD_POST';

export class CreatePost implements Action {
  readonly type = ADD_POST;
  constructor(public payload: Post) {}
}

export type PostsActions = CreatePost;
