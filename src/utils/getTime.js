export function formatTime(time, timeZone){
    const utcDate = new Date(time * 1000);
    const localTimeStr = utcDate.toLocaleTimeString('uk-UA', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
    })
  
    return localTimeStr
  }

  export function formatDate(time, timeZone) {
    const utcDate = new Date(time * 1000);
    const now = new Date();
  
    function getDateParts(date) {
      const parts = new Intl.DateTimeFormat('uk-UA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).formatToParts(date);
      const obj = Object.fromEntries(parts.map(p => [p.type, p.value]));
      return {
        year: Number(obj.year),
        month: Number(obj.month),
        day: Number(obj.day)
      };
    }
  
    const target = getDateParts(utcDate);
    const today = getDateParts(now);
    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(now.getDate() + 1);
    const tomorrow = getDateParts(tomorrowDate);
  
    let weekday;
    if (
      target.year === today.year &&
      target.month === today.month &&
      target.day === today.day
    ) {
      weekday = 'Сьогодні';
    } else if (
      target.year === tomorrow.year &&
      target.month === tomorrow.month &&
      target.day === tomorrow.day
    ) {
      weekday = 'Завтра';
    } else {
      weekday = utcDate.toLocaleDateString('uk-UA', {
        timeZone,
        weekday: 'long'
      });
      weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    }
  
    const dateMonth = utcDate.toLocaleDateString('uk-UA', {
      timeZone,
      day: '2-digit',
      month: '2-digit'
    });
  
    return {
      weekday,
      dateMonth
    };
  }
  
export function isPastSunset(time, sunrise, sunset)
{
  if (
    typeof time !== "number" ||
    typeof sunrise !== "number" ||
    typeof sunset !== "number"
  ) {
    return false;
  }

  return time > sunset || time < sunrise;
}