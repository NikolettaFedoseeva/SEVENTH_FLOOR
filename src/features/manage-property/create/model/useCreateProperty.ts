import { ref, reactive, watch, onMounted } from "vue";
import type { Property } from "@/entities/property/model/types";
import { usePropertiesStore } from "@/entities/property";
import { storeToRefs } from "pinia";

export function useCreateProperty(propertyId?: string) {
  const store = usePropertiesStore();
  const { loading, error } = storeToRefs(store);
  
  const isLoading = ref(false);
  const success = ref(false);
  const isEdit = !!propertyId;

  const form = reactive<Omit<Property, "id">>({
    // ... same as before
    title: "",
    address: "",
    price: 0,
    imageUrl: "",
    area: 0,
    rooms: 1,
    type: "apartment",
    description: "",
    // New fields
    currency: "usd",
    images: [],
    videoUrl: "",
    city: "",
    houseNumber: "",
    livingArea: 0,
    kitchenArea: 0,
    ceilingHeight: 0,
    layout: undefined,
    bathroom: undefined,
    balcony: undefined,
    condition: undefined,
    amenities: [],
    heating: "central",
    buildingType: "standard",
    buildingStatus: "delivered",
    parking: "none",
    wallMaterial: undefined,
    positionInBuilding: undefined,
    apartmentSeries: undefined,
    landArea: undefined,
    sewerage: undefined,
    gas: "main",
    water: [],
    electricity: false,
    heatingSources: [],
    commercialTypes: [],
    landType: undefined,
    roadType: [],
    hasBuildings: undefined,
  });

  const errors = reactive<Record<string, string>>({});

  // Fetch data if editing
  onMounted(async () => {
    if (isEdit && propertyId) {
        isLoading.value = true;
        const property = await store.fetchPropertyById(propertyId);
        if (property) {
            Object.assign(form, property);
            // Ensure array fields are arrays not null
            if (!form.images) form.images = [];
            if (!form.amenities) form.amenities = [];
            if (!form.water) form.water = [];
            if (!form.heatingSources) form.heatingSources = [];
            if (!form.commercialTypes) form.commercialTypes = [];
            if (!form.roadType) form.roadType = [];
        }
        isLoading.value = false;
    }
  });

  const validate = () => {
    Object.keys(errors).forEach((key) => delete errors[key]);
    let isValid = true;

    if (!form.title) {
      errors.title = "Введите название";
      isValid = false;
    }
    if (!form.address) {
      errors.address = "Введите адрес";
      isValid = false;
    }
    if (form.price <= 0) {
      errors.price = "Цена должна быть больше 0";
      isValid = false;
    }

    return isValid;
  };

  const createProperty = async () => {
    if (!validate()) return;

    isLoading.value = true;
    success.value = false;

    try {
      if (isEdit && propertyId) {
        await store.updateProperty(propertyId, form);
      } else {
        await store.addProperty(form);
      }

      if (store.error) {
        throw new Error(store.error);
      }

      success.value = true;
      
      if (!isEdit) {
          // Reset form only if creating
          form.title = "";
          form.address = "";
          form.price = 0;
          form.imageUrl = "";
          form.description = "";
      }
    } catch (e: any) {
        console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return { form, errors, isLoading, success, createProperty, isEdit };
}
