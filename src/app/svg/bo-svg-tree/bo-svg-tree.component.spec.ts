import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoSvgTreeComponent } from './bo-svg-tree.component';

describe('BoSvgTreeComponent', () => {
  let component: BoSvgTreeComponent;
  let fixture: ComponentFixture<BoSvgTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoSvgTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoSvgTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
