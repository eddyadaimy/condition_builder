import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionFormComponent } from './condition-form.component';

describe('ConditionFormComponent', () => {
  let component: ConditionFormComponent;
  let fixture: ComponentFixture<ConditionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionFormComponent]
    });
    fixture = TestBed.createComponent(ConditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
