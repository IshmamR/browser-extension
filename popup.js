// console.log("Version 2.0");
var data = {
	'gm': ['https://mail.google.com/', 'fa','fa-envelope','text-red-500','hover:text-red-600'],
	'fb': ['https://facebook.com/', 'fa','fa-facebook-square','text-blue-500','hover:text-blue-600'],
	'tt': ['https://twitter.com/', 'fa','fa-twitter-square','text-blue-400','hover:text-blue-500'],
	'yt': ['https://youtube.com/', 'fa','fa-youtube','text-red-600','hover:text-red-700']
};
// display toggle for choose links
var butt = document.querySelector('.cross');
butt.addEventListener('click', ()=> {
	var icons = document.querySelector('.icons');
	var txt = document.querySelector('.txt');
	if(icons.style.display == 'flex') {
		icons.style.display = 'none';
		butt.innerHTML = '&#8690;';
		txt.classList.remove('text-lg');
		txt.classList.add('text-sm');
	} else {
		icons.style.display = 'flex';
		butt.innerHTML = '&times;';
		txt.classList.remove('text-sm');
		txt.classList.add('text-lg');
	}
});

// ______________START_____________
// get data from local storage
var getDataFromStore = browser.storage.local.get();
getDataFromStore.then(onGot, onError);

function onGot(item){ // if no error occurs
	// console.log(item['links']);
	if (item['links'] == undefined) {
		var object = {}; // if links does not exists in storage, creates an empty object in storage
		sendToLocal(object);
	} else {
		console.log(item['links'] + "--These are the links from storage");
	}
	var linksData = item['links'];
	if ( linksData != {} ) {
		createLinks(linksData); // creates links from storage
		createIconsToChoose(linksData); // sends datas to check with created icons to choose
	}
}
function onError(error){ // display error if any
	console.log(error);
}
// ===============END==============

// _Function to store data in storage
async function sendToLocal(objectToSend) {
	var links = JSON.stringify(objectToSend);
	await browser.storage.local.set({links});
	console.log(links + "--was sent to storage");
}
// _END_____

// Function to create icons to choose
function createIconsToChoose(icon_data) {
	var iconsData = JSON.parse(icon_data);
	var iconsToChoose = document.querySelector('.icons');
	
	for(id in data) {
		if (Object.keys(iconsData).includes(id)) {
			console.log(id + " exists in storage");
		} else {
			console.log(id + " does not exist in storage");
			var i = document.createElement('i');
			var c = data[id];
			for (var j = 1; j < c.length; j++) {
				i.classList.add(c[j]);
			}
			i.classList.add('choose');
			i.setAttribute('data-id', id);
			i.addEventListener('click', linkPush); // function to choose
			iconsToChoose.append(i);
		}
	}
}
createIconsToChoose();
// ___x___

// When icon is clicked this function takes data and creates link on the links section
function linkPush() {
	const linksDiv = document.querySelector('.links');
	var iLink = this;
	iLink.classList.remove('choose');
	iLink.id = iLink.getAttribute('data-id');

	var a = document.createElement('a');
	a.href = data[iLink.id][0];
	a.target = '_blank';
	a.append(iLink);
	linksDiv.append(a);
	// console.log(iLink);
	updateData(iLink); // function to update data in storage
}
// ___***___

// Links to display
function createLinks(linksObject) {
	var object = JSON.parse(linksObject);
	var linksHTML = document.querySelector('.links');
	for(id in object) {
		var a = document.createElement('a');
		var i = document.createElement('i');
		i.id = id;
		for (var j = 1; j < data[id].length; j++) {
			i.classList.add(data[id][j]);
			// console.log(data[id][j]);
		}
		a.href = data[id][0];
		a.target = '_blank';
		a.append(i);
		linksHTML.append(a);
	}
}

// Update data to storage
function updateData(element) {
	// console.log(element.classList);
	
	var getDataFromStorage = browser.storage.local.get();
	getDataFromStorage.then(got, onError);
	
	var element_data = {};
	var element_classes = element.classList;
	var element_id = element.id;
	function got(item) {
		var linksData = item['links'];
		var arr = [];
		arr[0] = data[element_id][0];
		element_classes.forEach(el_class => {
			arr.push(el_class);
		})
		var object1 = JSON.parse(linksData);
		element_data = object1;
		element_data[element_id] = arr;
		// console.log(element_data);
		sendToLocal(element_data);
	}
}



/*
var btn = document.querySelector('#ibtn');
btn.addEventListener('click', ()=> {
	// var dataTest = data;
	// sendToLocal(dataTest);
	console.log("it works!");
});
*/