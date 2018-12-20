import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechtsformComponent } from './rechtsform.component';

describe('RechtsformComponent', () => {
  let component: RechtsformComponent;
  let fixture: ComponentFixture<RechtsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechtsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechtsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
