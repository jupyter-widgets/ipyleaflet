# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

from traittypes import Dataset
from traitlets import Unicode, Bool, Dict, Float, List, Any, default
from .leaflet import Layer
from .xarray_ds import ds_x_to_json
from branca.colormap import linear


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

    _view_name = Unicode('LeafletVelocityView').tag(sync=True)
    _model_name = Unicode('LeafletVelocityModel').tag(sync=True)

    zonal_speed = Unicode('', help='Name of the zonal speed in the dataset')
    meridional_speed = Unicode('', help='Name of the meridional speed in the dataset')
    latitude_dimension = Unicode('latitude', help='Name of the latitude dimension in the dataset')
    longitude_dimension = Unicode('longitude', help='Name of the longitude dimension in the dataset')
    units = Unicode(None, allow_none=True)

    data = Dataset().tag(dtype=None, sync=True, to_json=ds_x_to_json)

    # Options
    display_values = Bool(True).tag(sync=True, o=True)
    display_options = Dict({
        'velocityType': 'Global Wind',
        'position': 'bottomleft',
        'emptyString': 'No velocity data',
        'angleConvention': 'bearingCW',
        'displayPosition': 'bottomleft',
        'displayEmptyString': 'No velocity data',
        'speedUnit': 'kt'
    }).tag(sync=True)
    min_velocity = Float(0).tag(sync=True, o=True)
    max_velocity = Float(10).tag(sync=True, o=True)
    velocity_scale = Float(0.005).tag(sync=True, o=True)
    colormap = Any(linear.YlOrRd_04)
    color_scale = List([]).tag(sync=True, o=True)

    @default('color_scale')
    def _default_color_scale(self):
        self.color_scale = []

        for i in range(len(self.colormap.colors)):
            rgb_tuple = tuple(str(int(x * 256)) for x in self.colormap.colors[i][:3])
            rgb_tuple_str = " , ".join(rgb_tuple)
            rgb_str = 'rgb(' + rgb_tuple_str + ')'
            self.color_scale.append(rgb_str)

        return self.color_scale
