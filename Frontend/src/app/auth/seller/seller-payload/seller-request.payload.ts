import { BusinessInfoPayload } from "./business-info.payload";
import { IdentityInfoPayload } from "./identity-info.payload";
import { PaymentMethodPayload } from "./payment-method.payload";

export interface SellerRequestPayload {
  businessInfo: BusinessInfoPayload;
  identityInfo: IdentityInfoPayload;
  paymentMethods: Array<PaymentMethodPayload>;
}
