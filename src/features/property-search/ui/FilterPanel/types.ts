export interface FilterState {
  search: string;
  // Region now supports tree structure checks
  // We can store selected "districts" or "cities".
  // Simplified: store selected leaf nodes (districts) or cities if they have no districts.
  // For this specific requirement: we have Regions -> Cities -> Districts.
  // Let's store a list of all selected values for simplicity in filtering.
  locations: string[]; // "Тирасполь", "Бородинка", "Бендеры", "Центр"...

  adTypes: string[];
  withPhotos: boolean;
  verified: boolean;
  rentPeriod: string[];
  rooms: string[];
  heating: string[];
  minArea: string;
  maxArea: string;
  minFloor: string;
  maxFloor: string;
  buildingType: string[];
  buildingStatus: string[];
  parking: string[];
  minPrice: string;
  maxPrice: string;
  currency: "mdl" | "usd" | "eur";
}

export interface LocationNode {
  label: string;
  value: string;
  children?: LocationNode[];
  isOpen?: boolean; // For UI toggle
}
