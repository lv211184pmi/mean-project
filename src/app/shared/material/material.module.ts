import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';

const material = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...material
  ],
  exports: [...material]
})

export class MaterialModule { }
