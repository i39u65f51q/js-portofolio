const url =
  'http://api.weatherapi.com/v1/current.json?key=87f95b1f1cba48228b043348222504&q=Taiwan&aqi=no';

const weather = document.querySelector('.weather');

fetch(url, { method: 'GET' })
  .then(res => res.json())
  .then(succ => render(succ));

function render(obj) {
  let data = `
  <div class="location">
  <h2>Country:<span>${obj['location'].name}</span></h2>
  <h4>Location: lat: <span>${obj['location'].lat} </span> lon: <span>${obj['location'].lon}</span></h4>
  <h4>LocalTime: <span>${obj['location'].localtime}</span></h4>
</div>
<div class="current">
  <div class="temp">
  <h4>Temp C: <span>${obj['current'].temp_c}</span></h4>
  <h4>Temp F: <span>${obj['current'].temp_f}</span></h4>
  </div>
  <div class="text">
    <h4>${obj['current']['condition'].text}</h4>
    <img src="${obj['current']['condition'].icon}" alt="" />
  </div>
  <h4>Temp last update on: <span>${obj['current'].last_updated}</span></h4>
</div>`;
  console.log(data);
  weather.innerHTML = data;
}
