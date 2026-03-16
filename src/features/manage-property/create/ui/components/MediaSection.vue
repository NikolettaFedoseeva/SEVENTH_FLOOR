<script setup lang="ts">
import { ref, computed, type PropType } from "vue";
import { Card, Input, MediaLightbox } from "@/shared/ui";

// #region defineProps
const props = defineProps({
  form: {
    type: Object as PropType<any>,
    required: true,
  },
  errors: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
});
// #endregion defineProps

// #region refs
const isUploading = ref<boolean>(false);
const uploadError = ref<string | null>(null);

// New refs for actual File objects linked with their preview URLs
const mediaFiles = ref<{ url: string, file: File }[]>([]);
const videoFile = ref<File | null>(null);

// Lightbox state
const showLightbox = ref(false);
const lightboxIndex = ref(0);

// #region computed
const mediaItems = computed(() => {
  const items: { url: string; type: "image" | "video" }[] = [];
  
  // 1. Images
  if (props.form.images) {
    props.form.images.forEach((img: string) => {
      items.push({ url: img, type: "image" });
    });
  }

  // 2. Video
  if (props.form.videoUrl) {
    items.push({ url: props.form.videoUrl, type: "video" });
  }

  return items;
});
// #endregion computed
// #endregion refs

// #region Функции
const handleFileUpload = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  isUploading.value = true;
  uploadError.value = null;

  try {
    const files = Array.from(target.files);
    
    // Check limit
    if (mediaFiles.value.length + files.length > 30) {
      uploadError.value = "Можно загрузить не более 30 фотографий";
      isUploading.value = false;
      target.value = "";
      return;
    }

    files.forEach(file => {
      const url = URL.createObjectURL(file);
      mediaFiles.value.push({ url, file });
      
      if (!props.form.images) props.form.images = [];
      props.form.images.push(url);
    });

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
    target.value = "";
  }
};

const handleVideoUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  videoFile.value = file;
  props.form.videoUrl = URL.createObjectURL(file);
};

const removeVideo = (): void => {
  videoFile.value = null;
  props.form.videoUrl = "";
};

const removeImage = (index: number): void => {
  if (!props.form.images) return;

  const url = props.form.images[index];
  props.form.images.splice(index, 1);
  
  const mediaIdx = mediaFiles.value.findIndex(m => m.url === url);
  if (mediaIdx !== -1) {
    mediaFiles.value.splice(mediaIdx, 1);
  }

  if (props.form.imageUrl === url) {
    props.form.imageUrl = props.form.images.length > 0 ? props.form.images[0] : "";
  }
};

const setMainImage = (url: string): void => {
  props.form.imageUrl = url;
};

const openLightbox = (index: number): void => {
  lightboxIndex.value = index;
  showLightbox.value = true;
};
// #endregion Функции

const clearMedia = (): void => {
  mediaFiles.value = [];
  videoFile.value = null;
};

defineExpose({
  mediaFiles,
  videoFile,
  clearMedia
});
</script>

<template>
  <Card class="form-section">
    <h3 class="section-title-sm">Загрузите фотографии <span class="required">*</span></h3>
    <p class="hint">Первое фото будет главным. Поддерживаются JPG, PNG. Максимум 30 фотографий.</p>

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
        <img :src="img" alt="preview" @click="openLightbox(Number(idx))" />
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
    <span v-if="errors.images" class="error-text mt-1 d-block">{{ errors.images }}</span>
    <div v-if="uploadError" class="error-message mt-2">{{ uploadError }}</div>

    <div class="field full mt-6">
      <h3 class="section-title-sm">Видеообзор</h3>
      <p class="hint">Загрузите видеофайл (MP4, MOV) или укажите ссылку.</p>
      
      <div class="video-upload-section mt-2">
        <label class="video-upload-btn">
          <input
            type="file"
            accept="video/*"
            @change="handleVideoUpload"
            style="display: none"
          />
          <span class="btn-text">{{ videoFile ? 'Изменить видео' : 'Выбрать видеофайл' }}</span>
        </label>
        
        <div v-if="form.videoUrl" class="video-preview-combined mt-2">
          <div v-if="videoFile" class="video-file-info">
             <span>📹 {{ videoFile.name }} (выбрано для загрузки)</span>
          </div>
          <div v-else-if="form.videoUrl.startsWith('http') || form.videoUrl.startsWith('/uploads')" class="video-file-info">
             <span>📹 Видео загружено</span>
          </div>
          
          <div class="video-preview-actions mt-2">
            <button type="button" @click="openLightbox(mediaItems.findIndex(m => m.type === 'video'))" class="btn-preview">Посмотреть во весь экран</button>
            <button type="button" @click="removeVideo" class="text-remove">Удалить</button>
          </div>
        </div>

        <div class="mt-4">
          <label>Или вставьте ссылку (Youtube, Vimeo)</label>
          <Input v-model="form.videoUrl" placeholder="https://..." />
        </div>
      </div>
    </div>
    
    <MediaLightbox 
      v-model="showLightbox" 
      :items="mediaItems" 
      :initial-index="lightboxIndex" 
    />
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
.video-upload-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }
}

.video-preview-combined {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.video-file-info {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.video-preview-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-preview {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  
  &:hover {
    background: #2563eb;
  }
}

.text-remove {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-weight: 500;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
}
</style>
