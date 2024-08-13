/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusSystemComponent } from './statusSystem.component';

describe('StatusSystemComponent', () => {
  let component: StatusSystemComponent;
  let fixture: ComponentFixture<StatusSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
