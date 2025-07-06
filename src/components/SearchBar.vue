<template>
    <div class="search-bar" @click="handleOpenClick" ref="searchBar">
  <div class="search-wrapper" >
    <input
      v-model="searchQuery"
      placeholder="Шукати населений пункт..."
      class="search-input"
    />
    <IconSearch class="icon-search"/>
  </div>

  <ul v-if="showResults && results.length" class="results-list">
    <li 
      v-for="place in results" 
      :key="place.geonameId" 
      @click="fetchData(place)">
      {{ place.name }}, {{ place.adminName1 }}, {{ place.countryName }}
    </li>
  </ul>
</div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { watchDebounced } from '@vueuse/core'

  import IconSearch from './icons/IconSearch.vue'
  
  const searchQuery = ref('')
  const results = ref([])
  const showResults = ref(false)
  const emit = defineEmits(['select'])
  const searchBar = ref(null)
  
  watchDebounced(
    searchQuery,
    (query) => {
      if (query.trim().length > 2) {
        handleSearch(query)
        showResults.value = true
      } else {
        results.value = []
        showResults.value = false
      }
    },
    { debounce: 1000 }
  )
  
  async function handleSearch(query) {
    const GEONAMES_USERNAME = import.meta.VITE_GEONAMES_USERNAME
    const response = await fetch(
      `https://secure.geonames.org/searchJSON?q=${query}&maxRows=5&countryBias=UA&username=${GEONAMES_USERNAME}&lang=uk`
    )
    const data = await response.json()
    results.value = data.geonames || []
  }

  function fetchData(place){
    console.log(place)
    emit('select', place)
    showResults.value = false
  }

  function handleCloseClick() {
    if (searchBar.value && !searchBar.value.contains(event.target)) {
      showResults.value = false
    }
  }

  function handleOpenClick() {
    showResults.value = true
  }

   onMounted(async () => {
    document.addEventListener('click', handleCloseClick)
   })
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  position: relative;
  font-family: 'Segoe UI', sans-serif;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background-color: rgba(200, 200, 200, 0.25);
  border-radius: 8px;
  padding: 6px 12px;
  transition: background-color 0.3s ease;
}

.search-wrapper:focus-within {
  background-color: rgba(150, 150, 150, 0.25);
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 6px 0;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.icon-search {
  height: 25px;
  width: 25px;
  color: rgba(255, 255, 255, 0.75);
}

.results-list {
  position: absolute;
  width: 100%;
  margin-top: 6px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  overflow: hidden;
  z-index: 5;
  color: #333;
}

.results-list li {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s ease;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
}

.results-list li:last-child {
  border-bottom: none;
}

.results-list li:hover {
  background: #efefef;
}


</style>