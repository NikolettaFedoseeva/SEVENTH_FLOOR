<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useCreateProperty } from "../model/useCreateProperty";
import { Button, Input, Card } from "@/shared/ui";
import type {
  PropertyType,
  SewerageType,
  GasType,
  HeatingSource,
  WaterType,
  CommercialType,
} from "@/entities/property/model/types";

const { form, errors, isLoading, success, createProperty } =
  useCreateProperty();

// --- Rubric / Subrubric Logic ---
const selectedRubric = ref<string>("sale");
const selectedSubrubric = ref<PropertyType>("apartment");

const rubrics = [
  { value: "sale", label: "Продажа" },
  { value: "rent_monthly", label: "Аренда (месяц)" },
  { value: "rent_daily", label: "Аренда (сутки)" },
];

const subrubrics = computed(() => {
  const prefix =
    selectedRubric.value === "sale"
      ? "Продажа"
      : selectedRubric.value === "rent_daily"
      ? "Аренда (сутки)"
      : "Аренда";

  return [
    { value: "apartment", label: `${prefix} квартир` },
    { value: "house", label: `${prefix} домов` },
    { value: "commercial", label: `${prefix} коммерческой недвижимости` },
    { value: "land", label: `${prefix} земельных участков` },
  ];
});

// Update form model when selection changes
watch(
  [selectedRubric, selectedSubrubric],
  ([rubric, subrubric]) => {
    // Map rubric to rentPeriod
    if (rubric === "sale") form.rentPeriod = "sale";
    else if (rubric === "rent_daily") form.rentPeriod = "daily";
    else form.rentPeriod = "monthly";

    // Map subrubric to type
    form.type = subrubric as PropertyType;
  },
  { immediate: true },
);

// --- Conditional Field Visibility ---
// Commercial often doesn't need rooms/living area unless specific
const showRooms = computed(() => ["apartment", "house"].includes(form.type));
// Screenshot shows only Area for commercial
const showFloor = computed(() => ["apartment"].includes(form.type));
const showFloorsTotal = computed(() =>
  ["apartment", "house"].includes(form.type),
);
const showLivingKitchen = computed(() =>
  ["apartment", "house"].includes(form.type),
);
const showBathroom = computed(() => ["apartment", "house"].includes(form.type));
const showBalcony = computed(() => ["apartment", "house"].includes(form.type));
const showParking = computed(() => ["apartment", "house"].includes(form.type)); // Screenshot didn't show parking for commercial, assuming hidden or optional
const showHeating = computed(() => ["apartment", "house"].includes(form.type));
const showBuildingType = computed(() =>
  ["apartment", "house"].includes(form.type),
);

// Specific to Apartment
const showApartmentDetails = computed(() => ["apartment"].includes(form.type));

// Specific to House
const showHouseDetails = computed(() => ["house"].includes(form.type));
const showLandArea = computed(() => ["house", "land"].includes(form.type));
const showCommunications = computed(() => ["house"].includes(form.type));

// Specific to Commercial
const showCommercialDetails = computed(() =>
  ["commercial"].includes(form.type),
);

// --- Options ---
const currencies = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "mdl", label: "MDL" },
];

const buildingTypes = [
  { value: "standard", label: "Типовая" },
  { value: "historic", label: "Историческая" },
  { value: "new", label: "Новострой" },
];

const wallMaterials = [
  { value: "panel", label: "Панельный" },
  { value: "brick", label: "Кирпичный" },
  { value: "monolith", label: "Монолитный" },
  { value: "limestone", label: "Котелец" },
  { value: "aerated_concrete", label: "Газоблок" },
];

const apartmentSeries = [
  { value: "individual", label: "Индивидуальная" },
  { value: "143", label: "143 серия" },
  { value: "102", label: "102 серия" },
  { value: "hrushchevka", label: "Хрущевка" },
  { value: "stalinka", label: "Сталинка" },
  { value: "rubashka", label: "Рубашка" },
  { value: "ms", label: "МС (Молдавская серия)" },
  { value: "ceshka", label: "Чешка" },
];

