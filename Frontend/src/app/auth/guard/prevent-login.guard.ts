import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Alert } from "src/app/common/alert";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class PreventLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.authService.isLoggedIn();
    if (isAuthenticated) {
      Alert.warningAlert("You're already Logged in :)");
      this.router.navigate(["/home"]);
      return false;
    }

    return true;
  }
}
