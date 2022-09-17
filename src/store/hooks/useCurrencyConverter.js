import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import useCurrencyState from './useCurrencyState';

const useCurrencyConverter = () => {
  const { state, dispatch } = useStore();
  let {
    currencies,
    isLoading,
    error,
    reloadCurrencies,
  } = useCurrencyState();
  let mainCurrency = ref({});
  let exchangeCurrency = ref({});
  let mainValue = ref(1);
  let exchangeValue = ref(1);
  let koef = ref(1);

  function changeMainCurrency(currency) {
    mainCurrency.value = currency;
    calculateValue();
  }
  function changeExchangeCurrency(currency) {
    exchangeCurrency.value = currency;
    calculateValue();
  }
  function swapCurrencies() {
    const swappingCurrency = mainCurrency.value;
    mainCurrency.value = exchangeCurrency.value;
    exchangeCurrency.value = swappingCurrency;
    calculateValue();
  }
  function calculateValue() {
    koef.value = mainCurrency.value.Value / exchangeCurrency.value.Value;
    exchangeValue.value = (mainValue.value * koef.value).toFixed(4);
  }

  onMounted(async () => {
    if (!Object.keys(state.currencies.currenciesList).length) {
      await dispatch("loadCurrencies");
    }
    mainCurrency.value = currencies.value["RUB"] ?? currencies.value[Object.keys(state.currencies.currenciesList)[0]];
    mainValue.value = 1;
    exchangeCurrency.value = currencies.value["USD"] ?? currencies.value[Object.keys(state.currencies.currenciesList)[0]];
    koef.value = mainValue.value / exchangeValue.value;
    calculateValue();
    exchangeValue.value = exchangeCurrency.value.Value;
  });

  watch(mainValue, () => {
    calculateValue();
  });

  return {
    currencies,
    isLoading,
    error,
    mainCurrency,
    exchangeCurrency,
    mainValue,
    exchangeValue,
    koef,
    changeMainCurrency,
    changeExchangeCurrency,
    swapCurrencies,
    reloadCurrencies,
  };
};

export default useCurrencyConverter;