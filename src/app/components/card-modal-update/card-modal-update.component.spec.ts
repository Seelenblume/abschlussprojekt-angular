import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModalUpdateComponent } from './card-modal-update.component';

describe('CardModalUpdateComponent', () => {
  let component: CardModalUpdateComponent;
  let fixture: ComponentFixture<CardModalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModalUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardModalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
