<template>
  <div class="hourly-scroll">
      <div
        class="hourly-column"
        v-for="(hour, index) in props.data.hourly"
        :key="index"
      >
        <div class="data-cell data-cell--time">
          <p class="time">{{ formatTime(hour.dt, props.timezone) }}</p>
        </div>
        <div class="data-cell data-cell--icon">
          <component :is="setWeatherIcon(hour)" />
        </div>
        <div class="data-cell data-cell--temp">
          <p class="temp">{{ Math.round(hour.temp) }}°</p>
        </div>
        <div class="data-cell data-cell--humidity">
          <IconHumidity />
          <p class="humidity">{{ hour.humidity }}%</p>
        </div>
        <div class="data-cell data-cell--wind">
          <IconDirectionArrow
            class="wind-direction-icon"
            :style="{ transform: `rotate(${hour.wind_deg}deg)` }"
          />
          <p class="wind-speed-text">{{ Math.round(hour.wind_speed) }} м/с</p>
        </div>
      </div>
  </div>
</template>



<script setup>
import { getWeatherIcon } from '@/utils/getIcon';
import { formatTime } from '@/utils/getTime';
import { defineAsyncComponent, onMounted } from "vue";

import IconHumidity from './icons/IconHumidity.vue';
import IconDirectionArrow from './icons/IconDirectionArrow.vue';





const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
})

function setWeatherIcon(hour) {
    const iconName = getWeatherIcon(hour)
    const icon = defineAsyncComponent(() =>
      import(`../components/icons/Icon${iconName}.vue`)
    );
    return icon
}

onMounted(() =>{
  props.data.hourly.forEach(hour => {
  const matchingDay = props.data.daily.find(day => {
    const hourDate = new Date(hour.dt * 1000).getUTCDate();
    const dayDate = new Date(day.dt * 1000).getUTCDate();
    return hourDate === dayDate;
  });
  hour.sunrise = matchingDay?.sunrise;
  hour.sunset = matchingDay?.sunset;
  });
})
</script>
<style scoped>
.hourly-scroll {
display: flex;
overflow-x: auto;
gap: 12px;
padding: 8px;
}

.hourly-column {
min-width: 80px;
background-color: rgba(255, 255, 255, 0.1);
border-radius: 12px;
padding: 8px;
text-align: center;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
color: white;
display: flex;
flex-direction: column;
gap: 4px;
}

.hour-time,
.hour-temp,
.hour-humidity,
.hour-wind {
font-size: 14px;
}

.data-cell{
  display: flex;
  justify-content: space-around;
  align-items:center;
}

.hourly-column svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  display: block;
}

.data-cell--icon svg{
  width: 100%;
  height: 100%;
}

</style>



  