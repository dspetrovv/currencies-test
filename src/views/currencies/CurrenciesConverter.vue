<template>
  <div class="currencies-converter">
    <div v-if="error" class="currencies-converter__error">
      <span style="vertical-align: middle; margin-right: 10px">{{ error }}</span>
      <button class="btn" @click="reloadCurrencies">
        Перезагрузить
      </button>
    </div>
    <div v-else-if="isLoading" class="currencies-converter__loading">
      Загрузка...
    </div>
    <template v-else>
      <div class="currencies-converter__block">
        <strong class="currencies-converter__name" :title="mainCurrency.Name">
          {{ mainCurrency.Name }}
        </strong>
        <input type="number" v-model="mainValue">
        <select style="margin-top: 16px" multiple>
          <option
            v-for="currency in currencies"
            :key="currency.ID"
            :selected="currency.ID === mainCurrency.ID"
            @click="changeMainCurrency(currency)"
          >
            {{ currency.CharCode }} {{ currency.Nominal > 1 ? `(${currency.Nominal} шт)` : '' }}
          </option>
        </select>
      </div>
      <div class="currencies-converter__icons">
        <img
          :src="require('@/assets/icons/arrow-icon.svg')"
          alt="Arrow"
          @click="swapCurrencies"
        >
      </div>
      <div class="currencies-converter__block">
        <strong class="currencies-converter__name" :title="exchangeCurrency.Name">
          {{ exchangeCurrency.Name }}
        </strong>
        <input type="number" v-model="exchangeValue" disabled>
        <small class="currencies-converter__course">Курс: <strong>{{ koef.toFixed(4) }}</strong></small>
        <select multiple>
          <option
            v-for="currency in currencies"
            :key="currency.ID"
            :selected="currency.ID === exchangeCurrency.ID"
            @click="changeExchangeCurrency(currency)"
          >
            {{ currency.CharCode }} {{ currency.Nominal > 1 ? `(${currency.Nominal} шт)` : '' }}
          </option>
        </select>
      </div>
    </template>
  </div>
</template>
<script>
import useCurrencyConverter from '@/store/hooks/useCurrencyConverter';
export default {
  setup() {
    let {
      currencies,
      mainCurrency,
      exchangeCurrency,
      mainValue,
      exchangeValue,
      koef,
      error,
      isLoading,
      changeMainCurrency,
      changeExchangeCurrency,
      swapCurrencies,
      reloadCurrencies,
    } = useCurrencyConverter();
    
    return {
      currencies,
      mainCurrency,
      exchangeCurrency,
      mainValue,
      exchangeValue,
      koef,
      error,
      isLoading,
      changeMainCurrency,
      changeExchangeCurrency,
      swapCurrencies,
      reloadCurrencies,
    };
  },
}
</script>