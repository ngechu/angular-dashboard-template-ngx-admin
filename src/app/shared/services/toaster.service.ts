import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastrService: NbToastrService) {}

    showWarnToast(position, status,message,duration) {
        this.toastrService.show(
          status || 'warning',
          message,
          { position, status ,duration});
      }

    showSuccessToast(position, status,message,duration) {
        this.toastrService.show(
          status || 'success',
          message,
          { position, status ,duration});
      }

  
}
