import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-screen.component.html',
  styleUrl: './device-screen.component.scss',
})
export class DeviceScreenComponent implements OnInit {
  @Input() image!: string;
  @Input() type!: string;

  imageAspectRatio: number = 16 / 9;

  ngOnInit() {
    this.loadImage();
  }

  private loadImage() {
    const img = new Image();
    img.onload = () => {
      this.imageAspectRatio = img.naturalWidth / img.naturalHeight;
    };
    img.src = this.image;
  }
}
