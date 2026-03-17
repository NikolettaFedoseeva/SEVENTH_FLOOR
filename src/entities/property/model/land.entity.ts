import type { Property, LandType, RoadType } from "./types";
import { BaseProperty } from "./base-property.entity";

export class Land extends BaseProperty {

  constructor(data: Property) {
    super(data);
    this.type = "land";
  }
}
