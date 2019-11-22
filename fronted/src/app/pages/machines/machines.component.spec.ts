import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMachinesComponent } from './base-machines.component';

describe('MachinesComponent', () => {
  let component: BaseMachinesComponent;
  let fixture: ComponentFixture<BaseMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
