# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#


from traitlets import Unicode, List
from .leaflet import TileLayer



class GeoportalWMTS(TileLayer):
    """GeoportalWMTS class, with TileLayer as parent class


    Attributes
    ----------
    layer_name: string, default "ORTHOIMAGERY.ORTHOPHOTOS"
        name of the layer to show.
    apiKey: string, default "essentiels"
        key to access a given ressource, detailed correspondances are given here : https://geoservices.ign.fr/documentation/services/tableau_ressources
    """

    _view_name = Unicode('LeafletGeoportalWMTSView').tag(sync=True)
    _model_name = Unicode('LeafletGeoportalWMTSModel').tag(sync=True)
    layer_name = Unicode("ORTHOIMAGERY.ORTHOPHOTOS").tag(sync=True, o=True)
    apiKey = Unicode("essentiels").tag(sync=True, o=True)


class GeoportalWMS(TileLayer):
    """GeoportalWMS class, with TileLayer as parent class


    Attributes
    ----------
    layer_name: string, default "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"
        name of the layer to show.
    apiKey: string, default "cartes"
        key to access a given ressource, detailed correspondances are given here : https://geoservices.ign.fr/documentation/services/tableau_ressources
    """

    _view_name = Unicode('LeafletGeoportalWMSView').tag(sync=True)
    _model_name = Unicode('LeafletGeoportalWMSModel').tag(sync=True)
    name = Unicode("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2").tag(sync=True, o=True)
    layers = Unicode("essentiels").tag(sync=True, o=True)
