<template>
  <div class="input">
    <label :class="{ input__label: true, 'input__label--require': required }">
      {{ label }}
    </label>
    <input
      :class="{ input__field: true, 'input__field--error': error }"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <p class="input__text-error" v-if="error">Поле является обязательным</p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    error: {
      type: Boolean,
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
    onBlur(event) {
      this.$emit('blur', event.target.value);
    },
    onFocus() {
      this.$emit('focus');
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  position: relative;

  &__field {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 10px 16px;
    font-size: 12px;
    line-height: 15px;
    margin: 4px 0 16px;

    &--error {
      border: 1px solid #ff8484;
    }

    &::-webkit-input-placeholder {
      color: #b4b4b4;
    }
  }

  &__text-error {
    position: absolute;
    top: 62px;
    font-size: 8px;
    font-weight: 400;
    line-height: 10px;
    color: #ff8484;
  }

  &__label {
    font-size: 14px;
    line-height: 20px;
    color: #49485e;

    &--require {
      position: relative;
      &::after {
        content: "";
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #ff8484;
        position: absolute;
      }
    }
  }
}
</style>
