import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { ProfileComponent } from "./profile/profile.component";
import { ViewPersonalInfoComponent } from "./profile/view-personal-info/view-personal-info.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: ECommerceComponent,
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },

      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "view-personal-info",
        component: ViewPersonalInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
