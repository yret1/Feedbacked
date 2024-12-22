import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';

@Component({
  selector: 'app-clientoverviewmodal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientoverviewmodal.component.html',
  styleUrls: ['./clientoverviewmodal.component.scss'],
})
export class ClientoverviewmodalComponent {
  @Input() status!: string;
  @Input() client!: string;
  @Input() issues!: string;
  @Input() email!: string;
  @Input() clientId!: string;
  @Input() issueId!: string;
  @Input() image?: string = undefined;

  constructor(private router: Router, private auth: AuthService) {}

  onSelect() {
    this.auth.setCurrentClient(this.clientId);

    setTimeout(() => {
      this.router.navigate(['/user/projects/client']);
    }, 100);
  }
}
