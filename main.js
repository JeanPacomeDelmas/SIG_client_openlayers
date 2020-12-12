import 'ol/ol.css';
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
let map;
let salle_selectionnee = "";
let mode;

//======= Styles
let styleSalles = new Style({ 
	stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
});

let stylePortes = new Style({ 
	stroke: new Stroke({
      color: 'blue',
	  lineDash: [4],
      width: 3
    })
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
	"http://localhost:8081/api/salles/etage/1", //Layer 0
	"http://localhost:8081/api/salles/etage/2", //Layer 1
	"http://localhost:8081/api/portes/etage/1", //Layer 2
	"http://localhost:8081/api/portes/etage/2", //Layer 3
	"http://localhost:8081/api/escaliers" //Layer 4
]; //On devrait plutot boucler sur les etages dans le cas de + d etages, et il faudrait aussi un appel escalier/etage/{idetage}
let urlsFetchs = [];
urls.forEach(function(u) {
	urlsFetchs.push(fetch(u, {"headers" : {
'Access-Control-Allow-Origin': "*",
'Access-Control-Allow-Headers': "*"}, "mode":"cors"}).then(r=>r.json()));
})
//Recuperer les salles, les portes et les escaliers
Promise.all(urlsFetchs)
.then(entities => {
	//Retour des formes sous json
	entities.forEach(function(entity, i) {
		let geojsonObject = {
			'type': 'FeatureCollection',
			'features' : entity
		};
		let vectorSource = new VectorSource({
		  features: new GeoJSON().readFeatures(geojsonObject),
		});
		
		let style;
		switch (i) //On devrait plutot boucler sur les etages dans le cas de + d etages
		{
			case 0: style = styleSalles;
				break;
			case 1: style = styleSalles2;
				break;
			case 2: style = stylePortes;
				break;
			case 3: style = stylePortes2;
				break;
			case 4: style = styleEscalier;
				break;
		}
		listLayers.push(new VectorLayer({
			id: i,
			source: vectorSource,
			style: style,
		}));
	});
	
	// Affiche la liste des features
	map = new Map({
	  layers: listLayers,
	  target: 'map',
	  view: new View({
		center: [30, 10],
		zoom: 21,
	  })
	});
	
	switchToEtage(1);
	
	//On écoute les clics
	map.on('singleclick', function (evt) {
		salle_selectionnee = "";
		majAffichageSalle(salle_selectionnee);
		//Pour chaque salle sous le clic
		map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
			fetch("http://localhost:8081/api/salle/" + feature.id_, 
			{ method: "GET", "headers" : {
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Headers': "*"}, "mode":"cors"}).then( response =>  response.json()).then(
			salle => {
				salle_selectionnee = salle;
				majAffichageSalle(salle_selectionnee);
			})
			.catch(e => console.log(e))
			
			if (mode == "editer")
			{
				
			}
		})
		
	});
	//Selectionne visuellement une salle
	map.removeInteraction(new Select());
	map.addInteraction(new Select());
})
.catch(function(error) {
    console.log(error);
});

function majAffichageSalle(salle)
{
	if (salle == "") 
	{
		document.getElementById('info_fonction').innerHTML = "";
		document.getElementById('info_nom').innerHTML = "";
	}
	else
	{
		document.getElementById('info_fonction').innerHTML = salle.fonction.nom;
		document.getElementById('info_nom').innerHTML = salle.nom;
	}
	majAffichageFormEdit(mode, salle);
}

//====== Initialisation de la liste des etages
fetch("http://localhost:8081/api/etages", 
{"headers" : {
'Access-Control-Allow-Origin': "*",
'Access-Control-Allow-Headers': "*"},
"mode":"cors"}
).then( 
	response =>  response.json())
.then(
	etages => {
		let selectEtage = document.getElementById("selectEtage");
		etages.forEach(function(etage){
			let opt = document.createElement("option");
			opt.value = etage.id;
			opt.text = etage.nom;
			selectEtage.appendChild(opt);
		});
		
		selectEtage.addEventListener("change", function(e) {
			switchToEtage(selectEtage.value);
		});
	})
.catch(e => console.log(e))

function switchToEtage(numEtage)
{
	listLayers.forEach(function(lay){
		switch (lay.get("id")) //On devrait plutot boucler sur les etages dans le cas de + d etages
		{
			case 0: lay.setVisible(numEtage==1);
				break;
			case 1: lay.setVisible(numEtage==2);
				break;
			case 2: lay.setVisible(numEtage==1);
				break;
			case 3: lay.setVisible(numEtage==2);
				break;
			// case 4: lay.setVisible(numEtage==1 || numEtage==2); //Inutile, sauf si + d etages 
				// break; 
		}
	});
}


//====== Initialisation de la liste des fonctions des salles
fetch("http://localhost:8081/api/fonction_salles", 
{"headers" : {
'Access-Control-Allow-Origin': "*",
'Access-Control-Allow-Headers': "*"},
"mode":"cors"}
).then( 
	response =>  response.json())
.then(
	fonctions => {
		let selectFonction = document.getElementById("selectFonction");
		fonctions.forEach(function(fonc){
			let opt = document.createElement("option");
			opt.value = fonc.nom;
			opt.text = fonc.nom;
			selectFonction.appendChild(opt);
		});
	})
.catch(e => console.log(e))


//====== Modification de l'affichage lors d'un changement de mode
let selectMode = document.getElementById("selectMode");
selectMode.addEventListener("change", function(e){
	mode = selectMode.value;
	majAffichageFormEdit(mode, salle_selectionnee)
});

function majAffichageFormEdit(mode, salle)
{
	if (mode != "editer" || salle == "")
		document.getElementById("div_edit").style.display = "none";
	else
	{
		document.getElementById("div_edit").style.display = "inline-block";
		document.getElementById("input_nom").value = salle.nom;
		document.getElementById("selectFonction").value = salle.fonction.nom;
	}
}

//====== Action edition d'une salle
document.getElementById("buttonValiderModif").addEventListener("click", function (e) {
	salle_selectionnee.nom = document.getElementById("input_nom").value;
	salle_selectionnee.fonction.nom = document.getElementById("selectFonction").value;
	fetch("http://localhost:8081/api/salle/" + salle_selectionnee.id, 
	{
		"method": "PATCH",
		"headers" : {
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		'Access-Control-Allow-Origin': "*",
		'Access-Control-Allow-Headers': "*"},
		"mode":"cors",
		"body": JSON.stringify(salle_selectionnee) 
	}).then( function (r) { majAffichageSalle(salle_selectionnee); alert("Modification effectuee"); } )
	.catch(e => console.log(e))
});


//====== Ajouter couche Localisation
// let geojsonObject = {
	// 'type': 'FeatureCollection',
	// 'features' : [{}]
// };
// let vectorSource = new VectorSource({
  // features: new GeoJSON().readFeatures(geojsonObject),
// });
// map.addLayer(vectorSource);


// vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));


