import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-popup',
    imports: [],
    templateUrl: './popup.component.html',
    styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit {
  @Input() type!: string;

  message = '';
  error: boolean = false;

  ngOnInit(): void {
    switch (this.type) {
      case 'successaddkey':
        this.message = 'Key added successfully';
        this.error = false;
        break;
      case 'erroraddkey':
        this.message = 'Error adding key';
        this.error = true;
        break;
      case 'successdeletekey':
        this.message = 'Key deleted successfully';
        this.error = false;
        break;
      case 'errordeletekey':
        this.message = 'Error deleting key';
        this.error = true;
        break;
      case 'successaddclient':
        this.message = 'Client added successfully';
        this.error = false;
        break;
      case 'erroraddclient':
        this.message = 'Error adding client';
        this.error = true;
        break;
      case 'successdeleteclient':
        this.message = 'Client deleted successfully';
        this.error = false;
        break;
      case 'errordeleteclient':
        this.message = 'Error deleting client';
        this.error = true;
        break;
      case 'successaddissue':
        this.message = 'Issue added successfully';
        this.error = false;
        break;
      case 'erroraddissue':
        this.message = 'Error adding issue';
        this.error = true;
        break;
      case 'successdeleteissue':
        this.message = 'Issue deleted successfully';
        this.error = false;
        break;
      case 'errordeleteissue':
        this.message = 'Error deleting issue';
        this.error = true;
        break;
      case 'successaddcomment':
        this.message = 'Comment added successfully';
        this.error = false;
        break;
      case 'erroraddcomment':
        this.message = 'Error adding comment';
        this.error = true;
        break;
      case 'successdeletecomment':
        this.message = 'Comment deleted successfully';
        this.error = false;
        break;
      case 'errordeletecomment':
        this.message = 'Error deleting comment';
        this.error = true;
        break;
      case 'copied':
        this.message = 'Copied to clipboard';
        this.error = false;
        break;
    }
  }
}
