<template>
  <div class="md-input-main mb-3">
    <div class="md-input-box">
      <input
        :id="idName"
        v-model="data"
        class="md-input"
        :type="type"
        :required="required"
        min="0"
        :pattern="pattern"
        :placeholder="placeholder || label"
      >
      <label :for="idName" class="md-label">{{ label }}</label>
      <div class="md-input-underline" />
    </div>
  </div>
</template>

<script>
import { randomId } from '../../helpers'
export default {
  name: 'TextInput',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String,
      default: ''
    },
    pattern: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    idName: {
      type: String,
      default: randomId
    },
    required: {
      type: Boolean,
      default: false
    },
    labelBg: {
      type: String,
      default: ''
    }
  },
  computed: {
    data: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('input', value)
      }
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
  position: relative;
}
.md-input {
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
  color: #ec1f28;
  transform: translate(0, -65px) scale(0.75);
  transform-origin: top left;
}
.md-input-underline {
  border-bottom: 1px solid #ec1f28;
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
  border-bottom: 2px solid #ec1f28;
}
.md-input:focus ~ .md-input-underline:after {
  transform: scaleX(1);
}
.md-input:focus + .md-label,
.md-input:not(:placeholder-shown) + .md-label {
  color: #ec1f28;
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
