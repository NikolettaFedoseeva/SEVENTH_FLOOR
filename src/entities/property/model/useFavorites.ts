import { ref, onMounted } from 'vue';

const FAVORITES_KEY = '7floor_favorites';

export function useFavorites() {
  const favorites = ref<string[]>([]);

  const loadFavorites = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        favorites.value = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse favorites', e);
        favorites.value = [];
      }
    }
  };

  const isFavorite = (id: string | number) => {
    return favorites.value.includes(String(id));
  };

  const toggleFavorite = (id: string | number) => {
    const sId = String(id);
    const index = favorites.value.indexOf(sId);
    if (index === -1) {
      favorites.value.push(sId);
    } else {
      favorites.value.splice(index, 1);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value));
  };

  onMounted(() => {
    loadFavorites();
  });

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
