import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstellSeiteComponent } from './erstell-seite.component';

describe('ErstellSeiteComponent', () => {
  let component: ErstellSeiteComponent;
  let fixture: ComponentFixture<ErstellSeiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstellSeiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstellSeiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
