import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { Signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-homepage',
  imports: [RouterModule,Navbar,MatCardModule ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  // longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  // from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  // originally bred for hunting.`;
 


}
