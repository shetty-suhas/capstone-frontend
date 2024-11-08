import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcardsComponent } from './eventcards.component';

describe('EventcardsComponent', () => {
  let component: EventcardsComponent;
  let fixture: ComponentFixture<EventcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventcardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
