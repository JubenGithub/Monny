// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.runtime.onInstalled.addListener(function(){
	var mcDates = [];
	//----------for initialize------
	var d1 = new Date(2018, 11, 04);
	var d2 = new Date(2018, 9, 31);
	let ds1 = d1.toLocaleDateString();
	let ds2 = d2.toLocaleDateString();
	//dates from new to old
	mcDates.push(ds1);
	mcDates.push(ds2);
	chrome.storage.sync.set({dates:mcDates});
	chrome.storage.sync.set({nextDate:'01/05/2019'});
	console.log(mcDates);
	//-------------initialize done------
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
for (key in changes) {
  var storageChange = changes[key];
  console.log('Storage key "%s" in namespace "%s" changed. ' +
              'Old value was "%s", new value is "%s".',
              key,
              namespace,
              storageChange.oldValue,
              storageChange.newValue);
  if(key=="dates"){//if dates got changed, change next date too
	let Date1 = new Date(storageChange.newValue[0]);
	let Date2 = new Date(storageChange.newValue[1]);
	let timeDif = Date1-Date2;
	let resultnDate = new Date(Date1.setMilliseconds(0+timeDif));
	chrome.storage.sync.set({nextDate:resultnDate.toLocaleDateString()});
	console.log(resultnDate);
  }
  if(key == "nextDate"){//if next date changed
  	chrome.alarms.clear('comingWarning', function(isCleared){
  		if(isCleared){
  			console.log("old warning is cleared");
  		}
  	});
  	chrome.alarms.create('comingWarning', {when: new Date(storageChange.newValue)-172800000})//alarm in 2 days before start date
  	chrome.alarms.get('comingWarning', function(alarm){
  		console.log('alarm set');
  		let t = new Date(alarm.scheduledTime);
  		console.log(t.toLocaleDateString());
  	});
  }
}
});
chrome.alarms.onAlarm.addListener(function(alarm){
	if(alarm.name == 'comingWarning'){
		chrome.browserAction.setIcon({path: 'images/comming32.png'});
		chrome.notifications.create('test1', 
		 	{type : "basic",
	    	title : "Warning",
	    	message: "Test For comming",
	    	iconUrl: "images/comming32.png",
	    	requireInteraction: true},function(){
	    		console.log('notification created');
	    	} );
	}
});
