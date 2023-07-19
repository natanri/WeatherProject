//These variables going to get the class and Id and change it for the value that we need!
const outcome = document.querySelector('.outcome');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

//In this event I am telling the user that name city and coutry are mandatories
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(nameCity.value === '' || nameCountry === '') {
    ShowError('These fields are requires')
    return;
  }
  API_url(nameCity.value, nameCountry.value)
  //console.log(nameCity.value);
  //console.log(nameCountry.value);

})

//This function call the API, given the key, and those field I requeire
//I used fetch in order to get a promise, first get the data of weatger then parsing it to show them. 
//At the end I put catch error to advise the user if ther is any error from the country or name city
function API_url(city, country){
  const apiKey = '632df3111f20a0f15688a0a00d055cdd';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

  fetch(url)
    .then(data => {
      return data.json();    
    })
    .then(dataJSON => {
      if(dataJSON.cod === '404') {
        ShowErrorError('No found...!');
      } else {
        clearHTML();
        ShowWeather(dataJSON);
      }
      console.log(dataJSON);
    })
    .catch(error => {
      console.log(error);
    })

}//`https://api.openweathermap.org/data/2.5/weather?q=Bogota,Colombia&appid=632df3111f20a0f15688a0a00d055cdd`
//This function take the data of temperature and convert it from kelvin to celsius and show the max and min degrees
//Also, it gets the icon and show an icon according to the weather.
function ShowWeather(data){
  const {name, main:{temp, temp_min, temp_max}, weather: [arr]} = data; 

  const degrees = kelvinToCelsius(temp);
  const Max = kelvinToCelsius(temp_max);
  const Min = kelvinToCelsius(temp_min);
  
  const container = document.createElement('div');
  container.innerHTML = `
    <h5>Weather of ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    <h2>${degrees}°C</h2>
    <p>Max: ${Max}°C</p>
    <p>Min: ${Min}°C</p>
  `;
  
  outcome.appendChild(container);

  /*console.log(name);
  console.log(temp);
  console.log(temp_max);
  console.log(temp_min);
  console.log(arr.icon);*/
}
//This function allow to delete any alert in 3 seconds in order to avoid filling the screen of it
function ShowError(message){
  console.log(message);
  const alert = document.createElement('p');
  alert.classList.add('alert-message');
  alert.innerHTML = message;

  form.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function kelvinToCelsius(temp){
  return parseInt(temp - 273.15);
}

function clearHTML(){
  outcome.innerHTML = '';
}