import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';



import { CardsComponent } from './cards/cards.component';
// import { AddDoantionsComponent } from '../donations/add-doantions/add-doantions.component';
// import { AddVolunteersComponent } from '../volunteers/add-volunteers/add-volunteers.component';
import { ChartsModule ,ThemeService} from 'ng2-charts';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
 
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartsModule
   
  
  ],
  declarations: [
    ECommerceComponent,
    CardsComponent,
   
  ],
  // entryComponents: [AddVolunteersComponent],
  providers: [
    ThemeService,
  ],
  
})
export class ECommerceModule { }
