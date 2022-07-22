export class Device{
    modelType:string;
    price:number;
    name:string;
    description:string;
    weight:number;
    yearOfManufacture:number;
    manufacturerId:string;
    checklist:Array<any>;
    questionId:string;
    answer:boolean;
    comment:string;
    modelTypeId:any;
  }

  export class Inbox{
    processInstanceId:any;
    taskIdany:any;
    incomingVariables:any;
    outcome:any;
  }