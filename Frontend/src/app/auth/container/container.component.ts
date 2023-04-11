import { Component } from "@angular/core";

// ng generate component <component-name> --skipTests=true --inlineStyle=true --inlineTemplate=true

@Component({
  selector: "app-container",
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-4 col-md-7 col-sm-9">
          <div class="card">
            <div class="row">
              <div class="align-center">
                <img
                  class="logo"
                  src="/assets/panadol_logo.svg"
                  alt="Panadol logo"
                />
              </div>
              <ng-content></ng-content>
            </div>
          </div>
        </div>
        <div class="seperator"></div>
        <div class="align-center">
          &copy; <small>2023, Welcome to Panadol</small>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .logo {
        width: 170px;
        margin-top: 30px;
        margin-bottom: 25px;
      }

      .card {
        z-index: 0;
        border: none;
        position: relative;
      }
    `,
  ],
})
export class ContainerComponent {}
