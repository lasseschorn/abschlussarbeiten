import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbschlussarbeitComponent } from './abschlussarbeit.component';

describe('AbschlussarbeitComponent', () => {
  let component: AbschlussarbeitComponent;
  let fixture: ComponentFixture<AbschlussarbeitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbschlussarbeitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbschlussarbeitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
