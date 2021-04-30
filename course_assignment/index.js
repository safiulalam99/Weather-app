
const tempAPI = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/';
const weatherData = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/';
const wind_speedAPI='http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/';
const wind_directionAPI = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/';
const light_API = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/light/';
const rain_API = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/';
let kind=1;
let sorting = false;

//printing the first view table
 function total_table(dataObjects) {
  let html = '<table id="headster"><tr><th>Number</th><th>Time</th><th>Date</th><th>Measurement Type</th> <th>value</th></tr>';
  let search_value = document.getElementById("searchdata").value;
  if(search_value != ""){
    let filtered_objects = dataObjects.filter(value => Object.keys(value.data)[0].toUpperCase().includes(search_value.toUpperCase()) || search_value.toUpperCase().includes(Object.keys(value.data)[0].toUpperCase()));
    if (filtered_objects.length != 0){
      dataObjects = filtered_objects;
    }   
  }
  //sorting data by value
  if(kind == 1 && sorting){
    dataObjects.sort((a, b) => {
      if(parseFloat(a.data[Object.keys(a.data)[Object.keys(a.data).length - 1]]) > parseFloat(b.data[Object.keys(b.data)[Object.keys(b.data).length - 1]])){
        return 1;
      }
      if(parseFloat(a.data[Object.keys(a.data)[Object.keys(a.data).length - 1]]) < parseFloat(b.data[Object.keys(b.data)[Object.keys(b.data).length - 1]])){
        return -1;
      }
      return 0;
    })
    dataObjects = dataObjects.reverse();
  }
    const l=dataObjects.length;
  for (let i = 0; i < Math.min(50, dataObjects.length); i++) {
      const dataObject = dataObjects[i];
      
      html += `
      <tr>
      <td>${i+1}</td>
      <td>${dataObject.date_time.slice(11,19)}</td>
      <td>${dataObject.date_time.slice(0,10).split("-").reverse().join("-")}</td>
      <td>${Object.keys(dataObject.data)[0]}</td>
      <td>${(parseFloat(Object.values(dataObject.data)[0]).toFixed(2))}</td>   
      </tr>         
              `
             
  }
  html += '</table>';
  return html;
}



// Making a get request using the Fetch API
 function getData(url) {
  fetch(url).then(response => {return response.json()})
                    .then(data => {
                      document.getElementById("dataTable").innerHTML = total_table(data);
                                })
                    .catch(error => console.error('AAARRRGH! ' + error));
}

//function to retrieve all the measurement type data
function getTable(dataObjects,measurement_type,measurement_name) {
  let html1 = '<table><tr><th>Number</th><th>Time</th><th>Date</th><th>'+measurement_name+'</th></tr>';
 
  for (let i = 0; i < 20; i++) {
      let dataObject = dataObjects[i];
      let keys = Object.keys(dataObject);
      html1 += `
      <tr>
      <td>${i+1}</td>
     
                <td>${dataObject.date_time.slice(11,19)}</td>
                <td>${dataObject.date_time.slice(0,10).split("-").reverse().join("-")}</td>
                <td>${dataObject[measurement_type]}</td> 
             </tr>       
              `       
              
  }
  html1 += '</table>';  
  return html1;
}


// Making a get request using the Fetch API
function getTemperature(interval,graph_type) {
  fetch(tempAPI+interval).then(response => {return response.json()})
                    .then(data => {
                      var label="Temperature";
                      document.getElementById("v1").innerHTML= label;
                           document.getElementById("dataTable").innerHTML = getTable(data,"temperature","temperature");
                      const l = data.length;
                 
                      let ar1=[],ar2=[];
                      for (let i = 0; i < l; i++) {
                          const dataObject = data[i];
                          let x=dataObject.date_time.slice(0,10).split("-").reverse().join("-");
                          let y=dataObject.temperature;
                          ar1.push(x);
                          ar2.push(y);
                        }
                        graph1(ar1, ar2,label,graph_type,"temperature");
                    }
                    )
                    .catch(error => console.error('AAARRRGH! ' + error));
}




