import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

interface Tag {
  [key: string]: {
    data?: {
      value?: {
        value: string,
        dataType: string
      };
      statusCode?: { value: number };
    };
  };
}

@Component({
  selector: 'app-TagTable',
  templateUrl: './TagTable.component.html',
  styleUrls: ['./TagTable.component.css']
})
export class TagTableComponent implements OnInit, OnChanges {
  @Input() tags: Tag[] = [];
  @Input() detailedLayout: boolean = true;
  
  filteredTags: Tag[] = [];
  filterString: string = '';
  previousTagValues: { [key: string]: string } = {};  // To store previous values
  tagChangeFlags: { [key: string]: boolean } = {};    // To store if a tag has changed
  selectedTags: { [key: string]: boolean } = {};      // To store the selection state of tags
  allSelected: boolean = false;                       // To track if all tags are selected

  constructor() {}

  ngOnInit(): void {
    this.filteredTags = this.tags;
    this.initializePreviousValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tags']) {
      this.filterTags();  // Apply filter when tags input changes
      this.detectChanges();
      this.updateSelectedTags();
    }
  }

  initializePreviousValues(): void {
    this.tags.forEach(tag => {
      const tagName = this.getTagName(tag);
      this.previousTagValues[tagName] = this.getTagValue(tag);
      this.tagChangeFlags[tagName] = false;
    });
  }

  deleteMarkedTags(): void {
    this.tags = this.tags.filter(tag => {
      const tagName = this.getTagName(tag);
      return !this.selectedTags[tagName]; // Keep only the tags that are not selected
    });
    this.filterTags(); // Reapply the filter to update the table display
    this.initializePreviousValues(); // Reinitialize previous values after deletion
    this.allSelected = false; // Reset the "select all" checkbox state
  }
  
  detectChanges(): void {
    this.filteredTags.forEach(tag => {
      const tagName = this.getTagName(tag);
      const currentValue = this.getTagValue(tag);
      const previousValue = this.previousTagValues[tagName];

      if (currentValue !== previousValue) {
        this.tagChangeFlags[tagName] = true;
        this.previousTagValues[tagName] = currentValue;
        // Reset the flag after a short duration to stop the blinking effect
        setTimeout(() => {
          this.tagChangeFlags[tagName] = false;
        }, 500);  // Adjust the duration as needed
      }
    });
  }

  setDetailedLayout(val: boolean) {
    this.detailedLayout = val;
  }
  
  isDetailedLayout(): boolean {
    return this.detailedLayout;
  }

  getStatusCodeDescription(value: number): string | undefined {
    const statusCategories: { [key: number]: string } = {
      0x00000000: 'Good',
      0x40000000: 'Uncertain',
      0x80000000: 'Bad'
    };
    return statusCategories[value];
  }

  getTagName(tag: Tag): string {
    return Object.keys(tag)[0] || 'Unknown Tag';
  }

  getTagValue(tag: Tag): string {
    const tagname = this.getTagName(tag);
    const value = tag[tagname]?.data?.value?.value;
    return value !== undefined ? value : 'N/A';
  }

  getTagStatus(tag: Tag): number {
    const tagname = this.getTagName(tag);
    return tag[tagname]?.data?.statusCode?.value ?? 0x80000000; // Default to 'Bad' if not available
  }

  getTagDataType(tag: Tag): string {
    try {
      const tagname = this.getTagName(tag);
      const dataType = tag[tagname]?.data?.value?.dataType;
      return dataType ? dataType : 'Unknown';
    } catch (e) {
      console.log(e);
      return 'Unknown';
    }
  }

  getStatusCodeIconClass(value: number): string {
    const statusCategories: { [key: number]: string } = {
      0x00000000: 'fas fa-check-circle fa-lg text-success',
      0x40000000: 'fas fa-exclamation-circle fa-lg text-warning',
      0x80000000: 'fas fa-times-circle fa-lg text-danger'
    };
    return statusCategories[value] || 'fas fa-question-circle text-secondary';
  }

  filterTags(): void {
    const lowerFilterString = this.filterString.toLowerCase();
    this.filteredTags = this.tags.filter(tag => {
      const tagName = this.getTagName(tag).toLowerCase();
      return tagName.includes(lowerFilterString);
    });
    this.updateSelectedTags();
  }

  updateSelectedTags(): void {
    this.filteredTags.forEach(tag => {
      const tagName = this.getTagName(tag);
      if (!(tagName in this.selectedTags)) {
        this.selectedTags[tagName] = false;
      }
    });
  }

  toggleAllSelection(): void {
    this.allSelected = !this.allSelected;
    this.filteredTags.forEach(tag => {
      const tagName = this.getTagName(tag);
      this.selectedTags[tagName] = this.allSelected;
    });
  }

  isTagSelected(tag: Tag): boolean {
    const tagName = this.getTagName(tag);
    return this.selectedTags[tagName];
  }

  isTagChanged(tag: Tag): boolean {
    const tagName = this.getTagName(tag);
    return this.tagChangeFlags[tagName];
  }
}
