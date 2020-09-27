/*async function sendO () {
	var gotItem = browser.storage.local.get();
	gotItem.then(gett, errr);
	async function gett (item) {
		if(item["objectToSend"] == undefined){	
			var objectsent = {"is": ['atia']};
			var objectToSend = JSON.stringify(objectsent);
			await browser.storage.local.set({objectToSend});
		}
	}
	function errr (error) {
		// bla bla		
	}
}
sendO();*/
var arrayToChoose = {
	'gm': ['https://mail.google.com/', 'fa','fa-envelope','text-red-500','hover:text-red-600'],
	'fb': ['https://facebook.com/', 'fa','fa-facebook-square','text-blue-500','hover:text-blue-600'],
	'tt': ['https://twitter.com/', 'fa','fa-twitter-square','text-blue-400','hover:text-blue-500'],
	'yt': ['https://youtube.com/', 'fa','fa-youtube','text-red-600','hover:text-red-700']
};
var itemArray = {};
var main = document.querySelector('.main'); // upper part
var links = document.querySelector('.links'); // chosen icons
var choose = document.querySelectorAll('.choose'); // icons to choose

// onclick icon choose function
choose.forEach(item => {
	item.addEventListener('click', iPush);
});
var obj = {}; // obj to push to extension local storage

// choose function
function iPush () {
	var gotItem = browser.storage.local.get();
	gotItem.then(got, err);
	// console.log(this);
	var ipush_this = this;
	function got(item) {
		// console.log(item);
		var key = ipush_this.id;
		var gottenObject;
		if(item["objectToSend"] != undefined){
			gottenObject = JSON.parse(item["objectToSend"]);
		}
		// console.log(gottenObject);
		if (!(key in gottenObject)) { // checks if key is already in storage or not
			obj[key] = ipush_this.classList;
			create(ipush_this);
			console.log(key);
			console.log(gottenObject);
			sendToLocal(gottenObject); // funtion to push to local storage
		}
	}
	function err(error){
		console.log(error);
	}
}

// create link after chosen
function create (item) {
	var a = document.createElement('a');
	var i = item; // appending all info about item to variable i
	item.remove(); // removes item from choose section
	i.classList.add("fa-lg");
	i.removeEventListener('click', iPush); // removing event listener when chosen
	// console.log(links);
	a.href = arrayToChoose[i.id][0]; // see line 1
	a.target = '_blank'; // opens in another tab
	a.appendChild(i);
	links.appendChild(a);
}

// function to send data into the local storage
async function sendToLocal(object) {
	console.log(object);
	var objectToSend = JSON.stringify(object);
	await browser.storage.local.set({objectToSend});
	// console.log(objectToSend);
}

// ___________________________
// get data from local storage
var gettingItem = browser.storage.local.get();
gettingItem.then(onGot, onError);
function onGot(item){ // if no error occurs
	var gotObj = JSON.parse(item["objectToSend"]);
	// console.log(gotObj);
	for(var objs in gotObj) {
		createOnDOM(objs);
	}
}
function onError(error){ // display error if any
	console.log(error);
}
// =============================

// display toggle for choose links 
var butt = document.querySelector('.cross');
butt.addEventListener('click', ()=> {
	var icons = document.querySelector('.icons');
	var txt = document.querySelector('.txt');
	
	if(icons.style.display == 'none') {
		icons.style.display = 'flex';
		butt.innerHTML = '&times;';
		txt.classList.remove('text-sm');
		txt.classList.add('text-lg');
	} else {
		icons.style.display = 'none';
		butt.innerHTML = '&#8690;';
		txt.classList.remove('text-lg');
		txt.classList.add('text-sm');
	}
});

function createOnDOM(data) {
	var a = document.createElement('a');
	var i = document.createElement('i');
	// console.log(data);
	// console.log(arrayToChoose[data]);
	// console.log(arrayToChoose);
	for(var key = 1; key < arrayToChoose[data].length; key++) {
		// console.log(arrayToChoose[data][key]);
		i.classList.add(arrayToChoose[data][key]);
	}
	a.href = arrayToChoose[data][0]; // see line 1
	a.target = '_blank'; // opens in another tab
	a.appendChild(i);
	links.appendChild(a);
}
function cons () {
	console.log(obj);
}
// setInterval(cons, 3000);