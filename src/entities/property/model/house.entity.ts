import type { Property, SewerageType, GasType, WaterType, HeatingSource } from "./types";
import { BaseProperty } from "./base-property.entity";

export class House extends BaseProperty {

  constructor(data: Property) {
    super(data);
    this.type = "house";
  }
}
