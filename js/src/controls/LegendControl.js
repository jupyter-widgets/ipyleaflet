const L = require('../leaflet.js');
const control = require('./Control.js')

export class LeafletLegendControlModel extends control.LeafletControlModel {
	defaults(){
		return{
			...super.defaults(),
			_model_name : 'LegendModel',
        	_view_name : 'LegendView',
        	_model_module : 'ipyleaflet-legend',
        	_view_module : 'ipyleaflet-legend',
        	_model_module_version : '0.1.0',
        	_view_module_version : '0.1.0',
			title: "",
			legend : {},
			position: 'bottomright'
		}
	}
}


export class LeafletLegendControlView extends control.LeafletControlView{

	initialize(parameters){
		super.initialize(parameters);
		this.map_view = this.options.map_view;
	}

	changed(){
		this.addLegend(this.model.get('title'), this.model.get('position'), this.model.get('legend'))
	}

	render(){
		this.changed();
        this.model.on('change:title', this.changed, this);
        this.model.on('change:position', this.changed, this);
        this.model.on('change:legend', this.changed, this);
	}

	addLegend(title, positionning, legend){
		if(this.obj) this.obj.remove()
		let jsLegend = L.control({position: positionning})

		jsLegend.onAdd = function(map){
			let jsLegendName="leaflet-control-legend"
			let container = L.DomUtil.create('div', jsLegendName)
			let titleContainer = document.createElement('h4')
			titleContainer.textContent =  title
			container.appendChild(titleContainer)

			for ( let legendElement in legend ){
				let icon = document.createElement("i")
				icon.style = `background-color: ${legend[legendElement]}`
				container.appendChild(icon)
				container.innerHTML += `<p>${legendElement} </p></br>`

			}
			return container
		}

		this.obj = jsLegend
		this.obj.addTo(this.map_view.obj)
	}
}
