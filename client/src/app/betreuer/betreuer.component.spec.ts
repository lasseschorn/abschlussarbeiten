import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetreuerComponent } from './betreuer.component';

describe('BetreuerComponent', () => {
  let component: BetreuerComponent;
  let fixture: ComponentFixture<BetreuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetreuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetreuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
