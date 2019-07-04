import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTopComponent } from './shared-top.component';

describe('SharedTopComponent', () => {
  let component: SharedTopComponent;
  let fixture: ComponentFixture<SharedTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
