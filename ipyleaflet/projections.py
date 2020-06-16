from traitlets.utils.bunch import Bunch

projections = Bunch(
    EPSG3857=dict(
        name='EPSG3857',
        custom=False,
    ),
    Earth=dict(
        name='Earth',
        custom=False
    ),
    EPSG3395=dict(
        name='EPSG3395',
        custom=False
    ),
    EPSG4326=dict(
        name='EPSG4326',
        custom=False
    ),
    Base=dict(
        name='Base',
        custom=False
    ),
    Simple=dict(
        name='Simple',
        custom=False
    ),
    EPSG3413=dict(
        name='EPSG3413',
        custom=True,
        proj4def="""+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 +x_0=0 +y_0=0
                 +ellps=WGS84 +datum=WGS84 +units=m +no_defs""",
        origin=[-4194304, 4194304],
        resolutions=[
            16384.0,
            8192.0,
            4096.0,
            2048.0,
            1024.0,
            512.0,
            256.0
        ],
        bounds=[
            [-4194304, -4194304],
            [4194304, 4194304]
        ]
    ),
    EPSG3031=dict(
        name='EPSG3031',
        custom=True,
        proj4def="""+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0
                 +ellps=WGS84 +datum=WGS84 +units=m +no_defs""",
        origin=[-4194304, 4194304],
        resolutions=[
            16384.0,
            8192.0,
            4096.0,
            2048.0,
            1024.0,
            512.0,
            256.0
        ],
        bounds=[
            [-4194304, -4194304],
            [4194304, 4194304]
        ]
    )
)
