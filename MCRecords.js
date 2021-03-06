
let list = document.getElementById('dateList');
let submitbtn = document.getElementById('submitbtn');
let sortbtn = document.getElementById('sortbtn');
window.onload = function(){
  chrome.storage.sync.get('dates', function(data){
    console.log("loading date data");
    for(var i = 0; i < data.dates.length; i++){
      var lists = document.createElement('ul');
      lists.ondrop=function(){
        drop(event);
      }
      lists.innerHTML = data.dates[i];
      var dbutton = document.createElement('button');
      dbutton.id="datebtn"+i;
      dbutton.innerHTML='delete';
      dbutton.value = i;
      dbutton.onclick = function(){
        deleteDate(this.value);
        console.log("clicked");
      };
      lists.appendChild(dbutton);
      list.appendChild(lists);
    }

  });
}
submitbtn.onclick = function(){
  let datevalue = document.getElementById('pday');
  if(datevalue.value){
    console.log(datevalue.value);
    //due to new Date from datevalue would subtract i day for somehow
    let newDate = new Date(datevalue.value);
    newDate.setDate(newDate.getDate()+1);
    chrome.storage.sync.get('dates', function(data){
      data.dates.push(newDate.toLocaleDateString());
      data.dates.sort(function(a, b){
        return new Date(b) - new Date(a);
      });
      chrome.storage.sync.set({dates:data.dates});
    location.reload();
    });
  }
}
function deleteDate(i){
  chrome.storage.sync.get('dates', function(data){
    console.log("deleting dates");
    data.dates.splice(i, 1);
    chrome.storage.sync.set({dates:data.dates});
    chrome.storage.sync.set({nextDate:null});
    console.log("delete finish");
    location.reload();
  });
}