// Making a get request using the Fetch API
function getWind_speed(interval=" ",graph_type) {
  fetch( wind_speedAPI+interval).then(response => {return response.json()})
                    .then(data => {
                      var label="Wind Speed";
                      document.getElementById("v1").innerHTML= label;
                     document.getElementById("dataTable").innerHTML = getTable(data,"wind_speed","Wind Speed");
                     const l = data.length;
                   
                      let ar1=[],ar2=[];
                      for (let i = 0; i < l; i++) {
                          const dataObject = data[i];
                      
                          let x=dataObject.date_time.slice(0,10).split("-").reverse().join("-");
                          let y=dataObject.wind_speed;
                          ar1.push(x);
                          ar2.push(y);
                        }
                        graph1(ar1, ar2,label,graph_type,"Wind Speed");
                    })
                    .catch(error => console.error('AAARRRGH! ' + error));
}


// Making a get request using the Fetch API
function getWind_direction(interval,graph_type) {
  fetch(wind_directionAPI +interval).then(response => {return response.json()})
                    .then(data => {
                      var label="Wind Direction";
                      document.getElementById("v1").innerHTML= label;
                        document.getElementById("dataTable").innerHTML = getTable(data,"wind_direction","wind Direction");
                        const l = data.length;
                      let ar1=[],ar2=[];
                      for (let i = 0; i < l; i++) {
                          const dataObject = data[i];                          
                          let x=dataObject.date_time.slice(0,10).split("-").reverse().join("-");
                          let y=dataObject.wind_direction;
                          ar1.push(x);
                          ar2.push(y);
                        }
                        graph1(ar1, ar2,label,graph_type,"Wind Direction");
                    })
                    .catch(error => console.error('AAARRRGH! ' + error));
}
//making XMLrequest to learn to work with XMLHttpRequest 
// light
function getLight(interval,graph_type) {
  var req = new XMLHttpRequest();
  req.onreadystatechange=function(){
    if(this.readyState==4 && this.status == 200){
      var data= JSON.parse(this.responseText);
      var label="Light";
      document.getElementById("v1").innerHTML= label;
                        document.getElementById("dataTable").innerHTML = getTable(data,"light","light");
                        const l = data.length;
                      let ar1=[],ar2=[];
                      for (let i = 0; i < l; i++) {
                        const dataObject = data[i];                          
                        let x=dataObject.date_time.slice(0,10).split("-").reverse().join("-");
                        let y=dataObject.light;
                        ar1.push(x);
                        ar2.push(y);
                      }
                      graph1(ar1, ar2,label,graph_type,"light");
    }
  };
  req.open("GET",light_API+interval,true);
  req.send();
}
//rain

function getRain(interval,graph_type){
  var request =new XMLHttpRequest();
  request.onreadystatechange =function(){
    if(this.readyState==4 && this.status ==200){
      var data = JSON.parse(this.responseText);
      var label="Rain";
      document.getElementById("v1").innerHTML= label;
                      document.getElementById("dataTable").innerHTML=  getTable(data,'rain',"Rain");
                      const l=data.length;
                      var ar1=[], ar2=[];
                      for (let i = 0; i < l; i++) {
                      const dataObject=data[i];
                      var date=dataObject.date_time.slice(0,10).split("-").reverse().join("-");
                      var rain= dataObject.rain;
                      ar1.push(date);
                      ar2.push(rain);  
                    }
              graph1(ar1,ar2,label,graph_type,"rain")
                  }
  };
  request.open("GET",rain_API+interval,true)
  request.send();
}


