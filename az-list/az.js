var azAPI = "https://lgapi-us.libapps.com/1.1/assets?site_id=103&key=83d416dc1ba38e91c12fee5de29a4527&asset_types=10&expand=az_types,subjects";
var region = 'Central Indiana Region';

function azData(url) {
	return $.get(url, function(data) {
		return data
	});
}

function objectToListItem(azObject) {
	return `<li><a href="${azObject.url}" target="_blank">${azObject.name}</a><br/><div class="az-description"><p>${azObject.description}</p></div></li>`
}

function arrayToListItems(alphaArray) {
	let databaseList = `<ul>`;
	alphaArray.forEach(function(database) {
		const listItem = objectToListItem(database);
		databaseList += listItem;
	});
	databaseList += `</ul>`; 
	return databaseList;
}

azData(azAPI).then( (data) => {
	var regionDBs = _.filter(data, (['az_types[0].name', region]));
	var alphaList = _.orderBy(regionDBs, [database => database.name.toLowerCase()], ['asc']);
	$('#staff-alpha').append( arrayToListItems(alphaList) );
});
//at the moment, this works. it appends the alphabetized list to the appropriate div on the testing page
