import { Component, OnInit} from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data;
  diffData:boolean;
  dataCopy = {};
  allLcd = [];
  lcdFirst:string = "TVSF2WYXTKAR7RAF";
  lcdSecond:string = "TVSF2WYUE4PWNJKM";
  lcdFirstImage:string = "https://rukminim1.flixcart.com/image/1000/1000/jefzonk0/television/r/a/f/mi-l43m5-ai-original-imaf34hgjzc4xr62.jpeg?q=100";
  lcdSecondImage:string = "https://rukminim1.flixcart.com/image/1000/1000/jefzonk0/television/j/k/m/mi-l32m5-ai-original-imaf34hfqb2fekxx.jpeg?q=100"
  constructor(private products: ProductService){}

  getAllProducts = () => {
    this.products.getAllProducts()
    .subscribe(
      res => {
        // console.log(res);
        // this.AllLcd=res.products.compareSummary.titles;
        let tvName = this.lcdFirst
        console.log(res['products'].featuresList[0].features[0].values["TVSF2WYXTKAR7RAF"]);
        this.data=res;
        // this.dataCopy = res;
        let temp={};
        this.allLcd = [];
        for(let key in res['products'].compareSummary.titles){
          // console.log(key);

          temp = {};
          temp['name'] = key;
          temp['subtitle'] = res['products'].compareSummary.titles[key].subtitle;
          temp['title'] = res['products'].compareSummary.titles[key].title;
          this.allLcd.push(temp);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getImage() {
    let lcdFirst  = this.lcdFirst;
    let lcdSecond = this.lcdSecond;
    if(this.lcdFirst != this.lcdSecond) {
      this.lcdFirstImage = this.data.products.compareSummary.images[lcdFirst];
      this.lcdSecondImage = this.data.products.compareSummary.images[lcdSecond];
      this.diffData = false;
    }else {
      alert("Please select different one");
    }

  }
  getDiffData() {
    // let tempData = [];
    let lcdFirst  = this.lcdFirst;
    let lcdSecond = this.lcdSecond;
    this.getAllProducts();
    if(this.diffData){
      this.dataCopy = Object.assign({}, this.data);
      for(let i=0; i<this.dataCopy['products'].featuresList.length; i++) {
        console.log(this.dataCopy['products'].featuresList[i].features.length);
        for(let j=0; j<this.dataCopy['products'].featuresList[i].features.length; j++){
          if(this.dataCopy['products'].featuresList[i].features[j].values[lcdFirst] === this.data.products.featuresList[i].features[j].values[lcdSecond]){
            delete this.dataCopy['products'].featuresList[i].features[j].values[lcdFirst];
            delete this.dataCopy['products'].featuresList[i].features[j].values[lcdSecond];
          }
        }
      }
      console.log(this.data);
    }
  }

  ngOnInit() {
    this.getAllProducts();

  }
}
