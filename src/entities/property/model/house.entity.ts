import type { Property, SewerageType, GasType, WaterType, HeatingSource } from "./types";
import { BaseProperty } from "./base-property.entity";

export class House extends BaseProperty {
  landArea?: number;
  sewerage?: SewerageType;
  gas?: GasType;
  water?: WaterType[];
  electricity?: boolean;
  heatingSources?: HeatingSource[];
  hasBuildings?: boolean;

  constructor(data: Property) {
    super(data);
    this.type = "house";
    this.landArea = data.landArea;
    this.sewerage = data.sewerage;
    this.gas = data.gas;
    this.water = data.water;
    this.electricity = data.electricity;
    this.heatingSources = data.heatingSources;
    this.hasBuildings = data.hasBuildings;
  }
}
