import search from '@/store/constants';

export default {
  setLoadingCurrencies(state) {
    state.isLoadingCurrencies = true;
    state.error = null;
  },
  
  setCurrencies(state, data) {
    state.isLoadingCurrencies = false;
    const rubCurrency = {
      ID: `${new Date().getTime()}`,
      Name: "Рубли",
      CharCode: "RUB",
      Nominal: 1,
      Value: 1,
      Previous: 1,
    };
    state.currenciesList = { rubCurrency, ...data.Valute };
    state.currenciesTableList = { rubCurrency, ...data.Valute };
    state.filteredCurrenciesTableList = { ...state.currenciesTableList };
    state.selectedCurrency = rubCurrency;
  },

  setCurrenciesError(state, error) {
    state.isLoadingCurrencies = false;
    state.error = error;
  },

  changeCurrency(state, currency) {
    state.selectedCurrency = currency;
    for (const cur in state.currenciesTableList) {
      state.currenciesTableList[cur] = {
        ...state.currenciesList[cur],
        Value: state.currenciesList[cur].Value / currency.Value,
        Previous: state.currenciesList[cur].Value / currency.Value
      }
    }
    for (const cur in state.filteredCurrenciesTableList) {
      state.filteredCurrenciesTableList[cur] = {
        ...state.currenciesList[cur],
        Value: state.currenciesList[cur].Value / currency.Value,
        Previous: state.currenciesList[cur].Value / currency.Value
      }
    }
  },

  findCurrency(state, searchParams) {
    const filteredCurrencies = {};
    for (const cur in state.filteredCurrenciesTableList) {
      if (
        (searchParams.searchField === search.SEARCH_FIELD_NAME && state.filteredCurrenciesTableList[cur].Name.startsWith(searchParams.searchText))
        || (searchParams.searchField === search.SEARCH_FIELD_CODE && state.filteredCurrenciesTableList[cur].CharCode.startsWith(searchParams.searchText))
      )
      filteredCurrencies[cur] = { ...state.filteredCurrenciesTableList[cur] }
    }
    state.currenciesTableList = filteredCurrencies;
  },

  resetCurrenciesTable(state) {
    state.currenciesTableList = { ...state.filteredCurrenciesTableList };
  },
};