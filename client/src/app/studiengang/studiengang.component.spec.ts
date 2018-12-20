import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiengangComponent } from './studiengang.component';

describe('StudiengangComponent', () => {
  let component: StudiengangComponent;
  let fixture: ComponentFixture<StudiengangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudiengangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiengangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
