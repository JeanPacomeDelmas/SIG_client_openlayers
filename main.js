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

//======= Declarations
let listLayers = [];

//======= Styles
let styleSalles = new Style({ 
	stroke: new Stroke({
      color: 'blue',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
});

let stylePortes = new Style({ 
	stroke: new Stroke({
      color: 'blue',
	  lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
}); 

let styleSalles2 = new Style({ 
	stroke: new Stroke({
      color: 'green',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
});

let stylePortes2 = new Style({ 
	stroke: new Stroke({
      color: 'green',
	  lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
}); 

let styleEscalier = new Style({ 
	stroke: new Stroke({
      color: 'brown',
	  lineDash: [4],
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
}); 

let stylePoint = new Style({
	image: new CircleStyle({
	  radius: 3,
	  fill: null,
	  stroke: new Stroke({color: 'red', width: 1}),
	})
});

let stylePath = new Style({ 
	stroke: new Stroke({
      color: 'brown',
	  lineDash: [4],
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
});
 

//====== Initialisation de la map et des clics
let urls = [
	"http://localhost:8081/api/salle/1",
	"http://localhost:8081/api/salle/2"
];
let urlsFetchs = [];
urls.forEach(function(u) {
	urlsFetchs.push(fetch(u).then(r=>r.json()));
})

Promise.all(urlsFetchs)
.then(entities => {
	//Retour des formes sous json
	entities.forEach(function(entity, i) {
		let geojsonObject = {
			'type': 'FeatureCollection',
			'features' : [entity]
		};
		let vectorSource = new VectorSource({
		  features: new GeoJSON().readFeatures(geojsonObject),
		});
		
		let style;
		if (i==0) style = styleSalles;
		else if (i==1) style = stylePortes;
		else style = styleEscalier;
		listLayers.push(new VectorLayer({
			id: i,
			source: vectorSource,
			style: style,
		}));
	});
	
	// Affiche la liste des features
	let map = new Map({
	  layers: listLayers,
	  target: 'map',
	  view: new View({
		center: [20, 10],
		zoom: 21,
	  })
	});
	
	//On écoute les clics
	map.on('singleclick', function (evt) {
		//Pour chaque salle sous le clic
		map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
			// console.log(layer.get("id"));
			fetch("http://localhost:8081/api/salle/" + feature.id_, { method: "GET" }).then( response =>  response.json()).then(
			salle => {
				document.getElementById('info_id').innerHTML = salle.id;
				document.getElementById('info_etage').innerHTML = salle.etage.nom;
				document.getElementById('info_fonction').innerHTML = salle.fonction.nom;
				document.getElementById('info_numero').innerHTML = (salle.numero==0?"-":salle.numero);
			})
			.catch(e => console.log(e))
		})
	});
	//Selectionne visuellement une salle
	map.removeInteraction(new Select());
	map.addInteraction(new Select());
})
.catch(function(error) {
    console.log(error);
});

//====== Initialisation de la liste des etages
fetch("http://localhost:8081/api/etages", { method: "GET" }).then( response =>  response.json()).then(
	etages => {
		let selectHtml = document.getElementById("etage");
		etages.forEach(function(etage){
			let opt = document.createElement("option");
			opt.value = etage.id;
			opt.text = etage.nom;
			selectHtml.appendChild(opt);
		});
		
		selectHtml.addEventListener("change", function(e) {
			listLayers.forEach(function(lay){
				switch (lay.get("id"))
				{
					case 0: 
						break;
					case 1: lay.setVisible(selectHtml.value!=1)
						break;
				}
			});
			// console.log(selectHtml.value);
			// console.log(layer.get("id"));
		});
	})
.catch(e => console.log(e))


// vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));


let mode = document.getElementById("modeSelection").value;










