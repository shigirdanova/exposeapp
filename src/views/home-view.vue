<template>
  <div class="home">
		<HomePage >
			<template #mfe>
				<YellowCar message="Welcome Vue 3"/>
			</template>
		</HomePage>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import YellowCar from '@/components/yellow-car/yellow-car.vue'

const HomePage = defineAsyncComponent({
  loader: () => import('hostApp/HomePage.vue')
})


export default defineComponent({
  name: 'HomeView',
  components: {
    YellowCar,
		HomePage,
  },
});
</script>

<style scoped src="./home-view.css"/>
