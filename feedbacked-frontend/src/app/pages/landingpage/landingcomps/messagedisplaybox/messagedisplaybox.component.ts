import { Component } from '@angular/core';

@Component({
    selector: 'app-messagedisplaybox',
    imports: [],
    templateUrl: './messagedisplaybox.component.html',
    styleUrl: './messagedisplaybox.component.scss'
})
export class MessagedisplayboxComponent {
  messages: string[] = [
    'This button is broken.',
    'Change this letter here to a different color.',
    "I don't like the way this looks.",
    'This is too big.',
    'This is too small.',
    'This is too close to that.',
    'This is too far from that.',
    'This is too bright.',
    'This is too dark.',
    'This is too light.',
    'This is too heavy.',
    'This is too light.',
    'There is an error.',
    'Can we make this like this?',
  ];

  shuffleArray(array: string[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  array1 = this.shuffleArray(this.messages);
  array2 = this.shuffleArray(this.messages);
}
