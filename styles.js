import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';


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


function getStyleLayerById(idLayer)
{
	switch (idLayer)
	{
		case "salles": return styleSalles;
		case "portes": return stylePortes;
		case "escaliers": return styleEscaliers;
		case "position": return stylePoint;
		case "path": return stylePath;
	}
}