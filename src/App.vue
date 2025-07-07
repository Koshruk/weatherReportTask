<template>
  <div class="app-wrapper" :class="weatherClass">

    <div class="content">
      <SearchBar class="search-bar" @select="setPlace" />
      <SpinnerLoading v-if="isLoading" />
      <div v-else-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div v-else class="content-wrapper">
        <div class="hero" :class="weatherClass">
          <div class="weather">
            <component class="weather-icon" :is="icon" v-if="icon" />
            <p class="weather-description">{{ description }}</p>
          </div>
          <div class="general-info">
            <p class="temperature">{{ Math.round(temperature) }}°</p>
            <div class="info-wrapper">
              <p class="city-name">{{ city }}, {{ country }}</p>
              <p class="time">{{ time }} - {{ date }}</p>
            </div>
          </div>
        </div>
        <div class="glass-panel">
          <div class="weather-cards">
            <div class="weather-card">
              <p class="card-label">Вологість</p>
              <p class="card-value">{{ humidity }}%</p>
              <IconHumidity class="card-icon" />
            </div>
            <div class="weather-card">
              <p class="card-label">Швидкість вітру</p>
              <p class="card-value">{{ windSpeed }} м/с</p>
              <IconWindbag class="card-icon" />
            </div>
            <div class="weather-card">
              <p class="card-label">Напрямок вітру</p>
              <p class="card-value">{{ setWindDirection() }}</p>
              <DirectionArrow class="card-icon"
                :style="{ transform: `rotate(${weatherData?.current?.wind_deg || 0}deg)` }" />
            </div>
          </div>
          <p class="forecast-label">Щогодинний прогноз</p>
          <HourlyForecast class="hourly-forecast" v-if="!isLoading && weatherData && weatherData.hourly.length"
            :data="weatherData" :timezone="weatherData.timezone" />
          <p class="forecast-label">Щоденний прогноз</p>
          <DailyForecast class="daily-forecast" v-if="!isLoading && weatherData && weatherData.daily.length"
            :data="weatherData" :timezone="weatherData.timezone" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  color: white;


  &.rainy {
    background-image: url('/images/rainy.jpg');
  }

  &.sunny {
    background-image: url('/images/sunny.jpg');
  }

  &.night {
    background-image: url('/images/night.jpg');
  }

  &.cloudy {
    background-image: url('/images/cloudy.jpg');
  }

  &.snowy {
    background-image: url('/images/snowy.jpg');
  }
}

.content {
  padding: 20px 20px 0;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
}

.weather {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0;
}

.weather-icon {
  width: 150px;
}

.weather-description {
  font-size: 20px;
}


.general-info {
  display: flex;
  align-items: last baseline;

}

.info-wrapper {
  font-size: 16px;
}

.temperature {
  font-size: 70px;
  width: 3ch;
  display: inline-block;
  text-align: center;

  margin-right: 5px;
}

.weather-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
}

