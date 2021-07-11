import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutComponent } from './layout.component';
import { SvgModule } from '../svg/svg.module';

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
    SharedMaterialModule,
    FlexLayoutModule,
    SvgModule
  ]
})
export class LayoutModule { }
