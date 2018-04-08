import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamètresComponent } from './paramètres.component';

describe('ParamètresComponent', () => {
  let component: ParamètresComponent;
  let fixture: ComponentFixture<ParamètresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamètresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamètresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
