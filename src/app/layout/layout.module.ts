import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';

const routes = [
  {
    path: '',
    component: LayoutComponent
  }
];


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule
  ]
})
export class LayoutModule { }
