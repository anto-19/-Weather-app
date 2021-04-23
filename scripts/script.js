const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUi = data => {
   const { cityDets, weather } = data;
   details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;
   const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
   icon.setAttribute('src', iconSrc);

   let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
   time.setAttribute('src', timeSrc);

   if (card.classList.contains('d-none')) {
      card.classList.remove('d-none');
   }
};

cityForm.addEventListener('submit', e => {
   e.preventDefault();
   if (cityForm.city.value.length) {
      cityForm.city.classList.remove('error');

      const city = cityForm.city.value.trim();
      cityForm.reset();
      forecast
         .updateCity(city)
         .then(data => updateUi(data))
         .catch(err => {
            console.warn(err);
            alert('Please enter a valid Ciry ');
         });
      localStorage.setItem('city', city);
   } else {
      cityForm.city.classList.add('error');
   }
});

if (localStorage.getItem('city')) {
   forecast
      .updateCity(localStorage.getItem('city'))
      .then(data => updateUi(data))
      .catch(err => console.warn(err));
}
