import { BasicInfoPayload } from "./basic-info.payload";
import { DescriptionPayload } from "./description.payload";
import { ImagesPayload } from "./images.payload";

export interface SomeProductInfoPayload {
  basicInfo: BasicInfoPayload;
  description: DescriptionPayload;
  images: Array<any>;
}
