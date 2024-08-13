/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusOpcuaComponent } from './statusOpcua.component';

describe('StatusOpcuaComponent', () => {
  let component: StatusOpcuaComponent;
  let fixture: ComponentFixture<StatusOpcuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusOpcuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOpcuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
