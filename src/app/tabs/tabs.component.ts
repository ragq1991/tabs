import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import codebeautify from './files/codebeautify.json';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  tab = ''
  total = codebeautify.total
  data = codebeautify.data
  category = ''
  arr = [] as any
  tabActivity = new Array(4)

  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute){
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.tab = queryParam['tab'];
      }
    );
  }
  ngOnInit() {
    if (!this.tab){this.tab = '0'}
    this.getData()
  }

  getData(){
    this.tabActivity.fill('nav-link')
    this.tabActivity[Number(this.tab)] = 'nav-link active';
    switch(this.tab) {
      case '0':this.category = 'income';
        break;
      case '1':this.category = 'outcome';
        break;
      case '2':this.category = 'loan';
        break;
      case '3':this.category = 'investment';
        break;
      default:this.category = '';
    }
    if (this.category != ''){
      for (let i = 0; i < this.total; i++){
        if (this.data[i].type === this.category){
          let values = this.amountParser(this.data[i].amount)
          if (values.length === 3) {
            this.data[i].amount = this.randomFloat(values[0], values[1], values[2])
          } else {this.data[i].amount = 'err'}
          this.arr.push(this.data[i]);
        }
      }
    }
  }
  randomFloat(min:number, max:number, round:number) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return rand.toFixed(round)
  }
  amountParser(amount:any){
    let regex = /\d+/g;
    return amount.match(regex);
  }
}
