import { Component, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

declare const opcTreeview: any;  // Declare the Treeview module

@Component({
  selector: 'app-opctree',
  templateUrl: './opctree.component.html',
  styleUrls: ['./opctree.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OpctreeComponent implements AfterViewInit, OnChanges {
  @Input() data: any;  // Input to receive the tree data
  treeviewId: any;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    // Access the div with ID 'treeview'
    const treeviewDiv = this.el.nativeElement.querySelector('#treeview');

    if (treeviewDiv) {
      // Get the ID of the element
      this.treeviewId = treeviewDiv.id;
      console.log('The ID of the treeview element is:', this.treeviewId);

      if (typeof opcTreeview !== 'undefined') {
        opcTreeview.render(this.treeviewId, this.data,{});
      } else {
        console.error('opcTreeview is not defined');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].isFirstChange()) {
      if (typeof opcTreeview !== 'undefined') {
        console.log('Tree data has changed:', this.data);
        opcTreeview.render(this.treeviewId, this.data,{});
      } else {
        console.error('opcTreeview is not defined');
      }
    }
  }
}
