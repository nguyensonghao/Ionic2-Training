import { Component, Input } from '@angular/core';

@Component({
  selector: 'rate',
  templateUrl: 'rate.html'
})

export class RateComponent {
  @Input() rate: number;
  public listRate: Array<Object>;

  constructor() {
    this.listRate = [];
  }

  ngOnInit () {
    for (var i = 0; i < 5; i++) {
      if (i < this.rate) {
        this.listRate.push({status: true});
      } else {
        this.listRate.push({status: false});
      }
    }
  }

}
