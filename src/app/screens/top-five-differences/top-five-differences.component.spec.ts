import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveDifferencesComponent } from './top-five-differences.component';

describe('TopFiveDifferencesComponent', () => {
  let component: TopFiveDifferencesComponent;
  let fixture: ComponentFixture<TopFiveDifferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFiveDifferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiveDifferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
