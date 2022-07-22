import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonalInfoComponent } from './view-personal-info.component';

describe('ViewPersonalInfoComponent', () => {
  let component: ViewPersonalInfoComponent;
  let fixture: ComponentFixture<ViewPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
