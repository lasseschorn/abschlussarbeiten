import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailseiteComponent } from './detailseite.component';

describe('DetailseiteComponent', () => {
  let component: DetailseiteComponent;
  let fixture: ComponentFixture<DetailseiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailseiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
