import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  // Array of file paths to the images
  @Input() elements: Array<CarouselElement> = new Array<CarouselElement>;
}

export class CarouselElement {
  imagePath: string;
  imageAlt: string;
  captionHeading: string;
  captionSubheading: string;

  constructor(src: string, alt: string, heading: string, caption: string) {
    this.imagePath = src;
    this.imageAlt = alt;
    this.captionHeading = heading;
    this.captionSubheading = caption;
  }
}
