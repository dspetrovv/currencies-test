<template>
  <div style="display: flex;">
    <div class="search">
      <img
        class="search__icon"
        :src="require('@/assets/icons/search.svg')"
        alt="Search icon"
      />
      <input
        class="search__input"
        type="text"
        v-model="searchText"
        placeholder="Поиск"
      />
      <span
        v-if="searchText.trim().length"
        class="search__clear-btn"
        @click.prevent="clearInput"
      ></span>
    </div>
  </div>
  <div style="display: flex; margin-top: 10px">
    <div>
      <input
        name="search"
        id="name"
        type="radio"
        class="radio"
        @change="changeRadio"
        :checked="name"
        :disabled="searchText.trim().length"
      />
      <label for="name" style="margin-right: 10px">Наименование</label>
    </div>
    <div>
      <input
        name="search"
        id="code"
        type="radio"
        class="radio"
        @change="changeRadio"
        :checked="code"
        :disabled="searchText.trim().length"
      />
      <label for="code">Код</label>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from 'vuex';
import search from '@/store/constants';
export default {
  setup() {
    const { dispatch } = useStore();
    let searchText = ref("");
    let name = ref(true);
    let code = ref(false);
    function changeRadio() {
      code.value = !code.value;
      name.value = !name.value;
    }
    function clearInput() {
      searchText.value = "";
    }

    watch(searchText, (val) => {
      if (!val.trim().length) {
        dispatch('resetCurrenciesTable');
        return;
      }
      let searchField = search.SEARCH_FIELD_NAME;
      if (name.value) {
        searchField = search.SEARCH_FIELD_NAME;
      } else if (code.value) {
        searchField = search.SEARCH_FIELD_CODE;
      }
      dispatch('searchCurrency', { searchText: val, searchField });
    });

    return {
      searchText,
      name,
      code,
      changeRadio,
      clearInput,
    };
  },
};
</script>
