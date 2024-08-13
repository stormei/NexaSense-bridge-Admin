import { Component, Input, OnInit } from '@angular/core';

interface Tag {
  [key: string]: {
    data: {
      value: {
         value: string,
         dataType: string
      };
      statusCode: { value: number };
    };
  };
}

@Component({
  selector: 'app-TagTable',
  templateUrl: './TagTable.component.html',
  styleUrls: ['./TagTable.component.css']
})
export class TagTableComponent implements OnInit {
  @Input() tags: Tag[] = [];

  constructor() {}

  ngOnInit(): void {}

  getStatusCodeDescription(value: number): string | undefined {
    const statusCategories: { [key: number]: string } = {
      0x00000000: "Good",
      0x40000000: "Uncertain",
      0x80000000: "Bad"
    };

    return statusCategories[value];
  }
  getTagName(tag: Tag): string {
    return Object.keys(tag)[0];
  }
  
  getTagValue(tag: Tag): string {
    const tagname = this.getTagName(tag);
    return tag[tagname].data.value.value;
  }
  
  getTagStatus(tag: Tag): number {
    const tagname = this.getTagName(tag);
    return tag[tagname].data.statusCode.value;
  }

  getTagDataType(tag: Tag): string {
    const tagname = this.getTagName(tag);
    return tag[tagname].data.value.dataType;
  }
  getStatusCodeIconClass(value: number): string {
    const statusCategories: { [key: number]: string } = {
      0x00000000: 'fas fa-check-circle fa-lg', // Green check for "Good"
      0x40000000: 'fas fa-exclamation-circle fa-lg', // Yellow exclamation for "Uncertain"
      0x80000000: 'fas fa-times-circle fa-lg' // Red cross for "Bad"
    };

    return statusCategories[value] || 'fas fa-question-circle text-secondary'; // Default to a question mark if no match
  }
  
}
