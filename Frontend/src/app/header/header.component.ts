import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/service/auth.service";
import { SearchService } from "../home/search.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private searchService: SearchService) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onSearchInput(term: string) {
    this.searchService.setSearchTerm(term);
  }


}
