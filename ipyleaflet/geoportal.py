# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#


from traitlets import Unicode
from .leaflet import TileLayer, Control


class GeoportalWMTS(TileLayer):
    """GeoportalWMTS class, with TileLayer as parent class


    Attributes
    ----------
    layer_name: string, default "ORTHOIMAGERY.ORTHOPHOTOS"
        name of the layer to show.
    api_key: string, default "essentiels"
        key to access a given ressource, detailed correspondances are given here : https://geoservices.ign.fr/documentation/services/tableau_ressources
    format: string, default "image/png"
        format of the image
    """

    _view_name = Unicode('LeafletGeoportalWMTSView').tag(sync=True)
    _model_name = Unicode('LeafletGeoportalWMTSModel').tag(sync=True)
    layer = Unicode('ORTHOIMAGERY.ORTHOPHOTOS').tag(sync=True, o=True)
    api_key = Unicode('essentiels').tag(sync=True, o=True)
    format = Unicode('image/jpeg').tag(sync=True, o=True)


class GeoportalLayerSwitcher(Control):
    """GeoportalLayerSwitcher class, with Control as parent class

    Attributes
        ----------
    """

    _view_name = Unicode('LeafletGeoportalLayerSwitcherView').tag(sync=True)
    _model_name = Unicode('LeafletGeoportalLayerSwitcherModel').tag(sync=True)


class GeoportalSearchEngine(Control):
    """GeoportalSearchEngine class, with Control as parent class

    Attributes
        ----------
    """

    _view_name = Unicode('LeafletGeoportalSearchEngineView').tag(sync=True)
    _model_name = Unicode('LeafletGeoportalSearchEngineModel').tag(sync=True)


class GeoportalRoute(Control):
    """GeoportalRoute class, with Control as parent class

    Attributes
        ----------
    """

    _view_name = Unicode('LeafletGeoportalRouteView').tag(sync=True)
    _model_name = Unicode('LeafletGeoportalRouteModel').tag(sync=True)

