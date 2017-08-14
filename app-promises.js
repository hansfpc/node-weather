const yargs = require('yargs');
const axios = require('axios');
const API_KEY = 'a14afb7ba83238be802868a1f38dbc24';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to search weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((res) => {
  if (res.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  let lat = res.data.results[0].geometry.location.lat;
  let lng = res.data.results[0].geometry.location.lng;
  let formattedAddress = res.data.results[0].formatted_address;

  let weatherURL = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;
  console.log(formattedAddress);
  return axios.get(weatherURL);
}).then((res) =>{
  let temperature = res.data.currently.temperature;
  let apparentTemperature = res.data.currently.apparentTemperature;
  console.log(`Its currently ${temperature}. Its feels like ${apparentTemperature}.`)
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(err.message);
  }
});



