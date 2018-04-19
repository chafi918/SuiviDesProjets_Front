import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureMarcheComponent } from './nature-marche.component';

describe('NatureMarcheComponent', () => {
  let component: NatureMarcheComponent;
  let fixture: ComponentFixture<NatureMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatureMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
