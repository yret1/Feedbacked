import { Component } from '@angular/core';
import {BackendService} from "../../../../services/backend";
import {AuthService} from "../../../../services/auth";
import {UserInterface} from "../../../interfaces/UserInterface";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {



  constructor(private backendService : BackendService,private authService : AuthService) {}


  user : UserInterface | undefined
  hasSetName: boolean = false;
  agencyName: string = "Please set a name"


  onInputChange(event: any) {
    this.agencyName = event.target.value;
  }

  async runUpdate(){

    console.log("Running with name", this.agencyName)
    if(this.agencyName !== "Please set a name" && this.agencyName !== ""){

      const id = this.authService.getCurrentUserId()

      if(id && this.user){
        this.backendService.updateAgencyName(id , this.agencyName)

        this.hasSetName = true
        this.user.username = this.agencyName
      }else{
        alert("Oops something went wrong")
      }


    }
  }


  ngOnInit(): void {
    this.authService.getId().subscribe((userId) => {

      if(userId){
        this.backendService.getUser(userId).subscribe((user) => {

          if(user){
            this.user = user.user
            console.log(user.user)
            if(user.user.username){
              this.agencyName = user.user.username
              this.hasSetName = true;
            }
          }
        });
      }else{
        this.authService.logout();
      }
    });
  }

}
