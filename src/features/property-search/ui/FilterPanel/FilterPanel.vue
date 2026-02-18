<script setup lang="ts">
import { reactive, watch } from "vue";
import { CustomButton, Input, Card } from "@/shared/ui";
import type { FilterState, LocationNode } from "./types";

const emit = defineEmits<{
  (e: "search", filters: FilterState): void;
}>();

const locationTree = reactive<LocationNode[]>([
  {
    label: "Приднестровье",
    value: "Приднестровье",
    isOpen: true,
    children: [
      {
        label: "Тирасполь",
        value: "Тирасполь",
        isOpen: false,
        children: [
          { label: "Бородинка", value: "Бородинка" },
          { label: "Западный", value: "Западный" },
          { label: "Кировский", value: "Кировский" },
          { label: "Красные Казармы", value: "Красные Казармы" },
          { label: "Мечникова", value: "Мечникова" },
          { label: "Октябрьский (Балка)", value: "Октябрьский (Балка)" },
          { label: "Текстильщиков", value: "Текстильщиков" },
          { label: "М-он Южный", value: "М-он Южный" },
          { label: "Центр", value: "Центр" }, // Tiraspol Center
        ],
      },
      {
        label: "Бендеры",
        value: "Бендеры",
        isOpen: false,
        children: [
          { label: "Борисовка", value: "Борисовка" },
          { label: "Ленинский", value: "Ленинский" },
          { label: "Солнечный", value: "Солнечный" },
          { label: "Северный", value: "Северный" },
          { label: "Шелковый", value: "Шелковый" },
          { label: "Центр", value: "Центр" }, // Bender Center - naming collision handled by parent context in filtering usually, but here simple string match
        ],
      },
      { label: "Рыбница", value: "Рыбница" },
      { label: "Ближний Хутор", value: "Ближний Хутор" },
      { label: "Григориополь", value: "Григориополь" },
      { label: "Днестровск", value: "Днестровск" },
      { label: "Дубоссары", value: "Дубоссары" },
      { label: "Каменка", value: "Каменка" },
      { label: "Маяк", value: "Маяк" },
      { label: "Новотираспольский", value: "Новотираспольский" },
      { label: "Парканы", value: "Парканы" },
      { label: "Первомайск", value: "Первомайск" },
      { label: "Слободзея", value: "Слободзея" },
      { label: "Суклея", value: "Суклея" },
      { label: "Терновка", value: "Терновка" },
    ],
  },
]);

const filters = reactive<FilterState>({
  search: "",
  locations: [],
  // "region", "cities" replaced by generic locations array for key based filtering

  adTypes: [],
  withPhotos: false,
  verified: false,
  rentPeriod: [],
  rooms: [],
  heating: [],
  minArea: "",
  maxArea: "",
  minFloor: "",
  maxFloor: "",
  buildingType: [],
  buildingStatus: [],
  parking: [],
  minPrice: "",
  maxPrice: "",
  currency: "usd",
});

function handleSearch() {
  emit("search", { ...filters });
}

function resetFilters() {
  Object.assign(filters, {
    search: "",
    locations: [],
    adTypes: [],
    withPhotos: false,
    verified: false,
    rentPeriod: [],
    rooms: [],
    heating: [],
    minArea: "",
    maxArea: "",
    minFloor: "",
    maxFloor: "",
    buildingType: [],
    buildingStatus: [],
    parking: [],
    minPrice: "",
    maxPrice: "",
    currency: "usd",
  });
  handleSearch();
}

// --- Tree Logic ---
function toggleNode(node: LocationNode) {
  if (node.children) {
    node.isOpen = !node.isOpen;
  }
}

// Logic:
// 1. If checking a City, check all its Districts.
// 2. If checking a District, add it. If all districts Checked, check City? (Optional UI polish)
// Simple version: just array of strings.
function toggleLocation(val: string, children?: LocationNode[]) {
  const idx = filters.locations.indexOf(val);
  const isChecked = idx !== -1;

  if (isChecked) {
    // Uncheck
    filters.locations.splice(idx, 1);
    // Determine if we need to uncheck children
    if (children) {
      children.forEach((child) => {
        const cIdx = filters.locations.indexOf(child.value);
        if (cIdx !== -1) filters.locations.splice(cIdx, 1);
      });
    }
  } else {
    // Check
    filters.locations.push(val);
    // Optional: Check all children?
    // Usually better to let user manually select sub-items or have "Select All" logic.
    // For this requirements, let's just toggle the item itself.
    // EXCEPT for City->District relation. If I verify Tiraspol, usually means "Any in Tiraspol".
    // Let's implement auto-select children for better UX.
    if (children) {
      children.forEach((child) => {
        if (!filters.locations.includes(child.value)) {
          filters.locations.push(child.value);
        }
      });
    }
  }
}

