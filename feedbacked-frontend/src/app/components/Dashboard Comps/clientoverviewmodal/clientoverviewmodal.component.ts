import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientoverviewmodal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientoverviewmodal.component.html',
  styleUrls: ['./clientoverviewmodal.component.scss'],
})
export class ClientoverviewmodalComponent implements OnChanges {
  @Input() status: string = '';
  @Input() client: string = '';
  @Input() issues: string = '';
  @Input() email: string = '';
  @Input() userId: string = '';
  @Input() image?: string = undefined;

  link: string = '';

  ngOnChanges(): void {
    if (this.email) {
      localStorage.setItem('client', this.email);
      this.link = '/user/projects/client';
    }
  }
}
