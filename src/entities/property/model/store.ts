import { defineStore } from "pinia";
import { ref } from "vue";
import { MOCK_PROPERTIES } from "./mock-data";
import type { Property } from "./types";

export const usePropertiesStore = defineStore("properties", () => {
  // Try to load from local storage, fallback to mock
  const saved = localStorage.getItem("properties");
  const initialProperties = saved ? JSON.parse(saved) : [...MOCK_PROPERTIES];

  const properties = ref<Property[]>(initialProperties);

  const addProperty = (property: Omit<Property, "id">) => {
    const newId =
      Math.max(
        ...properties.value.map((p) => (typeof p.id === "number" ? p.id : 0)),
      ) + 1;
    properties.value.unshift({
      ...property,
      id: newId,
    });
    // Save to local storage
    localStorage.setItem("properties", JSON.stringify(properties.value));
  };

  return { properties, addProperty };
});
