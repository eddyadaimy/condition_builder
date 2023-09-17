import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveNewConditionComponent } from './save-new-condition.component';

describe('SaveNewConditionComponent', () => {
  let component: SaveNewConditionComponent;
  let fixture: ComponentFixture<SaveNewConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveNewConditionComponent]
    });
    fixture = TestBed.createComponent(SaveNewConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
