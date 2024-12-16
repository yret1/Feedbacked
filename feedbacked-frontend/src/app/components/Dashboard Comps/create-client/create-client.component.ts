import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackendService } from '../../../../services/backend';
import { newClientResponse } from '../../../interfaces/Backend';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss',
})
export class CreateClientComponent implements OnInit {
  createNewProject!: FormGroup;

  constructor(private backendService: BackendService, private router: Router) {}

  onSubmit = async () => {
    //Create new project and send user to new user page.

    const id = localStorage.getItem('userID');

    const clientEmail = this.createNewProject.value.clientEmail;
    const clientName = this.createNewProject.value.projectName;
    const clientUrl = this.createNewProject.value.projectUrl;
    if (id && clientEmail !== '' && clientName !== '' && clientUrl !== '') {
      const params = {
        userId: id,
        clientEmail: clientEmail,
        clientName: clientName,
        clientUrl: clientUrl,
      };

      localStorage.setItem('client', this.createNewProject.value.clientEmail);
      const newClient: any = await this.backendService.addClient(params);
      this.router.navigate(['/user/projects/client']);
    }
  };

  ngOnInit(): void {
    this.createNewProject = new FormGroup({
      clientEmail: new FormControl('', [Validators.required, Validators.email]),
      projectName: new FormControl('', [Validators.required]),
      projectUrl: new FormControl('', [Validators.required]),
    });
  }
}
