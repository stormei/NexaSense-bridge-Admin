import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges,ViewEncapsulation} from '@angular/core';

declare const Treeview: any;  // Declare the Treeview module
@Component({
  selector: 'app-mtctree',
  templateUrl: './mtctree.component.html',
  styleUrls: ['./mtctree.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MtctreeComponent implements OnInit {

  @Input() data: any;  // Input to receive the tree data
  @Input() activeLeafs: string[] = [];  // Input to receive active leaf paths
  treeviewId:any;
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // Access the div with ID 'treeview'
    const treeviewDiv = this.el.nativeElement.querySelector('#treeview');

    if (treeviewDiv) {
      // Get the ID of the element
      this.treeviewId = treeviewDiv.id;
      console.log('The ID of the treeview element is:', this.treeviewId);
      console.log(this.data); console.log(this.activeLeafs);
   
      Treeview.render('treeview', this.data, this.activeLeafs);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data); console.log(this.activeLeafs);
    // Now you can use this element for further manipulation or rendering
    Treeview.update(this.data, this.activeLeafs);
  }

}