import type {
  Property,
  PropertyType,
  RentPeriod,
  HeatingType,
  BuildingType,
  BuildingStatus,
  ParkingType,
  LayoutType,
  BathroomType,
  BalconyType,
  ConditionType,
} from "./types";

export abstract class BaseProperty implements Property {
  id: string | number;
  title: string;
  address: string;
  district?: string;
  price: number;
  imageUrl: string;
  area: number;
  rooms: string | number;
  type: PropertyType;
  description: string;
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
  roomType?: string;
  bathroom?: BathroomType;
  balcony?: BalconyType;
  condition?: ConditionType;
  amenities?: string[];
  constructionType?: string;
  isRemove?: boolean;

  constructor(data: Property) {
    this.id = data.id;
    this.title = data.title;
    this.address = data.address;
    this.district = data.district;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
    this.area = data.area;
    this.rooms = data.rooms;
    this.type = data.type;
    this.description = data.description;
    this.rentPeriod = data.rentPeriod;
    this.floor = data.floor;
    this.totalFloors = data.totalFloors;
    this.heating = data.heating;
    this.buildingType = data.buildingType;
    this.buildingStatus = data.buildingStatus;
    this.parking = data.parking;
    this.source = data.source;
    this.verified = data.verified;
    this.currency = data.currency;
    this.images = data.images;
    this.videoUrl = data.videoUrl;
    this.city = data.city;
    this.houseNumber = data.houseNumber;
    this.livingArea = data.livingArea;
    this.kitchenArea = data.kitchenArea;
    this.ceilingHeight = data.ceilingHeight;
    this.layout = data.layout;
    this.roomType = data.roomType;
    this.bathroom = data.bathroom;
    this.balcony = data.balcony;
    this.condition = data.condition;
    this.amenities = data.amenities;
    this.constructionType = data.constructionType;
    this.isRemove = data.isRemove;
  }
}
