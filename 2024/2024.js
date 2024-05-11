const nycURL = 'https://data.cityofnewyork.us/resource/2mby-ccnw.json?$limit=50000'



const workWithData = (data) => {

    console.log(data)
    
    const collectionList = document.getElementById('collection');
	// how do we get an array of a specific property value (dog breed == Boxer, in this case)
	const instanceIn2024 = data.filter(object => {
        return object.incident_date && object.incident_date.includes('2024');
    });

    console.log(instanceIn2024)


	
}

fetch(nycURL)
.then(response => response.json())
.then(json => {
    workWithData(json)
})