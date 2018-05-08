import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { WallaserviceService } from './services/wallaservice.service';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule
  ],
  declarations: [MainComponent],
  providers: [WallaserviceService],
  exports: [MainComponent]
})
export class MainModule { }
