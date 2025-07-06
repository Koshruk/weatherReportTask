import { isPastSunset } from "./getTime";

const weatherIconMap = {
  800: { day: "DayClear", night: "NightClear" },
  801: { day: "DayCloudy1", night: "NightCloudy1" },
  802: { day: "DayCloudy2", night: "NightCloudy2" },
  803: { day: "DayCloudy3", night: "NightCloudy3" },
  804: { shared: "Cloudy4" }
};

export function getWeatherIcon(data) {
  const weatherID = data.weather?.[0]?.id;
  let iconName = "";

  if (weatherID >= 200 && weatherID < 300) {
    iconName = "Thunderstorm";
    return iconName;
  }

  let snowVolume;
  if (data.snow) {
    if (typeof data.snow === "object" && "1h" in data.snow) {
      snowVolume = data.snow["1h"]; // hourly
      if (snowVolume < 0.5) {
        iconName = "Snowy1";
      } else if (snowVolume < 4) {
        iconName = "Snowy2";
      } else {
        iconName = "Snowy3";
      }
    } else if (typeof data.snow === "number") {
      snowVolume = data.snow; // daily
      if (snowVolume < 2) {
        iconName = "Snowy1";
      } else if (snowVolume < 10) {
        iconName = "Snowy2";
      } else {
        iconName = "Snowy3";
      }
    }
    if (iconName) return iconName;
  }

  // === RAIN ===
  let rainVolume;
  if (data.rain) {
    if (typeof data.rain === "object" && "1h" in data.rain) {
      rainVolume = data.rain["1h"]; // hourly
      if (rainVolume < 0.5) {
        iconName = "Rainy1";
      } else if (rainVolume < 4) {
        iconName = "Rainy2";
      } else {
        iconName = "Rainy3";
      }
    } else if (typeof data.rain === "number") {
      rainVolume = data.rain; // daily
      if (rainVolume < 2) {
        iconName = "Rainy1";
      } else if (rainVolume < 10) {
        iconName = "Rainy2";
      } else {
        iconName = "Rainy3";
      }
    }
    if (iconName) return iconName;
  }

  const time = data.dt;
  const sunrise = data.sunrise;
  const sunset = data.sunset;

  let isNight = isPastSunset(time, sunrise, sunset)

  const iconEntry = weatherIconMap[weatherID];
  if (iconEntry) {
    iconName = iconEntry.shared || (isNight ? iconEntry.night : iconEntry.day);
  } 

  return iconName;
}
