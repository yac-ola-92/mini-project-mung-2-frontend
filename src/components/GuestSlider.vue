<template>
  <div class="slider-container">
    <div id="guest-count" class="slider-output">인원: {{ value }}명</div>
    <div class="slider-wrapper">
      <input
        type="range"
        min="1"
        max="10"
        v-model="value"
        class="custom-slider"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>

<style scoped>
.slider-container {
  text-align: center;
}

.slider-output {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.slider-wrapper {
  width: 80%;
  margin: 0 auto;
}

.custom-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  transition: background 0.3s;
}

.custom-slider:hover {
  background: #4CAF50;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}

.custom-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}
</style>
