import { computed } from "vue";
import { useStore } from "vuex";

const useCurrencyState = () => {
  const { state, dispatch } = useStore();
  let currencies = computed(() => {
    return state.currencies.currenciesList;
  });
  let currenciesTable = computed(() => {
    return state.currencies.currenciesTableList;
  });
  let selectedCurrency = computed(() => {
    return state.currencies.selectedCurrency;
  });
  let isLoading = computed(() => {
    return state.currencies.isLoadingCurrencies;
  });
  let error = computed(() => {
    return state.currencies.error;
  });
  function changeSelectedCurrency(currency) {
    dispatch('changeSelectedCurrency', { currency });
  }
  function reloadCurrencies() {
    dispatch('loadCurrencies');
  }

  return {
    currencies,
    currenciesTable,
    selectedCurrency,
    isLoading,
    error,
    changeSelectedCurrency,
    reloadCurrencies,
  };
};

export default useCurrencyState;