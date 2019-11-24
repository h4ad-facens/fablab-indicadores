import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSourceComponent } from './member-source.component';

describe('MemberSourceComponent', () => {
  let component: MemberSourceComponent;
  let fixture: ComponentFixture<MemberSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
