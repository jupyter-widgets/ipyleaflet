# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#


from traitlets import Unicode
from .leaflet import TileLayer



class GeoportalWMTS(TileLayer):
    """Geoportal class, with TileLayer as parent class


    Attributes
    ----------
    """

    _view_name = Unicode('LeafletGeoportalView').tag(sync=True)
    _model_name = Unicode('LeafletGeoportalModel').tag(sync=True)
    name = Unicode("ORTHOIMAGERY.ORTHOPHOTOS").tag(sync=True, o=True)

