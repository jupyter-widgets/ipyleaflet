# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

from traittypes import Dataset
from traitlets import Unicode, Bool, Dict, Float, List

from .leaflet import Layer
from .xarray_ds import ds_x_to_json


class Velocity(Layer):
    """Velocity class, with Layer as parent class

    To visualize the direction and intensity of arbitrary velocities

    Attributes
    ----------
    data: dataset, default Empty dataset
        Underlying dataset
    zonal_speed: string, default ''
        Variable name in underlying dataset for the zonal speed.
    meridional_speed: string, default ''
       Variable name in underlying dataset for the meridional speed.
    latitude_dimension: string, default Empty dataset.
        Name of the latitude dimension in underlying dataset.
    longitude_dimension: string, default True
        Name of the longitude dimension in underlying dataset.
    units: string, default None
        Whether to show imperial units.
    display_values: bool, default True
        Display velocity data on mouse hover.
    display_options: dict, default {}
        Display options.
    min_velocity: float, default 0
        Used to align color scale
    max_velocity: float, default 10.0
        Used to align color scale.
    velocity_scale: float, 0.005
        To be modified for particle animations.
    color_scale: array, default []
        Array of hex/rgb colors for user-specified color scale.
    """

    _view_name = Unicode("LeafletVelocityView").tag(sync=True)
    _model_name = Unicode("LeafletVelocityModel").tag(sync=True)

    zonal_speed = Unicode("", help="Name of the zonal speed in the dataset")
    meridional_speed = Unicode("", help="Name of the meridional speed in the dataset")
    latitude_dimension = Unicode(
        "latitude", help="Name of the latitude dimension in the dataset"
    )
    longitude_dimension = Unicode(
        "longitude", help="Name of the longitude dimension in the dataset"
    )
    units = Unicode(None, allow_none=True)

    data = Dataset().tag(dtype=None, sync=True, to_json=ds_x_to_json)

    # Options
    display_values = Bool(True).tag(sync=True, o=True)
    display_options = Dict(
        {
            "velocityType": "Global Wind",
            "position": "bottomleft",
            "emptyString": "No velocity data",
            "angleConvention": "bearingCW",
            "displayPosition": "bottomleft",
            "displayEmptyString": "No velocity data",
            "speedUnit": "kt",
        }
    ).tag(sync=True, o=True)
    min_velocity = Float(0).tag(sync=True, o=True)
    max_velocity = Float(10).tag(sync=True, o=True)
    velocity_scale = Float(0.005).tag(sync=True, o=True)
    color_scale = List(
        [
            "rgb(36,104, 180)",
            "rgb(60,157, 194)",
            "rgb(128,205,193)",
            "rgb(151,218,168)",
            "rgb(198,231,181)",
            "rgb(238,247,217)",
            "rgb(255,238,159)",
            "rgb(252,217,125)",
            "rgb(255,182,100)",
            "rgb(252,150,75)",
            "rgb(250,112,52)",
            "rgb(245,64,32)",
            "rgb(237,45,28)",
            "rgb(220,24,32)",
            "rgb(180,0,35)",
        ]
    ).tag(sync=True, o=True)
