import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLeftComponent } from './shared-left.component';

describe('SharedLeftComponent', () => {
  let component: SharedLeftComponent;
  let fixture: ComponentFixture<SharedLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
