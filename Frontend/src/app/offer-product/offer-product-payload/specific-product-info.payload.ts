import { BasicInfoPayload } from "./basic-info.payload";
import { DescriptionPayload } from "./description.payload";

export interface SpecificProductInfoPayload {
  basicInfo: BasicInfoPayload;
  description: DescriptionPayload;
  images: Array<any>;
}
