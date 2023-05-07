import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product/product.service";
import { BasicInfoPayload } from "./offer-product-payload/basic-info.payload";
import { DescriptionPayload } from "./offer-product-payload/description.payload";
import { ImagesPayload } from "./offer-product-payload/images.payload";
import { SomeProductInfoPayload } from "./offer-product-payload/some-product-info.payload";

@Component({
  selector: 'app-offer-product',
  templateUrl: './offer-product.component.html',
  styleUrls: ['./offer-product.component.css']
})
export class OfferProductComponent implements OnInit {
  // Forms Needed
  basicInfoForm!: FormGroup;
  descriptionForm!: FormGroup;
  imagesForm!: FormGroup;
  // FormData
  formParams!: FormData;
  // Inputs for Key features
  inputsKeyFeatures: any[] = [];
  // Inputs for Images & Payload
  inputImages: ImagesPayload[] = [];
  // Steps
  step: number = 1;
  // Edit Or Not
  isEdit!: boolean;
  productId!: number;
  product!: SomeProductInfoPayload;
  // Template Image
  uploadedImage: string = "/assets/upload.svg";

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formParams = new FormData();
    this.initForms();
    this.initImages();
    this.addInput("");
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isEdit = params["isEdit"] === "true";
      if (this.isEdit) {
        this.productId = params["productId"];
        this.productService.getSpecificProduct(this.productId).subscribe({
          next: (res) => {
            this.product = res;
            console.log(this.product);
            this.settingForms();
          },
        });
      }
      // console.log(typeof this.productId + " " + this.productId);
    });
  }

  private initImages(): void {
    for (let i = 0; i < 6; i++) {
      this.inputImages.push({ value: this.uploadedImage });
    }
  }

  private initForms(): void {
    // Setting Forms
    this.basicInfoForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      inStock: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
    });

    this.descriptionForm = new FormGroup({
      description: new FormControl("", [Validators.required]),
      keyFeatures: new FormArray([]),
    });

    this.imagesForm = new FormGroup({
      image_0: new FormControl("", [Validators.required]),
      image_1: new FormControl(""),
      image_2: new FormControl(""),
      image_3: new FormControl(""),
      image_4: new FormControl(""),
      image_5: new FormControl(""),
    });
  }

  private settingForms() {
    this.basicInfoForm.setValue({
      title: this.product.basicInfo.title,
      price: this.product.basicInfo.price,
      inStock: this.product.basicInfo.inStock,
      category: this.product.basicInfo.category,
    });

    for (let i = 0; i < this.product.description.keyFeatures.length; i++) {
      const feature = this.product.description.keyFeatures[i];
      if (i === 0) {
        this.keyFeatures.at(0).setValue(feature);
      } else this.addInput(feature);
    }

    this.descriptionForm.setValue({
      description: this.product.description.description,
      keyFeatures: this.product.description.keyFeatures,
    });

    for (let i = 0; i < 6; i++) {
      const imageData = this.product.images[i];
      if (imageData) {
        this.inputImages[i].value = "data:image/jpeg;base64," + imageData;
        console.log(`Data Image: #${i}`);
      }
    }
  }

  get keyFeatures(): FormArray {
    return this.descriptionForm.get("keyFeatures") as FormArray;
  }

  addMore() {
    this.addInput("");
  }

  addInput(input: string) {
    this.inputsKeyFeatures.push({});
    this.keyFeatures.push(new FormControl(input, [Validators.required]));
  }

  removeLastAddedInput() {
    const len = this.inputsKeyFeatures.length;
    if (len > 1) {
      this.inputsKeyFeatures.pop();
      this.keyFeatures.removeAt(len - 1);
      // console.info("Length: " + this.keyFeatures.length);
    }
  }

  onFileChange_0(event: any) {
    this.onFileChange(event, 0);
  }

  onFileChange_1(event: any) {
    this.onFileChange(event, 1);
  }

  onFileChange_2(event: any) {
    this.onFileChange(event, 2);
  }

  onFileChange_3(event: any) {
    this.onFileChange(event, 3);
  }

  onFileChange_4(event: any) {
    this.onFileChange(event, 4);
  }

  onFileChange_5(event: any) {
    this.onFileChange(event, 5);
  }

  public onFileChange(event: any, index: number): void {
    // console.log(`event: ${event}`);
    const files = event.target.files;
    // console.log("Files On Change: " + files);
    this.inputImages[index].file = files[0];

    // No need for that check _ already handled ..
    // const mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //     return;
    // }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      // resder.result ---> data:image/jpeg;base64,image_bytes
      this.inputImages[index].value = reader.result;
    };
  }

  next(): void {
    if (this.step == 1) {
      if (this.basicInfoForm.invalid) return;
      this.step++;

      // Add Data: Basic Info
      const basicInfoPayload: BasicInfoPayload = {
        title: this.basicInfoForm.get("title")?.value,
        price: this.basicInfoForm.get("price")?.value,
        inStock: this.basicInfoForm.get("inStock")?.value,
        category: this.basicInfoForm.get("category")?.value,
      };

      this.formParams.append(
        "basicInfo",
        new Blob([JSON.stringify(basicInfoPayload)], {
          type: "application/json",
        })
      );
      console.log(basicInfoPayload);
    } else if (this.step == 2) {
      if (this.descriptionForm.invalid) return;
      this.step++;

      // Add Data: Description
      const keyFeaturesRes: Array<string> = [];
      for (let i = 0; i < this.inputsKeyFeatures.length; i++) {
        keyFeaturesRes.push(
          this.descriptionForm.get("keyFeatures")?.get(`${i}`)?.value
        );
      }

      const descriptionPayload: DescriptionPayload = {
        description: this.descriptionForm.get("description")?.value,
        keyFeatures: keyFeaturesRes,
      };

      this.formParams.append(
        "description",
        new Blob([JSON.stringify(descriptionPayload)], {
          type: "application/json",
        })
      );
      console.log(descriptionPayload);
    }
  }

  public endOfStory() {
    // Add Data: Images
    // Only to stop a stupid error :)
    const emptyContent = new Uint8Array([]);
    const emptyFile: File = new File([emptyContent], "empty.txt", {
      type: "text/plain",
    });

    for (let i = 0; i < this.inputImages.length; i++) {
      if (this.inputImages[i].file === undefined) continue;
      const imageFile: File = this.inputImages[i].file ?? emptyFile;
      console.log(`File #${i + 1} added!`);
      this.formParams.append(
        `images`,
        new Blob([imageFile], {
          type: "multipart/form-data",
        }),
        imageFile.name
      );
    }

    // Send to Server
    if (this.isEdit) {
      this.formParams.append(
        "productId",
        new Blob([JSON.stringify(this.productId)], {
          type: "application/json",
        })
      );
      this.editProduct();
    } else {
      this.createNewProduct();
    }
  }

  private editProduct(): void {
    this.productService.editProduct(this.formParams).subscribe({
      next: () => {
        this.router.navigate(["/home"]).then(() => {
          location.reload();
        });
      },
      error: () => {
        console.log("Error when editing product!");
      },
      complete: () => {
        console.info("Process of editing product is completed!");
      },
    });
  }

  private createNewProduct(): void {
    this.productService.createProduct(this.formParams).subscribe({
      next: () => {
        this.router.navigate(["/home"]).then(() => {
          location.reload();
        });
      },
      error: () => {
        console.log("Error when adding new product!");
      },
      complete: () => {
        console.info("Process of adding new product is completed!");
      },
    });
  }
}