const layoutTypes = [
  { value: "separate", label: "Раздельная" },
  { value: "adjoining", label: "Смежная" },
  { value: "studio", label: "Студия" },
  { value: "penthouse", label: "Пентхаус" },
  { value: "loft", label: "Лофт" },
];

const positionInBuilding = [
  { value: "middle", label: "Середина" },
  { value: "corner", label: "Угловая" },
];

const parkingTypes = [
  { value: "none", label: "Нет" },
  { value: "open", label: "Открытая" },
  { value: "covered", label: "Крытая" },
  { value: "underground", label: "Подземная" },
  { value: "garage", label: "Гараж" },
];

const heatingTypes = [
  { value: "central", label: "Центральное" },
  { value: "autonomous", label: "Автономное" },
  { value: "autonomous_house", label: "Авт. (дом)" },
  { value: "none", label: "Нет" },
];

// House-specific options
const sewerageTypes: { value: SewerageType; label: string }[] = [
  { value: "central", label: "Центральная" },
  { value: "autonomous", label: "Автономная" },
  { value: "none", label: "Нет" },
];

const gasTypes: { value: GasType; label: string }[] = [
  { value: "main", label: "Магистральный" },
  { value: "cylinder", label: "Баллонный" },
  { value: "none", label: "Нет" },
];

// Checkbox lists for heating sources and water moved to template or used here
const heatingSourcesList: { value: HeatingSource; label: string }[] = [
  { value: "gas", label: "Газ" },
  { value: "heat_pump", label: "Тепловой насос" },
  { value: "ac", label: "Кондиционер" },
  { value: "solar", label: "Солнечные батареи" },
  { value: "fireplace", label: "Печь/камин" },
];

const waterSourcesList: { value: WaterType; label: string }[] = [
  { value: "central", label: "Водопровод" },
  { value: "well", label: "Скважина / колодец" },
];

const bathroomTypes = [
  { value: "combined", label: "Совмещенный" },
  { value: "separate", label: "Раздельный" },
  { value: "multiple", label: "2 и более" },
];

const balconyTypes = [
  { value: "balcony", label: "Балкон" },
  { value: "loggia", label: "Лоджия" },
  { value: "terrace", label: "Терраса" },
  { value: "none", label: "Нет" },
];

const conditionTypes = [
  { value: "euro", label: "Евроремонт" },
  { value: "cosmetic", label: "Косметический ремонт" },
  { value: "white_box", label: "Белый вариант" },
  { value: "black_box", label: "Серый вариант" },
  { value: "needs_repair", label: "Нуждается в ремонте" },
];

const amenitiesList = [
  { value: "furniture", label: "Мебель" },
  { value: "appliances", label: "Бытовая техника" },
  { value: "windows", label: "Стеклопакет" },
  { value: "warm_floor", label: "Тёплый пол" },
  { value: "ac", label: "Кондиционер" },
  { value: "parquet", label: "Паркет" },
  { value: "armored_door", label: "Бронированная дверь" },
  { value: "security", label: "Сигнализация" },
  { value: "cctv", label: "Видеонаблюдение" },
  { value: "intercom", label: "Домофон" },
  { value: "phone", label: "Городской телефон" },
  { value: "internet", label: "Интернет" },
  { value: "cable_tv", label: "ТВ кабель" },
  { value: "elevator", label: "Лифт" },
  { value: "trash_chute", label: "Мусоропровод" },
  { value: "playground", label: "Детская площадка" },
  { value: "school", label: "Школа" },
  { value: "park", label: "Парк" },
  { value: "shop", label: "Магазин" },
  { value: "pharmacy", label: "Аптека" },
  { value: "hospital", label: "Поликлиника" },
  { value: "bus_stop", label: "Остановка" },
  // House additional
  { value: "garage", label: "Гараж" },
  { value: "pool", label: "Бассейн" },
  { value: "sauna", label: "Сауна" },
  { value: "basement", label: "Погреб / подвал" },
  { value: "terrace_house", label: "Терраса" },
  { value: "mansard", label: "Мансарда" },
  { value: "automatic_gates", label: "Ворота с д/у" },
];

