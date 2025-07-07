<template>
  <div class="daily-scroll">
    <div class="daily-column" v-for="(day, index) in props.data.daily" :key="index">
      <div class="data-cell data-cell--date">
        <p class="weekday">{{ formatDate(day.dt, props.timezone).weekday }}</p>
        <p class="date">{{ formatDate(day.dt, props.timezone).dateMonth }}</p>
      </div>
      <div class="data-cell data-cell--icon">
        <component :is="setWeatherIcon(day)" />
      </div>
      <div class="data-cell data-cell--temp">{{ Math.round(day.temp.day) }}°</div>
      <div class="data-cell data-cell--humidity">
        <IconHumidity />
        <p class="humidity-text">{{ day.humidity }}%</p>
      </div>
      <div class="data-cell data-cell--wind">
        <IconDirectionArrow class="wind-direction-icon" :style="{ transform: `rotate(${day.wind_deg}deg)` }" />
        <p class="wind-speed-text">{{ Math.round(day.wind_speed) }} м/с</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { getWeatherIcon } from '@/utils/getIcon';
import { formatDate } from '@/utils/getTime';
import { defineAsyncComponent } from "vue";

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

function setWeatherIcon(day) {
  const iconName = getWeatherIcon(day)
  const icon = defineAsyncComponent(() =>
    import(`../components/icons/Icon${iconName}.vue`)
  );
  return icon
}
</script>

<style scoped>
.daily-scroll {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding: 8px;
}

.daily-column {
  min-width: 90px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.data-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.data-cell--date {
  flex-direction: column;
}

.weekday,
.date,
.data-cell--temp,
.humidity-text,
.wind-speed-text {
  font-size: 14px;
  margin: 0;
}

.daily-column svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  display: block;
}

.data-cell--icon svg {
  width: 100%;
  height: 100%;
}

.wind-direction-icon {
  width: 16px;
  height: 16px;
}
</style>
