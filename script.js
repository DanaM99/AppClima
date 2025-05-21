const apiKey = "557dcf99658f5d9373baba71d187e68e";

function buscarClima() {
  const ciudad = document.getElementById("city").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

  fetch(url)
    .then(res => res.json())
    .then(data => mostrarClima(data))
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("weather-result").innerHTML = `<p>Hubo un error al buscar el clima.</p>`;
    });
}

function mostrarClima(data) {
  if (data.cod !== 200) {
    document.getElementById("weather-result").innerHTML = `<p>Ciudad no encontrada.</p>`;
    return;
  }

  const resultado = `
    <h2>${data.name}</h2>
    <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
    <p><strong>Sensación térmica:</strong> ${data.main.feels_like} °C</p>
    <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono del clima" />
    <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
  `;
  document.getElementById("weather-result").innerHTML = resultado;

  const estado = data.weather[0].main.toLowerCase();

switch (estado) {
  case 'clear':
    document.body.style.backgroundImage = "url('img/soleado.jpg')";
    break;
  case 'clouds':
    document.body.style.backgroundImage = "url('img/nublado.jpg')";
    break;
  case 'rain':
    document.body.style.backgroundImage = "url('img/lluvia.jpg')";
    break;
  case 'snow':
    document.body.style.backgroundImage = "url('img/nieve.jpg')";
    break;
  default:
    document.body.style.backgroundImage = "url('img/default.jpg')";
}

}