const commercialTypeList: { value: CommercialType; label: string }[] = [
  { value: "office", label: "Офис" },
  { value: "retail", label: "Торговое помещение" },
  { value: "cafe_restaurant", label: "Кафе / бар / ресторан" },
  { value: "industrial", label: "Производственное помещение" },
  { value: "warehouse", label: "Склад" },
  { value: "garage", label: "Гараж / парковка" },
  { value: "other", label: "Прочее" },
];

const addImage = () => {
  const url = prompt("Введите URL изображения");
  if (url) {
    if (!form.images) form.images = [];
    form.images.push(url);
    // Set first image as main if empty
    if (!form.imageUrl) form.imageUrl = url;
  }
};

const removeImage = (index: number) => {
  form.images?.splice(index, 1);
  if (form.imageUrl === form.images?.[index]) {
    form.imageUrl = form.images?.[0] || "";
  }
};
</script>

<template>
  <form @submit.prevent="createProperty" class="create-property-form">
    <div v-if="success" class="success-message">Объект успешно добавлен!</div>

    <!-- Category Section -->
    <Card class="form-section">
      <div class="category-grid">
        <div class="category-col">
          <label>Рубрика</label>
          <div class="select-list">
            <div
              v-for="r in rubrics"
              :key="r.value"
              class="select-item"
              :class="{ active: selectedRubric === r.value }"
              @click="selectedRubric = r.value"
            >
              {{ r.label }}
            </div>
          </div>
        </div>
        <div class="category-col">
          <label>Подрубрика</label>
          <div class="select-list">
            <div
              v-for="s in subrubrics"
              :key="s.value"
              class="select-item"
              :class="{ active: selectedSubrubric === s.value }"
              @click="selectedSubrubric = s.value as PropertyType"
            >
              {{ s.label }}
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Characteristics Section -->
    <Card class="form-section bg-gray-50">
      <div class="section-header">
        <h3 class="section-title">Характеристики</h3>
      </div>

      <div class="form-grid">
        <!-- Row 1 -->
        <div v-if="showHouseDetails" class="field small">
          <label>Состояние дома <span class="required">*</span></label>
          <select v-model="form.condition" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in conditionTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>

        <!-- Commercial Types -->
        <div v-if="showCommercialDetails" class="field">
          <label>Тип недвижимости <span class="required">*</span></label>
          <div class="checkbox-group-vertical">
            <label
              v-for="c in commercialTypeList"
              :key="c.value"
              class="checkbox-label-sm"
            >
              <input
                type="checkbox"
                :value="c.value"
                v-model="form.commercialTypes"
              />
              {{ c.label }}
            </label>
          </div>
        </div>

        <div v-if="showFloorsTotal" class="field small">
          <label
            >{{ showHouseDetails ? "Количество этажей" : "Этажность дома" }}
            <span class="required">*</span></label
          >
          <Input v-model="form.totalFloors" type="number" />
        </div>

        <div v-if="showRooms" class="field small">
          <label>Количество комнат <span class="required">*</span></label>
          <Input v-model="form.rooms" type="number" placeholder="-" />
        </div>

        <!-- Area fields -->
        <div class="field small">
          <label
            >{{
              showHouseDetails ? "Площадь дома (м²)" : "Общая площадь (м²)"
            }}
            <span class="required">*</span></label
          >
          <Input v-model="form.area" type="number" />
        </div>

        <!-- Row 2 -->
        <div v-if="showLandArea" class="field small">
          <label>Площадь участка (сотки) <span class="required">*</span></label>
          <Input v-model="form.landArea" type="number" />
        </div>

        <div v-if="showLivingKitchen" class="field small">
          <label>Жилая площадь (м²)</label>
          <Input v-model="form.livingArea" type="number" />
        </div>

        <div v-if="showLivingKitchen" class="field small">
          <label>Площадь кухни (м²)</label>
          <Input v-model="form.kitchenArea" type="number" />
        </div>

        <div class="field small">
          <label>Высота потолков (см)</label>
          <Input v-model="form.ceilingHeight" type="number" />
        </div>

        <!-- Apartment specific -->
        <div v-if="showApartmentDetails" class="field small">
          <label>Тип комнат</label>
          <select v-model="form.layout" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in layoutTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>

        <div v-if="showApartmentDetails" class="field small">
          <label>Тип дома</label>
          <select v-model="form.wallMaterial" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in wallMaterials" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>
        <div v-if="showBuildingType && !showHouseDetails" class="field">
          <label>Тип строения <span class="required">*</span></label>
          <select v-model="form.buildingType" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in buildingTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>
        <div v-if="showFloor" class="field small">
          <label>Этаж <span class="required">*</span></label>
          <Input v-model="form.floor" type="number" />
        </div>

        <div v-if="showApartmentDetails" class="field small">
          <label>Расположение в доме</label>
          <select v-model="form.positionInBuilding" class="custom-select">
            <option :value="undefined">-</option>
            <option
              v-for="t in positionInBuilding"
              :key="t.value"
              :value="t.value"
            >
              {{ t.label }}
            </option>
          </select>
        </div>
        <div v-if="showApartmentDetails" class="field small">
          <label>Планировка</label>
          <select v-model="form.apartmentSeries" class="custom-select">
            <option :value="undefined">-</option>
            <option
              v-for="t in apartmentSeries"
              :key="t.value"
              :value="t.value"
            >
              {{ t.label }}
            </option>
          </select>
        </div>

        <!-- Common -->
        <div v-if="showBathroom" class="field">
          <label>Санузел <span class="required">*</span></label>
          <select v-model="form.bathroom" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in bathroomTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>

        <div v-if="showBalcony" class="field">
          <label>Балкон/лоджия</label>
          <select v-model="form.balcony" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in balconyTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>
        <div v-if="showParking" class="field">
          <label>Парковка <span class="required">*</span></label>
          <select v-model="form.parking" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in parkingTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>
        <div v-if="showApartmentDetails" class="field">
          <label>Состояние квартиры <span class="required">*</span></label>
          <select v-model="form.condition" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in conditionTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>
        <div v-if="showHeating && !showHouseDetails" class="field">
          <label>Отопление <span class="required">*</span></label>
          <select v-model="form.heating" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in heatingTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Communications Section (House) -->
    <Card v-if="showCommunications" class="form-section bg-gray-50 mt-4">
      <div class="section-header">
        <h3 class="section-title">Коммуникации</h3>
      </div>
      <div class="form-grid">
        <!-- Heating Checkboxes -->
        <div class="field">
          <label>Отопление <span class="required">*</span></label>
          <div class="checkbox-group-vertical">
            <label
              v-for="s in heatingSourcesList"
              :key="s.value"
              class="checkbox-label-sm"
            >
              <input
                type="checkbox"
                :value="s.value"
                v-model="form.heatingSources"
              />
              {{ s.label }}
            </label>
          </div>
        </div>

        <!-- Electricity -->
        <div class="field">
          <label>Электричество</label>
          <label class="checkbox-label-sm">
            <input type="checkbox" v-model="form.electricity" />
            подключено
          </label>

          <div class="mt-4">
            <label class="block-label">Вода</label>
            <div class="checkbox-group-vertical">
              <label
                v-for="w in waterSourcesList"
                :key="w.value"
                class="checkbox-label-sm"
              >
                <input type="checkbox" :value="w.value" v-model="form.water" />
                {{ w.label }}
              </label>
            </div>
          </div>
        </div>

        <!-- Sewerage -->
        <div class="field">
          <label>Канализация</label>
          <select v-model="form.sewerage" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in sewerageTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>

          <div class="mt-4">
            <label class="block-label">Телефон, ТВ, интернет</label>
            <div class="checkbox-group-vertical">
              <label class="checkbox-label-sm">
                <input type="checkbox" value="phone" v-model="form.amenities" />
                телефон
              </label>
              <label class="checkbox-label-sm">
                <input
                  type="checkbox"
                  value="cable_tv"
                  v-model="form.amenities"
                />
                ТВ
              </label>
              <label class="checkbox-label-sm">
                <input
                  type="checkbox"
                  value="internet"
                  v-model="form.amenities"
                />
                интернет
              </label>
            </div>
          </div>
        </div>

        <!-- Gas -->
        <div class="field">
          <label>Газ</label>
          <select v-model="form.gas" class="custom-select">
            <option :value="undefined">-</option>
            <option v-for="t in gasTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Location Section -->
    <Card class="form-section">
      <h3 class="section-title">Расположение</h3>
      <div class="form-grid mb-4">
        <div class="field">
          <label>Регион <span class="required">*</span></label>
          <select class="custom-select">
            <option>Молдова</option>
          </select>
        </div>
        <div class="field">
          <label>Город <span class="required">*</span></label>
          <select class="custom-select" v-model="form.city">
            <option :value="undefined">-</option>
            <option value="Chisinau">Кишинев</option>
            <option value="Balti">Бельцы</option>
            <option value="Tiraspol">Тирасполь</option>
          </select>
        </div>
      </div>

      <div class="form-grid">
        <div class="field">
          <label>Улица</label>
          <Input v-model="form.address" placeholder="" />
          <span v-if="errors.address" class="error">{{ errors.address }}</span>
        </div>
        <div class="field small">
          <label>Номер дома</label>
          <Input v-model="form.houseNumber" placeholder="" />
        </div>
      </div>
    </Card>

    <!-- Amenities (Additional) -->
    <Card class="form-section">
      <h3 class="section-title">Дополнительно</h3>
      <div class="amenities-grid">
        <!-- Filter out communication related amenities if in Create mode to avoid duplicates if they are already in Communications block? 
             Actually user might want to select them here too. But let's show all for now.
             Maybe better to filter out "phone", "internet", "cable_tv" if likely handled above.
        -->
        <label
          v-for="amenity in amenitiesList"
          :key="amenity.value"
          class="checkbox-label"
        >
          <input
            type="checkbox"
            :value="amenity.value"
            v-model="form.amenities"
          />
          {{ amenity.label }}
        </label>
      </div>
    </Card>

    <!-- General Info (Title, Desc, Price) -->
    <Card class="form-section">
      <div class="form-grid">
        <div class="field full">
          <label>Заголовок объявления <span class="required">*</span></label>
          <Input v-model="form.title" placeholder="" />
          <div class="char-count">{{ form.title.length }}/70</div>
        </div>

        <div class="field full">
          <label>Текст объявления <span class="required">*</span></label>
          <textarea
            v-model="form.description"
            class="description-input"
            rows="6"
            placeholder=""
          ></textarea>
          <div class="char-count">{{ form.description.length }}/1500</div>
        </div>

        <div class="field-group price-group">
          <div class="field">
            <label>Цена</label>
            <div class="price-input-wrapper">
              <Input v-model="form.price" type="number" placeholder="" />
              <div class="currency-toggles">
                <button
                  type="button"
                  v-for="curr in currencies"
                  :key="curr.value"
                  :class="[
                    'curr-btn',
                    { active: form.currency === curr.value },
                  ]"
                  @click="form.currency = curr.value as 'mdl' | 'usd' | 'eur'"
                >
                  {{ curr.label }}
                </button>
              </div>
            </div>
            <span v-if="errors.price" class="error">{{ errors.price }}</span>
          </div>
        </div>
      </div>
    </Card>

    <!-- Media -->
    <Card class="form-section">
      <h3 class="section-title-sm">Загрузите хотя бы одну фотографию</h3>
      <p class="hint">
        Только объявления с фотографией попадают на главную страницу. Можно
        прикрепить еще 15 фотографий.
      </p>

      <div class="media-container mt-2">
        <div class="photo-upload-placeholder" @click="addImage">
          <div class="camera-icon">📷</div>
          <span class="plus-icon">+</span>
        </div>
        <div v-for="(img, idx) in form.images" :key="idx" class="photo-preview">
          <img :src="img" alt="preview" />
          <button type="button" class="remove-btn" @click="removeImage(idx)">
            &times;
          </button>
        </div>
      </div>

      <div class="field full mt-6">
        <label>Ссылка на видеоролик с Youtube или Vimeo</label>
        <Input v-model="form.videoUrl" placeholder="" />
      </div>
    </Card>

    <div class="form-actions">
      <Button type="submit" variant="primary" :disabled="isLoading">
        {{ isLoading ? "Сохранение..." : "Добавить объект" }}
      </Button>
    </div>
  </form>
