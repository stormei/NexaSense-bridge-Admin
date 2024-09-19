/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MtctreeComponent } from './mtctree.component';

describe('MtctreeComponent', () => {
  let component: MtctreeComponent;
  let fixture: ComponentFixture<MtctreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtctreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtctreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
