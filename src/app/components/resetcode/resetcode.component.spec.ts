import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetcodeComponent } from './resetcode.component';

describe('ResetcodeComponent', () => {
  let component: ResetcodeComponent;
  let fixture: ComponentFixture<ResetcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetcodeComponent]
    });
    fixture = TestBed.createComponent(ResetcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