.weather-card {
  color: white;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-label {
  font-size: 14px;
  color: white;
  margin-bottom: 4px;
}

.card-value {
  font-size: 24px;
  font-weight: 600;
}

.card-icon {
  width: 30px;
  height: 30px;
}

.forecast-label {
  font-size: 20px;
  text-align: center;
}

.glass-panel {
  background: rgba(200, 200, 200, 0.15);
  border-radius: 16px;
  border-bottom-left-radius: 0%;
  border-bottom-right-radius: 0%;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  width: calc(100% + 40px);
  margin-left: -20px;
}

@media (min-width: 768px) {

  .app-wrapper.rainy,
  .app-wrapper.sunny,
  .app-wrapper.night,
  .app-wrapper.cloudy,
  .app-wrapper.snowy {
    background-image: none;
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 40px 0;
  }

  .search-bar {
    margin: 0;
    margin-bottom: 40px;
  }

  .hero {
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    gap: 40px;
    padding: 50px 0;
    border-radius: 30px;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &.sunny {
      background-image: url('/images/sunnyDesktop.jpg');
    }

    &.night {
      background-image: url('/images/nightDesktop.jpg');
    }

    &.cloudy {
      background-image: url('/images/cloudyDesktop.jpg');
    }

    &.rainy {
      background-image: url('/images/rainyDesktop.jpg');
    }

    &.snowy {
      background-image: url('/images/snowyDesktop.jpg');
    }
  }

  .weather {
    flex: 0 0 auto;
    text-align: center;
    padding: 0;
  }

  .general-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .glass-panel {
    background: none;
    border-radius: none;
    padding: 0;
    margin: 0;
    width: 100%;
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    box-shadow: none;
    border: none;
  }

  .weather-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin: 40px 0;
    padding: 0 20px;
  }

  .weather-card {
    background: #1e1e1e;
    color: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
    position: relative;
    overflow: hidden;
  }

  .card-label {
    font-size: 14px;
    color: #aaa;
    margin-bottom: 10px;
  }

  .card-value {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .card-icon {
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }

  .hourly-forecast {
    margin-bottom: 10px;
  }

  .error-message {
    background-color: rgba(255, 0, 0, 0.1);
    color: red;
    border: 1px solid red;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    margin: 20px;
  }

}
</style>





<script setup>
import IconHumidity from "./components/icons/IconHumidity.vue";
import DirectionArrow from "./components/icons/IconDirectionArrow.vue";
import IconWindbag from "./components/icons/IconWindbag.vue";


import { defineAsyncComponent, onMounted, ref, shallowRef } from "vue";

import SearchBar from "./components/SearchBar.vue";
import HourlyForecast from "./components/HourlyForecast.vue";
import DailyForecast from "./components/DailyForecast.vue";
import SpinnerLoading from "./components/SpinnerLoading.vue";

import { getWeatherIcon } from "./utils/getIcon";
import { isPastSunset } from "./utils/getTime";

const city = ref("")
const country = ref("")
const temperature = ref(null);
const humidity = ref(0)
const windSpeed = ref(0)
const time = ref('')
const date = ref('')
const icon = shallowRef(null)
const placeData = ref(null)
const weatherData = ref(null)
const description = ref("")
const weatherClass = ref("")
const isLoading = ref(false)
const errorMessage = ref("")

function getWeatherClass() {
  const current = weatherData.value?.current
  if (!current) return null

  const rain = current.rain?.['1h'] || 0
  const snow = current.snow?.['1h'] || 0
  const clouds = current.clouds || 0

  if (snow > 0) {
    weatherClass.value = 'snowy'
  } else if (rain > 0) {
    weatherClass.value = 'rainy'
  } else if (clouds > 75) {
    weatherClass.value = 'cloudy'
  } else {
    let isNight = isPastSunset(current.dt, current.sunrise, current.sunset)
    weatherClass.value = isNight ? 'night' : 'sunny'
  }
}


function setPlace(place) {
  placeData.value = place
  handlePlaceSelection()
}

async function handlePlaceSelection() {
  city.value = placeData.value.name
  country.value = placeData.value.countryName
  const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_KEY

  isLoading.value = true
  errorMessage.value = ""
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${placeData.value.lat}&lon=${placeData.value.lng}&appid=${WEATHER_API_KEY}&exclude=minutely,alerts&units=metric&lang=en`
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error("Не вдалося отримати прогноз погоди")
    } else {
      console.log(data);
      weatherData.value = data
      temperature.value = weatherData.value.current.temp
      humidity.value = weatherData.value.current.humidity
      description.value = translateDescription(weatherData.value.current.weather[0].description)
      windSpeed.value = weatherData.value.current.wind_speed

      updateTime()
      setWeatherIcon()
      getWeatherClass()
    }
  } catch (err) {
    console.log(err)
    errorMessage.value = "Помилка при завантаженні даних. Спробуйте ще раз."
  } finally {
    isLoading.value = false
  }
}



const descriptionTranslation = {
  "clear sky": "Ясно",
  "few clouds": "Невелика хмарність",
  "scattered clouds": "Мінлива хмарність",
  "broken clouds": "Хмарно з проясненнями",
  "overcast clouds": "Хмарно",

  "shower rain": "Короткий дощ",
  "light rain": "Слабкий дощ",
  "moderate rain": "Помірний дощ",
  "heavy intensity rain": "Сильний дощ",
  "very heavy rain": "Дуже сильний дощ",
  "extreme rain": "Надзвичайно сильний дощ",
  "freezing rain": "Крижаний дощ",
  "light intensity shower rain": "Слабкий короткий дощ",
  "heavy intensity shower rain": "Сильний короткий дощ",
  "ragged shower rain": "Зривчастий короткий дощ",
  "drizzle": "Мрячка",
  "light intensity drizzle": "Слабка мрячка",
  "heavy intensity drizzle": "Сильна мрячка",
  "shower rain and drizzle": "Короткий дощ з мрячкою",
  "light drizzle rain": "Слабкий дощ з мрячкою",

  "thunderstorm with light rain": "Гроза з невеликим дощем",
  "thunderstorm with rain": "Гроза з дощем",
  "thunderstorm with heavy rain": "Гроза з сильним дощем",
  "light thunderstorm": "Слабка гроза",
  "thunderstorm": "Гроза",
  "heavy thunderstorm": "Сильна гроза",
  "ragged thunderstorm": "Нестійка гроза",
  "thunderstorm with light drizzle": "Гроза з слабкою мрячкою",
  "thunderstorm with drizzle": "Гроза з мрячкою",
  "thunderstorm with heavy drizzle": "Гроза з сильною мрячкою",

  "light snow": "Слабкий сніг",
  "snow": "Сніг",
  "heavy snow": "Сильний сніг",
  "sleet": "Мокрий сніг",
  "shower sleet": "Короткий мокрий сніг",
  "light shower sleet": "Слабкий короткий мокрий сніг",
  "shower snow": "Короткий сніг",
  "heavy shower snow": "Сильний короткий сніг",
  "light rain and snow": "Слабкий дощ зі снігом",
  "rain and snow": "Дощ та сніг",
  "light shower snow": "Слабкий короткий сніг",


  "mist": "Туман",
  "smoke": "Дим",
  "haze": "Мрячний туман",
  "sand/dust whirls": "Піщана/пилова хмара",
  "fog": "Туман",
  "sand": "Піски",
  "dust": "Пил",
  "volcanic ash": "Вулканічний попіл",
  "squalls": "Шквали",
  "tornado": "Торнадо"
}


function translateDescription(desc) {
  return descriptionTranslation[desc] || desc;
}

function updateTime() {
  const utcDate = new Date();
  const localTimeStr = utcDate.toLocaleTimeString('uk-UA', {
    timeZone: weatherData.value.timezone,
    hour: '2-digit',
    minute: '2-digit',
  })

  const localDateStr = utcDate.toLocaleDateString('uk-UA', {
    timeZone: weatherData.value.timezone,
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  })

  time.value = localTimeStr
  date.value = localDateStr
}


function setWeatherIcon() {
  const iconName = getWeatherIcon(weatherData.value.current)
  icon.value = defineAsyncComponent(() =>
    import(`./components/icons/Icon${iconName}.vue`)
  );
}



function setWindDirection() {
  const current = weatherData.value?.current;
  if (!current || current.wind_deg == null) return '';

  const degrees = current.wind_deg;

  const directions = [
    { label: "Пн", from: 337.5, to: 22.5 },
    { label: "Пн-Сх", from: 22.5, to: 67.5 },
    { label: "Сх", from: 67.5, to: 112.5 },
    { label: "Пд-Сх", from: 112.5, to: 157.5 },
    { label: "Пд", from: 157.5, to: 202.5 },
    { label: "Пд-Зх", from: 202.5, to: 247.5 },
    { label: "Зх", from: 247.5, to: 292.5 },
    { label: "Пн-Зх", from: 292.5, to: 337.5 }
  ];

  let label = "Пн";

  for (const dir of directions) {
    if (
      (dir.from > dir.to && (degrees >= dir.from || degrees < dir.to)) ||
      (degrees >= dir.from && degrees < dir.to)
    ) {
      label = dir.label;
      break;
    }
  }

  return label;
}


onMounted(async () => {

  const currentDate = new Date()
  const secondsUntilNextMinute = 60 - currentDate.getSeconds()

  setTimeout(() => {
    updateTime()

    setInterval(updateTime, 60 * 1000)
  }, secondsUntilNextMinute * 1000)

  setInterval(handlePlaceSelection, 5 * 60 * 1000)

  var defaultPlace = "Lutsk"
  const GEONAMES_API_NAME = import.meta.env.VITE_GEONAMES_USERNAME
  isLoading.value = true
  errorMessage.value = ""
  try {
    const response = await fetch(
      `https://secure.geonames.org/searchJSON?q=${defaultPlace}&maxRows=1&username=${GEONAMES_API_NAME}`
    )
    const data = await response.json()

    if (data.geonames && data.geonames.length > 0) {
      setPlace(data.geonames[0])
    } else {
      errorMessage.value = "Не знайдено місто за замовчуванням."
    }
  } catch (err) {
    console.error("GeoNames error:", err)
    errorMessage.value = "Помилка при отриманні початкового місця."
  } finally {
    isLoading.value = false
  }

  window.addEventListener('offline', () => {
    errorMessage.value = "Немає підключення до Інтернету"
  })
  window.addEventListener('online', () => errorMessage.value = "")

})
</script>
