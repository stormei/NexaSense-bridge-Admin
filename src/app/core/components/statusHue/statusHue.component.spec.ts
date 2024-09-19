/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusHueComponent } from './statusHue.component';

describe('StatusHueComponent', () => {
  let component: StatusHueComponent;
  let fixture: ComponentFixture<StatusHueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusHueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusHueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
