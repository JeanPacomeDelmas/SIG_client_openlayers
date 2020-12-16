import 'ol/ol.css';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import Select from 'ol/interaction/Select';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
import Point from 'ol/geom/Point';
import Draw from 'ol/interaction/Draw';
import { transform } from 'ol/proj';

//======= Declarations
// layers : [salles, portes, escaliers, position, path, allPositions]
let map;
let salle_selectionnee;
let mode;
let etage;
let demandePos = false; //true si on doit demander la position a l'utilisateur pour ajouter un qrCode
let newqrcode;
let nomUser;
//variables pour la position
let posX;
let posY;
let posEtage;
let posIdSalle1;
let posIdSalle2;
let urlTestApiSpring = "http://192.168.1.95:8081/api/";
let urlTestOpenLayers = "http://192.168.1.95:1234/";
// let urlTestApiSpring = "http://localhost:8081/api/";
// let urlTestOpenLayers = "http://localhost:1234/";

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

let styleEscaliers = new Style({ 
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
	  radius: 5,
	  fill: new Fill({
			   color: 'red'
			 }),
	  stroke: new Stroke({color: 'red', width: 1}),
	})
});

let stylePath = new Style({ 
	stroke: new Stroke({
      color: 'red',
	  lineDash: [4],
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
});

let stylePoint2 = new Style({
	image: new CircleStyle({
	  radius: 5,
	  fill: new Fill({
			   color: 'lightBlue'
			 }),
	  stroke: new Stroke({color: 'blue', width: 1}),
	})
});

//====== Read URL to know if asking user position
let url = location.href; 
//peut etre .../nom/escalier/1/bas
//peut etre .../nom/porte/1
//peut etre .../nom/addqrc/leqrcode //Ici on ne regarde que celui-la, les autres sont dans la fonction setPositionWithUrl()
//peut etre .../nom/leqrcode
if (url.length > urlTestOpenLayers.length) //S'il y a des parametres
{
	let parametres = url.split("/");
	nomUser = parametres[3];
	let demande = parametres[4];
	if (demande == "addqrc")
	{
		demandePos = true;
		newqrcode = parametres[4];
		//On demande la position a l'utilisateur
		document.getElementById("div_normale").style.display = "none";
		document.getElementById("div_demande_pos").style.display = "inline-block";
	}
}

//====== Get position en fonction de l'URL
function setPositionWithUrl()
{
	let url = location.href;
	if (url.length > urlTestOpenLayers.length) //S'il y a des parametres
	{
		let parametres = url.split("/");
		let typePorte = parametres[4];
		let idPorte = parametres[5];
		let coteEscalier;
		
		if (parametres.length>6);
			coteEscalier = parametres[6];
			
		if (typePorte == "escalier" || typePorte == "porte") //Si on a l'URL .../escalier/1/bas ou .../porte/1
		{
			fetch(urlTestApiSpring+ typePorte +"/" + idPorte, 
			{ method: "GET", "headers" : {
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Headers': "*"}, "mode":"cors"}).then( response =>  response.json()).then(
			r => {
				let entree;
				if (typePorte == "escalier")
				{
					if (coteEscalier == "bas")
					{
						posEtage = r.sortieB.properties.etage.id;
						entree = r.sortieB;
					}
					else if (coteEscalier == "haut")
					{
						posEtage = r.sortieH.properties.etage.id;
						entree = r.sortieH;
					}
					posIdSalle1 = r.salleB.id;
					posIdSalle2 = r.salleH.id;
				}
				else if (typePorte == "porte")
				{
					entree = r.geometry;
					posEtage = r.properties.etage.id;
					posIdSalle1 = r.salle1.id;
					posIdSalle2 = r.salle2.id;
				}
				let m = getMilieuPorte(entree);
				posX = m[0];
				posY = m[1];
				setLayerPosition(map, posX, posY);
				switchToEtage(posEtage);
				
				callAPISavePosUser(posX, posY);
			})
			.catch(e => console.log(e));
		}
		else if (typePorte != "" && typePorte != null) //Si on a un l'URL .../leqrcode 
		{
			fetch(urlTestApiSpring+ "qrcode/" + typePorte, 
			{ method: "GET", "headers" : {
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Headers': "*"}, "mode":"cors"}).then( response =>  response.json()).then(
			r => {
				posEtage = r.etage.id;
				posX = r.position.x;
				posY = r.position.y;
				
				fetch(urlTestApiSpring+ "salle/point/" + posX + "/" + posY + "/etage/" + posEtage, 
				{ method: "GET", "headers" : {'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Headers': "*"}, "mode":"cors"}).then( response =>  response.json()).then(
				r => {
					posIdSalle1 = r.id_;
				});
				
				setLayerPosition(map, posX, posY);
				
				switchToEtage(posEtage);
				
				callAPISavePosUser(posX, posY);
			}).catch(e => console.log(e));
		}
	}
}

function callAPISavePosUser(x, y)
{
	let json = {"username":nomUser,"position":{"type":"Point","x":x,"y":y,"properties":{"id":posEtage,"nom":getNomEtage() }},"etage":{"id":posEtage,"nom":getNomEtage()},"dateDernierScan": new Date()};
	// /utilisateur/{username} : Enregistre les pos des utilisateurs
	fetch(urlTestApiSpring+ "utilisateur/" + nomUser, 
	{ method: "PATCH", "headers" : {'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Headers': "*",
							"X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json"}, "mode":"cors", "body": JSON.stringify(json)}).then( response => response.json()).then(
	r => { }).catch(e => console.log(e));
}

function getMilieuPorte(porte)
{
	let coords = porte["coordinates"];
	let A = coords[0];
	let B = coords[1];
	return [(A[0]+B[0])/2, (A[1]+B[1])/2];
}

//====== Initialisation de la map et des clics
let urls = [
	urlTestApiSpring + "salles", //Layer 0
	urlTestApiSpring + "portes", //Layer 1
	urlTestApiSpring + "escaliers" //Layer 2
];
let urlsFetchs = [];
urls.forEach(function(u) {
	urlsFetchs.push(fetch(u, {"headers" : {
'Access-Control-Allow-Origin': "*",
'Access-Control-Allow-Headers': "*"}, "mode":"cors"}).then(r=>r.json()));
})
//Recuperer les salles, les portes et les escaliers
Promise.all(urlsFetchs)
.then(entities => {
	let listLayers=[];
	//Retour des formes sous json
	entities.forEach(function(entity, i) {
		let geojsonObject = {
			'type': 'FeatureCollection',
			'features' : entity
		};
		let vectorSource = new VectorSource({
		  features: new GeoJSON().readFeatures(geojsonObject),
		});
		
		let c_id;
		switch (i) //On devrait plutot boucler sur les etages dans le cas de + d etages, et creer des couleurs dynamiquement
		{
			case 0: c_id = "salles";
				break;
			case 1: c_id = "portes";
				break;
			case 2: c_id = "escaliers";
				break;
		}
		let style = getStyleLayerById(c_id);
		listLayers.push(new VectorLayer({
			id: c_id,
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
	
	etage = 1;
	switchToEtage(etage);
	
	if (!demandePos) //Comportement de base
	{
		//On écoute les clics
		map.on('singleclick', function (evt) {
			salle_selectionnee = null;
			map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { //Pour chaque salle sous le clic (normalement une seule)
				salle_selectionnee = getSalleById(map, feature.id_);
			});
			majAffichageSalle(salle_selectionnee);
			if (mode=="pathfinding" && salle_selectionnee != null)
				callAPIPath(salle_selectionnee); 
		});
	
		map.removeInteraction(new Select()); //Supprime les selections des qu on fait un clic
		map.addInteraction(new Select()); //Selectionne visuellement une salle des qu on fait un clic
		addLayer(map, "position"); 
		addLayer(map, "path");
		addLayer(map, "allPositions");
		setPositionWithUrl();
	}
	else //Si on est en train de demander la position d'un nouveau qrcode
	{
		//On ajoute une interaction a la map qui affiche un point
		let draw = new Draw({
		  source: new VectorSource({wrapX: false}),
		  type: "Point",
		});
		map.addInteraction(draw);
		
		map.on('singleclick', function (evt) {
			let x = Math.round(10*evt.coordinate[0])/10; //pipe 0 means troncature a l unite
			let y = Math.round(10*evt.coordinate[1])/10;
			// verifier x et y bien dans la map
			fetch(urlTestApiSpring+ "salle/point/" + x + "/" + y + "/etage/" + etage, 
			{ method: "GET", "headers" : {'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Headers': "*"}, "mode":"cors"}).then( response =>  response.json()).then(
			response => {
				if (confirm("Valider la positon à cet endroit ?"))
				{
					let json = {"text": newqrcode,"position":{"type":"Point","x":x,"y":y,"properties":{"id":etage,"nom": getNomEtage()}},"etage":{"id": etage,"nom": nomEtage}};
					// On envoie le nouveau qrcode a la bdd
					fetch(urlTestApiSpring+ "qrcode", 
					{ 
						method: "POST", 
						"headers" : {
							'Access-Control-Allow-Origin': "*",
							'Access-Control-Allow-Headers': "*",
							"X-Requested-With": "XMLHttpRequest",
							"Content-Type": "application/json"}, 
						"mode":"cors",
						"body" : JSON.stringify(json)
					}).then( response =>  response.json()).then(
					r => {
						alert("Votre qrCode a bien été ajouté");
						window.location.href = urlTestOpenLayers+newqrcode;
					});
				}
			}).catch(function(error) {
				alert("Ce point n'est pas valide, veuillez en choisir un autre");
			});
		});
	}
})
.catch(function(error) {
    console.log(error);
});

function majAffichageSalle(salle)
{
	if (salle == null) 
	{
		document.getElementById('info_fonction').innerHTML = "";
		document.getElementById('info_nom').innerHTML = "";
	}
	else
	{
		document.getElementById('info_fonction').innerHTML = salle.get("fonction")["nom"];
		document.getElementById('info_nom').innerHTML = salle.get("nom");
	}
	majAffichageFormEdit(mode, salle);
}

//====== Initialisation de la liste des etages
fetch(urlTestApiSpring + "etages", 
{"headers" : {
'Access-Control-Allow-Origin': "*",
'Access-Control-Allow-Headers': "*"},
"mode":"cors"}
).then( 
	response =>  response.json())
.then(
	etages => {
		let selectEtage = document.getElementById("selectEtage");
		etages.forEach(function(eta){
			let opt = document.createElement("option");
			opt.value = eta.id;
			opt.text = eta.nom;
			selectEtage.appendChild(opt);
		});
		
		selectEtage.addEventListener("change", function(e) {
			etage = selectEtage.value;
			switchToEtage(etage);
		});
	})
.catch(e => console.log(e))

function switchToEtage(numEtage)
{
	etage = numEtage;
	map.getLayers().forEach(function(lay){
		switch (lay.get("id")) //On devrait plutot boucler sur les etages dans le cas de + d etages
		{
			case "portes": 
			case "salles":
				majAffichageCouche(lay);
				break;
			case "escaliers":
				lay.getSource().getFeatures().forEach(function (feature) {
					if (feature.get("etageB")["id"]==numEtage || feature.get("etageH")["id"]==numEtage)
						showFeature(feature, lay.get("id"));
					else
						hideFeature(feature, lay.get("id"));
				});
				break;
			case "position": lay.setVisible(numEtage==posEtage);
				break;
			case "path": 
			case "allPositions":
				majAffichageCouche(lay);
				break;
		}
	});
	document.getElementById("selectEtage").value=numEtage;
}

function getNomEtage()
{
	let sel = document.getElementById("selectEtage");
	return sel.options[sel.selectedIndex].text;
}


//====== Initialisation de la liste des fonctions des salles
fetch(urlTestApiSpring + "fonction_salles", 
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
	if (mode=="pathfinding")
	{
		if (posX != null && posY != null)
		{
			if (salle_selectionnee != null)
				callAPIPath(salle_selectionnee); 
		}
		else
			alert("Scannez un QR-code pour définir votre position");
	}
	else
		majAffichageCouche(getLayerById(map, "path"));		
	
	if (mode == "seeAllUser")
		callAPIAllUsers();
	else
		clearLayerById(map, "allPositions");
});

function majAffichageFormEdit(mode, salle)
{
	if (mode != "editer" || salle == null)
		document.getElementById("div_edit").style.display = "none";
	else
	{
		document.getElementById("div_edit").style.display = "inline-block";
		document.getElementById("input_nom").value = salle.get("nom");
		document.getElementById("selectFonction").value = salle.get("fonction")["nom"];
	}
}

//====== Action edition d'une salle
document.getElementById("buttonValiderModif").addEventListener("click", function (e) {
	// salle_selectionnee.get("nom") = document.getElementById("input_nom").value;
	// salle_selectionnee.get("fonction").get("nom") = document.getElementById("selectFonction").value;
	//salle_selectionnee est de type Feature, pas JSON. Pour eviter de devoir reecrire tout le JSON, je fais un appel a l'API
	if (salle_selectionnee!=null)
	fetch(urlTestApiSpring + "salle/" + salle_selectionnee.id_, 
	{
		"method": "GET",
		"headers" : {
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		'Access-Control-Allow-Origin': "*",
		'Access-Control-Allow-Headers': "*"},
		"mode":"cors"
	}).then( response =>  response.json())
	.then(
		salleJSON => {
			salleJSON.properties.nom = document.getElementById("input_nom").value;
			salleJSON.properties.fonction.nom = document.getElementById("selectFonction").value;
			fetch(urlTestApiSpring + "salle/" + salle_selectionnee.id_, 
			{
				"method": "PATCH",
				"headers" : {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Headers': "*"},
				"mode":"cors",
				"body": JSON.stringify(salleJSON)
			}).then( function (r) { alert("Modification effectuee"); document.location.reload(); } )
			.catch(e => console.log(e))
		}
	)
	.catch(e => console.log(e)) 	
});

function getSalleById(map, idSalle)
{
	let res = null;
	getLayerById(map, "salles").getSource().getFeatures().forEach(function (feature) {
		if (feature.id_==idSalle)
			res = feature;
	});
	return res;
}


//====== Ajouter/Supprimer/Modifier couche
function addLayer(map, id, vectorSource=null)
{
	if (vectorSource==null)
	{
		let geojsonObject = {
			'type': 'FeatureCollection',
			'features' : []
		};
		vectorSource = new VectorSource({
		  features: new GeoJSON().readFeatures(geojsonObject),
		});
	}
	let layerPos = new VectorLayer({
		id: id,
		source: vectorSource,
		style: getStyleLayerById(id)
	})
	map.addLayer(layerPos);
}
function deleteLayer(map, id)
{
	map.removeLayer(getLayerById(map, id));
}
function getLayerById(map, id)
{
	let res = null;
	map.getLayers().forEach(function(lay){
		if (lay.get("id") == id)
			res = lay;
	});
	return res;
}
function clearLayerById(map, id)
{
	map.getLayers().forEach(function(lay){
		if (lay.get("id") == id)
		{
			clearLayer(lay);
			return;
		}
	});
}
function clearLayer(lay)
{
	lay.getSource().clear();
}

//Affiche les features d'une couche en fonction de leur etage
function majAffichageCouche(lay)
{
	lay.getSource().getFeatures().forEach(function (feature) {
		if (feature.get("etage")["id"]==etage)
			showFeature(feature, lay.get("id"));
		else
			hideFeature(feature, lay.get("id"));
	});
}

//====== Maj couche Localisation
function setLayerPosition(map, x, y)
{
	let lay = getLayerById(map, "position");
	lay.getSource().addFeature(
		new Feature({
		  geometry: new Point([x,y])
		})
	);
}

//====== Couche Path
function callAPIPath(salleDestination)
{
	if (posX == null || posY == null)
		return;
	let idSalleDestination = salleDestination.id_;
	if (salleDestination.getProperties()["fonction"]["nom"] == "couloir" || posIdSalle1 == idSalleDestination || posIdSalle2 == idSalleDestination) //Si on ne clique pas dans un couloir, ni une salle adjacente a la porte sur laquelle on se trouve, ni la salle dans laquelle on est
	{
		setLayerPath(map, []); //Effacer le path
		return;
	}
	let	urlFetch = urlTestApiSpring + "trajet/position/" + posX + "/"+ posY + "/etage/" + posEtage + "/salle/" + idSalleDestination; //trajet/position/{x}/{y}/etage/{idEtage}/salle/{idSalle}

	fetch(urlFetch,
	{"headers" : {
	'Access-Control-Allow-Origin': "*",
	'Access-Control-Allow-Headers': "*"},
	"mode":"cors"}
	).then( 
		response =>  response.json())
	.then(
		listeLines => {
			listeLines = convertListeLines(listeLines);
			setLayerPath(map, listeLines);
		})
	.catch(e => console.log(e))
}

function convertListeLines(listeLines)
{
	let res = [];
	listeLines.forEach(line => {
		res.push({"type":"Feature", "properties": line.properties, "geometry":{"type":"LineString", "coordinates":line.coordinates}});
	});
	return res;
}

function setLayerPath(map, listeLines)
{
	deleteLayer(map, "path");
	
	let geojsonObject = {
		'type': 'FeatureCollection',
		'features' : listeLines
	};
	let vectorSource = new VectorSource({
	  features: new GeoJSON().readFeatures(geojsonObject),
	});
	addLayer(map, "path", vectorSource);
	majAffichageCouche(getLayerById(map, "path"));
}

//====== Couche all pos users
function callAPIAllUsers()
{
	fetch(urlTestApiSpring + "/utilisateurs",
	{"headers" : {
	'Access-Control-Allow-Origin': "*",
	'Access-Control-Allow-Headers': "*"},
	"mode":"cors"}
	).then( 
		response =>  response.json())
	.then(
		listeUsers => {
			setLayerAllPos(map, listeUsers);
		})
	.catch(e => console.log(e))
} 

function setLayerAllPos(map, listePoints)
{	
	let lay = getLayerById(map, "allPositions");
	listePoints.forEach(point => {
		lay.getSource().addFeature(
			new Feature({
				geometry: new Point([point.position.x, point.position.y]),
				properties: point.properties
			})
		);
	});
	
}

//====== Feature 
function hideFeature(feature, idLayer)
{
	feature.setStyle(new Style(null)); 
}
function showFeature(feature, idLayer)
{
	let style = getStyleLayerById(idLayer);
	feature.setStyle(style); 
}
function getStyleLayerById(idLayer)
{
	switch (idLayer)
	{
		case "salles": return styleSalles;
		case "portes": return stylePortes;
		case "escaliers": return styleEscaliers;
		case "position": return stylePoint;
		case "path": return stylePath;
		case "allPositions": return stylePoint2;
	}
}

function setLayerPath(map, listeLines)
{
	deleteLayer(map, "path");
	let geojsonObject = {
		'type': 'FeatureCollection',
		'features' : listeLines
	};
	let vectorSource = new VectorSource({
	  features: new GeoJSON().readFeatures(geojsonObject),
	});
	addLayer(map, "path", vectorSource);
	majAffichageCouche(getLayerById(map, "path"));
}




