export const propertyDictionary: Record<string, Record<string, string>> = {
  type: {
    apartment: "Квартира",
    house: "Дом",
    commercial: "Коммерческая",
    land: "Участок",
  },
  heating: {
    central: "Центральное",
    autonomous: "Автономное",
    autonomous_house: "Авт. (дом)",
    none: "Нет",
  },
  buildingType: {
    standard: "Типовая застройка",
    historic: "Исторический фонд",
    new: "Новострой",
  },
  buildingStatus: {
    delivered: "Сдан",
    not_delivered: "Не сдан",
    under_construction: "Строится",
  },
  parking: {
    none: "Нет",
    open: "Открытая",
    covered: "Крытая",
    garage: "Гараж",
    underground: "Подземная",
  },
  wallMaterial: {
    brick: "Кирпич",
    monolith: "Монолит",
    panel: "Панель",
    limestone: "Котелец",
    aerated_concrete: "Газоблок",
  },
  apartmentSeries: {
    individual: "Индивидуальная",
    "143": "143 серия",
    "102": "102 серия",
    hrushchevka: "Хрущевка",
    stalinka: "Сталинка",
    rubashka: "Рубашка",
    ms: "МС (Молдавская серия)",
    ceshka: "Чешка",
  },
  condition: {
    euro: "Евроремонт",
    cosmetic: "Косметический",
    needs_repair: "Требует ремонта",
    white_box: "Белый вариант",
    black_box: "Серый вариант",
  },
  balcony: {
    balcony: "Балкон",
    loggia: "Лоджия",
    terrace: "Терраса",
    none: "Нет",
  },
  bathroom: {
    combined: "Совмещенный",
    separate: "Раздельный",
    multiple: "Несколько",
  },
  sewerage: {
    central: "Центральная",
    autonomous: "Автономная",
    none: "Нет",
  },
  gas: {
    main: "Магистральный",
    cylinder: "Баллон",
    none: "Нет",
  },
  water: {
    central: "Центральный",
    well: "Колодец",
    none: "Нет",
  },
  roadType: {
    asphalt: "Асфальт",
    dirt: "Грунт",
  },
  landType: {
    construction: "Под строительство",
    agricultural: "Сельхоз",
    garden: "Садовое",
  },
  commercialTypes: {
    office: "Офис",
    retail: "Торговое",
    cafe_restaurant: "Кафе/Ресторан",
    industrial: "Производство",
    warehouse: "Склад",
    garage: "Гараж",
    other: "Другое",
  },
  amenities: {
    furniture: "Мебель",
    appliances: "Бытовая техника",
    windows: "Стеклопакет",
    warm_floor: "Тёплый пол",
    ac: "Кондиционер",
    parquet: "Паркет",
    armored_door: "Бронированная дверь",
    security: "Сигнализация",
    cctv: "Видеонаблюдение",
    intercom: "Домофон",
    phone: "Городской телефон",
    internet: "Интернет",
    cable_tv: "ТВ кабель",
    elevator: "Лифт",
    trash_chute: "Мусоропровод",
    playground: "Детская площадка",
    school: "Школа",
    park: "Парк",
    shop: "Магазин",
    pharmacy: "Аптека",
    hospital: "Поликлиника",
    bus_stop: "Остановка",
    garage: "Гараж",
    pool: "Бассейн",
    sauna: "Сауна",
    basement: "Погреб / подвал",
    terrace_house: "Терраса",
    mansard: "Мансарда",
    automatic_gates: "Ворота с д/у",
  },
};

export const getPropertyLabel = (
  category: string,
  value?: string | string[]
): string => {
  if (!value) return "—";
  if (Array.isArray(value)) {
    return value
      .map((v) => propertyDictionary[category]?.[v] || v)
      .join(", ");
  }
  return propertyDictionary[category]?.[value] || value;
};
