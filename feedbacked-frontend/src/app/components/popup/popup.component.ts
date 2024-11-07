import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  @Input() type!: string;

  message = '';
  error: boolean = false;

  ngOnInit(): void {
    switch (this.type) {
      case 'successaddkey':
        this.message = 'Key added successfully';
        break;
      case 'erroraddkey':
        this.message = 'Error adding key';
        this.error = true;
        break;
      case 'successdeletekey':
        this.message = 'Key deleted successfully';
        break;
      case 'errordeletekey':
        this.message = 'Error deleting key';
        break;
      case 'successaddclient':
        this.message = 'Client added successfully';
        break;
      case 'erroraddclient':
        this.message = 'Error adding client';
        break;
      case 'successdeleteclient':
        this.message = 'Client deleted successfully';
        break;
      case 'errordeleteclient':
        this.message = 'Error deleting client';
        break;
      case 'successaddissue':
        this.message = 'Issue added successfully';
        break;
      case 'erroraddissue':
        this.message = 'Error adding issue';
        break;
      case 'successdeleteissue':
        this.message = 'Issue deleted successfully';
        break;
      case 'errordeleteissue':
        this.message = 'Error deleting issue';
        break;
      case 'successaddcomment':
        this.message = 'Comment added successfully';
        break;
      case 'erroraddcomment':
        this.message = 'Error adding comment';
        break;
      case 'successdeletecomment':
        this.message = 'Comment deleted successfully';
        break;
      case 'errordeletecomment':
        this.message = 'Error deleting comment';
        break;
      case 'copied':
        this.message = 'Copied to clipboard';
        this.error = false;
        break;
    }
  }
}
