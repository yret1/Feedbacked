import { Component } from '@angular/core';
import { ProconComponent } from '../procon/procon.component';
import { WwoInterface } from '../../../../interfaces/wwoInterface';

@Component({
    selector: 'app-wwo',
    imports: [ProconComponent],
    templateUrl: './wwo.component.html',
    styleUrl: './wwo.component.scss'
})
export class WwoComponent {
  //With and Without Feedbacked

  withFeedbacked: WwoInterface[] = [
    {
      pro: true,
      name: 'Visual feedback',
      description:
        'Get visual feedback on your website. See exactly what your clients are talking about and what they want changed.',
    },
    {
      pro: true,
      name: 'Feedback in one place',
      description:
        'No more searching for feedback in all the wrong places. Get all your feedbacks in one spot!',
    },
    {
      pro: true,
      name: 'Time saving',
      description:
        'Seemless integration to your favorite kanban tools. Handle those issues with ease!',
    },
  ];

  withoutFeedbacked: WwoInterface[] = [
    {
      pro: false,
      name: 'No visual feedback',
      description:
        'Did you recive a notification to "fix this" but you have no idea what to fix?',
    },
    {
      pro: false,
      name: 'Scattered feedback',
      description:
        'Got lost in a pile of emails, text messages or even that one word document. Only to try to understand your clients feedback?',
    },
    {
      pro: false,
      name: 'Lost time',
      description:
        'Spending countless hours copying and pasting feedback from one platform to another. Only to lose track of what you have done and what you have not?',
    },
  ];
}
