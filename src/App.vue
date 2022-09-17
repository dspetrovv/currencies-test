<template>
  <div>
    <div>
      <ul class="tabs">
        <li
          :class="{ tabs__item: true, tabs__item_selected: selectedComponent === list }"
          @click="changeComponent(list)"
        >Список</li>
        <li
          :class="{ tabs__item: true, tabs__item_selected: selectedComponent === converter }"
          @click="changeComponent(converter)"
        >Конвертер</li>
      </ul>
    </div>
    <div class="content">
      <keep-alive>
        <component :is="component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
import components from "@/store/constants";
const CurrenciesList = defineAsyncComponent(() => import("@/views/currencies/CurrenciesList.vue"));
const CurrenciesConverter = defineAsyncComponent(() => import("@/views/currencies/CurrenciesConverter.vue"));

export default {
  name: "App",
  components: { CurrenciesList, CurrenciesConverter },
  setup() {
    let component = ref("CurrenciesList");
    let selectedComponent = ref(components.COMPONENT_CURRENCIES_LIST);
    function changeComponent(changableComponent) {
      if (changableComponent === components.COMPONENT_CURRENCIES_LIST && selectedComponent.value !== components.COMPONENT_CURRENCIES_LIST) {
        component.value = 'CurrenciesList';
        selectedComponent.value = components.COMPONENT_CURRENCIES_LIST;
        return;
      }
      if (changableComponent === components.COMPONENT_CURRENCIES_CONVERTER && selectedComponent.value !== components.COMPONENT_CURRENCIES_CONVERTER) {
        component.value = 'CurrenciesConverter';
        selectedComponent.value = components.COMPONENT_CURRENCIES_CONVERTER;
        return;
      }
    }

    return {
      component,
      list: components.COMPONENT_CURRENCIES_LIST,
      converter: components.COMPONENT_CURRENCIES_CONVERTER,
      selectedComponent,
      changeComponent,
    };
  },
};
</script>
