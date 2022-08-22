# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#


from traitlets import Unicode
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
