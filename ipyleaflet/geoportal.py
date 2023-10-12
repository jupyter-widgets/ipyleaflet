# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.


from traitlets import Unicode, Bool, List, Dict, Any
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
    position = Unicode("topright").tag(sync=True, o=True)
    collapsed = Bool(False).tag(sync=True, o=True)
    layers = List([]).tag(sync=True, o=True)


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

    _view_name = Unicode("LeafletGeoportalRouteView").tag(sync=True, o=True)
    _model_name = Unicode("LeafletGeoportalRouteModel").tag(sync=True, o=True)
    api_key = Unicode("essentiels").tag(sync=True, o=True)
    position = Unicode("bottomleft").tag(sync=True, o=True)
    collapsed = Bool(True).tag(sync=True, o=True)
    ssl = Bool(True).tag(sync=True, o=True)
    disableReverse = Bool(False).tag(sync=True, o=True)
    exclusions = Dict({"toll": True, "bridge": False, "tunnel": True}).tag(
        sync=True, o=True
    )
    graphs = List(["Pieton", "Voiture"]).tag(sync=True, o=True)
    autocompleteOptions = Dict({}).tag(sync=True, o=True)
    routeOptions = Dict({}).tag(sync=True, o=True)


class GeoportalMousePosition(Control):
    """GeoportalMousePosition class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalMousePositionView").tag(sync=True, o=True)
    _model_name = Unicode("LeafletGeoportalMousePositionModel").tag(sync=True, o=True)
    api_key = Unicode("essentiels").tag(sync=True, o=True)
    position = Unicode("bottomleft").tag(sync=True, o=True)
    collapsed = Bool(False).tag(sync=True, o=True)
    display_altitude = Bool(False).tag(sync=True, o=True)
    display_coordinates = Bool(True).tag(sync=True, o=True)
    edit_coordinates = Bool(True).tag(sync=True, o=True)
    systems = List([]).tag(sync=True, o=True)
    altitude = Any([]).tag(sync=True, o=True)
    units = List([]).tag(sync=True, o=True)


class GeoportalElevationPath(Control):
    """GeoportalElevationPath class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalElevationPathView").tag(sync=True)
    _model_name = Unicode("LeafletGeoportalElevationPathModel").tag(sync=True)
    api_key = Unicode("essentiels").tag(sync=True, o=True)
    position = Unicode("bottomleft").tag(sync=True, o=True)
    openssl = Bool(True).tag(sync=True, o=True)
    active = Bool(False).tag(sync=True, o=True)
    stylesOptions = Unicode("DEFAULT_STYLES").tag(sync=True, o=True)
    elevationPathOptions = Dict({}).tag(sync=True, o=True)
    displayProfileOptions = Dict({}).tag(sync=True, o=True)


class GeoportalIsocurve(Control):
    """GeoportalIsocurve class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalIsocurveView").tag(sync=True, o=True)
    _model_name = Unicode("LeafletGeoportalIsocurveModel").tag(sync=True, o=True)
    api_key = Unicode("essentiels").tag(sync=True, o=True)
    collapsed = Bool(False).tag(sync=True, o=True)
    methods = List(["time", "distance"]).tag(sync=True, o=True)
    exclusions = Dict({}).tag(sync=True).tag(sync=True, o=True)
    graphs = List(["Pieton", "Voiture"]).tag(sync=True, o=True)
    isocurveOptions = Dict({}).tag(sync=True, o=True)
    autocompleteOptions = Dict({}).tag(sync=True).tag(sync=True, o=True)


class GeoportalReverseGeocode(Control):
    """GeoportalReverseGeocode class, with Control as parent class

    Attributes
    ----------
    """

    _view_name = Unicode("LeafletGeoportalReverseGeocodeView").tag(sync=True, o=True)
    _model_name = Unicode("LeafletGeoportalReverseGeocodeModel").tag(sync=True, o=True)
    api_key = Unicode("essentiels").tag(sync=True, o=True)
    position = Unicode("bottomleft").tag(sync=True, o=True)
    collapsed = Bool(False).tag(sync=True, o=True)
    ssl = Bool(True).tag(sync=True, o=True)
    resources = List([]).tag(sync=True, o=True)
    delimitations = List([]).tag(sync=True, o=True)
    ReverseGeocodeOptions = Dict({}).tag(sync=True).tag(sync=True, o=True)
