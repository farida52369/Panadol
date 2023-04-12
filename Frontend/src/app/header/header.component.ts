import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/service/auth.service";
import { SearchService } from "../home/search.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  isSeller!: boolean;

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isSeller = this.authService.isSeller();
  }

  onSearchInput(term: string): void {
    this.searchService.setSearchTerm(term);
  }

  myProductsService(): void {
    console.log("I'm going Home!!");
    // Query Params makes URL: 
    // http://localhost:4200/home?myProducts=true
    this.router.navigate(["/home"], { queryParams: { myProducts: true } });
  }

  logOut(): void {
    // Typically clear everything
    this.authService.logout();
  }
}
