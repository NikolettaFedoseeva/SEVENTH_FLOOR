import type { Property, CommercialType } from "./types";
import { BaseProperty } from "./base-property.entity";

export class Commercial extends BaseProperty {
  commercialTypes?: CommercialType[];

  constructor(data: Property) {
    super(data);
    this.type = "commercial";
    this.commercialTypes = data.commercialTypes;
  }
}
