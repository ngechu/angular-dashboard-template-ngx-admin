import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by"
      >Company name<b><a href="#" target="_blank"> &copy; Copyright</a></b>
      2021</span
    >
  `,
})
export class FooterComponent {}
