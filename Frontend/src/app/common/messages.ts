export class Messages {
  public static readonly EMAIL_NOT_FOUND =
    "<strong>There was a problem</strong><br/>We cannot find an account with that email address";
  public static readonly SERVER_ERROR =
    "<strong>There was a problem</strong><br/>Internal Serve Error";
  public static readonly INVALID_OTP =
    "<strong>There was a problem</strong><br/>Invalid OTP, please make sure from it.";
  public static readonly EMAIL_PATTERN =
    "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$";
  public static readonly PASSWORD_PATTERN =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,30}$";
  public static readonly PASSWORD_ERROR =
    "<strong>There was a problem</strong><br/>Your password is incorrect.";
  public static readonly ERROR_REGITERING_AS_SELLER =
    "Error When Registering As a Seller, Try again later!";
  public static readonly CONGRATULATE_SELLER =
    "Congratulations, You're now a Seller.";
  public static readonly ERROR_IN_PROFILE = "Error When Loading User Profile!";

  public static EMAIL_IN_USE(email: string): string {
    return `Email address <strong>${email}</strong> already in use`;
  }
}