</template>

<style scoped>
.create-property-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1000px; /* Wider for 4 columns */
  margin: 0 auto;
}

.form-section {
  padding: 1.5rem;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
}

.section-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #3b82f6;
}

.section-title-sm {
  font-size: 0.95rem;
  font-weight: 700;
  color: #374151;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns for params */
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field.full {
  grid-column: 1 / -1;
}

/* Make sure location fields stretch appropriately */
.mb-4 {
  margin-bottom: 1rem;
}

.field label {
  font-size: 0.75rem; /* Smaller labels */
  font-weight: 700;
  color: #374151;
}

.block-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.25rem;
}

.required {
  color: #ef4444;
}

.error {
  font-size: 0.75rem;
  color: #ef4444;
}

.custom-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px; /* Slightly sharper */
  background-color: white;
  width: 100%;
  font-size: 0.875rem;
}

.description-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
}

.char-count {
  text-align: right;
  font-size: 0.75rem;
  color: #10b981; /* Greenish count */
  font-weight: 600;
  margin-top: 0.25rem;
}

.price-group {
  grid-column: 1 / -1;
}

.price-input-wrapper {
  display: flex;
  gap: 1rem;
  max-width: 300px;
}

.currency-toggles {
  display: flex;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  overflow: hidden;
}

