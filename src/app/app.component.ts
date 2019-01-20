import { Component, OnInit} from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data;
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
        console.log(res.products.featuresList[0].features[0].values["TVSF2WYXTKAR7RAF"]);
        this.data=res;
        let temp={};
        for(let key in res.products.compareSummary.titles){
          // console.log(key);

          temp = {};
          temp.name = key;
          temp.subtitle = res.products.compareSummary.titles[key].subtitle;
          temp.title = res.products.compareSummary.titles[key].title;
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
    this.lcdFirstImage = this.data.products.compareSummary.images[lcdFirst];
    this.lcdSecondImage = this.data.products.compareSummary.images[lcdSecond];

  }

  ngOnInit() {
    this.getAllProducts();

  }
}
