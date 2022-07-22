import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalParams {

  
  // baseUrl = 'http://41.215.130.247:6160/';
  // miliki dev
  // baseUrl = 'http://41.215.130.247:31001/';
  // baseUrl = ' https://backend-dev-miliki.k8s.tracom.co.ke:2020/';  
// miliki qa
  // baseUrl = 'http://41.215.130.247:31004/';
  // baseUrl =  'https://backend-qa-miliki.k8s.tracom.co.ke:2020/';

  baseUrl = 'https://api.efd.lra.gov.lr/'

  // uat
  // baseUrl = 'https://backend-uat-miliki.k8s.tracom.co.ke:2020/';

}
