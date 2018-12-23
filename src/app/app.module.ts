import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './shared/material/material.module';
import { PostListComponent } from './posts/post-list/post-list.component';
import { postsReducer } from './posts/store/post.reducer';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({posts: postsReducer}),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 5
    }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
