let addDatediv = document.getElementById('addDate');
let pDatediv = document.getElementById('pDate');
let nDatediv = document.getElementById('nDate');
window.onload = function(){
	chrome.storage.sync.get(['dates', 'nextDate'], function(data) {
		if(data.dates.length > 0){
			console.log(data.dates[0]); 
			pDatediv.innerHTML = data.dates[0];
		}
		if(data.dates.length>1)//if more previous dates for sampling
		{
			if(data.nextDate){
				console.log('next date exist '+data.nextDate);
				nDatediv.innerHTML = data.nextDate;
			}
		}

	});
}
addDate.onclick = function(element){
	chrome.browserAction.setIcon({path: 'images/get_started32.png'});
    chrome.storage.sync.get('dates', function(data){
    	console.log('add dates');
    	let cDate = new Date();
    	cDate.setMilliseconds(0);
    	cDate.setSeconds(0)
    	cDate.setHours(0);
    	cDate.setMinutes(0);
    	if(data.dates.length>0){
    		console.log(data.dates[0]);
    		let pDate = new Date(data.dates[0]);
    		if(cDate.getTime() != pDate.getTime()){
    			data.dates.unshift(cDate.toLocaleDateString());
    			console.log('add data '+ cDate);
    			while (data.dates.length>15){
    				data.dates.pop();
    			}
    			chrome.storage.sync.set({dates:data.dates});
    		}
    	}
    	else{//no initial date
    		var dateArray = [];
    		dateArray.push(cDate.toLocaleDateString());
    		chrome.storage.sync.set({dates:dateArray});
    	}
    });
	location.reload();
}

