import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardHomeComponent } from './reward-home.component';

describe('RewardHomeComponent', () => {
  let component: RewardHomeComponent;
  let fixture: ComponentFixture<RewardHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
