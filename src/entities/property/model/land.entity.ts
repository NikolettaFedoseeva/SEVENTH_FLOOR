import type { Property, LandType, RoadType } from "./types";
import { BaseProperty } from "./base-property.entity";

export class Land extends BaseProperty {
  landType?: LandType;
  roadType?: RoadType[];

  constructor(data: Property) {
    super(data);
    this.type = "land";
    this.landType = data.landType;
    this.roadType = data.roadType;
  }
}
