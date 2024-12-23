import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeaturedProductsComponent } from './admin-featured-products.component';

describe('AdminFeaturedProductsComponent', () => {
  let component: AdminFeaturedProductsComponent;
  let fixture: ComponentFixture<AdminFeaturedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFeaturedProductsComponent]
    });
    fixture = TestBed.createComponent(AdminFeaturedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
