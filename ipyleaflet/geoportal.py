# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.


from traitlets import Unicode, Bool, List, Dict
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

    _view_name = Unicode("LeafletGeoportalWMTSView").tag(sync=True)
    _model_name = Unicode("LeafletGeoportalWMTSModel").tag(sync=True)
    layer = Unicode("ORTHOIMAGERY.ORTHOPHOTOS").tag(sync=True, o=True)
    api_key = Unicode("essentiels").tag(sync=True, o=True)
    format = Unicode("image/jpeg").tag(sync=True, o=True)


class GeoportalLayerSwitcher(Control):
    """GeoportalLayerSwitcher class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalLayerSwitcherView").tag(sync=True)
    _model_name = Unicode("LeafletGeoportalLayerSwitcherModel").tag(sync=True)


class GeoportalSearchEngine(Control):
    """GeoportalSearchEngine class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalSearchEngineView").tag(sync=True)
    _model_name = Unicode("LeafletGeoportalSearchEngineModel").tag(sync=True)
    layer = Unicode("ORTHOIMAGERY.ORTHOPHOTOS").tag(sync=True, o=True)
    api_key = Unicode("essentiels").tag(sync=True, o=True)
    format = Unicode("image/jpeg").tag(sync=True, o=True)
    position = Unicode("topleft").tag(sync=True, o=True)
    collapsed = Bool(True).tag(sync=True, o=True)
    zoomTo = Unicode("auto").tag(sync=True, o=True)
    displayInfo = Bool(True).tag(sync=True, o=True)
    apiKey = Unicode("cartes").tag(sync=True, o=True)
    displayAdvancedSearch = Bool(True).tag(sync=True, o=True)
    resources = List(["PositionOfInterest", "StreetAddress"]).tag(sync=True, o=True)
    advancedSearch = Dict({}).tag(sync=True, o=True)
    geocodeOptions = Dict({}).tag(sync=True, o=True)
    autocompleteOptions = Dict({}).tag(sync=True, o=True)


class GeoportalRoute(Control):
    """GeoportalRoute class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalRouteView").tag(sync=True)
    _model_name = Unicode("LeafletGeoportalRouteModel").tag(sync=True)
    position = Unicode("bottomleft").tag(sync=True)
    collapsed = Bool(True).tag(sync=True)
    exclusions = Dict({"toll": True, "bridge": False, "tunnel": True}).tag(sync=True)
    graphs = List(["Pieton", "Voiture"]).tag(sync=True)
    autocompleteOptions = Dict({}).tag(sync=True)
    routeOptions = Dict({}).tag(sync=True)


class GeoportalMousePosition(Control):
    """GeoportalMousePosition class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalMousePositionView").tag(sync=True)
    _model_name = Unicode("LeafletGeoportalMousePositionModel").tag(sync=True)
    position = Unicode("bottomleft").tag(sync=True)
    collapsed = Bool(False).tag(sync=True)
    displayAltitude = Bool(True).tag(sync=True)
    displayCoordinates = Bool(True).tag(sync=True)
    editCoordinates = Bool(False).tag(sync=True)
    altitude = Dict({}).tag(sync=True)
    serviceOptions = Dict({})
    crs = Unicode().tag(sync=True)
    label = Unicode().tag(sync=True)
    selectedtype = Unicode().tag(sync=True)
    systems = (
        List(
            [
                {crs: "", label: "Lon,Lat", selectedtype: "Geographical"},
                {crs: "", label: "Lambert 93", selectedtype: "Metric"},
            ]
        ).tag(sync=True),
    )
    units = List(["DEC", "DMS"]).tag(sync=True)


class GeoportalElevationPath(Control):
    """GeoportalElevationPath class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalElevationPathView").tag(sync=True)
    _model_name = Unicode("LeafletGeoportalElevationPathModel").tag(sync=True)


class GeoportalIsocurve(Control):
    """GeoportalIsocurve class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalIsocurveView").tag(sync=True)
    _model_name = Unicode("LeafletGeoportalIsocurveModel").tag(sync=True)
    collapsed = (Bool(False).tag(sync=True),)
    methods = (List(["time", "distance"]).tag(sync=True),)
    exclusions = (Dict({}).tag(sync=True),)
    graphs = (List(["Pieton", "Voiture"]).tag(sync=True),)
    isocurveOptions = (Dict({}).tag(sync=True),)
    autocompleteOptions = Dict({}).tag(sync=True)
