import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFinishModalComponent } from './test-finish-modal.component';

describe('TestFinishModalComponent', () => {
  let component: TestFinishModalComponent;
  let fixture: ComponentFixture<TestFinishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFinishModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestFinishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
