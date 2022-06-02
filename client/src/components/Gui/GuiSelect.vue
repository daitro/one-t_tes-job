<template>
  <div class="select-field">
    <label class="label">{{ label }}</label>

    <select class="select" :value="value" @change="onChange">
      <option value="" disabled selected>Выберите вариант</option>

      <option v-for="(item, index) in options" :key="index" class="select__option">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
    },
    value: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.select-field {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 13px;
  line-height: 24px;
}

.select {
  height: 36px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 24px 10px 16px;
  font-size: 12px;
  line-height: 15px;
  color: rgb(53, 53, 53);
  cursor: pointer;
  appearance: none;
  background: url("../../../public/icons/arrow_drop-down.svg") no-repeat;
  background-position: 90% 50%;
}
</style>
