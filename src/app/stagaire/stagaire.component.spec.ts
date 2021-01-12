import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagaireComponent } from './stagaire.component';

describe('StagaireComponent', () => {
  let component: StagaireComponent;
  let fixture: ComponentFixture<StagaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
