import { NgModule } from "@angular/core";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";

import { ECommerceModule } from "./e-commerce/e-commerce.module";

import { DevUIModule } from "ng-devui";
import { NbMenuModule } from "@nebular/theme";

import { ProfileModule } from "./profile/profile.module";

const PAGES_COMPONENTS = [PagesComponent];
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,

    ECommerceModule,

    DevUIModule,

    ProfileModule,
  ],
  declarations: [...PAGES_COMPONENTS],
})
export class PagesModule {}
