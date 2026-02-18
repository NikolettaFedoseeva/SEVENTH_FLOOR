import { defineStore } from "pinia";
import { ref } from "vue";
import type { Property } from "./types";
import { supabase } from "@/shared/api/supabase";
import { Apartment, House, Commercial, Land } from "./property.entity";

// Helper to map DB snake_case to Entity camelCase
const mapDbToEntity = (data: any): Property => {
  const baseData = {
    id: data.id,
    title: data.title,
    address: data.address,
    district: data.district,
    price: parseFloat(data.price), // Numeric returns as string from PG
    imageUrl: data.image_url,
    area: parseFloat(data.area),
    rooms: data.rooms,
    type: data.type,
    description: data.description,
    rentPeriod: data.rent_period,
    floor: data.floor,
    totalFloors: data.total_floors,
    heating: data.heating,
    buildingType: data.building_type,
    buildingStatus: data.building_status,
    parking: data.parking,
    source: data.source,
    verified: data.verified,
    currency: data.currency,
    images: data.images,
    videoUrl: data.video_url,
    city: data.city,
    houseNumber: data.house_number,
    livingArea: data.living_area ? parseFloat(data.living_area) : undefined,
    kitchenArea: data.kitchen_area ? parseFloat(data.kitchen_area) : undefined,
    ceilingHeight: data.ceiling_height ? parseFloat(data.ceiling_height) : undefined,
    layout: data.layout,
    bathroom: data.bathroom,
    balcony: data.balcony,
    condition: data.condition,
    amenities: data.amenities,
    // Apartment
    wallMaterial: data.wall_material,
    positionInBuilding: data.position_in_building,
    apartmentSeries: data.apartment_series,
    // House
    landArea: data.land_area ? parseFloat(data.land_area) : undefined,
    sewerage: data.sewerage,
    gas: data.gas,
    water: data.water,
    electricity: data.electricity,
    heatingSources: data.heating_sources,
    hasBuildings: data.has_buildings,
    // Commercial
    commercialTypes: data.commercial_types,
    // Land
    landType: data.land_type,
    roadType: data.road_type,
  };

  // Instantiate proper class
  switch (data.type) {
    case "apartment":
      return new Apartment(baseData as Property);
    case "house":
      return new House(baseData as Property);
    case "commercial":
      return new Commercial(baseData as Property);
    case "land":
      return new Land(baseData as Property);
    default:
        // Fallback for unknown types or base properties
      return baseData as Property; 
  }
};

