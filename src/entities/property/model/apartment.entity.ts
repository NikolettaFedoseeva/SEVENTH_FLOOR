import type { Property, WallMaterial, PositionInBuilding, ApartmentSeries } from "./types";
import { BaseProperty } from "./base-property.entity";

export class Apartment extends BaseProperty {
  wallMaterial?: WallMaterial;
  positionInBuilding?: PositionInBuilding;
  apartmentSeries?: ApartmentSeries;

  constructor(data: Property) {
    super(data);
    this.type = "apartment";
    this.wallMaterial = data.wallMaterial;
    this.positionInBuilding = data.positionInBuilding;
    this.apartmentSeries = data.apartmentSeries;
  }
}
