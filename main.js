import 'ol/ol.css';
// import response from 'express';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import Select from 'ol/interaction/Select';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';

	// Les styles des formes
let styles = {
  'LineString': new Style({
    stroke: new Stroke({
      color: 'green',
	  lineDash: [4],
      width: 3,
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  })
};

let styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

// const express = require('express');
// const request = require('request');
// const app = express();
// app.use((req, res, next) => {
      // res.header('Access-Control-Allow-Origin', '*');
      // next();
    // });




	// Les formes a afficher
let geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857',
    },
  },
  'features': 
    [
	{"id":1,"type":"Feature","geometry":{"coordinates":[[[0.0,0.0],[0.0,5.0],[8.0,5.0],[8.0,0.0],[0.0,0.0]]],"type":"Polygon"},"attributes":{"etage":{"nom":"rdc"},"numero":5,"fonction":{"nom":"TD"}}}
	// {"id":1,"type":"Feature","geometry":{"coordinates":[[[0.0,0.0],[0.0,5.0],[8.0,5.0],[8.0,0.0],[0.0,0.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":5,"fonction":{"id":2,"nom":"TD"}},{"id":2,"type":"Feature","geometry":{"coordinates":[[[8.0,0.0],[8.0,5.0],[16.0,5.0],[16.0,0.0],[8.0,0.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":4,"fonction":{"id":2,"nom":"TD"}},{"id":3,"type":"Feature","geometry":{"coordinates":[[[16.0,0.0],[16.0,5.0],[24.0,5.0],[24.0,0.0],[16.0,0.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":3,"fonction":{"id":2,"nom":"TD"}},{"id":4,"type":"Feature","geometry":{"coordinates":[[[24.0,0.0],[24.0,5.0],[30.0,5.0],[30.0,0.0],[24.0,0.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":2,"fonction":{"id":2,"nom":"TD"}},{"id":5,"type":"Feature","geometry":{"coordinates":[[[30.0,0.0],[30.0,5.0],[36.0,5.0],[36.0,0.0],[30.0,0.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":1,"fonction":{"id":2,"nom":"TD"}},{"id":8,"type":"Feature","geometry":{"coordinates":[[[0.0,7.0],[0.0,12.0],[15.0,12.0],[15.0,7.0],[0.0,7.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":7,"fonction":{"id":1,"nom":"TP"}},{"id":9,"type":"Feature","geometry":{"coordinates":[[[15.0,7.0],[15.0,12.0],[22.5,12.0],[22.5,7.0],[15.0,7.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":8,"fonction":{"id":1,"nom":"TP"}},{"id":10,"type":"Feature","geometry":{"coordinates":[[[22.5,7.0],[22.5,12.0],[30.0,12.0],[30.0,7.0],[22.5,7.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":9,"fonction":{"id":1,"nom":"TP"}},{"id":26,"type":"Feature","geometry":{"coordinates":[[[0.0,0.0],[0.0,5.0],[8.0,5.0],[8.0,0.0],[0.0,0.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":15,"fonction":{"id":2,"nom":"TD"}},{"id":27,"type":"Feature","geometry":{"coordinates":[[[8.0,0.0],[8.0,5.0],[16.0,5.0],[16.0,0.0],[8.0,0.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":14,"fonction":{"id":2,"nom":"TD"}},{"id":28,"type":"Feature","geometry":{"coordinates":[[[16.0,0.0],[16.0,5.0],[24.0,5.0],[24.0,0.0],[16.0,0.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":13,"fonction":{"id":2,"nom":"TD"}},{"id":29,"type":"Feature","geometry":{"coordinates":[[[24.0,0.0],[24.0,5.0],[32.0,5.0],[32.0,0.0],[24.0,0.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":12,"fonction":{"id":2,"nom":"TD"}},{"id":30,"type":"Feature","geometry":{"coordinates":[[[32.0,0.0],[32.0,5.0],[38.5,5.0],[38.5,0.0],[32.0,0.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":11,"fonction":{"id":1,"nom":"TP"}},{"id":31,"type":"Feature","geometry":{"coordinates":[[[20.0,7.0],[20.0,12.0],[30.0,12.0],[30.0,7.0],[20.0,7.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":19,"fonction":{"id":1,"nom":"TP"}},{"id":32,"type":"Feature","geometry":{"coordinates":[[[10.0,7.0],[10.0,12.0],[20.0,12.0],[20.0,7.0],[10.0,7.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":18,"fonction":{"id":1,"nom":"TP"}},{"id":33,"type":"Feature","geometry":{"coordinates":[[[0.0,7.0],[0.0,12.0],[10.0,12.0],[10.0,7.0],[0.0,7.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":17,"fonction":{"id":1,"nom":"TP"}},{"id":6,"type":"Feature","geometry":{"coordinates":[[[36.0,0.0],[36.0,5.0],[38.5,5.0],[38.5,0.0],[36.0,0.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":5,"nom":"toilettes"}},{"id":7,"type":"Feature","geometry":{"coordinates":[[[0.0,5.0],[0.0,7.0],[30.0,7.0],[30.0,12.0],[36.0,12.0],[36.0,22.5],[45.0,22.5],[45.0,12.5],[55.5,12.5],[55.5,18.5],[48.5,18.5],[48.5,20.5],[57.5,20.5],[57.5,10.5],[45.0,10.5],[45.0,7.5],[38.5,7.5],[38.5,5.0],[0.0,5.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":3,"nom":"couloir"}},{"id":11,"type":"Feature","geometry":{"coordinates":[[[45.0,10.5],[50.0,10.5],[50.0,7.5],[45.0,7.5],[45.0,10.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":12,"type":"Feature","geometry":{"coordinates":[[[50.0,7.5],[50.0,10.5],[55.0,10.5],[55.0,7.5],[50.0,7.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":13,"type":"Feature","geometry":{"coordinates":[[[55.0,7.5],[55.0,10.5],[60.0,10.5],[60.0,7.5],[55.0,7.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":14,"type":"Feature","geometry":{"coordinates":[[[57.5,10.5],[57.5,13.5],[60.0,13.5],[60.0,10.5],[57.5,10.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":15,"type":"Feature","geometry":{"coordinates":[[[57.5,13.5],[57.5,16.5],[60.0,16.5],[60.0,13.5],[57.5,13.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":16,"type":"Feature","geometry":{"coordinates":[[[57.5,16.5],[57.5,19.5],[60.0,19.5],[60.0,16.5],[57.5,16.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":17,"type":"Feature","geometry":{"coordinates":[[[57.5,19.5],[57.5,22.5],[60.0,22.5],[60.0,19.5],[57.5,19.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":18,"type":"Feature","geometry":{"coordinates":[[[54.5,20.5],[54.5,22.5],[57.5,22.5],[57.5,20.5],[54.5,20.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":19,"type":"Feature","geometry":{"coordinates":[[[51.5,20.5],[51.5,22.5],[54.5,22.5],[54.5,20.5],[51.5,20.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":20,"type":"Feature","geometry":{"coordinates":[[[45.0,18.5],[45.0,22.5],[48.5,22.5],[48.5,18.5],[45.0,18.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":4,"nom":"secretariat"}},{"id":21,"type":"Feature","geometry":{"coordinates":[[[48.5,20.5],[48.5,22.5],[51.5,22.5],[51.5,20.5],[48.5,20.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":22,"type":"Feature","geometry":{"coordinates":[[[53.0,12.5],[53.0,15.5],[55.5,15.5],[55.5,12.5],[53.0,12.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":23,"type":"Feature","geometry":{"coordinates":[[[53.0,15.5],[53.0,18.5],[55.5,18.5],[55.5,15.5],[53.0,15.5]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":6,"nom":"bureau"}},{"id":24,"type":"Feature","geometry":{"coordinates":[[[26.0,13.0],[26.0,21.0],[36.0,22.0],[36.0,12.0],[26.0,13.0]]],"type":"Polygon"},"etage":{"id":1,"nom":"rdc"},"numero":0,"fonction":{"id":7,"nom":"amphi"}},{"id":25,"type":"Feature","geometry":{"coordinates":[[[0.0,5.0],[0.0,7.0],[30.0,7.0],[30.0,12.0],[38.5,12.0],[38.5,5.0],[0.0,5.0]]],"type":"Polygon"},"etage":{"id":2,"nom":"1er"},"numero":0,"fonction":{"id":3,"nom":"couloir"}}
	]
   ,
};

let vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject),
});

// vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

let listLayers = new VectorLayer({
  source: vectorSource,
  style: styleFunction,
});


	// Affiche la liste des features
let map = new Map({
  layers: [ listLayers ],
  target: 'map',
  view: new View({
    center: [20, 10],
    zoom: 21,
  }),
});


// fetch("http://localhost:55209", 
		// {
			// method: "GET",
			// headers: {
				// "X-Requested-With": "XMLHttpRequest",
				// "Content-Type": "application/json",
				// "Access-Control-Allow-Origin" : "*",
				// "Access-Control-Expose-Headers" : "Content-Length,API-Key"
			// },
			// mode: 'no-cors'
		// })
      // .then(function (response) { response => response.json(); }) // On récupère la réponse en JSON
      // .then(function (html) {
        // alert("ok");
      // });

//On écoute les clics
map.on('singleclick', function (evt) {
	//Pour chaque salle sous le clic
	map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
		console.log("http://localhost:8081/api/salle/" + feature.id_);
		fetch("http://localhost:8081/api/salle/" + feature.id_, 
		{
			method: "GET",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin" : "*",
				"Access-Control-Expose-Headers" : "Content-Length,API-Key"
			},
			mode: 'cors'
		}).then(
			// On récupère la réponse en JSON
			response => response.json()
		).then(data => {
			// On peut utiliser data de la forme : {"id":1,"type":"Feature","geometry":{"coordinates":[[[0.0,0.0],[0.0,5.0],[8.0,5.0],[8.0,0.0],[0.0,0.0]]],"type":"Polygon"},"attributes":{"etage":{"nom":"rdc"},"numero":5,"fonction":{"nom":"TD"}}}
			alert("OK");
			console.log(data);
			document.getElementById('info_id').innerHTML = data.id;
			document.getElementById('info_etage').innerHTML = data.etage.nom;
			document.getElementById('info_fonction').innerHTML = data.fonction.nom;
			document.getElementById('info_numero').innerHTML = data.numero;
		})
		.catch(e => alert(e))
		
		
		// var invocation = new XMLHttpRequest();
		// invocation.open('GET', "http://localhost:8081/api/salle/" + feature.id_, false);
		// invocation.onreadystatechange = handler;
		// invocation.send(); 
    })
});


		



document.getElementById("buttonEdit").onclick = function() {
	console.log("DUH");
};






