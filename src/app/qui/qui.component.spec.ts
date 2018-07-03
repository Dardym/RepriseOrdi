import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiComponent } from './qui.component';

describe('QuiComponent', () => {
  let component: QuiComponent;
  let fixture: ComponentFixture<QuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
