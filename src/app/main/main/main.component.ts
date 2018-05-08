import { Component, OnInit } from '@angular/core';
import { WallaserviceService } from './services/wallaservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private wallaSrv: WallaserviceService) { }

  ngOnInit() {
    this.wallaSrv.getDatas().subscribe(data => {
      console.log(data);
    });
  }

}