function isLocationSelected(val: string): boolean {
  return filters.locations.includes(val);
}

// Helper: Check if parent should be indeterminate or checked based on children
// skipping complex visual logic for now, utilizing standard checkboxes.

// Helper to toggle array items
function toggleArrayItem(arr: string[], item: string) {
  const index = arr.indexOf(item);
  if (index === -1) {
    arr.push(item);
  } else {
    arr.splice(index, 1);
  }
}

// Handle "New" building type toggle
function toggleNewBuildingType(e: Event) {
  const isChecked = (e.target as HTMLInputElement).checked;
  if (isChecked) {
    if (!filters.buildingType.includes("new")) {
      filters.buildingType.push("new");
    }
  } else {
    const index = filters.buildingType.indexOf("new");
    if (index !== -1) filters.buildingType.splice(index, 1);
    filters.buildingStatus = [];
  }
}

function toggleBuildingStatus(status: string) {
  toggleArrayItem(filters.buildingStatus, status);
  if (
    filters.buildingStatus.length > 0 &&
    !filters.buildingType.includes("new")
  ) {
    filters.buildingType.push("new");
  }
}
</script>

<template>
  <Card class="filter-panel" :padding="false">
    <div class="filter-panel__header">
      <h3 class="filter-title">Фильтры</h3>
      <button class="reset-btn" @click="resetFilters">Сбросить</button>
    </div>

    <div class="filter-content">
      <!-- Location Tree -->
      <div class="filter-group location-group">
        <!-- Root Node (Pridnestrovie) -->
        <div v-for="node in locationTree" :key="node.value" class="tree-node">
          <div class="tree-label">
            <button
              v-if="node.children"
              @click="toggleNode(node)"
              class="tree-toggle"
              :class="{ rotated: node.isOpen }"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                :checked="isLocationSelected(node.value)"
                @change="toggleLocation(node.value, node.children)"
              />
              <span class="checkmark"></span>
              <span class="label-text">{{ node.label }}</span>
            </label>
          </div>

          <!-- Children (Cities/Districts) -->
          <div v-if="node.isOpen && node.children" class="tree-children">
            <div
              v-for="child in node.children"
              :key="child.value"
              class="tree-node"
            >
              <div class="tree-label">
                <button
                  v-if="child.children"
                  @click="toggleNode(child)"
                  class="tree-toggle"
                  :class="{ rotated: child.isOpen }"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <!-- Indent via margin-left handled by tree-children class -->
                <label class="custom-checkbox">
                  <input
                    type="checkbox"
                    :checked="isLocationSelected(child.value)"
                    @change="toggleLocation(child.value, child.children)"
                  />
                  <span class="checkmark"></span>
                  <span class="label-text">{{ child.label }}</span>
                </label>
              </div>

              <!-- Grandchildren (Districts) -->
              <div v-if="child.isOpen && child.children" class="tree-children">
                <div
                  v-for="grandChild in child.children"
                  :key="grandChild.value"
                  class="tree-node"
                >
                  <label class="custom-checkbox">
                    <input
                      type="checkbox"
                      :checked="isLocationSelected(grandChild.value)"
                      @change="toggleLocation(grandChild.value)"
                    />
                    <span class="checkmark"></span>
                    <span class="label-text">{{ grandChild.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ads Info -->
      <div class="filter-group">
        <h4 class="group-title">Объявления</h4>
        <div class="checkbox-list">
          <div class="row-checkboxes">
            <label class="custom-checkbox">
              <input
                type="checkbox"
                value="internet"
                v-model="filters.adTypes"
              />
              <span class="checkmark"></span>
              <span class="label-text">интернет</span>
            </label>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                value="newspaper"
                v-model="filters.adTypes"
              />
              <span class="checkmark"></span>
              <span class="label-text">газетные</span>
            </label>
          </div>
          <div class="divider"></div>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="filters.withPhotos" />
            <span class="checkmark"></span>
            <span class="label-text">с фотографиями</span>
          </label>
          <div class="divider"></div>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="filters.verified" />
            <span class="checkmark"></span>
            <span class="label-text">проверенных пользователей</span>
            <span class="verified-icon">🏅</span>
          </label>
        </div>
      </div>

      <!-- Rent Term -->
      <div class="filter-group">
        <h4 class="group-title">Срок аренды</h4>
        <div class="checkbox-list">
          <label class="custom-checkbox">
            <input type="checkbox" value="daily" v-model="filters.rentPeriod" />
            <span class="checkmark"></span>
            <span class="label-text">Посуточно</span>
          </label>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              value="monthly"
              v-model="filters.rentPeriod"
            />
            <span class="checkmark"></span>
            <span class="label-text">Помесячно</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" value="sale" v-model="filters.rentPeriod" />
            <span class="checkmark"></span>
            <span class="label-text">Продажа</span>
          </label>
        </div>
      </div>

      <!-- Rooms -->
      <div class="filter-group">
        <h4 class="group-title">Количество комнат</h4>
        <div class="checkbox-list">
          <label class="custom-checkbox" v-for="r in ['1', '2', '3']" :key="r">
            <input type="checkbox" :value="r" v-model="filters.rooms" />
            <span class="checkmark"></span>
            <span class="label-text">{{ r }} комната</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" value="4+" v-model="filters.rooms" />
            <span class="checkmark"></span>
            <span class="label-text">4 и более комнат</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" value="separate" v-model="filters.rooms" />
            <span class="checkmark"></span>
            <span class="label-text">Отдельная комната</span>
          </label>
        </div>
      </div>

      <!-- Heating -->
      <div class="filter-group">
        <h4 class="group-title">Отопление</h4>
        <div class="checkbox-list">
          <label class="custom-checkbox">
            <input type="checkbox" value="central" v-model="filters.heating" />
            <span class="checkmark"></span>
            <span class="label-text">Центральное</span>
          </label>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              value="autonomous"
              v-model="filters.heating"
            />
            <span class="checkmark"></span>
            <span class="label-text">Автономное (кв)</span>
          </label>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              value="autonomous_house"
              v-model="filters.heating"
            />
            <span class="checkmark"></span>
            <span class="label-text">Автономное (дом)</span>
          </label>
        </div>
      </div>

      <!-- Area -->
      <div class="filter-group">
        <h4 class="group-title">Общая площадь, м²</h4>
        <div class="range-inputs">
          <Input
            v-model="filters.minArea"
            type="number"
            placeholder="0"
            class="sm-input"
          />
          <span class="separator">-</span>
          <Input
            v-model="filters.maxArea"
            type="number"
            placeholder="300"
            class="sm-input"
          />
        </div>
      </div>

      <!-- Floor -->
      <div class="filter-group">
        <h4 class="group-title">Этаж</h4>
        <div class="range-inputs">
          <Input
            v-model="filters.minFloor"
            type="number"
            placeholder="1"
            class="sm-input"
          />
          <span class="separator">-</span>
          <Input
            v-model="filters.maxFloor"
            type="number"
            placeholder="24"
            class="sm-input"
          />
        </div>
      </div>

      <!-- Building Type -->
      <div class="filter-group">
        <h4 class="group-title">Тип строения</h4>
        <div class="checkbox-list">
          <label class="custom-checkbox">
            <input
              type="checkbox"
              value="standard"
              v-model="filters.buildingType"
            />
            <span class="checkmark"></span>
            <span class="label-text">Типовая застройка</span>
          </label>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              value="historic"
              v-model="filters.buildingType"
            />
            <span class="checkmark"></span>
            <span class="label-text">Историческое здание</span>
          </label>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              :checked="filters.buildingType.includes('new')"
              @change="toggleNewBuildingType"
            />
            <span class="checkmark"></span>
            <span class="label-text">Новострой</span>
          </label>

          <div
            class="sub-checkboxes"
            v-if="filters.buildingType.includes('new')"
          >
            <label class="custom-checkbox">
              <input
                type="checkbox"
                value="delivered"
                :checked="filters.buildingStatus.includes('delivered')"
                @change="toggleBuildingStatus('delivered')"
              />
              <span class="checkmark"></span>
              <span class="label-text">Сдан в эксплуатацию</span>
            </label>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                value="not_delivered"
                :checked="filters.buildingStatus.includes('not_delivered')"
                @change="toggleBuildingStatus('not_delivered')"
              />
              <span class="checkmark"></span>
              <span class="label-text">Не сдан в эксплуатацию</span>
            </label>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                value="under_construction"
                :checked="filters.buildingStatus.includes('under_construction')"
                @change="toggleBuildingStatus('under_construction')"
              />
              <span class="checkmark"></span>
              <span class="label-text">На этапе строительства</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Parking -->
      <div class="filter-group">
        <h4 class="group-title">Парковка</h4>
        <div class="checkbox-list">
          <label class="custom-checkbox">
            <input type="checkbox" value="none" v-model="filters.parking" />
            <span class="checkmark"></span>
            <span class="label-text">Нет</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" value="open" v-model="filters.parking" />
            <span class="checkmark"></span>
            <span class="label-text">Открытая</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" value="covered" v-model="filters.parking" />
            <span class="checkmark"></span>
            <span class="label-text">Крытая</span>
          </label>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              value="underground"
              v-model="filters.parking"
            />
            <span class="checkmark"></span>
            <span class="label-text">Подземная</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" value="garage" v-model="filters.parking" />
            <span class="checkmark"></span>
            <span class="label-text">Гараж</span>
          </label>
        </div>
      </div>

      <!-- Price -->
      <div class="filter-group">
        <h4 class="group-title">Цена</h4>
        <div class="range-inputs">
          <Input
            v-model="filters.minPrice"
            type="number"
            placeholder="От"
            class="sm-input"
          />
          <span class="separator">-</span>
          <Input
            v-model="filters.maxPrice"
            type="number"
            placeholder="До"
            class="sm-input"
          />
        </div>
        <div class="currency-toggle">
          <button
            :class="{ active: filters.currency === 'mdl' }"
            @click="filters.currency = 'mdl'"
          >
            Lei
          </button>
          <button
            :class="{ active: filters.currency === 'usd' }"
            @click="filters.currency = 'usd'"
          >
            $
          </button>
          <button
            :class="{ active: filters.currency === 'eur' }"
            @click="filters.currency = 'eur'"
          >
            €
          </button>
        </div>
      </div>
    </div>

    <div class="filter-actions">
      <CustomButton size="md" variant="primary" block @click="handleSearch">
        Показать
      </CustomButton>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.filter-panel {
  background-color: var(--bg-secondary);
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Main container fixed */
}

.filter-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0 1.5rem;
  flex-shrink: 0;
  margin-bottom: 1.5rem;
}

.filter-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 1.5rem 1.5rem 1.5rem; /* Padding for content */
}