export const usePropertiesStore = defineStore("properties", () => {
  const properties = ref<Property[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProperties = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: err } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;

      if (data) {
        properties.value = data.map(mapDbToEntity);
      }
    } catch (err: any) {
      console.error("Error fetching properties:", err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addProperty = async (property: Omit<Property, "id">) => {
    loading.value = true;
    error.value = null;
    try {
        // Map camelCase to snake_case for DB
        const dbData = {
            title: property.title,
            address: property.address,
            district: property.district,
            price: property.price,
            image_url: property.imageUrl,
            area: property.area,
            rooms: property.rooms,
            type: property.type,
            description: property.description,
            rent_period: property.rentPeriod,
            floor: property.floor,
            total_floors: property.totalFloors,
            heating: property.heating,
            building_type: property.buildingType,
            building_status: property.buildingStatus,
            parking: property.parking,
            source: property.source,
            verified: property.verified,
            currency: property.currency,
            images: property.images,
            video_url: property.videoUrl,
            city: property.city,
            house_number: property.houseNumber,
            living_area: property.livingArea,
            kitchen_area: property.kitchenArea,
            ceiling_height: property.ceilingHeight,
            layout: property.layout,
            bathroom: property.bathroom,
            balcony: property.balcony,
            condition: property.condition,
            amenities: property.amenities,
            // Apartment
            wall_material: (property as any).wallMaterial,
            position_in_building: (property as any).positionInBuilding,
            apartment_series: (property as any).apartmentSeries,
            // House
            land_area: (property as any).landArea,
            sewerage: (property as any).sewerage,
            gas: (property as any).gas,
            water: (property as any).water,
            electricity: (property as any).electricity,
            heating_sources: (property as any).heatingSources,
            has_buildings: (property as any).hasBuildings,
            // Commercial
            commercial_types: (property as any).commercialTypes,
            // Land
            land_type: (property as any).landType,
            road_type: (property as any).roadType,
        };

      const { data, error: err } = await supabase
        .from("properties")
        .insert(dbData)
        .select()
        .single();

      if (err) throw err;

      if (data) {
        properties.value.unshift(mapDbToEntity(data));
      }
    } catch (err: any) {
      console.error("Error adding property:", err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchPropertyById = async (id: string | number) => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: err } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (err) throw err;

      if (data) {
        const entity = mapDbToEntity(data);
        // Update or add to local state
        const index = properties.value.findIndex((p) => String(p.id) === String(id));
        if (index !== -1) {
          properties.value[index] = entity;
        } else {
          properties.value.push(entity);
        }
        return entity;
      }
    } catch (err: any) {
      console.error("Error fetching property by id:", err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const updateProperty = async (id: string | number, property: Partial<Omit<Property, "id">>) => {
    loading.value = true;
    error.value = null;
    try {
        // Map camelCase to snake_case for DB
        const dbData: any = {};
        if (property.title !== undefined) dbData.title = property.title;
        if (property.address !== undefined) dbData.address = property.address;
        if (property.district !== undefined) dbData.district = property.district;
        if (property.price !== undefined) dbData.price = property.price;
        if (property.imageUrl !== undefined) dbData.image_url = property.imageUrl;
        if (property.area !== undefined) dbData.area = property.area;
        if (property.rooms !== undefined) dbData.rooms = property.rooms;
        if (property.type !== undefined) dbData.type = property.type;
        if (property.description !== undefined) dbData.description = property.description;
        if (property.rentPeriod !== undefined) dbData.rent_period = property.rentPeriod;
        if (property.floor !== undefined) dbData.floor = property.floor;
        if (property.totalFloors !== undefined) dbData.total_floors = property.totalFloors;
        if (property.heating !== undefined) dbData.heating = property.heating;
        if (property.buildingType !== undefined) dbData.building_type = property.buildingType;
        if (property.buildingStatus !== undefined) dbData.building_status = property.buildingStatus;
        if (property.parking !== undefined) dbData.parking = property.parking;
        if (property.source !== undefined) dbData.source = property.source;
        if (property.verified !== undefined) dbData.verified = property.verified;
        if (property.currency !== undefined) dbData.currency = property.currency;
        if (property.images !== undefined) dbData.images = property.images;
        if (property.videoUrl !== undefined) dbData.video_url = property.videoUrl;
        if (property.city !== undefined) dbData.city = property.city;
        if (property.houseNumber !== undefined) dbData.house_number = property.houseNumber;
        if (property.livingArea !== undefined) dbData.living_area = property.livingArea;
        if (property.kitchenArea !== undefined) dbData.kitchen_area = property.kitchenArea;
        if (property.ceilingHeight !== undefined) dbData.ceiling_height = property.ceilingHeight;
        if (property.layout !== undefined) dbData.layout = property.layout;
        if (property.bathroom !== undefined) dbData.bathroom = property.bathroom;
        if (property.balcony !== undefined) dbData.balcony = property.balcony;
        if (property.condition !== undefined) dbData.condition = property.condition;
        if (property.amenities !== undefined) dbData.amenities = property.amenities;
        
        // Apartment
        if ((property as any).wallMaterial !== undefined) dbData.wall_material = (property as any).wallMaterial;
        if ((property as any).positionInBuilding !== undefined) dbData.position_in_building = (property as any).positionInBuilding;
        if ((property as any).apartmentSeries !== undefined) dbData.apartment_series = (property as any).apartmentSeries;
        
        // House
        if ((property as any).landArea !== undefined) dbData.land_area = (property as any).landArea;
        if ((property as any).sewerage !== undefined) dbData.sewerage = (property as any).sewerage;
        if ((property as any).gas !== undefined) dbData.gas = (property as any).gas;
        if ((property as any).water !== undefined) dbData.water = (property as any).water;
        if ((property as any).electricity !== undefined) dbData.electricity = (property as any).electricity;
        if ((property as any).heatingSources !== undefined) dbData.heating_sources = (property as any).heatingSources;
        if ((property as any).hasBuildings !== undefined) dbData.has_buildings = (property as any).hasBuildings;
        
        // Commercial
        if ((property as any).commercialTypes !== undefined) dbData.commercial_types = (property as any).commercialTypes;
        
        // Land
        if ((property as any).landType !== undefined) dbData.land_type = (property as any).landType;
        if ((property as any).roadType !== undefined) dbData.road_type = (property as any).roadType;

      const { data, error: err } = await supabase
        .from("properties")
        .update(dbData)
        .eq("id", id)
        .select()
        .single();

      if (err) throw err;

      if (data) {
        const entity = mapDbToEntity(data);
        const index = properties.value.findIndex((p) => String(p.id) === String(id));
        if (index !== -1) {
          properties.value[index] = entity;
        }
      }
    } catch (err: any) {
      console.error("Error updating property:", err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteProperty = async (id: string | number) => {
    // Optimistic update (optional, but let's wait for confirmation for safety)
    loading.value = true;
    error.value = null;
    try {
      const { error: err } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);

      if (err) throw err;

      // Remove from local state
      properties.value = properties.value.filter((p) => String(p.id) !== String(id));
    } catch (err: any) {
      console.error("Error deleting property:", err);
      error.value = "Ошибка при удалении: " + err.message;
      throw err; // Re-throw to handle in UI
    } finally {
      loading.value = false;
    }
  };

  return { properties, loading, error, fetchProperties, addProperty, fetchPropertyById, updateProperty, deleteProperty };
});
