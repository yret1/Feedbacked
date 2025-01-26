import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderboxComponent } from './landingcomps/headerbox/headerbox.component';
import { WwoComponent } from './landingcomps/wwo/wwo.component';
import { MessagedisplayboxComponent } from './landingcomps/messagedisplaybox/messagedisplaybox.component';
@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [
    RouterLink,
    HeaderboxComponent,
    WwoComponent,
    MessagedisplayboxComponent,
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent {
  integrations: { name: string; url: string }[] = [
    { name: 'Github', url: '/integration-icons/github.png' },
  ];
}
