import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
import { TagTableComponent } from '../../../shared/components/TagTable/TagTable.component'; // Import your TagTable component

@Component({
  selector: 'app-settingsOpc',
  templateUrl: './settingsOpc.component.html',
  styleUrls: ['./settingsOpc.component.css']
})
export class SettingsOpcComponent implements OnInit {

  opcUrl: string = '';
  username: string = '';
  password: string = '';
  enableOpcConnector: boolean = false;
  fetchingOpcTags : boolean = false;
  isModalOpen: boolean = false;  // Flag to control modal visibility
  isAlertVisible: boolean = false; // Flag to control alert visibility
  isDeleteModalOpen: boolean = false; // Flag to control delete modal visibility
  isAddTagModalOpen: boolean = false; // Flag to control add tag modal visibility
  tags: string[] = [];
  tagsArray: any[] = []; 
  tree: any[] = [];
  newTag: string = '';  // New property to store the tag to be added
  config: any = {};
  alertText: string = '';
  alertType: string = 'success'; //Can be sucess , warning , error( Se Vmware Clarity for details)
  @ViewChild(TagTableComponent) tagTableComponent!: TagTableComponent;

  constructor(private app: ApplicationService, private router: Router) {}

  ngOnInit() {
    if(!this.app.authenticated) {
      this.router.navigate(['/login', {}]);
    }
    this.init();
  }

  async submit() {
    this.isModalOpen = true;
  }

  async confirmSubmit() {
    try {
      this.isModalOpen = false;
      this.isAlertVisible = true;
      setTimeout(() => this.isAlertVisible = false, 3000);
      const res = await this.app.updateOpcConfig(this.opcUrl,this.username,this.password,this.enableOpcConnector);
      console.log(res);
    }
    catch(e){
      console.log(e);
    }
  }

  cancelSubmit() {
    this.isModalOpen = false;
  }

  async init() {
    await this.getData();
    await this.getTags();
  }

  async getData() {
    this.config = await this.app.getOpcConfig();
    this.opcUrl = this.config.opcUaUrl;
    this.username = this.config.opcUsername;
    this.password = this.config.opcPassword;
    this.enableOpcConnector = this.config.enableOPCUA;
  }

  async getTags() {
    try {
      const data = await this.app.getOpcStatus();
      this.tagsArray = await this.app.getOpcData();

      console.log(this.tagsArray);
      console.log(data);
      this.tags = data.tags || [];
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  async pushTags() {
    try {
      const jsonObject = { $tags: this.tags };
      const success = await this.app.publishSharedAttributes(jsonObject);
      
      this.showAlert(
        success ? 'success' : 'warning',
        success ? 'Tags saved to TB successfully' : 'Error!!! Something went wrong (see log for details)'
      );
  
    } catch (error) {
      console.error('Error pushing data', error);
    }
  }
  
  // Helper method for showing alerts
  private showAlert(alertType: string, alertText: string) {
    this.alertType = alertType;
    this.alertText = alertText;
    this.isAlertVisible = true;
    
    // Hide the alert after 3 seconds
    setTimeout(() => this.isAlertVisible = false, 3000);
  }

  async browseOpcUaServer() {
    this.fetchingOpcTags = true;
    this.tree = await this.app.getOpcTree();
    this.fetchingOpcTags = false;
  }

  activeTags(): number {
    return this.tagsArray.length;
  }

  // New methods for delete confirmation
  showDeleteConfirmation() {
    this.isDeleteModalOpen = true;
  }

  confirmDelete() {
    try {
      this.tagTableComponent.deleteMarkedTags(); // Call the method on the TagTableComponent
      this.isDeleteModalOpen = false;
    } catch (e) {
      console.log(e);
    }
  }

  cancelDelete() {
    this.isDeleteModalOpen = false;
  }

  // New methods for add tag functionality
  showAddTagModal() {
    this.isAddTagModalOpen = true;
  }

  async confirmAddTag() {
    if (this.newTag.trim()) {
      //this.tagsArray.push(this.newTag.trim()); // Add the new tag to the tags array
      //await this.getTags();
      console.log(this.config);
      this.config.tags.push(this.newTag.trim());
      console.log(this.config);
      try {
        const res = await this.app.postTagsToServer(this.config.tags);
        this.getTags();
        console.log('tags added...hihaaa!!!');
      }
      catch(e) {
        console.log(e);
      }
      this.newTag = ''; // Reset the input field
      this.isAddTagModalOpen = false; // Close the modal
    }
    this.isAddTagModalOpen = false; // Close the modal
  }

  cancelAddTag() {
    this.newTag = ''; // Reset the input field
    this.isAddTagModalOpen = false; // Close the modal
  }
}
