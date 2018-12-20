import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheComponent } from './branche.component';

describe('BrancheComponent', () => {
  let component: BrancheComponent;
  let fixture: ComponentFixture<BrancheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrancheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
