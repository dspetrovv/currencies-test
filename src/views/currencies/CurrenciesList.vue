<template>
  <div>
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex; flex-direction: column;">
        <search-input />
      </div>
      <drop-down
        v-if="Object.keys(currencies).length"
        :list="currencies"
        :selected-item="selectedCurrency"
        @change-value="changeSelectedCurrency"
      />
    </div>
    <currencies-table />
  </div>
</template>
<script>
import SearchInput from "@/components/SearchInput.vue";
import CurrenciesTable from './CurrenciesTable.vue';
import DropDown from '@/components/DropDown.vue';
import { onMounted } from '@vue/runtime-core';
import { useStore } from "vuex";
import useCurrencyState from '@/store/hooks/useCurrencyState';
export default {
  components: { SearchInput, DropDown, CurrenciesTable },
  setup() {
    const { dispatch } = useStore();
    let {
      currencies,
      selectedCurrency,
      changeSelectedCurrency,
    } = useCurrencyState();
    onMounted(() => {
      dispatch('loadCurrencies');
    });

    return {
      currencies,
      selectedCurrency,
      changeSelectedCurrency,
    };
  },
};
</script>
