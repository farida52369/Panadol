import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/service/auth.service";
import { SearchService } from "../home/search.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  searchTerm!: string;
  isLoggedIn!: boolean;
  isSeller!: boolean;

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isSeller = this.authService.isSeller();
    this.searchTerm = this.route.snapshot.queryParamMap.get("searchTerm") ?? "";
  }

  onSearchInput(term: string): void {
    this.searchService.setSearchTerm(term);
    this.navigate(term);
  }

  private navigate(term: string) {
    const allQueryParams: Params = {
      ...this.route.snapshot.queryParams,
      searchTerm: term,
    };
    if (!term && "searchTerm" in allQueryParams) {
      delete allQueryParams["searchTerm"];
      // console.log(queryParams);
    }
    this.router.navigate(["/home"], { queryParams: allQueryParams });
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
