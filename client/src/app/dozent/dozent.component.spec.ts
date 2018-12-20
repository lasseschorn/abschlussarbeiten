import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DozentComponent } from './dozent.component';

describe('DozentComponent', () => {
  let component: DozentComponent;
  let fixture: ComponentFixture<DozentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DozentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DozentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
