import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientoverviewmodal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientoverviewmodal.component.html',
  styleUrls: ['./clientoverviewmodal.component.scss'],
})
export class ClientoverviewmodalComponent {
  @Input() status: string = '';
  @Input() client: string = '';
  @Input() issues: string = '';
  @Input() email: string = '';
  @Input() userId: string = '';
  @Input() image?: string = undefined;

  constructor(private router: Router) {}

  onSelect() {
    localStorage.setItem('client', this.email);
    this.router.navigate(['/user/projects/client']);
  }
}
