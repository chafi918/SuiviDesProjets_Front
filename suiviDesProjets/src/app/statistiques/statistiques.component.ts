import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { isNullOrUndefined } from 'util';
import { StatistiquesService } from '../../services/statistiques.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  myChart: any;
  critere: string;
  labels: Array<string>;
  data: any;
  label: string = 'statistiques de ' + (isNullOrUndefined(this.critere) ? 'tout !' : this.critere);

  constructor(public statService: StatistiquesService) { }

  ngOnInit() {
    this.statService.getStatistiques(this.critere)
      .subscribe(
        data => {
          console.log(data.statMap);
          this.labels = Object.keys(data.statMap);
          this.data = Object.values(data.statMap);
          this.initializeChart();
        },
        err => { console.log(err); })
  }

  getRandomColor() {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  }

  getBackgroundColors() {
    let resultColors = [];
    let n = this.data.length;
    for (let index = 0; index < n; index++) {
      resultColors.push(this.getRandomColor());
    }
    console.log(resultColors);
    return resultColors;
  }

  initializeChart() {
    var colors = this.getBackgroundColors();
    var ctx = document.getElementById('myChart');
    this.myChart = new Chart(ctx, {
      type: 'doughnut', //same type just change the value: bars, pie, ...
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: this.data,
          backgroundColor:
            colors,
          borderColor:
            colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
        }
      }
    });
  }
  showCritere() {
    this.label = 'statistiques de ' + this.critere;
    this.myChart=null;
    this.ngOnInit()
    console.log(this.critere);
  }
}
