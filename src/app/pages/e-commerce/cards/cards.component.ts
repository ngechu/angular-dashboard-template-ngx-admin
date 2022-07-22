import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
// import { ContributionService } from '../../contributions/services/all-contributions.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
// import { AddVolunteersComponent } from '../../volunteers/add-volunteers/add-volunteers.component';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StewardService } from '../../../shared/services/steward.service';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent extends BaseComponent 
implements OnInit, OnDestroy {

  // lineChartData: ChartDataSets[] = [
  //   { data: [85, 72, 78, 75, 77, 75], label: 'Manufacturers' },
  //   { data: [95, 62, 87, 57, 99, 57], label: 'Suppliers' },
  //   { data: [98, 52, 97, 98, 88, 65], label: 'Technicians' },
  // ];

  // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  // lineChartOptions = {
  //   responsive: true,
  // };

  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,255,0,0.28)',
      
  //   },
    
  // ];

  // lineChartLegend = true;
  // lineChartPlugins = [];
  // lineChartType = 'line';

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
          gridLines: {
              display:true
          }
      }],
      yAxes: [{
          gridLines: {
              display:true
          }   
      }]
  }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    // { data: [3, 2, 3],
    //    label:"Device Class / Models",
    //    barThickness: 16,
    //   barPercentage: 0.5, }
  ];

  public colorsbar: Color[] = [
    // {
    //   backgroundColor: [
    //     '#3598DC',
    //     '#A07DA6',
    //     '#00A651',
       
    //   ]
    // }
  ];

  random_bar_graph_colours=[];

  // public clientService:ContributionService
  public dialog: MatDialog;
  totalData:any;
  bank_contributions:any;
  mpesa_contributions:any;
  totalMpesa:any;
  totalCop:any;
  total:any;
  total_donations:any;
  total_volunteers:any;
  total_conttributions:any;
  widhdrawals:any;

  dashboardcards=[];
  barchartdata_DeviceClass_models:any;
  PiechartData:any;
  databar=[];
  piechartlabels=[];
  
  
  public router: Router;

   // Doughnut
  doughnutChartLabels:string[] = [];
   public demodoughnutChartData= [];
   public doughnutChartType:string = 'doughnut';
   public chartOptions = {
    cutoutPercentage: 70
  };

   public colors: Color[] = [
    {
      backgroundColor: [
        '#F461FF',
        '#ffff00',
        '#36a2eb',
        '#00ff48',
       
        
      ]
    }
  ];
  
   // events
   public chartClicked(e:any):void {
    //  console.log(e);
   }
  
   public chartHovered(e:any):void {
    //  console.log(e);
   }

  constructor(public injector: Injector,
    private stewardService: StewardService<any, any>,
    private toaster: ToasterService,) {
   
   
    super();
    // this.clientService = this.injector.get<ContributionService>(ContributionService);
    this.router = this.injector.get<Router>(Router);
    this.dialog = injector.get(MatDialog);
  }

   /**
   * Initialize the app
   */
  ngOnInit(): void {
    this.stewardService
    .get("app/rest/v2/services/miliki_DashboardService/manufacturerDashboard")
    .subscribe((response) => {
      if (response) {

     
        
        // this.dashboardcards = response.dashboardcards
        this.barchartdata_DeviceClass_models = response.barchartdata_DeviceClass_models
        this.PiechartData = response.PiechartData

        for (const key in response.dashboardcards) {
          if (Object.prototype.hasOwnProperty.call(response.dashboardcards, key)) {
            const element = response.dashboardcards[key];
          
            // Dynamically creating properties on objects.
            let obj = {};
            obj[key] = element;
             this.dashboardcards.push(obj)
            
          }
        }
        
        // console.log('dasbord elements new>>>>+++++',this.dashboardcards);

        for (const iterator of response.PiechartData) {
          for (const property in iterator) {
            // console.log(`${property}: ${iterator[property]}`);
            if (property === 'status') {
            
              this.piechartlabels.push(iterator[property])
            }
            if (property === 'total') {
              // console.log(`${property}: ${iterator[property]}`);
              this.demodoughnutChartData.push(iterator[property]);
            }
            // let obj2 = {};
            // obj2[property] = iterator[property];
            //  this.dashboardcards.push(obj2)
            
          }
        
        }
        
        this.doughnutChartLabels = this.piechartlabels

        for (const iterator of response.barchartdata_DeviceClass_models) {
          for (const property in iterator) {
            // console.log("dude",`${property}: ${iterator[property]}`);
              this.barChartLabels.push(property)
              this.databar.push(iterator[property]);
           
          }
        
        }
   
        this.barChartData = [
          { data: this.databar,
             label:"Device Class / Models",
             barThickness: 30,
            barPercentage: 0.9, }
        ];

        for(let i=0;i<this.databar.length;i++){
          this.random_bar_graph_colours.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }

    this.colorsbar = [
      {
        backgroundColor:this.random_bar_graph_colours
      }
    ];
      
      } else {
        this.toaster.showWarnToast('top-right', 'warning',response.message,3000);
      }
    });


    // this.populateCard();
    // this.populateCard2();
    // this.populateCard3();
   
  }

  /**
   * Populate table with clients data
   */
  // populateCard(): void {
  //   this.addSubscription(
  //     this.clientService.getTotal()
  //       .subscribe(data => (
  //         // console.log('+++++++++',data.success[0]),
  //         this.totalData = data.success[0]
 
  //         )));
  // }
  // populateCard2(): void {
  //   this.addSubscription(
  //     this.clientService.getTotalCooporate()
  //       .subscribe(data => (
  //         this.totalCop = data
 
  //         )));
  // }
  // populateCard3(): void {
  //   this.addSubscription(
  //     this.clientService.getMpesa()
  //       .subscribe(data => (
  //         this.totalMpesa = data
 
  //         )));
  // }
 
  // openvolunteers() {
  //   this.router.navigate([`/pages/placeholder-conribute`]);
  // }
  // opencont() {
  //   this.router.navigate([`/pages/cont`]);
  // }
  
  // addClient() {
  //   this.openDialog(AddVolunteersComponent);
  // }

  openDialog(component: ComponentType<unknown>) {
    this.dialog.open(component, {
      disableClose: true,
      autoFocus: false,
      width: '690px',
      minHeight: '571',
      panelClass: 'dialog',
      data: { container: this },
    });
  }


  ViewOnboardedDevices(){
    this.router.navigate(['/pages/device-model-table']);
  }

  CertifiedDevices(){
    this.router.navigate(['/pages/view-certified-devices']);
  }

  ViewRequistions(){
    this.router.navigate(['/pages/view-requisition']);
  }

  ViewConsignments(){
    this.router.navigate(['/pages/view-consignments']);
  }

  ViewSuppliers(){
    this.router.navigate(['/pages/view-suppliers']);
  }
  ViewShippedDevices(){
    this.router.navigate(['/pages/view-shipped-devices']);
  }

  
  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
