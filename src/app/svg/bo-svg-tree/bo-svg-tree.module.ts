import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoCommonModule } from '@shared/bo-common.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { BoSvgTreeComponent } from './bo-svg-tree.component';


@NgModule({
  declarations: [
    BoSvgTreeComponent,
  ],
  imports: [
    CommonModule,
    BoCommonModule,
    NgxGraphModule
  ],
  exports: [
    BoSvgTreeComponent
  ]
})
export class BoSvgTreeModule { }
