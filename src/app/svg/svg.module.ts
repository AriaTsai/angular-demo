import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { SvgComponent } from './svg.component';
import { SvgTreeComponent } from './svg-tree/svg-tree.component';
import { SharedCommonModule } from '../shared/shared-common/shared-common.module';


@NgModule({
  declarations: [
    SvgComponent,
    SvgTreeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    SharedCommonModule,
    NgxGraphModule,
  ],
  exports: [
    SvgComponent,
  ]
})
export class SvgModule { }
