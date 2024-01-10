import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
L.Control.Legend = L.Control.extend({
    options: {
        position: 'bottomright',
    },
});
L.control.legend = function (options) {
    return new L.Control.Legend(options);
};
export class LeafletLegendControlModel extends LeafletControlModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletLegendControlView',
            _model_name: 'LeafletLegendControlModel',
            title: 'Legend',
            legend: {
                'value 1': '#AAF',
                'value 2': '#55A',
                'value 3': '#005',
            },
            position: 'bottomright',
        };
    }
}
export class LeafletLegendControlView extends LeafletControlView {
    initialize(parameters) {
        super.initialize(parameters);
        this.map_view = this.options.map_view;
    }
    async render() {
        this.create_obj();
        this.model.on('change:title', this.titleChanged, this);
        this.model.on('change:position', this.positionChanged, this);
        this.model.on('change:legend', this.legendChanged, this);
    }
    create_obj() {
        let jsLegend = L.control.legend({ position: this.model.get('position') });
        jsLegend.onAdd = () => {
            let jsLegendName = 'leaflet-control-legend';
            let container = L.DomUtil.create('div', jsLegendName);
            this.addContent(container);
            return container;
        };
        this.obj = jsLegend;
    }
    legendChanged() {
        let container = this.obj.getContainer();
        if (container) {
            L.DomUtil.empty(container);
            this.addContent(container);
        }
    }
    positionChanged() {
        this.obj.setPosition(this.model.get('position'));
    }
    titleChanged() {
        let container = this.obj.getContainer();
        let titleContainer = container?.getElementsByTagName('h4')[0];
        if (titleContainer) {
            titleContainer.textContent = this.model.get('title');
        }
    }
    addContent(container) {
        let titleContainer = document.createElement('h4');
        titleContainer.textContent = this.model.get('title');
        container.appendChild(titleContainer);
        let legend = this.model.get('legend');
        for (let legendElement in legend) {
            let icon = document.createElement('i');
            icon.style.backgroundColor = legend[legendElement];
            container.appendChild(icon);
            container.innerHTML += `<p>${legendElement} </p></br>`;
        }
    }
}
//# sourceMappingURL=LegendControl.js.map