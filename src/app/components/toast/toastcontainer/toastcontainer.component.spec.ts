import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastcontainerComponent } from './toastcontainer.component';

describe('ToastcontainerComponent', () => {
  let component: ToastcontainerComponent;
  let fixture: ComponentFixture<ToastcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastcontainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
