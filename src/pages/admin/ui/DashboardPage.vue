<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePropertiesStore } from "@/entities/property";
import { storeToRefs } from "pinia";
import { Button, Card, Modal } from "@/shared/ui";

const store = usePropertiesStore();
const { properties, loading } = storeToRefs(store);

const showDeleteModal = ref(false);
const propertyToDelete = ref<string | number | null>(null);

onMounted(() => {
  store.fetchProperties();
});

const handleDelete = (id: string | number) => {
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
            <td class="col-title" data-label="Название">{{ property.title }}</td>
            <td class="col-price" data-label="Цена">{{ property.price.toLocaleString() }} {{ property.currency?.toUpperCase() || 'USD' }}</td>
            <td data-label="Тип">
                {{
                    property.type === "apartment" ? "Квартира" :
                    property.type === "house" ? "Дом" :
                    property.type === "commercial" ? "Комм." : "Участок"
                }}
            </td>
            <td data-label="Расположение">{{ property.address }}</td>
            <td data-label="Действия">
                <div class="actions">
                  <Button :to="`/admin/properties/${property.id}/edit`" variant="outline" size="sm">Ред.</Button>
                  <Button variant="danger" size="sm" @click="handleDelete(property.id)">Удалить</Button>
                </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <Modal v-model="showDeleteModal" title="Удаление объявления">
      <p>Вы уверены, что хотите удалить это объявление? Это действие нельзя отменить.</p>
      <template #footer="{ close }">
        <Button variant="outline" @click="close">Отмена</Button>
        <Button variant="danger" @click="confirmDelete">Удалить</Button>
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
  overflow: hidden;
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
  
  .properties-table, .properties-table tbody, .properties-table tr, .properties-table td {
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