/* Scrollbar for filter content */
.filter-content::-webkit-scrollbar {
  width: 6px;
}
.filter-content::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: 3px;
}

.filter-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: #3b82f6;
}

.reset-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
}

.filter-group {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.filter-group:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.group-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: #3b82f6;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sub-checkboxes {
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.separator {
  color: var(--text-secondary);
}

.currency-toggle {
  display: flex;
  margin-top: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  overflow: hidden;
}

.currency-toggle button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  border-right: 1px solid var(--border-color);
}

.currency-toggle button:last-child {
  border-right: none;
}

.currency-toggle button.active {
  background: #3b82f6;
  color: white;
}

.filter-actions {
  flex-shrink: 0;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: 0;
}

/* Checkbox Styles */
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
  user-select: none;
  gap: 0.75rem;
  position: relative;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 20px;
  width: 20px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
  flex-shrink: 0;
}

.custom-checkbox:hover input ~ .checkmark {
  border-color: #3b82f6;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.label-text {
  color: var(--text-primary);
}

.verified-icon {
  margin-left: 0.5rem;
  font-size: 1.2rem;
}

/* Scrollbar for filter panel */
.filter-panel::-webkit-scrollbar {
  width: 6px;
}
.filter-panel::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: 3px;
}

.row-checkboxes {
  display: flex;
  gap: 1.5rem;
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 0.5rem 0;
}

/* Tree Styles */
.location-group .checkbox-list {
  gap: 0.5rem;
}

.tree-node {
  margin-bottom: 0.5rem;
}

.tree-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tree-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.tree-toggle.rotated {
  transform: rotate(90deg);
}

.tree-children {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid var(--border-color);
}
</style>
