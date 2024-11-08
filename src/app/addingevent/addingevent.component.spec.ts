import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddingEventComponent } from './addingevent.component';
import { FormsModule } from '@angular/forms';

describe('AddingeventComponent', () => {
  let component: AddingEventComponent;
  let fixture: ComponentFixture<AddingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingEventComponent ],
      imports: [ FormsModule ]  // Import FormsModule for form handling
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form heading "Adding Event"', () => {
    const headingElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(headingElement.textContent).toContain('Adding Event');
  });

  it('should have an "X" symbol for closing the form', () => {
    const closeButton = fixture.debugElement.query(By.css('.close-btn')).nativeElement;
    expect(closeButton.textContent).toBe('X');
  });

  it('should display input fields for Event Name and Event Description', () => {
    const eventNameInput = fixture.debugElement.query(By.css('#eventName')).nativeElement;
    const eventDescriptionInput = fixture.debugElement.query(By.css('#eventDescription')).nativeElement;

    expect(eventNameInput).toBeTruthy();
    expect(eventDescriptionInput).toBeTruthy();
  });

  it('should display date and time input fields', () => {
    const startDateInput = fixture.debugElement.query(By.css('#startDate')).nativeElement;
    const endDateInput = fixture.debugElement.query(By.css('#endDate')).nativeElement;
    const startTimeInput = fixture.debugElement.query(By.css('#startTime')).nativeElement;
    const endTimeInput = fixture.debugElement.query(By.css('#endTime')).nativeElement;

    expect(startDateInput).toBeTruthy();
    expect(endDateInput).toBeTruthy();
    expect(startTimeInput).toBeTruthy();
    expect(endTimeInput).toBeTruthy();
  });

  it('should have a dropdown for Event Type', () => {
    const eventTypeSelect = fixture.debugElement.query(By.css('#eventType')).nativeElement;
    expect(eventTypeSelect).toBeTruthy();
    expect(eventTypeSelect.options.length).toBe(3);  // Check for three options
  });

  it('should have a venue search box with a search icon', () => {
    const venueInput = fixture.debugElement.query(By.css('#venue')).nativeElement;
    const searchIcon = fixture.debugElement.query(By.css('.search-icon')).nativeElement;

    expect(venueInput).toBeTruthy();
    expect(searchIcon).toBeTruthy();
  });

  it('should have a submit button', () => {
    const submitButton = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
    expect(submitButton).toBeTruthy();
  });

  it('should call closeForm() method when "X" is clicked', () => {
    spyOn(component, 'closeForm');  // Spy on the closeForm method

    const closeButton = fixture.debugElement.query(By.css('.close-btn')).nativeElement;
    closeButton.click();

    expect(component.closeForm).toHaveBeenCalled();
  });

  it('should submit the form data', () => {
    spyOn(component, 'submitForm');  // Spy on the submitForm method

    const submitButton = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
    submitButton.click();

    expect(component.submitForm).toHaveBeenCalled();
  });
});
