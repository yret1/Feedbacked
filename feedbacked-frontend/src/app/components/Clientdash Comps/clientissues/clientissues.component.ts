import { Component, Input, OnInit } from '@angular/core';
import {
  ClientsInterface,
  FeedbackInterface,
} from '../../../interfaces/Clientsinterface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientissues',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientissues.component.html',
  styleUrl: './clientissues.component.scss',
})
export class ClientissuesComponent implements OnInit {
  @Input() issue!: FeedbackInterface;

  datestring = '';

  link = '';

  ngOnInit(): void {
    this.link = `issue/${this.issue.id}`;

    this.datestring = new Date(this.issue.created_at).toDateString();
  }
}
