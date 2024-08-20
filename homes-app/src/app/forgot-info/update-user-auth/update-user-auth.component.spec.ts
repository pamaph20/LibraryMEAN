import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserAuthComponent } from './update-user-auth.component';

describe('UpdateUserAuthComponent', () => {
  let component: UpdateUserAuthComponent;
  let fixture: ComponentFixture<UpdateUserAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserAuthComponent]
    });
    fixture = TestBed.createComponent(UpdateUserAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
