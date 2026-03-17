import type { Property, CommercialType } from "./types";
import { BaseProperty } from "./base-property.entity";

export class Commercial extends BaseProperty {

  constructor(data: Property) {
    super(data);
    // commercialTypes handled by super(data) now
  }
}
