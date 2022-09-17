<template>
  <div class="drop-down">
    <button
      class="drop-down__button"
      @click="toggleDropdown"
    >
      {{ selectedItem.CharCode }}
    </button>
    <div class="drop-down__block drop-down__block_hidden" ref="dropDownBlock">
      <ul class="drop-down__list">
        <li
          v-for="item in list"
          :key="item.ID"
          @click.prevent="changeValue(item)"
        >
          {{ item.CharCode }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: {
    list: {
      type: [Object],
      required: true
    },
    selectedItem: {
      type: Object,
      required: true,
    },
  },
  emits: ['changeValue'],
  setup(_, { emit }) {
    let isOpened = ref(false);
    let dropDownBlock = ref(null);
    function closeDropdown() {
      dropDownBlock.value.classList.toggle("drop-down__block_hidden");
      window.removeEventListener("click", closeDropdown)
      isOpened.value = false;
    }
    function toggleDropdown() {
      if (isOpened.value) {
        dropDownBlock.value.classList.toggle("drop-down__block_hidden");
        window.removeEventListener("click", closeDropdown)
        isOpened.value = false;
      } else {
        dropDownBlock.value.classList.toggle("drop-down__block_hidden");
        isOpened.value = true;
        setTimeout(() => {
          window.addEventListener("click", closeDropdown);
        });
      }
    }
    function changeValue(item) {
      emit('changeValue', item);
    }

    return {
      dropDownBlock,
      isOpened,
      toggleDropdown,
      closeDropdown,
      changeValue,
    };
  },
};
</script>
