import { Component, OnInit,OnDestroy, HostListener } from '@angular/core';
import { LoadingType } from 'ng-devui';
import { StewardService } from '../../../shared/services/steward.service';
import { ToasterService } from '../../../shared/services/toaster.service';
import { Manufacturers } from '../../../shared/wrappers/login';
import { saveAs } from 'file-saver';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'view-personal-info',
  templateUrl: './view-personal-info.component.html',
  styleUrls: ['./view-personal-info.component.scss']
})
export class ViewPersonalInfoComponent implements OnInit, OnDestroy {
  user:any;
  registrationDetails:any;
  subscription: any;
  manufacturer:Manufacturers;

  inputParameters_alias:any;
  inputParameters_value:any;
  report_id:any;

  loading1: LoadingType;
    showLoading = false;
  constructor(private stewardService: StewardService<any, any>,private toaster: ToasterService) {
    this.loading1 = undefined;
   }

  ngOnInit() {
    const username = localStorage.getItem('username');
    this.user = username;
    this.showLoading = true;
     // Get manufacturer details
    this.stewardService.post('app/rest/v2/services/miliki_UserParentService/getUserInfo',{
      "type": "manufacturer"
      }).subscribe((response) => {

      if (response) {
        this.showLoading = false;
        this.registrationDetails = response;
        // console.log('====================================',response.manufacturer.phone);
       
        this.inputParameters_value = response.manufacturer.id;
    } else {
      this.showLoading = false;
      this.toaster.showWarnToast('top-right', 'warning','Server Connection Lost.',3000);
        
    }
  });

  // Get All Reports
  this.stewardService.get('app/rest/reports/v1/report').subscribe((response) => {

    if (response) {
     
      this.showLoading = false;
     
      for (const element of response) {
        
        if (element.code === "MANUCERT" ) {
          this.report_id = element.id;
          // console.log('>>>>>>>>>>>>>>>>>the element ',element.id);
          // console.log('>>>>>>>>>>>>>>>>>this.report ',this.report_id);
          // get report by id 
          this.stewardService.get(`app/rest/reports/v1/report/${element.id}`).subscribe((response) => {
      
            if (response) {
              this.showLoading = false;
              this.inputParameters_alias = response.inputParameters[0].alias;
          } else {
            this.showLoading = false;
            this.toaster.showWarnToast('top-right', 'warning','Server Connection Lost.',3000);
              
          }
        });

     

        // console.log('>>>>>>>>>>>>>>>>>this.report  outside',this.report_id);
  

        }
      }
      


  } else {
    this.showLoading = false;
    this.toaster.showWarnToast('top-right', 'warning','Server Connection Lost.',3000);
      
  }
});





  }

  downloadReport(){
       // Run report (Generate Report)
       this.stewardService.postPdf(`app/rest/reports/v1/run/${this.report_id}`,{"parameters":[
        {"value":this.inputParameters_value,"name":"e"}]}
        ).subscribe((response) => {
      
        if (response) {
          this.showLoading = false;
          // const keys = response.headers.keys();
          // console.log('Content-Disposition<<<<<< ',response.headers.get('Content-Disposition'));
          // console.log('content-type>>> ',response.headers.get('content-type'));
          // console.log('body size>>> ',response.body.size);
          // console.log('Response ',response);
          let matches = /filename=\"?([^;"]+)\"?;?/g.exec(response.headers.get('Content-Disposition'));
          // console.log('matches ',matches[1]);
      
          let filedata = new Blob([response.body], { type: response.headers.get('content-type') });
          let filename = matches[1];
          saveAs(filedata, filename);
      
          
      } else {
        this.showLoading = false;
        this.toaster.showWarnToast('top-right', 'warning','No file to Download',3000);
          
      }
      });
              //
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
