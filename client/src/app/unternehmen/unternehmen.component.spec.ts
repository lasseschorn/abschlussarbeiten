import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnternehmenComponent } from './unternehmen.component';

describe('UnternehmenComponent', () => {
  let component: UnternehmenComponent;
  let fixture: ComponentFixture<UnternehmenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnternehmenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnternehmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
