/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OpctreeComponent } from './opctree.component';

describe('OpctreeComponent', () => {
  let component: OpctreeComponent;
  let fixture: ComponentFixture<OpctreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpctreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpctreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
