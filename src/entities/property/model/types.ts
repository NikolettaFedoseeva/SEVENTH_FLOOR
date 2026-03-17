export type PropertyType = "apartment" | "house" | "commercial" | "land" | "room" | "dacha" | "garage" | "other" | string;
export type RentPeriod = "daily" | "monthly" | "sale"; // Added "sale" for completeness
export type HeatingType =
  | "central"
  | "autonomous"
  | "autonomous_house"
  | "none";

export type HeatingSource =
  | "gas"
  | "electric"
  | "solid_fuel"
  | "liquid_fuel"
  | "solar"
  | "heat_pump"
  | "fireplace"
  | "ac";

export type CommercialType =
  | "office"
  | "retail"
  | "cafe_restaurant"
  | "industrial"
  | "warehouse"
  | "garage"
  | "other";

export type LandType =
  | "construction" // Pod stroitelstvo
  | "agricultural" // Selhoz
  | "garden"; // Sadovoe

export type RoadType = "asphalt" | "dirt";

export type BuildingType = "standard" | "historic" | "new";
export type BuildingStatus =
  | "delivered"
  | "not_delivered"
  | "under_construction";
export type ParkingType = "none" | "open" | "covered" | "garage" | "underground";

export type WallMaterial =
  | "brick"
  | "monolith"
  | "panel"
  | "limestone" // Kotelets
  | "aerated_concrete"; // Gazoblock

export type PositionInBuilding = "middle" | "corner";

export type ApartmentSeries =
  | "individual"
  | "143"
  | "102"
  | "hrushchevka"
  | "stalinka"
  | "rubashka"
  | "ms" // Moldavian Series
  | "ceshka";

export type LayoutType =
  | "separate"
  | "adjoining"
  | "studio"
  | "penthouse"
  | "loft";

export type BathroomType = "combined" | "separate" | "multiple";

export type BalconyType = "balcony" | "loggia" | "terrace" | "none";

export type ConditionType =
  | "euro"
  | "cosmetic"
  | "needs_repair"
  | "white_box"
  | "black_box";

export type SewerageType = "central" | "autonomous" | "none"; // Assuming types
export type GasType = "main" | "cylinder" | "none";
export type WaterType = "central" | "well" | "none";

export interface Property {
  id: string | number;
  title: string;
  address: string;
  district?: string; // New field for detailed location
  price: number;
  imageUrl: string;
  area: number;
  rooms: string | number;
  type: PropertyType;
  description: string;
  // New fields for advanced filtering
  rentPeriod?: RentPeriod;
  floor?: number;
  totalFloors?: number;
  heating?: HeatingType;
  buildingType?: BuildingType;
  buildingStatus?: BuildingStatus;
  parking?: ParkingType;
  source?: "internet" | "newspaper";
  verified?: boolean;
  currency?: "mdl" | "usd" | "eur";
  images?: string[];
  videoUrl?: string;
  city?: string;
  houseNumber?: string;
  livingArea?: number;
  kitchenArea?: number;
  ceilingHeight?: number;
  layout?: LayoutType;
  roomType?: string; // e.g. "separate", "adjoining"
  bathroom?: BathroomType;
  balcony?: BalconyType;
  condition?: ConditionType;
  amenities?: string[];
  isRemove?: boolean;
  // Detailed apartment fields
  wallMaterial?: WallMaterial;
  constructionType?: string;
  positionInBuilding?: PositionInBuilding;
  apartmentSeries?: ApartmentSeries;

  // House fields
  landArea?: number; // plot size in sotki/ar
  sewerage?: SewerageType;
  gas?: GasType;
  water?: WaterType[];
  electricity?: boolean;
  heatingSources?: HeatingSource[];
  commercialTypes?: CommercialType[];
  landType?: LandType;
  roadType?: RoadType[];
  hasBuildings?: boolean; // Structures on plot
}
