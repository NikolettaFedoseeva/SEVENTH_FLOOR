import type {
  SewerageType,
  GasType,
  HeatingSource,
  WaterType,
  CommercialType,
} from "@/entities/property/model/types";

export const rubrics = [
  { value: "sale", label: "Продажа" },
  { value: "rent", label: "Аренда" },
  { value: "exchange", label: "Обмен" },
];

export const propertyCategories = [
  { value: "room", label: "Комната" },
  { value: "apartment", label: "Квартира" },
  { value: "house", label: "Дом" },
  { value: "dacha", label: "Дача" },
  { value: "land", label: "Участок" },
  { value: "garage", label: "Гараж / парковка" },
  { value: "commercial", label: "Коммерческая недвижимость", disabled: true },
  { value: "commercial_office", label: "\u00A0\u00A0Офисное помещение" },
  { value: "commercial_retail", label: "\u00A0\u00A0Торговое помещение" },
  {
    value: "commercial_industrial",
    label: "\u00A0\u00A0Производственное помещение",
  },
  { value: "commercial_warehouse", label: "\u00A0\u00A0Склад" },
  { value: "other", label: "Другое" },
];

export const currencies = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
];

export const roomsCountList = [
  { value: "1", label: "1 комната" },
  { value: "2", label: "2 комнаты" },
  { value: "3", label: "3 комнаты" },
  { value: "4", label: "4 комнаты" },
  { value: "4+", label: "4 и более комнат" },
  { value: "5+", label: "5 и более комнат" },
  { value: "separate", label: "отдельная комната" },
];

export const roomTypesList = [
  { value: "separate", label: "раздельные" },
  { value: "adjoining", label: "есть смежные комнаты" },
];

export const buildingTypes = [
  { value: "brick", label: "кирпичный" },
  { value: "panel", label: "панельный" },
  { value: "monolith", label: "монолитный" },
  { value: "block", label: "блочный" },
  { value: "limestone", label: "котельцовый" },
];

export const constructionTypes = [
  { value: "standard", label: "Типовая застройка" },
  { value: "historic", label: "Историческое здание" },
  { value: "new", label: "Новострой(уточняющий пункт)" },
  { value: "commissioned", label: "Сдан в эксплуатацию" },
  { value: "not_commissioned", label: "Не сдан в эксплуатацию" },
  { value: "under_construction", label: "На этапе строительства" },
];

export const positionInBuilding = [
  { value: "middle", label: "в середине дома" },
  { value: "corner", label: "угловая" },
];

export const apartmentSeries = [
  { value: "stalinka", label: "сталинка" },
  { value: "hrushchevka", label: "хрущевка" },
  { value: "brezhnevka", label: "брежневка" },
  { value: "varnitskaya", label: "варницкая" },
  { value: "rubashka", label: "рубашка" },
  { value: "cheshka", label: "чешка" },
  { value: "ms", label: "МС" },
  { value: "102", label: "102" },
  { value: "135", label: "135" },
  { value: "143", label: "143" },
  { value: "individual", label: "индивидуальная" },
];

export const bathroomTypes = [
  { value: "combined", label: "совмещённый" },
  { value: "separate", label: "раздельный" },
  { value: "multiple", label: "2 и более" },
];

