<template>
  <table class="currencies-table">
    <thead class="currencies-table__header">
      <tr class="currencies-table__row">
        <th>Код</th>
        <th>Наименование</th>
        <th>В {{ selectedCurrency.CharCode }}{{ selectedCurrency.Nominal > 1 ? ` (${selectedCurrency.Nominal} шт.)` : '' }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        <td class="currencies-table__loading">Загрузка...</td>
      </tr>
      <tr v-if="error">
        <td class="currencies-table__error" colspan="2">
          <span style="vertical-align: middle; margin-right: 10px">{{ error }}</span>
          <button class="btn" @click="reloadTable">
            Перезагрузить
          </button>
        </td>
      </tr>
      <template v-else>
        <tr
          v-for="currency in currencies"
          :key="currency.id"
          class="currencies-table__row"
        >
          <td>
            {{ currency.CharCode }}
          </td>
          <td>
            {{ currency.Name }}{{ currency.Nominal > 1 ? ` (${currency.Nominal} шт.)` : '' }}
          </td>
          <td>
            {{ currency.Value.toFixed(2) }}
            <small :style="`color: ${getColor(currency)}`">
              ({{ getDifference(currency) }}){{getArrow(currency)}}
            </small>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
import useCurrencyState from '@/store/hooks/useCurrencyState';
export default {
  setup() {
    let {
      currenciesTable: currencies,
      selectedCurrency,
      isLoading,
      error,
      reloadCurrencies,
    } = useCurrencyState();

    function getDifference(currency) {
      return (currency.Value - currency.Previous).toFixed(2);
    }
    function getColor(currency) {
      const difference = getDifference(currency);
      if (difference === 0) {
        return 'gray';
      }
      if (difference > 0) {
        return 'lightgreen';
      }
      if (difference < 0) {
        return 'red';
      }
    }
    function getArrow(currency) {
      const difference = getDifference(currency);
      if (difference > 0) {
        return '↑';
      }
      if (difference < 0) {
        return '↓';
      }
    }

    return {
      selectedCurrency,
      currencies,
      isLoading,
      error,
      reloadTable: reloadCurrencies,
      getDifference,
      getColor,
      getArrow,
    };
  },
}
</script>