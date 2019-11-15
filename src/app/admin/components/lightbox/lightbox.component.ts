import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent {
  name = 'Angular';
  album: any = [];
  constructor(private _lightbox: Lightbox) {

    this.album.push({ 'src': 'https://via.placeholder.com/500', 'caption': 'Imag1', 'thumb': 'https://via.placeholder.com/150' });

    this.album.push({ 'src': 'https://via.placeholder.com/500', 'caption': 'Imag1', 'thumb': 'https://via.placeholder.com/150' });

    this.album.push({ 'src': 'https://via.placeholder.com/500', 'caption': 'Imag1', 'thumb': 'https://via.placeholder.com/150' });



  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
