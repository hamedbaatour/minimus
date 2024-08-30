import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToSetupComponent } from './how-to-setup.component';

describe('HowToSetupComponent', () => {
  let component: HowToSetupComponent;
  let fixture: ComponentFixture<HowToSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
