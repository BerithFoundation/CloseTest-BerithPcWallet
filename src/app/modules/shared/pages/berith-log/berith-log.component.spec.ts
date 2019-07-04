import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BerithLogComponent } from './berith-log.component';

describe('BerithLogComponent', () => {
  let component: BerithLogComponent;
  let fixture: ComponentFixture<BerithLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BerithLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BerithLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
