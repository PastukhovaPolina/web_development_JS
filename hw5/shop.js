import { createApp, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    const products = ref([]);
    const searchString = ref('');
    const sortKey = ref('price');

    const fetchProducts = async () => {
      const response = await fetch('shop.json');
      products.value = await response.json();
    };

    const sortedProducts = computed(() => {
      // Фильтрация продуктов по строке поиска
      let filtered = products.value.filter(product => {
        const searchText = searchString.value.trim().toLowerCase();
        return (
          product.title.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText)
        );
      });

      // Сортировка продуктов
      return filtered.sort((a, b) => {
        if (sortKey.value === 'price') {
          return a.price - b.price;
        } else if (sortKey.value === 'title') {
          return a.title.localeCompare(b.title);
        }
      });
    });

    onMounted(fetchProducts);

    return {
      products,
      searchString,
      sortKey,
      sortedProducts
    };
  }
}).mount('#app');
