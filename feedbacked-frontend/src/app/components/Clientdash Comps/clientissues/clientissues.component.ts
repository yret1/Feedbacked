import { Component, Input, OnInit } from '@angular/core';
import {
  ClientsInterface,
  FeedbackInterface,
} from '../../../interfaces/Clientsinterface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clientissues',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './clientissues.component.html',
  styleUrl: './clientissues.component.scss',
})
export class ClientissuesComponent implements OnInit {
  @Input() issue!: FeedbackInterface;
  @Input() clientId!: string;
  link = '';

  ngOnInit(): void {
    this.link = `issue/${this.issue.id}/${this.clientId}`;
  }
}
