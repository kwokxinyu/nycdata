

const DATASET_IDENTIFIER = '2mby-ccnw';   // Resource identifier
// const LIMIT = 1000;                         // Limit # of items returned

// 1b
const urlEndpoint = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$limit=${LIMIT}`;

// 1c
let localData = [];

// 1d
const graphEl = document.querySelector('#graph');
const dropdownEl = document.querySelector('#dropdown');
   
    


fetch(urlEndpoint)
  .then(function(response) {
	  return response.json();
  })
  .then(function(data) {
    // 2b
    localData = data;
    parseData(localData);
  });