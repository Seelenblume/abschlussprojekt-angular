import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInUserProfileComponent } from './logged-in-user-profile.component';

describe('LoggedInUserProfileComponent', () => {
  let component: LoggedInUserProfileComponent;
  let fixture: ComponentFixture<LoggedInUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedInUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
