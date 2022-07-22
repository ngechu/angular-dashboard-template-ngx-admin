import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {UtilModule} from '../util/util.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CsvModule } from '@ctrl/ngx-csv';
// import { InboxComponent } from './inbox/inbox.component';
// import { InboxRoutingModule } from './inbox-routing.module';
// import { InboxViewComponent } from './inbox-view/inbox-view.component';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbActionsModule, NbButtonModule, NbTabsetModule, NbUserModule, NbRadioModule, NbSelectModule, NbListModule, NbLayoutModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';
import { DevUIModule } from 'ng-devui';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AngularMaterialModule } from '../../material';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ViewPersonalInfoComponent } from './view-personal-info/view-personal-info.component';

@NgModule({
    declarations: [ProfileComponent, ViewPersonalInfoComponent],
    imports: [
      CommonModule,
     
      ProfileRoutingModule,
      FormsModule,
      NgxDatatableModule,
      CsvModule,
      ReactiveFormsModule,

      ThemeModule,
   
      Ng2SmartTableModule,
      NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,
      AngularMaterialModule,
      NbActionsModule,
      NbButtonModule,
      NbCardModule,
      NbTabsetModule,
      NbUserModule,
      NbRadioModule,
      NbSelectModule,
      NbListModule,
      NbIconModule,
      NbLayoutModule,
      NbSpinnerModule,
      NbTooltipModule,
      DevUIModule,
      
    ]
  })
  export class ProfileModule { }