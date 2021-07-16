import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
  ]
})
export class SharedMaterialModule { }
