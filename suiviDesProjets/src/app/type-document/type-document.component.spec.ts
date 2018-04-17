import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocumentComponent } from './type-document.component';

describe('TypeDocumentComponent', () => {
  let component: TypeDocumentComponent;
  let fixture: ComponentFixture<TypeDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
