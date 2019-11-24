import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMembersComponent } from './base-members.component';

describe('MachinesComponent', () => {
  let component: BaseMembersComponent;
  let fixture: ComponentFixture<BaseMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
