import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  @Input() idProjet:string;
  constructor() { }

  ngOnInit() {
    console.log(this.idProjet);
  }

}
