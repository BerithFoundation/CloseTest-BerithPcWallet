import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBottomComponent } from './shared-bottom.component';

describe('SharedBottomComponent', () => {
  let component: SharedBottomComponent;
  let fixture: ComponentFixture<SharedBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
