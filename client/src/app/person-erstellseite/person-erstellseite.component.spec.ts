import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonErstellseiteComponent } from './person-erstellseite.component';

describe('PersonErstellseiteComponent', () => {
  let component: PersonErstellseiteComponent;
  let fixture: ComponentFixture<PersonErstellseiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonErstellseiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonErstellseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
