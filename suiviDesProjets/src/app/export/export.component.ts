import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { PDFExportModule, PDFExportComponent } from '@progress/kendo-angular-pdf-export';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  @Input('type') type:string;
  @Input() pdf:any;
  @Input() titre:string;
  test:string='test';
  constructor() { }

  ngOnInit() {
    console.log("export pour: " + this.type);
    console.log("export titre: " + this.titre);

  }

  exportFile(pdf){
    pdf.allPages = true;
    pdf.avoidLinks = true;
    pdf.paperSize = "A4";
    pdf.margin = { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" };
    pdf.landscape= true;
    pdf.scale = 0.8;
    console.log(pdf)
    
    pdf.saveAs("projets-par-" + this.titre+".pdf")
  }
}
