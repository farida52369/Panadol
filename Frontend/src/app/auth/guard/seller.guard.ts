import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Alert } from "../../common/alert";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class SellerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      Alert.warningAlert("You have to loggin first :)");
      this.router.navigate(["/login"]);
      return false;
    }

    const requiredRole = route.data["role"];
    const userRole = this.authService.getUserRole();
    console.info(`Current User Role In Seller Guard: ${userRole}`);
    if (requiredRole !== userRole) {
      Alert.warningAlert("You're already a Seller :)");
      this.router.navigate(["/home"]);
      return false;
    }

    return true;
  }
}
