import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSourceComponent } from './student-source.component';

describe('StudentSourceComponent', () => {
  let component: StudentSourceComponent;
  let fixture: ComponentFixture<StudentSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
