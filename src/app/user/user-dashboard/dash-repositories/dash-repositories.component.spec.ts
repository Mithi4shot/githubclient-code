import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRepositoriesComponent } from './dash-repositories.component';

describe('DashRepositoriesComponent', () => {
  let component: DashRepositoriesComponent;
  let fixture: ComponentFixture<DashRepositoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashRepositoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
