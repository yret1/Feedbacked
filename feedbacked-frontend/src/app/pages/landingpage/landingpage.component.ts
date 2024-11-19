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
    { name: 'Slack', url: '/integration-icons/slack.png' },
    { name: 'Github', url: '/integration-icons/github.png' },
    { name: 'Clickup', url: '/integration-icons/clickup.png' },
    { name: 'Trello', url: '/integration-icons/trello.png' },
    { name: 'Asana', url: '/integration-icons/asana.png' },
    { name: 'Jira', url: '/integration-icons/jira.png' },
    { name: 'Notion', url: '/integration-icons/notion.png' },
    { name: 'Zapier', url: '/integration-icons/zapier.png' },
  ];
}
