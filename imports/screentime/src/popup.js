var showTableBtn = document.getElementById('btnShowTable')
var clearTimesBtn = document.getElementById('btnClearTimes');

var errorMessageElement = document.getElementById('errorMessage')
var timeTable = document.getElementById('timeTable')

clearTimesBtn.onclick = function(element){
    var rowCount = timeTable.rows.length;
            for(var x = rowCount-1; x>0; x--){
               timeTable.deleteRow(x) 
            }
    // chrome.storage.local.set({"tabTimesObject": "{}"}, function(){

    // })
}

showTableBtn.onclick = function(element){
    chrome.storage.local.get("tabTimesObject", function(dataCont){
        console.log("dataaa", dataCont);
        var dataString = dataCont["tabTimesObject"];
        if (dataString == null){
            return
        }

        try{
            var data = JSON.parse(dataString)
            var rowCount = timeTable.rows.length;
            for(var x = rowCount-1; x>=0; x--){
               timeTable.deleteRow(x) 
            }
            var entries = [];
            for (var key in data){
                if (data.hasOwnProperty(key)){
                    entries.push(data[key])
                }
            }

            entries.sort(function(e1, e2){
                var e1S = e1["trackedSeconds"]
                var e2S = e2["trackedSeconds"]

                if(isNaN(e1S) || isNaN(e2S)){
                    return 0
                }

                if (e1S > e2S){
                    return 1
                }

                else if (e1S < e2S){
                    return -1
                }

                return 0
            })

            entries.map(function(urlObject){
                var newRow = timeTable.insertRow(0);
                var celHostname = newRow.insertCell(0);
                var celTimeMinutes = newRow.insertCell(1);
                var celTime = newRow.insertCell(2);
                var celLastDate = newRow.insertCell(3)
                // var celFirstDate = newRow.insertCell(4)
                celHostname.innerHTML = urlObject["url"];
                var time_ = urlObject["trackedSeconds"] != null ? urlObject["trackedSeconds"] : 0;
                celTime.innerHTML = Math.round(time_)

                celTimeMinutes.innerHTML = (time_ /60).toFixed(2);
                var date = new Date();

                if (urlObject.hasOwnProperty("lastDateVal")){
                    date.setTime(urlObject["lastDateVal"]);
                    celLastDate.innerHTML = date.toUTCString()

                }else{
                    celLastDate.innerHTML = "date not found";
                }

                if (urlObject.hasOwnProperty("startDateVal")){
                    // date.setTime(urlObject["startDateVal"]);
                    // celFirstDate.innerHTML = date.toUTCString()

                }else{
                    // celFirstDate.innerHTML = "date not found";
                }
                date.setTime(urlObject["lastDateVal"] != null ? urlObject["lastDateVal"]: 0)
   
            })

            var headerRow = timeTable.insertRow(0);
            headerRow.insertCell(0).innerHTML = "Url";
            headerRow.insertCell(1).innerHTML = "Minutes";
            headerRow.insertCell(2).innerHTML = "Tracked Seconds"
            headerRow.insertCell(3).innerHTML = "Last Date"
            // headerRow.insertCell(4).innerHTML = "First Date"
        } catch(err){
            const message = "loading tabTimesObject went wrong: "+ err.toString();
            console.error(message)
            errorMessageElement.innerHTML = message;
            errorMessageElement.innerText = dataString;
        }
    })
}