.curr-btn {
  padding: 0.5rem 1rem;
  background: white;
  border: none;
  border-right: 1px solid #3b82f6;
  cursor: pointer;
  font-weight: 500;
  color: #374151;
  font-size: 0.8rem;
}

.curr-btn:last-child {
  border-right: none;
}

.curr-btn.active {
  background: #3b82f6;
  color: white;
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #4b5563;
  cursor: pointer;
}

.checkbox-label-sm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #4b5563;
  cursor: pointer;
  margin-bottom: 0.25rem;
}

.checkbox-group-vertical {
  display: flex;
  flex-direction: column;
}

.media-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.photo-upload-placeholder {
  width: 80px;
  height: 80px;
  background-color: #e5e7eb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.camera-icon {
  font-size: 1.5rem;
  color: #9ca3af;
}

.plus-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  font-weight: bold;
  color: #10b981;
}

.photo-preview {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hint {
  font-size: 0.8rem;
  color: #f59e0b; /* Orange warning color */
  margin-top: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-6 {
  margin-top: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.success-message {
  background-color: #f0fdf4;
  color: #166534;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
}

/* Category Selection Styles */
.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  height: 200px; /* Fixed height match */
}

.category-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

.select-list {
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: path;
  height: 100%;
  overflow-y: auto;
  background: white;
}

.select-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.select-item:hover {
  background-color: #f3f4f6;
}

.select-item.active {
  background-color: #e5e7eb; /* Grey highlight per screenshot */
  color: #1f2937;
  font-weight: 500;
}
</style>