//function to display graph
function graph1(xdata,ydata,label,type,title){
  document.getElementById("chartContainer").innerHTML =`<canvas id="myChart"width="100" height="50"></canvas>`;
 var ctx = document.getElementById('myChart').getContext('2d');
 var purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
purple_orange_gradient.addColorStop(0, 'orange');
purple_orange_gradient.addColorStop(1, 'purple'); 
 var myChart = new Chart(ctx, {
     type: type,
     data: {
         labels: xdata,
         datasets: [{
        
             label: label,
             backgroundColor: "white",
             borderWidth:1,
             hoverBackgroundColor:"rgb(146, 146, 216)",

             data: ydata,
             backgroundColor: [
              purple_orange_gradient,
              ],           
             borderColor: [
              purple_orange_gradient,
             ],
             borderWidth: 1
         }]
     },
     options: {
       title:title,
         
     }
     
 });
 }
    
window.onload=function () {
  changeView(1);
  setInterval(e => getAppropriate(),5000)
  document.getElementById("sorting").addEventListener("click", e => sorting = !sorting)
  document.getElementById("searchdata").addEventListener("keyup", e => getData(weatherData))
}


function select_measurement(measurement_type=" ",interval=" "){
  if(measurement_type=" "){
    measurement_type=document.getElementById("measurements_view").value;
  }
    else{
      interval=document.getElementById("time_view4").value;
    }
    switch(measurement_type){
    case "1":getTemperature(interval,"line");break;
    case "2":getWind_speed(interval,"line");break;
    case "3":getWind_direction(interval,"line");break;
    case "4":getLight(interval,"line");break;
    case "5":getRain(interval,"line");break;
  }
}

function getAppropriate() {
  if(kind == 1){
    getData(weatherData);    
  }

}

function changeView(val){
  kind=val;
  if(val==1){
  document.getElementById("chartContainer").innerHTML =`<canvas id="myChart"width="100" height="50"></canvas>`;
  document.getElementById("interval2").style.display=`none`;
  document.getElementById("interval3").style.display=`none`;
  document.getElementById("interval4").style.display=`none`;
  document.getElementById("viewOptions").style.display=`none`;
  document.getElementById("searchdata").style.display=`inline`;
  document.getElementById("v1").innerHTML= "Weather";
  document.getElementById("sorting").style.display=`inline`;
  document.getElementById("form-group").style.display=`block`;
   
  getData(weatherData);
  }
  else if(val==2){
  document.getElementById("interval2").style.display=`block`;
  document.getElementById("interval3").style.display=`none`;   
  document.getElementById("interval4").style.display=`none`;    
  document.getElementById("searchdata").style.display=`none`;
  document.getElementById("v1").innerHTML= "Temperature";
  document.getElementById("sorting").style.display=`none`;
  document.getElementById("form-group").style.display=`none`;
  getTemperature(' ',"bar");
  }
  else if(val==3){
    document.getElementById("interval3").style.display=`block`;
    document.getElementById("interval2").style.display=`none`;
    document.getElementById("interval4").style.display=`none`;
    document.getElementById("viewOptions").style.display=`none`;
    document.getElementById("searchdata").style.display=`none`;
    document.getElementById("v1").innerHTML= "Wind Speed";

    document.getElementById("sorting").style.display=`none`;
    document.getElementById("form-group").style.display=`none`;
    getWind_speed(' ','bar');
  }
  else if(val==4){
    document.getElementById("viewOptions").style.display=`block`;
    document.getElementById("interval4").style.display=`inline`;
    document.getElementById("interval2").style.display=`none`;
    document.getElementById("interval3").style.display=`none`;
    document.getElementById("searchdata").style.display=`none`;
    document.getElementById("v1").innerHTML= " ";
    document.getElementById("sorting").style.display=`none`;
    document.getElementById("form-group").style.display=`none`;
    getWind_direction(' ',"line");
  }
  else if(val==5){
    document.getElementById("viewOptions").style.display=`block`;
    document.getElementById("interval4").style.display=`inline`;
    document.getElementById("interval2").style.display=`none`;
    document.getElementById("interval3").style.display=`none`;
    document.getElementById("searchdata").style.display=`none`;
    document.getElementById("form-group").style.display=`none`;
    getRain(' ',"line");
  }
}


