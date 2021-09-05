<template>
  <div class="md-input-main mb-3">
    <div class="md-input-box">
      <select
        :id="idName"
        :value="modelValue"
        class="md-input"
        @input="$emit('input', $event.target.value)"
      >
        <template v-for="item in content">
          <option :key="item" :value="item">
            {{ item }}
          </option>
        </template>
      </select>
      <label :for="idName" class="md-label">{{ label }}</label>
      <div class="md-input-underline" />
    </div>
  </div>
</template>

<script>
import { randomId } from '../../helpers'

export default {
  name: 'MaterialSelect',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: 'Label'
    },
    idName: {
      type: String,
      default: randomId
    },
    content: {
      type: Array,
      required: true
    }
  },

  methods: {
    updateSelf (name) {
      this.$emit('input', name)
    }
  }
}
</script>

<style>
.md-input::placeholder {
  color: transparent;
}

.md-input-main {
  width: 100%;
  font-size: 1.25rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.md-input-box {
  @apply relative;
  position: relative;
}
.md-input {
  @apply w-full;
  width: 100%;
  outline: none;
  height: 50px;
}
.md-label {
  display: block;
  position: absolute;
  pointer-events: none;
  transform-origin: top left;
  transform: translate(0, -40px) scale(1);
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.md-label-focus {
  color: #3182ce;
  transform: translate(0, -65px) scale(0.75);
  transform-origin: top left;
}
.md-input-underline {
  border-bottom: 1px solid #718096;
}
.md-input-underline:after {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  bottom: -0.05rem;
  content: "";
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transform: scaleX(0);
  border-bottom: 2px solid #805ad5;
}
.md-input:focus ~ .md-input-underline:after {
  transform: scaleX(1);
}
.md-input:focus + .md-label,
.md-input:not(:placeholder-shown) + .md-label {
  @apply md-label-focus;
  color: #3182ce;
  transform: translate(0, -65px) scale(0.75);
  transform-origin: top left;
}
/* enable to leave border-bottom in modified color when the field is populated */
/*
.md-input:not(:placeholder-shown) ~ .md-input-underline:after {
transform: scaleX(1);
}
*/
</style>
