const nycURL = 'https://data.cityofnewyork.us/resource/2mby-ccnw.json?$limit=50000'



const workWithData = (data) => {

    
    const collectionList = document.getElementById('collection');

	// how do we get an array of a specific property value (dog breed == Boxer, in this case)
	const instanceIn2021 = data.filter(object => {
        return object.incident_date && object.incident_date.includes('2024');
    });

    const colorMap = {
        "Manhattan": "#780000",
        "Brooklyn": "#C1121F",
        "Queens": "#FDF0D5",
        "Bronx": "#003049",
        "Staten Island": "#669BBC",
        "Outside NYC": "#42404D",
    };

    const filterCountContainer = document.getElementById('filter-count');

    const filterButtonsContainer = document.getElementById('filter-buttons');
    Object.keys(colorMap).forEach(borough => {
        const button = document.createElement('button');
        button.textContent = borough;
        button.style.backgroundColor = colorMap[borough];
        button.classList.add('filter-button');
        button.addEventListener('click', () => filterByBorough(borough));
        filterButtonsContainer.appendChild(button);
    });

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.classList.add('reset-button');
    resetButton.addEventListener('click', resetFilters);
    filterButtonsContainer.appendChild(resetButton);
    
    // Function to filter data by borough color
    function filterByBorough(selectedBorough) {
        const listItems = document.querySelectorAll('.list-data');
        let count = 0;
        listItems.forEach(item => {
            const itemBorough = item.dataset.borough;
            if (itemBorough === selectedBorough) {
                item.style.display = 'block'; // Show items with matching borough
                count++;
            } else {
                item.style.display = 'none'; // Hide items with non-matching borough
            }
        });
        // Update filter count
        updateFilterCount(selectedBorough, count);
    }

    function resetFilters() {
        const listItems = document.querySelectorAll('.list-data');
        listItems.forEach(item => {
            item.style.display = 'block'; // Show all items
        });
        // Reset filter count
        filterCountContainer.innerHTML = '';
    }

    function updateFilterCount(borough, count) {
        filterCountContainer.innerHTML = `<p>Number of ${borough} data: ${count}</p>`;
    }

	instanceIn2021.forEach(object => {

        const borough = object.borough_of_incident_occurrence;
        const boroughColor = colorMap[borough] || "black"; // Get color from colorMap, default to black if not found
        
        console.log(boroughColor)

			const dataDetails =
				`
					<li  id="${object.complaint_id}" class="list-data" style="--default-color: ${boroughColor};" data-borough="${object.borough_of_incident_occurrence}">
						<p class="name" style="opacity:0;">${object.incident_date}</p>
						<div id="list-data-content-${object.complaint_id}" class="list-data-content">
                            <p class="date">Incident Date: <span>${object.incident_date}</span></p>
                            <p class="date">Area: <span>${object.borough_of_incident_occurrence}</span></p>
							<p class="complaint_id">Complaint ID: <span>${object.complaint_id}</span></p>
							<p class="location">Type Of Incident: ${object.location_type_of_incident} </p>
							<p class="reason">Reason for Contact: ${object.reason_for_police_contact}</p>
                            <p class="outcome">Outcome of Police Encounter: ${object.outcome_of_police_encounter} </p>

						</div>
					</li>
				`;
        
            // const boroughColor = colorMap[object.borough_of_incident_occurrence.toUpperCase()] || "black";
			
		// Step 4: Insert our new HTML (stored in itemDetails) into the page (before the end the collectionList element )
    collectionList.insertAdjacentHTML('beforeend', dataDetails); 
    
        
	})

   
    // add events on click 

    // const listData = document.querySelectorAll('.list-data');

    // listData.forEach(data => {
    //   object.addEventListener('click', () => {
    //     object.classList.toggle('is-active');
    //   });
    // });

const listData = document.querySelectorAll('.list-data');
listData.forEach(data => {
    const content = data.querySelector('.list-data-content');
    data.addEventListener('click', () => {
        content.classList.toggle('is-active');
    });
});

    
}
	

fetch(nycURL)
.then(response => response.json())
.then(json => {
    workWithData(json)
})