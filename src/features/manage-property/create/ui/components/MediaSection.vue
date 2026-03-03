<script setup lang="ts">
import { ref, type PropType } from "vue";
import { Card, Input } from "@/shared/ui";

// #region defineProps
const props = defineProps({
  form: {
    type: Object as PropType<any>,
    required: true,
  },
});
// #endregion defineProps

// #region refs
const isUploading = ref<boolean>(false);
const uploadError = ref<string | null>(null);
// #endregion refs

// #region Функции
const handleFileUpload = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  isUploading.value = true;
  uploadError.value = null;

  try {
    const files = Array.from(target.files);

    // Create a local blob URL for each selected file for immediate preview
    const urls = files.map((file) => URL.createObjectURL(file));

    // Initialize images array if it doesn't exist
    if (!props.form.images) {
      props.form.images = [];
    }

    // Add new local URLs to the form
    props.form.images.push(...urls);

    // Set the first image as the main image if not set
    if (!props.form.imageUrl && props.form.images.length > 0) {
      props.form.imageUrl = props.form.images[0];
    }
  } catch (err: any) {
    console.error("Upload failed", err);
    uploadError.value =
      "Ошибка обработки изображения: " + (err.message || "Неизвестная ошибка");
  } finally {
    isUploading.value = false;
    // Reset input
    target.value = "";
  }
};

const removeImage = (index: number): void => {
  if (!props.form.images) return;

  const removedUrl = props.form.images[index];
  props.form.images.splice(index, 1);

  // If we removed the main image, update it
  if (props.form.imageUrl === removedUrl) {
    props.form.imageUrl =
      props.form.images.length > 0 ? props.form.images[0] : "";
  }
};

const setMainImage = (url: string): void => {
  props.form.imageUrl = url;
};
// #endregion Функции

defineExpose({});
</script>

<template>
  <Card class="form-section">
    <h3 class="section-title-sm">Загрузите фотографии</h3>
    <p class="hint">Первое фото будет главным. Поддерживаются JPG, PNG.</p>

    <div class="media-container mt-2">
      <!-- Upload Button -->
      <label
        class="photo-upload-placeholder"
        :class="{ disabled: isUploading }"
      >
        <input
          type="file"
          multiple
          accept="image/*"
          @change="handleFileUpload"
          :disabled="isUploading"
          style="display: none"
        />
        <div v-if="isUploading" class="loading-spinner">⏳</div>
        <template v-else>
          <div class="camera-icon">📷</div>
          <span class="plus-icon">+</span>
        </template>
      </label>

      <!-- Previews -->
      <div
        v-for="(img, idx) in form.images"
        :key="idx"
        class="photo-preview"
        :class="{ 'is-main': form.imageUrl === img }"
      >
        <img :src="img" alt="preview" />
        <div class="preview-actions">
          <button
            type="button"
            class="action-btn star-btn"
            @click.prevent="setMainImage(img)"
            title="Сделать главным"
            v-if="form.imageUrl !== img"
          >
            ★
          </button>
          <span v-else class="main-badge">Главное</span>
          <button
            type="button"
            class="remove-btn"
            @click.prevent="removeImage(Number(idx))"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
    <div v-if="uploadError" class="error-message mt-2">{{ uploadError }}</div>

    <div class="field full mt-6">
      <label>Ссылка на видеоролик с Youtube или Vimeo</label>
      <Input v-model="form.videoUrl" placeholder="" />
    </div>
  </Card>
</template>

<style lang="scss" scoped>
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

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.loading-spinner {
  font-size: 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.main-badge {
  position: absolute;
  top: 2px;
  left: 2px;
  background: #10b981;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
  z-index: 2;
}

.star-btn {
  position: absolute;
  top: 2px;
  left: 2px;
  background: rgba(0, 0, 0, 0.5);
  color: #fbbf24;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
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
  color: #f59e0b;
  margin-top: 0.25rem;
}
</style>
