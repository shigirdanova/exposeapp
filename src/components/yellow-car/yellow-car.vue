<template>
  <div class="component">
    <h2 class="heading">YellowCar component prop: <span class="message">{{ message }}</span></h2>
    <div class="vehicle">
      <div class="mainframe">
       <img src="../../assets/car-yellow.png" alt="car"/>
      </div>
      <div class="wheel front">
       <img src="../../assets/wheel.png" alt="wheelFront"/>
      </div>
      <div class="wheel back">
       <img src="../../assets/wheel.png" alt="wheelBack"/>
      </div>
     </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'YellowCar',
  props: {
    message: {
      type: String,
      required: false,
    },
  },
});
</script>

<style scoped src="./yellow-car.css"/>
