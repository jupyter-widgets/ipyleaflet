# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

from traitlets.utils.bunch import Bunch

gibs_attribution = """
Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.
"""

basemaps = Bunch(
    OpenStreetMap=Bunch(
        Mapnik=dict(
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            max_zoom=19,
            attribution='Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            name='OpenStreetMap.Mapnik'
        ),
        BlackAndWhite=dict(
            url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
            max_zoom=18,
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name='OpenStreetMap.BlackAndWhite',
        ),
        DE=dict(
            url='http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
            max_zoom=18,
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name='OpenStreetMap.DE'
        ),
        France=dict(
            url='http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
            max_zoom=20,
            attribution='&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name='OpenStreetMap.France'
        ),
        HOT=dict(
            url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            max_zoom=19,
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            name='OpenStreetMap.HOT'
        )
    ),
    Gaode=Bunch(
        Normal=dict(
            url='http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
            max_zoom=19,
            name='Gaode.Normal'
        ),
        Satellite=dict(
            url='http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            max_zoom=19,
            name='Gaode.Satellite'
        ),
    ),
    OpenTopoMap=dict(
        url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        max_zoom=17,
        attribution='Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        name='OpenTopoMap'
    ),
    Hydda=Bunch(
        Full=dict(
            url='http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
            max_zoom=18,
            attribution='Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name='Hydda.Full'
        ),
        Base=dict(
            url='http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png',
            max_zoom=18,
            attribution='Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name='Hydda.Base'
        ),
    ),
    Esri=Bunch(
        WorldStreetMap=dict(
            url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            max_zoom=20,
            attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
            name='Esri.WorldStreetMap'
        ),
        DeLorme=dict(
            url='http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}',
            min_zoom=1,
            max_zoom=11,
            attribution='Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme',
            name='Esri.DeLorme'
        ),
        WorldTopoMap=dict(
            url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            max_zoom=20,
            attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
            name='Esri.WorldTopoMap'
        ),
        WorldImagery=dict(
            url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            max_zoom=20,
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            name='Esri.WorldImagery'
        ),
        NatGeoWorldMap=dict(
            url='http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
            max_zoom=16,
            attribution='Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
            name='Esri.NatGeoWorldMap'
        ),
    ),
    HikeBike=Bunch(
        HikeBike=dict(
            url='http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
            max_zoom=19,
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name='HikeBike.HikeBike'
        ),
    ),
    MtbMap=dict(
        url='http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
        max_zoom=20,
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &amp; USGS',
        name='MtbMap'
    ),
    CartoDB=Bunch(
        Positron=dict(
            url='http://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            max_zoom=20,
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            name='CartoDB.Positron'
        ),
        DarkMatter=dict(
            url='http://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            max_zoom=20,
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            name='CartoDB.DarkMatter'
        )
    ),
    NASAGIBS=Bunch(
        ModisTerraTrueColorCR=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom=9,
            attribution=gibs_attribution,
            name='NASAGIBS.ModisTerraTrueColorCR'
        ),
        ModisTerraBands367CR=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_Bands367/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom=9,
            attribution=gibs_attribution,
            name='NASAGIBS.ModisTerraBands367CR'
        ),
        ModisTerraBands721CR=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_Bands721/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom=9,
            attribution=gibs_attribution,
            name='NASAGIBS.ModisTerraBands721CR'
        ),
        ModisAquaTrueColorCR=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Aqua_CorrectedReflectance_TrueColor/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom=9,
            attribution=gibs_attribution,
            name='NASAGIBS.ModisAquaTrueColorCR'
        ),
        ModisAquaBands721CR=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Aqua_CorrectedReflectance_Bands721/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom=9,
            attribution=gibs_attribution,
            name='NASAGIBS.ModisAquaBands721CR'
        ),
        ViirsTrueColorCR=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom=9,
            attribution=gibs_attribution,
            name='NASAGIBS.ViirsTrueColorCR'
        ),
        ViirsEarthAtNight2012=dict(
            url='http://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/2012-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png',
            max_zoom=8,
            attribution=gibs_attribution,
            name='NASAGIBS.ViirsEarthAtNight2012'
        ),
        BlueMarble3413=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3413/best/BlueMarble_NextGeneration/default/EPSG3413_500m/{z}/{y}/{x}.jpeg',
            max_zoom=5,
            attribution=gibs_attribution,
            name='NASAGIBS.BlueMarble3413'
        ),
        BlueMarble3031=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3031/best/BlueMarble_NextGeneration/default/EPSG3031_500m/{z}/{y}/{x}.jpeg',
            max_zoom=5,
            attribution=gibs_attribution,
            name='NASAGIBS.BlueMarble3031'
        ),
        BlueMarble=dict(
            url='https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_NextGeneration/default/EPSG3857_500m/{z}/{y}/{x}.jpeg',
            max_zoom=8,
            attribution=gibs_attribution,
            name='NASAGIBS.BlueMarble'
        )
    ),
    Strava=Bunch(
        All=dict(
            url='https://heatmap-external-a.strava.com//tiles/all/hot/{z}/{x}/{y}.png?v=19',
            max_zoom=15,
            attribution='Map tiles by <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name='Strava.All'
        ),
        Ride=dict(
            url='https://heatmap-external-a.strava.com//tiles/ride/hot/{z}/{x}/{y}.png?v=19',
            max_zoom=15,
            attribution='Map tiles <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name='Strava.Ride'
        ),
        Run=dict(
            url='https://heatmap-external-a.strava.com//tiles/run/bluered/{z}/{x}/{y}.png?v=19',
            max_zoom=15,
            attribution='Map tiles by <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name='Strava.Run'
        ),
        Water=dict(
            url='https://heatmap-external-a.strava.com//tiles/water/blue/{z}/{x}/{y}.png?v=19',
            max_zoom=15,
            attribution='Map tiles by <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name='Strava.Water'
        ),
        Winter=dict(
            url='https://heatmap-external-a.strava.com//tiles/winter/hot/{z}/{x}/{y}.png?v=19',
            max_zoom=15,
            attribution='Map tiles by <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name='Strava.Winter'
        )
    ),
    Stamen=Bunch(
        Terrain=dict(
            url='https://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
            attribution=''.join([
                'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
                'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            ]),
            name='Stamen.Terrain',
            min_zoom=0,
            max_zoom=18
        ),
        Toner=dict(
            url='https://stamen-tiles-a.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            attribution=''.join([
                'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
                'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            ]),
            name='Stamen.Toner',
            min_zoom=0,
            max_zoom=20
        ),
        Watercolor=dict(
            url='https://stamen-tiles-a.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
            attribution=''.join([
                'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
                'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            ]),
            name='Stamen.Watercolor',
            min_zoom=1,
            max_zoom=18
        )
    )
)
