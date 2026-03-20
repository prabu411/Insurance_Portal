// ── Weather & Disruption Simulation Engine ─────────────────────────

const WeatherProfiles = {
  mumbai:    { baseRain: 40, baseAqi: 120, floodFreq: 0.3 },
  delhi:     { baseRain: 15, baseAqi: 280, floodFreq: 0.1 },
  bangalore: { baseRain: 20, baseAqi:  80, floodFreq: 0.05 },
  chennai:   { baseRain: 35, baseAqi:  90, floodFreq: 0.25 },
  hyderabad: { baseRain: 25, baseAqi: 130, floodFreq: 0.15 },
  pune:      { baseRain: 22, baseAqi: 100, floodFreq: 0.1  },
};

function getWeather(city, forceDisruption = null) {
  const profile = WeatherProfiles[city] || WeatherProfiles.bangalore;
  const variance = () => (Math.random() - 0.5) * 40;

  let rainfall = Math.max(0, profile.baseRain + variance() + Math.random() * 30);
  let aqi      = Math.max(30, profile.baseAqi + variance() + Math.random() * 80);
  let flood    = Math.random() < profile.floodFreq;
  let temp     = 22 + Math.random() * 15;

  // Force a disruption scenario for demo
  if (forceDisruption === 'rain')  { rainfall = 55 + Math.random() * 30; }
  if (forceDisruption === 'aqi')   { aqi = 210 + Math.random() * 100; }
  if (forceDisruption === 'flood') { flood = true; rainfall = 70; }

  const disruptions = [];
  if (rainfall > 50)  disruptions.push({ type: 'rain',  value: rainfall.toFixed(1), unit: 'mm' });
  if (aqi > 200)      disruptions.push({ type: 'aqi',   value: Math.round(aqi),     unit: 'AQI' });
  if (flood)          disruptions.push({ type: 'flood', value: 1,                   unit: 'alert' });

  return {
    city,
    rainfall:    rainfall.toFixed(1),
    aqi:         Math.round(aqi),
    flood,
    temp:        temp.toFixed(1),
    humidity:    Math.round(50 + Math.random() * 40),
    windSpeed:   (5 + Math.random() * 25).toFixed(1),
    condition:   getCondition(rainfall, aqi, flood),
    disruptions,
    timestamp:   new Date().toISOString(),
  };
}

function getCondition(rain, aqi, flood) {
  if (flood)      return { label: '🌊 Flood Alert',    cls: 'alert-danger'  };
  if (rain > 50)  return { label: '⛈️ Heavy Rain',     cls: 'alert-danger'  };
  if (rain > 25)  return { label: '🌧️ Moderate Rain',  cls: 'alert-warning' };
  if (aqi > 200)  return { label: '😷 Hazardous AQI',  cls: 'alert-danger'  };
  if (aqi > 150)  return { label: '😮 Poor AQI',       cls: 'alert-warning' };
  return               { label: '☀️ Clear',            cls: 'alert-success' };
}

function getAqiLabel(aqi) {
  if (aqi <= 50)  return { label: 'Good',      cls: 'tag-success' };
  if (aqi <= 100) return { label: 'Moderate',  cls: 'tag-info'    };
  if (aqi <= 150) return { label: 'Unhealthy', cls: 'tag-warning' };
  if (aqi <= 200) return { label: 'Very Unhealthy', cls: 'tag-warning' };
  return               { label: 'Hazardous',   cls: 'tag-danger'  };
}

// Simulated 7-day historical rainfall for chart
function getWeeklyRainfall(city) {
  const profile = WeatherProfiles[city] || WeatherProfiles.bangalore;
  return Array.from({ length: 7 }, () =>
    Math.max(0, profile.baseRain + (Math.random() - 0.4) * 50).toFixed(0)
  );
}
