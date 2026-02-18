import { ref, reactive } from "vue";
import type { Property } from "@/entities/property/model/types";
import { usePropertiesStore } from "@/entities/property";

export function useCreateProperty() {
  const isLoading = ref(false);
  const success = ref(false);
  const form = reactive<Omit<Property, "id">>({
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
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const session = usePropertiesStore();
      session.addProperty(form);
      console.log("Created property:", { ...form });

      success.value = true;
      // Reset form
      form.title = "";
      form.address = "";
      form.price = 0;
      form.imageUrl = "";
      form.description = "";
      form.area = 0;
      form.rooms = 1;
      form.type = "apartment";
    } finally {
      isLoading.value = false;
    }
  };

  return { form, errors, isLoading, success, createProperty };
}