export const balconyTypes = [
  { value: "none", label: "нет" },
  { value: "balcony", label: "балкон" },
  { value: "loggia", label: "лоджия" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4 и более" },
];

export const parkingTypes = [
  { value: "none", label: "нет" },
  { value: "open", label: "открытая" },
  { value: "covered", label: "крытая" },
  { value: "underground", label: "подземная" },
  { value: "garage", label: "гараж" },
];

export const conditionTypes = [
  { value: "major_repair", label: "требует капитального ремонта" },
  { value: "cosmetic_repair", label: "требует косметического ремонта" },
  { value: "needs_repair", label: "требует ремонта" },
  { value: "no_repair", label: "не требует ремонта" },
  { value: "after_cosmetic", label: "после косметического ремонта" },
  { value: "after_repair", label: "после ремонта" },
  { value: "excellent", label: "в отличном состоянии" },
  { value: "euro", label: "евроремонт" },
];

export const houseConditionTypes = [
  { value: "unfinished", label: "недостроен" },
  { value: "major_repair", label: "требует капитального ремонта" },
  { value: "needs_repair", label: "требует ремонта" },
  { value: "after_repair", label: "после ремонта" },
  { value: "no_repair", label: "не требует ремонта" },
  { value: "excellent", label: "в отличном состоянии" },
  { value: "euro", label: "евроремонт" },
  { value: "cosmetic", label: "косметический" },
];

export const roomsCountListHouse = [
  { value: "1", label: "1 комната" },
  { value: "2", label: "2 комнаты" },
  { value: "3", label: "3 комнаты" },
  { value: "4", label: "4 комнаты" },
  { value: "5", label: "5 комнат" },
  { value: "6", label: "6 комнат" },
  { value: "7", label: "7 комнат" },
  { value: "8", label: "8 комнат" },
  { value: "9", label: "9 комнат" },
  { value: "10", label: "10 комнат" },
  { value: "5+", label: "5 и более комнат" },
];

export const houseFloorsList = [
  { value: "1", label: "1 этаж" },
  { value: "2", label: "2 этажа" },
  { value: "3", label: "3 этажа" },
  { value: "3+", label: "3 этажа и более" },
];

export const heatingTypes = [
  { value: "central", label: "центральное" },
  { value: "autonomous", label: "автономное" },
  { value: "autonomous_apt", label: "автономное на квартиру" },
  { value: "autonomous_house", label: "автономное на дом" },
  { value: "none", label: "нет" },
];

export const sewerageTypes: { value: SewerageType; label: string }[] = [
  { value: "central", label: "Центральная" },
  { value: "autonomous", label: "Автономная" },
  { value: "none", label: "Нет" },
];

export const gasTypes: { value: string; label: string }[] = [
  { value: "main", label: "магистральный" },
  { value: "connected", label: "подключен" },
  { value: "possible", label: "возможность подключения" },
  { value: "cylinder", label: "баллон" },
  { value: "none", label: "нет" },
];

export const heatingSourcesList: { value: HeatingSource; label: string }[] = [
  { value: "gas", label: "Газ" },
  { value: "heat_pump", label: "Тепловой насос" },
  { value: "ac", label: "Кондиционер" },
  { value: "solar", label: "Солнечные батареи" },
  { value: "fireplace", label: "Печь/камин" },
];

export const waterSourcesList: { value: WaterType; label: string }[] = [
  { value: "central", label: "Водопровод" },
  { value: "well", label: "Скважина / колодец" },
];

export const amenitiesList = [
  // Дополнительно
  { value: "windows", label: "стеклопакет" },
  { value: "parquet", label: "паркет" },
  { value: "armored_door", label: "бронированная дверь" },
  { value: "phone", label: "городской телефон" },
  { value: "cable_tv", label: "ТВ кабель" },
  { value: "internet", label: "интернет" },
  { value: "elevator", label: "лифт" },
  { value: "trash_chute", label: "мусоропровод" },
  { value: "furniture", label: "мебель" },
  { value: "appliances", label: "бытовая техника" },
  { value: "security", label: "сигнализация" },
  { value: "intercom", label: "домофон" },
  { value: "cctv", label: "видеонаблюдение" },
  { value: "warm_floor", label: "тёплый пол" },
  { value: "ac", label: "кондиционер" },
];

export const houseAmenitiesList = [
  { value: "garage", label: "гараж" },
  { value: "remote_gates", label: "ворота с д/у" },
  { value: "cellar", label: "погреб / подвал" },
  { value: "terrace", label: "терраса" },
  { value: "attic", label: "мансарда" },
  { value: "sauna", label: "сауна" },
  { value: "pool", label: "бассейн" },
];

export const nearHouseList = [
  { value: "bus_stop", label: "остановка" },
  { value: "shop", label: "магазин" },
  { value: "supermarket", label: "супермаркет" },
  { value: "market", label: "рынок" },
  { value: "pharmacy", label: "аптека" },
  { value: "hospital", label: "поликлиника" },
  { value: "kindergarten", label: "детский сад" },
  { value: "school", label: "школа" },
  { value: "park", label: "парк" },
];

export const commercialTypeList: { value: CommercialType; label: string }[] = [
  { value: "office", label: "Офис" },
  { value: "retail", label: "Торговое помещение" },
  { value: "cafe_restaurant", label: "Кафе / бар / ресторан" },
  { value: "industrial", label: "Производственное помещение" },
  { value: "warehouse", label: "Склад" },
  { value: "garage", label: "Гараж / парковка" },
  { value: "other", label: "Прочее" },
];

export const landStructures = [
  { value: "none", label: "нет строений" },
  { value: "temporary", label: "временное строение" },
  { value: "started", label: "начато строительство" },
  { value: "capital", label: "капитальное строение" },
];

export const landPurpose = [
  { value: "construction", label: "под строительство" },
  { value: "agricultural", label: "сельхозназначение" },
  { value: "dacha", label: "дачный" },
];
