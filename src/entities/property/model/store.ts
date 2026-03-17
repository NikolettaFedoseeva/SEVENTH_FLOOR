import { defineStore } from "pinia";
import { ref } from "vue";
import type { Property } from "./types";
import { apiClient } from "@/shared/api";
import { Apartment, House, Commercial, Land } from "./property.entity";

// Helper to map DB snake_case to Entity camelCase
const mapDbToEntity = (data: any): Property => {
  const isPresent = (val: any) => val !== null && val !== undefined;
  
  const baseData: any = {
    id: data.id,
    title: data.title,
    address: data.address,
    district: data.district,
    price: parseFloat(data.price),
    imageUrl: data.image_url,
    area: parseFloat(data.area),
    rooms: isPresent(data.rooms) ? String(data.rooms) : undefined,
    type: data.type,
    description: data.description,
    rentPeriod: data.rent_period,
    floor: isPresent(data.floor) ? String(data.floor) : undefined,
    totalFloors: isPresent(data.total_floors) ? String(data.total_floors) : undefined,
    heating: data.heating,
    buildingType: data.building_type,
    buildingStatus: data.building_status,
    parking: data.parking,
    source: data.source,
    verified: Boolean(data.verified),
    currency: data.currency,
    images: data.images || [],
    videoUrl: data.video_url,
    city: data.city,
    houseNumber: data.house_number,
    livingArea: isPresent(data.living_area) ? parseFloat(data.living_area) : undefined,
    kitchenArea: isPresent(data.kitchen_area) ? parseFloat(data.kitchen_area) : undefined,
    ceilingHeight: isPresent(data.ceiling_height) ? parseFloat(data.ceiling_height) : undefined,
    layout: data.layout,
    roomType: data.room_type,
    bathroom: data.bathroom,
    balcony: isPresent(data.balcony) ? String(data.balcony) : undefined,
    condition: data.condition,
    amenities: data.amenities || [],
    constructionType: data.construction_type,
    isRemove: Boolean(data.is_remove),
    // Apartment
    wallMaterial: data.wall_material,
    positionInBuilding: data.position_in_building,
    apartmentSeries: data.apartment_series,
    // House
    landArea: isPresent(data.land_area) ? parseFloat(data.land_area) : undefined,
    sewerage: data.sewerage,
    gas: data.gas,
    water: data.water || [],
    electricity: Boolean(data.electricity),
    heatingSources: data.heating_sources || [],
    hasBuildings: isPresent(data.has_buildings) ? String(data.has_buildings) : undefined,
    // Commercial
    commercialTypes: data.commercial_types || [],
    // Land
    landType: data.land_type,
    roadType: data.road_type || [],
  };

  // Instantiate proper class
  const propertyType = baseData.type as string;
  switch (propertyType) {
    case "apartment":
    case "room":
      return new Apartment(baseData as Property);
    case "house":
    case "dacha":
      return new House(baseData as Property);
    case "land":
      return new Land(baseData as Property);
    case "garage":
    case "commercial":
      return new Commercial(baseData as Property);
    default:
      if (propertyType?.startsWith("commercial")) {
        return new Commercial(baseData as Property);
      }
      return baseData as Property;
  }
};

