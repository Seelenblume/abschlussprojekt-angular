import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCompactComponent } from './collection-compact.component';

describe('CollectionCompactComponent', () => {
  let component: CollectionCompactComponent;
  let fixture: ComponentFixture<CollectionCompactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionCompactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
