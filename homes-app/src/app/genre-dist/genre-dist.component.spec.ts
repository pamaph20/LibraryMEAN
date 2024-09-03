import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDistComponent } from './genre-dist.component';

describe('GenreDistComponent', () => {
  let component: GenreDistComponent;
  let fixture: ComponentFixture<GenreDistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreDistComponent]
    });
    fixture = TestBed.createComponent(GenreDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
