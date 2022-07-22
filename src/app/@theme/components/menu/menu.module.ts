import { CommonModule } from '@angular/common';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbMenuComponent, NbMenuItemComponent } from './menu.component';
import { NbMenuService, NbMenuInternalService } from './menu.service';
import { MatBadgeModule } from '@angular/material';

const nbMenuComponents = [NbMenuComponent, NbMenuItemComponent];

const NB_MENU_PROVIDERS = [NbMenuService, NbMenuInternalService];

@NgModule({
  imports: [RouterModule, CommonModule,MatBadgeModule],
  declarations: [...nbMenuComponents],
  exports: [...nbMenuComponents],
})
export class NbMenuModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NbMenuModule,
      providers: [
        ...NB_MENU_PROVIDERS,
      ],
    };
  }
}
