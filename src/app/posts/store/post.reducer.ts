import { Action } from '@ngrx/store';

import * as PostActions from './posts.actions';
import { Post } from '../posts.model';

export interface PostsState {
  posts: State;
}

export interface State {
  posts: Post[];
}

const initialState: State = {
  posts: []
};

export function postsReducer(
  state = initialState,
  action: PostActions.PostsActions
) {
  switch (action.type) {
    case PostActions.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    default:
      return state;
  }
}
