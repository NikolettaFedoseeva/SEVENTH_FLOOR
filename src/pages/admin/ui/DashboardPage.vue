<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePropertiesStore } from "@/entities/property";
import { storeToRefs } from "pinia";
import { Button, Card, Modal } from "@/shared/ui";

// #region refs
const store = usePropertiesStore();
const { properties, loading } = storeToRefs(store);

const showDeleteModal = ref<boolean>(false);
const propertyToDelete = ref<string | number | null>(null);

const showRestoreModal = ref<boolean>(false);
const propertyToRestore = ref<string | number | null>(null);
// #endregion refs

// #region Хуки жизненного цикла
onMounted(() => {
  store.fetchProperties(true);
});
// #endregion Хуки жизненного цикла

// #region Функции
const handleDelete = (id: string | number): void => {
  propertyToDelete.value = id;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (propertyToDelete.value) {
    await store.deleteProperty(propertyToDelete.value);
    showDeleteModal.value = false;
    propertyToDelete.value = null;
  }
};

const handleRestore = (id: string | number) => {
  propertyToRestore.value = id;
  showRestoreModal.value = true;
};

const confirmRestore = async (): Promise<void> => {
  if (propertyToRestore.value) {
    await store.restoreProperty(propertyToRestore.value);
    showRestoreModal.value = false;
    propertyToRestore.value = null;
  }
};
// #endregion Функции

defineExpose({});
</script>

<template>
  <div class="dashboard-page">
    <div class="page-header">
      <h1 class="page-title">Все объявления</h1>
      <Button to="/admin/properties/create" variant="primary">Добавить</Button>
    </div>

    <Card class="properties-table-card">
      <div v-if="loading" class="loading">Загрузка...</div>

      <table v-else class="properties-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Фото</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Тип</th>
            <th>Расположение</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="property in properties" :key="property.id">
            <td data-label="ID">#{{ property.id }}</td>
            <td data-label="Фото">
              <img
                :src="property.imageUrl || 'https://placehold.co/100'"
                class="table-thumb"
                alt="thumb"
              />
            </td>
            <td class="col-title" data-label="Название">
              {{ property.title }}
            </td>
            <td class="col-price" data-label="Цена">
              {{ property.price.toLocaleString() }}
              {{ property.currency?.toUpperCase() || "USD" }}
            </td>
            <td data-label="Тип">
              {{
                property.type === "apartment"
                  ? "Квартира"
                  : property.type === "house"
                  ? "Дом"
                  : property.type === "commercial"
                  ? "Комм."
                  : "Участок"
              }}
            </td>
            <td data-label="Расположение">{{ property.address }}</td>
            <td data-label="Статус">
              <span
                :class="[
                  'status-badge',
                  property.isRemove ? 'status-deleted' : 'status-active',
                ]"
              >
                {{ property.isRemove ? "Удалено" : "Активно" }}
              </span>
            </td>
            <td data-label="Действия">
              <div class="actions">
                <Button
                  :to="`/admin/properties/${property.id}/edit`"
                  variant="outline"
                  size="sm"
                  >Ред.</Button
                >
                <Button
                  v-if="!property.isRemove"
                  variant="danger"
                  size="sm"
                  @click="handleDelete(property.id)"
                  >Удалить</Button
                >
                <Button
                  v-else
                  variant="outline"
                  size="sm"
                  @click="handleRestore(property.id)"
                  >Восстановить</Button
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <Modal v-model="showDeleteModal" title="Удаление объявления">
      <p>
        Вы уверены, что хотите удалить это объявление? Оно будет скрыто с сайта,
        но останется в админ-панели.
      </p>
      <template #footer="{ close }">
        <Button variant="outline" @click="close">Отмена</Button>
        <Button variant="danger" @click="confirmDelete">Удалить</Button>
      </template>
    </Modal>

    <Modal v-model="showRestoreModal" title="Восстановление объявления">
      <p>
        Вы уверены, что хотите восстановить это объявление? Оно снова появится в
        публичном каталоге сайта.
      </p>
      <template #footer="{ close }">
        <Button variant="outline" @click="close">Отмена</Button>
        <Button variant="primary" @click="confirmRestore">Восстановить</Button>
      </template>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.properties-table-card {
  padding: 0;
  overflow-x: auto;
}

.properties-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.properties-table th {
  background-color: #f8fafc;
  padding: 1rem;
  font-weight: 600;
  color: #64748b;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

.properties-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  vertical-align: middle;
}

.properties-table tr:last-child td {
  border-bottom: none;
}

.table-thumb {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.col-title {
  font-weight: 600;
  color: #0f172a;
}

.col-price {
  font-weight: 700;
  color: #2563eb;
  white-space: nowrap;
}

.loading {
  padding: 3rem;
  text-align: center;
  color: #64748b;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-active {
  background-color: #dcfce7;
  color: #166534;
}

.status-deleted {
  background-color: #fee2e2;
  color: #991b1b;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .properties-table thead {
    display: none;
  }

  .properties-table,
  .properties-table tbody,
  .properties-table tr,
  .properties-table td {
    display: block;
    width: 100%;
  }

  .properties-table tr {
    margin-bottom: 3rem;
    border-bottom: 3px solid #e2e8f0;
    width: auto;
  }

  .properties-table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
    border-bottom: 1px solid #f1f5f9;
  }

  .properties-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 45%;
    white-space: nowrap;
    text-align: left;
    font-weight: 600;
    color: #64748b;
  }

  .actions {
    justify-content: flex-end;
  }
}
</style>
