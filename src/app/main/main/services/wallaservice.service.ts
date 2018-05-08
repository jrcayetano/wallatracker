import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WallaserviceService {
  // https://es.wallapop.com/rest/wall?_p=1&searchNextPage=itemsCount%3D18%26start%3D18%26bumpCollectionType%3D0%26densityType%3D0%26step%3D0%26resultsPerPage%3D18%26latitude%3D37.5262458%26longitude%3D-6.1580115
  baseUrl = '/rest/wall?_p=1&searchNextPage=';
  path = 'itemsCount%3D18%26start%3D18%26bumpCollectionType%3D0%26densityType%3D0%26step%3D0%26resultsPerPage%3D18%26latitude%3D37.5262458%26longitude%3D-6.1580115';
  elementsList: Item [] = [];
  constructor(private http: HttpClient) { }

  getDatas(): Observable<Item []> {
    return this.http.get(`${this.baseUrl}${this.path}`)
                    .pipe(map(element => this.getItems(element)));
    // .map(element => this.getItems(element));
  }

  getItems(response): Item [] {
    const list: Item [] = [];
    if (response && response.items && Array.isArray(response.items) && response.items.length > 0) {
      response.items.forEach(element => {
        list.push(this.generateItem(element));
      });
    }
    return list;
  }
  generateItem (itemResponse): Item {

    return {
      id: itemResponse.id,
      title: itemResponse.title,
      url: itemResponse.url,
      sellerUser: {
        location: {
          city:       itemResponse.sellerUser.location ? itemResponse.sellerUser.location.city : null,
          regionName: itemResponse.sellerUser.location ? itemResponse.sellerUser.location.regionName : null,
          zip:        itemResponse.sellerUser.location ? itemResponse.sellerUser.location.regionName : null
        },
      },
      currency: itemResponse.currency.currencyCode,
      description: itemResponse.description,
      image:  itemResponse.images[0].bigURL,
      price: itemResponse.price,
      reserved: itemResponse.reserved,
      sold: itemResponse.sold
    };
  }


}

interface Item {
  id: number;
  title: string;
  url: string;
  sellerUser: {
    location: {
      city: string,
      regionName: string,
      zip: string
    };
  };
  currency: string;
  description: string;
  image: string;
  price: string;
  reserved: boolean;
  sold: boolean;


}
