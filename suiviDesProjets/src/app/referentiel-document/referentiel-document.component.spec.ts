import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentielDocumentComponent } from './referentiel-document.component';

describe('ReferentielDocumentComponent', () => {
  let component: ReferentielDocumentComponent;
  let fixture: ComponentFixture<ReferentielDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferentielDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferentielDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
