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
    area: undefined as any,
    rooms: undefined as any,
    type: "apartment",
    description: "",
    // New fields
    currency: "usd",
    images: [],
    videoUrl: "",
    city: undefined,
    houseNumber: "",
    livingArea: undefined,
    kitchenArea: undefined,
    ceilingHeight: undefined,
    layout: undefined,
    roomType: undefined,
    constructionType: undefined,
    bathroom: undefined,
    balcony: undefined,
    condition: undefined,
    amenities: [],
    heating: undefined,
    buildingType: undefined,
    buildingStatus: undefined,
    parking: undefined,
    wallMaterial: undefined,
    positionInBuilding: undefined,
    apartmentSeries: undefined,
    landArea: undefined,
    sewerage: undefined,
    gas: undefined,
    water: [],
    electricity: false,
    heatingSources: [],
    commercialTypes: [],
    landType: undefined,
    roadType: [],
    hasBuildings: undefined,
  });

  const errors = reactive<Record<string, string>>({});
  const validationFailed = ref(false);

  const resetForm = () => {
    form.title = "";
    form.address = "";
    form.price = 0;
    form.imageUrl = "";
    form.area = undefined as any;
    form.rooms = undefined as any;
    form.type = "apartment";
    form.description = "";
    form.currency = "usd";
    form.images = [];
    form.videoUrl = "";
    form.city = undefined;
    form.houseNumber = "";
    form.livingArea = undefined;
    form.kitchenArea = undefined;
    form.ceilingHeight = undefined;
    form.layout = undefined;
    form.roomType = undefined;
    form.constructionType = undefined;
    form.bathroom = undefined;
    form.balcony = undefined;
    form.condition = undefined;
    form.amenities = [];
    form.heating = undefined;
    form.buildingType = undefined;
    form.buildingStatus = undefined;
    form.parking = undefined;
    form.wallMaterial = undefined;
    form.positionInBuilding = undefined;
    form.apartmentSeries = undefined;
    form.landArea = undefined;
    form.sewerage = undefined;
    form.gas = undefined;
    form.water = [];
    form.electricity = false;
    form.heatingSources = [];
    form.commercialTypes = [];
    form.landType = undefined;
    form.roadType = [];
    form.hasBuildings = undefined;
    
    // Clear errors
    Object.keys(errors).forEach((key) => delete errors[key]);
    validationFailed.value = false;
    success.value = false;
  };

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

  const validate = (rubric?: string) => {
    Object.keys(errors).forEach((key) => delete errors[key]);
    let isValid = true;
    validationFailed.value = false;

    if (!form.type) {
      errors.type = "Выберите тип недвижимости";
      isValid = false;
    }

    if (!form.title || form.title.length < 5) {
      errors.title = "Название должно быть не менее 5 символов";
      isValid = false;
    }

    if (!form.city) {
      errors.city = "Выберите город";
      isValid = false;
    }

    if (!form.address) {
      errors.address = "Введите адрес";
      isValid = false;
    }

    if (!form.description || form.description.length < 10) {
      errors.description = "Описание должно быть не менее 10 символов";
      isValid = false;
    }
    
    // Skip price validation for exchange
    if (rubric !== 'exchange' && form.price <= 0) {
      errors.price = "Цена должна быть больше 0";
      isValid = false;
    }

    // Skip area validation for exchange
    if (rubric === 'exchange') {
      if (form.area === undefined || form.area === null) {
        form.area = 0;
      }
    } else if (!form.area || form.area <= 0) {
      errors.area = "Укажите общую площадь";
      isValid = false;
    }

    // Media validation
    if (!form.images || form.images.length === 0) {
      errors.images = "Загрузите хотя бы одну фотографию";
      isValid = false;
    }

    // Validation for rooms
    const needsRooms = ['apartment', 'house', 'room'].includes(form.type as string);
    if (needsRooms && rubric !== 'exchange') {
      if (!form.rooms || parseInt(form.rooms as string) <= 0) {
        errors.rooms = "Укажите количество комнат";
        isValid = false;
      }
    } else {
      // For land, commercial and EXCHANGE, ensure rooms is at least 0
      if (form.rooms === undefined || form.rooms === null || form.rooms === "") {
        form.rooms = 0;
      }
    }

    // Type-specific validation - SKIP FOR EXCHANGE
    if (rubric !== 'exchange') {
      const currentType = form.type as string;
      if (currentType === 'apartment' || currentType === 'room') {
        if (!form.floor) { errors.floor = "Укажите этаж"; isValid = false; }
        if (!form.totalFloors) { errors.totalFloors = "Укажите этажность дома"; isValid = false; }
        if (!form.bathroom) { errors.bathroom = "Укажите тип санузла"; isValid = false; }
        if (!form.balcony) { errors.balcony = "Укажите наличие балкона"; isValid = false; }
        if (!form.parking) { errors.parking = "Укажите тип парковки"; isValid = false; }
        if (!form.constructionType) { errors.constructionType = "Укажите тип строения"; isValid = false; }
        if (!form.condition) { errors.condition = "Укажите состояние квартиры"; isValid = false; }
        if (!form.heating) { errors.heating = "Укажите тип отопления"; isValid = false; }
      } else if (currentType === 'house') {
        if (!form.totalFloors) { errors.totalFloors = "Укажите количество этажей"; isValid = false; }
        if (!form.condition) { errors.condition = "Укажите состояние дома"; isValid = false; }
        if (!form.bathroom) { errors.bathroom = "Укажите тип санузла"; isValid = false; }
        if (!form.heatingSources || form.heatingSources.length === 0) {
          errors.heatingSources = "Выберите хотя бы один источник отопления";
          isValid = false;
        }
      } else if (currentType === 'land') {
        if (form.hasBuildings === undefined || form.hasBuildings === null) {
          errors.hasBuildings = "Укажите наличие строений";
          isValid = false;
        }
      } else if (currentType?.startsWith('commercial')) {
        if (!form.commercialTypes || form.commercialTypes.length === 0) {
          errors.commercialTypes = "Выберите тип коммерческой недвижимости";
          isValid = false;
        }
      }
    }

    if (!isValid) {
      validationFailed.value = true;
    }

    return isValid;
  };

  const createProperty = async (files: { image_url?: File | null, images: File[], video: File | null, main_image_index?: number } = { images: [], video: null }, rubric?: string) => {
    if (!validate(rubric)) return;

    isLoading.value = true;
    success.value = false;

    try {
      const uploadFiles = {
        image_url: files.image_url || undefined,
        images: files.images,
        video: files.video || undefined
      };

      if (isEdit && propertyId) {
        await store.updateProperty(propertyId, form, uploadFiles);
      } else {
        await store.addProperty(form, uploadFiles);
      }

      if (store.error) {
        throw new Error(store.error);
      }

      success.value = true;
      
      if (!isEdit) {
          // Reset form only if creating
          resetForm();
          // We set success to true AFTER resetForm because resetForm clears it
          success.value = true;
      }
    } catch (e: any) {
        console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return { form, errors, isLoading, success, validationFailed, createProperty, resetForm, isEdit, error };
}