export const usePropertiesStore = defineStore("properties", () => {
  const properties = ref<Property[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProperties = async (includeRemoved = false) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiClient.get('/properties', {
        params: { includeRemoved }
      });
      properties.value = response.data.map(mapDbToEntity);
    } catch (err: any) {
      console.error("Error fetching properties:", err);
      error.value = err.response?.data?.error || err.message;
    } finally {
      loading.value = false;
    }
  };

  const addProperty = async (property: any, files: { image_url?: File, images?: File[], video?: File, main_image_index?: number } = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      
      // Append fields
      Object.keys(property).forEach(key => {
        let val = property[key];
        if (val === undefined || val === null) return;
        
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        
        if (typeof val === 'string' && val.startsWith('blob:')) return;
        
        if (Array.isArray(val)) {
          const filtered = val.filter(item => typeof item !== 'string' || !item.startsWith('blob:'));
          formData.append(snakeKey, JSON.stringify(filtered));
        } else if (typeof val === 'object') {
          formData.append(snakeKey, JSON.stringify(val));
        } else {
          formData.append(snakeKey, val);
        }
      });

      // Append files
      if (files.main_image_index !== undefined) {
        formData.append('main_image_index', files.main_image_index.toString());
      } else if (files.image_url) {
        formData.append('image_url', files.image_url);
      }

      if (files.images) {
        files.images.forEach(f => formData.append('images', f));
      }
      if (files.video) formData.append('video', files.video);

      const response = await apiClient.post('/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data) {
        properties.value.unshift(mapDbToEntity(response.data));
      }
    } catch (err: any) {
      console.error("Error adding property:", err);
      error.value = err.response?.data?.error || err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchPropertyById = async (id: string | number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiClient.get(`/properties/${id}`);
      
      if (response.data) {
        const entity = mapDbToEntity(response.data);
        properties.value = properties.value.filter(p => String(p.id) !== String(id));
        properties.value.push(entity);
        return entity;
      }
    } catch (err: any) {
      console.error("Error fetching property by id:", err);
      error.value = err.response?.data?.error || err.message;
    } finally {
      loading.value = false;
    }
  };

  const updateProperty = async (
    id: string | number,
    property: any,
    files: { image_url?: File, images?: File[], video?: File, main_image_index?: number } = {}
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      
      // Append fields
      Object.keys(property).forEach(key => {
        let val = property[key];
        if (val === undefined || val === null) return;
        
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        
        if (typeof val === 'string' && val.startsWith('blob:')) return;
        
        if (Array.isArray(val)) {
          const filtered = val.filter(item => typeof item !== 'string' || !item.startsWith('blob:'));
          formData.append(snakeKey, JSON.stringify(filtered));
        } else if (typeof val === 'object') {
          formData.append(snakeKey, JSON.stringify(val));
        } else {
          formData.append(snakeKey, val);
        }
      });

      // Append files
      if (files.main_image_index !== undefined) {
        formData.append('main_image_index', files.main_image_index.toString());
      } else if (files.image_url) {
        formData.append('image_url', files.image_url);
      }

      if (files.images) {
        files.images.forEach(f => formData.append('images', f));
      }
      if (files.video) formData.append('video', files.video);

      const response = await apiClient.put(`/properties/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data) {
        const entity = mapDbToEntity(response.data);
        const index = properties.value.findIndex(
          (p) => String(p.id) === String(id),
        );
        if (index !== -1) {
          properties.value[index] = entity;
        }
      }
    } catch (err: any) {
      console.error("Error updating property:", err);
      error.value = err.response?.data?.error || err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteProperty = async (id: string | number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiClient.patch(`/properties/${id}/delete`);
      
      if (response.data) {
        const entity = mapDbToEntity(response.data);
        const index = properties.value.findIndex(
          (p) => String(p.id) === String(id),
        );
        if (index !== -1) {
          properties.value[index] = entity;
        }
      }
    } catch (err: any) {
      console.error("Error deleting property:", err);
      error.value = "Ошибка при удалении: " + (err.response?.data?.error || err.message);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const restoreProperty = async (id: string | number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiClient.patch(`/properties/${id}/restore`);
      
      if (response.data) {
        const entity = mapDbToEntity(response.data);
        const index = properties.value.findIndex(
          (p) => String(p.id) === String(id),
        );
        if (index !== -1) {
          properties.value[index] = entity;
        }
      }
    } catch (err: any) {
      console.error("Error restoring property:", err);
      error.value = "Ошибка при восстановлении: " + (err.response?.data?.error || err.message);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    properties,
    loading,
    error,
    fetchProperties,
    addProperty,
    fetchPropertyById,
    updateProperty,
    deleteProperty,
    restoreProperty,
  };
});
