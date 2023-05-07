import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferProductComponent } from './offer-product.component';

describe('OfferProductComponent', () => {
  let component: OfferProductComponent;
  let fixture: ComponentFixture<OfferProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
