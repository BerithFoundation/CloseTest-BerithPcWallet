import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockAccountComponent } from './lock-account.component';

describe('LockAccountComponent', () => {
  let component: LockAccountComponent;
  let fixture: ComponentFixture<LockAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
