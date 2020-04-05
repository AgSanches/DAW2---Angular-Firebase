import { Injectable } from '@angular/core';
import {Sneaker} from "../model/Sneaker";
import {BehaviorSubject, Observable} from "rxjs";
import {fromArray} from "rxjs/internal/observable/fromArray";

@Injectable({
  providedIn: 'root'
})
export class SneakersService {

  sneakers: Array<Sneaker>;
  sneakerBehaviour : BehaviorSubject<Array<Sneaker>> = new BehaviorSubject<Array<Sneaker>>(this.sneakers);
  sneakerObservable: Observable<Array<Sneaker>> = this.sneakerBehaviour.asObservable();

  constructor() {

    this.sneakers = [
      new Sneaker(1, "Air Jordan 1 - Bred Toe", "https://sneakernews.com/wp-content/uploads/2019/08/jordan-1-satin-black-toe-store-list-0.jpg", "", ""),
      new Sneaker(2, "Air Jordan 1 - Travis Scott", "https://preview.redd.it/okznlvtdtxq41.jpg?width=640&crop=smart&auto=webp&s=cd84dc7ee313fbf04422982d137a3cc586a488a1", "", ""),
      new Sneaker(3, "Nike Off White", "https://preview.redd.it/klui0g36gwq41.jpg?width=640&crop=smart&auto=webp&s=aee6d5953124ba7cbe1894485e92cd3cc65aafdb", "", ""),
      new Sneaker(4, "Air Max 90 - Off White", "https://preview.redd.it/59pdvsyu5wq41.jpg?width=640&crop=smart&auto=webp&s=8759182ea92fe448fad9ebd7e6e8c1cdbca4072f", "", ""),
      new Sneaker(5, "Nike Dunks", "https://preview.redd.it/dbzm5tqcsxq41.jpg?width=640&crop=smart&auto=webp&s=9d50863a6afe54b7bd81fb15975b98f4bf6b5a25", "", ""),
      new Sneaker(6, "Adidas Yeezy 700", "https://external-preview.redd.it/tjpJNC_YQHR4ls-iHtASMKOCaoCesGTVfQ6Hfqy_O_c.jpg?width=640&crop=smart&auto=webp&s=f5918c2b10a902f27dbf5720b117c6e387651ff4", "", ""),
      new Sneaker(7, "Air Jordan 1 - Bred Toe", "https://sneakernews.com/wp-content/uploads/2019/08/jordan-1-satin-black-toe-store-list-0.jpg", "", ""),
      new Sneaker(8, "Air Jordan 1 - Bred Toe", "https://sneakernews.com/wp-content/uploads/2019/08/jordan-1-satin-black-toe-store-list-0.jpg", "", ""),
    ];

    this.sneakerBehaviour.next(this.sneakers);

  }

  getSneakers(): Observable<Array<Sneaker>> {
    return this.sneakerObservable;
  }

}
