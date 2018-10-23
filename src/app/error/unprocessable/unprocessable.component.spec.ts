import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprocessableComponent } from './unprocessable.component';

describe('UnprocessableComponent', () => {
  let component: UnprocessableComponent;
  let fixture: ComponentFixture<UnprocessableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnprocessableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnprocessableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
