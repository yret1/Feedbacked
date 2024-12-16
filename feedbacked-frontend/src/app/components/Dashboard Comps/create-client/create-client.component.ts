import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackendService } from '../../../../services/backend';
import { newClientResponse } from '../../../interfaces/Backend';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss',
})
export class CreateClientComponent implements OnInit {
  createNewProject!: FormGroup;

  constructor(private backendService: BackendService) {}

  onSubmit = async () => {
    //Create new project and send user to new user page.

    const id = localStorage.getItem('userID');

    if (id) {
      const params = {
        userId: id,
        clientEmail: this.createNewProject.value.clientEmail,
        clientName: this.createNewProject.value.projectName,
        clientUrl: this.createNewProject.value.projectUrl,
      };

      const newClient = await this.backendService.addClient(params);

      if (newClient) {
      }
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
