import mutations from './mutations';

const state = () => ({
  currenciesList: {},
  currenciesTableList: {},
  filteredCurrenciesTableList: {},
  selectedCurrency: {},
  isLoadingCurrencies: false,
  error: null
});

const actions = {
  async loadCurrencies({ commit }) {
    try {
      commit('setLoadingCurrencies');
      const fetchedCurrencies = await fetch(`${process.env.VUE_APP_CBR_URL}/daily_json.js`);
      if (!fetchedCurrencies.ok) {
        throw new Error(fetchedCurrencies.text());
      }
      const json = await fetchedCurrencies.json();
      commit('setCurrencies', json);
    } catch (error) {
      commit('setCurrenciesError', error.message);
    }
  },

  changeSelectedCurrency({ commit }, { currency }) {
    commit('changeCurrency', currency);
  },

  searchCurrency({ commit }, { searchText, searchField }) {
    commit('findCurrency', { searchText, searchField });
  },

  resetCurrenciesTable({ commit }) {
    commit('resetCurrenciesTable');
  },
};

export default {
  namespaced: false,
  state,
  mutations,
  actions
};