// create memorial icons
document.getElementById('icons').innerHTML = many_people() + many_bikes() + many_cars();

// mapset up and basemap
var map = L.map('map', {
        scrollWheelZoom: false
  }).setView([40.687221, -73.985103], 11);

var tonerAtt =  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' + '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>';

var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: tonerAtt
  }).addTo(map);

//layer

var peopleStyle = {};
var peopleLayer = L.geoJson(deaths, {
        style: peopleStyle,
        onEachFeature: popUp,
        pointToLayer: style_points
});
peopleLayer.addTo(map); 

function popUp(feature, layer) {
    var content = '<p><b>' + feature.properties.name + '</b>' + if_age(feature.properties.age) + '</p>'
      + '<p>' + feature.properties.date + '</p>'
      + '<p>' + feature.properties.victim_type + '</p>'

    layer.bindPopup(content);
}

function style_points(feature, latlng) {
  var style = {
    radius: 5,
    fillColor: "#e34a33",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  return L.circleMarker(latlng, style);
}

function if_age(age) {
  if (age) {
    return ', age ' + age
  } else {
    return ''
  }
}

//memorial icon functions
function many_bikes() {
  var bikes = ''
  var bike = '&#128690'
  for (var i = 0; i < 20; i++) {
    bikes += (bike + " ");
  }
  return bikes; 
}
// people include the unknowns
function many_people() {
  var people = ''
  var person = '&#128694'
  for (var i = 0; i < 154; i++) {
    people += (person + " ");
  }
  return people; 
}

function many_cars() {
  var cars = ''
  var car = '&#128664'
  for (var i = 0; i < 95; i++) {
    cars += (car + " ");
  }
  return cars; 
}
