import { Component, Input } from '@angular/core';
import {
  ClientsInterface,
  FeedbackInterface,
} from '../../../interfaces/Clientsinterface';

@Component({
  selector: 'app-clientissues',
  standalone: true,
  imports: [],
  templateUrl: './clientissues.component.html',
  styleUrl: './clientissues.component.scss',
})
export class ClientissuesComponent {
  @Input() issue!: FeedbackInterface;

  datestring = '';

  dateFixer() {
    if (this.issue !== undefined) {
      let date = new Date(this.issue.created_at);
      this.datestring = date.toDateString();
    }
  }

  ngOnChanges(changes: any) {
    this.dateFixer();
  }
}
