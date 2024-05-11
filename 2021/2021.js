const nycURL = 'https://data.cityofnewyork.us/resource/2mby-ccnw.json?$limit=50000'



const workWithData = data => {

    console.log(data)
    
    const collectionList = document.getElementById('collection');
	// how do we get an array of a specific property value (dog breed == Boxer, in this case)
	const instanceIn2021 = data.filter(object => {
        return object.incident_date && object.incident_date.includes('2021');
    });

    console.log(instanceIn2021)
	
	// how do i get all the unique instances of something
	const incidentDate = data.map(object => object.indicentdate);
	const uniqueIncidentDates = new Set(incidentDates);
	const arrayUniqueIncidentDates = Array.from(uniqueIncidentDates);

	const uniqueBreedNamesWithValues = data.reduce((newArray, object) => {
		// do something
		const breedname = object.breedname;

		// check if the breedname exists in the new array yet?
		newArray[breedname]
		? newArray[breedname] += 1 // if it is true
		: newArray[breedname] = 1; // if it is false

		return newArray;

	}, {});

	console.log(uniqueBreedNamesWithValues)
	
}

fetch(nycURL)
.then(response => response.json())
.then(json => {
    workWithData(json)
})