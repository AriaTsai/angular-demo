import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { SvgComponent } from './svg.component';
import { SvgTreeComponent } from './svg-tree/svg-tree.component';
import { SharedCommonModule } from '../shared/shared-common/shared-common.module';
import { SvgRectComponent } from './svg-tree/svg-rect/svg-rect.component';
import { SvgCircleComponent } from './svg-tree/svg-circle/svg-circle.component';


@NgModule({
  declarations: [
    SvgComponent,
    SvgTreeComponent,
    SvgRectComponent,
    SvgCircleComponent
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
