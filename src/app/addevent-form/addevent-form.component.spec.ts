import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventFormComponent } from './addevent-form.component';

describe('AddeventFormComponent', () => {
  let component: AddeventFormComponent;
  let fixture: ComponentFixture<AddeventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeventFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
