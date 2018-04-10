class Bunch(dict):
    """A dict with attribute-access"""

    def __getattr__(self, key):
        try:
            return self.__getitem__(key)
        except KeyError:
            raise AttributeError(key)

    def __setattr__(self, key, value):
        self.__setitem__(key, value)

    def __dir__(self):
        return self.keys()

basemaps = Bunch(
    OpenStreetMap = Bunch(
        Mapnik = dict(
            url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            max_zoom = 19,
            attribution = 'Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            name = 'OpenStreetMap.Mapnik'
        ),
        BlackAndWhite = dict(
            url = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
            max_zoom = 18,
            attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name = 'OpenStreetMap.BlackAndWhite',
        ),
        DE = dict(
            url = 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
            max_zoom = 18,
            attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name = 'OpenStreetMap.DE'
        ),
        France = dict(
            url = 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
            max_zoom = 20,
            attribution = '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name = 'OpenStreetMap.France'
        ),
        HOT = dict(
            url = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            max_zoom = 19,
            attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            name = 'OpenStreetMap.HOT'
       )
    ),
    OpenTopoMap = dict(
        url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        max_zoom = 17,
        attribution = 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        name = 'OpenTopMap'
    ),
    OpenMapSurfer = Bunch(
        Roads = dict(
            url = 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
            max_zoom = 20,
            attribution = 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name = 'OpenMapSurfer.Roads'
        ),
        Grayscale = dict(
            url = 'http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}',
            max_zoom = 19,
            attribution = 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name = 'OpenMapSurfer.Grayscale'
        )
    ),
    Hydda = Bunch(
        Full = dict(
            url = 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
            max_zoom = 18,
            attribution = 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name = 'Hydda.Full'
        ),
        Base = dict(
            url = 'http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png',
            max_zoom = 18,
            attribution = 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name = 'Hydda.Base'
        ),
    ),
    Esri = Bunch(
        WorldStreetMap = dict(
            url = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            max_zoom = 20,
            attribution = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
            name = 'Esri.WoldStreetMap'
        ),
        DeLorme = dict(
            url = 'http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}',
            min_zoom = 1,
            max_zoom = 11,
            attribution = 'Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme',
            name = 'Esri.DeLorme'
        ),
        WorldTopoMap = dict(
            url = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            max_zoom = 20,
            attribution = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
            name = 'Esri.WorldTopoMap'
        ),
        WorldImagery = dict(
            url = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            max_zoom = 20,
            attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            name = 'Esri.WorldImagery'
        ),
        NatGeoWorldMap = dict(
            url = 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
            max_zoom = 16,
            attribution = 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
            name = 'Esri.NatGeoWorldMap'
        ),
    ),
    HikeBike = Bunch(
        HikeBike = dict(
            url = 'http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
            max_zoom = 19,
            attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name = 'HikeBike.HikeBike'
        ),
    ),
    MtbMap = dict(
        url = 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
        max_zoom = 20,
        attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &amp; USGS',
        name = 'MtbMap'
    ),
    CartoDB = Bunch(
        Positron = dict(
            url = 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
            max_zoom = 20,
            attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &amp; USGS',
            name = 'CartoDB.Positron'
        ),
        DarkMatter = dict(
            url = 'http://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            max_zoom = 19,
            attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            name = 'CartoDB.DarkMatter'
        )
    ),
    NASAGIBS = Bunch(
        ModisTerraTrueColorCR = dict(
            url = 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_CorrectedReflectance_TrueColor/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom = 9,
            attribution = 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            name = 'NASAGIBS.ModisTerraTrueColorCR'
        ),
        ModisTerraBands367CR = dict(
            url = 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_CorrectedReflectance_Bands367/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom = 9,
            attribution = 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            name = 'NASAGIBS.ModisTerraBands367CR'
        ),
        ModisTerraBands721CR = dict(
            url = 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_CorrectedReflectance_Bands721/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom = 9,
            attribution = 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            name = 'NASAGIBS.MidsTerraBands721CR'
        ),
        ModisAquaTrueColorCR = dict(
            url = 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Aqua_CorrectedReflectance_TrueColor/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom = 9,
            attribution = 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            name = 'NASAGIBS.ModisAquaTrueColorCR'
        ),
        ModisAquaBands721CR = dict(
            url = 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Aqua_CorrectedReflectance_Bands721/default/%s/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
            max_zoom = 9,
            attribution = 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            name = 'NASAGIBS.ModisAquaBands721CR'
        ),
        ViirsEarthAtNight2012 = dict(
            url = 'http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/2012-08-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
            max_zoom = 8,
            attribution = 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            name = 'BASAGIBS.ViirsEarthAtNight2012'
        )
    ),
    Strava = Bunch(
        All = dict(
            url = 'https://heatmap-external-a.strava.com//tiles/all/hot/{z}/{x}/{y}.png?v=19',
            max_zoom = 15,
            attribution = 'Map tiles by <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name = 'Strava.All'
        ),
        Ride = dict(
            url = 'https://heatmap-external-a.strava.com//tiles/ride/hot/{z}/{x}/{y}.png?v=19',
            max_zoom = 15,
            attribution = 'Map tiles <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name = 'Strava.Ride'
        ),
        Run = dict(
            url = 'https://heatmap-external-a.strava.com//tiles/run/bluered/{z}/{x}/{y}.png?v=19',
            max_zoom = 15,
            attribution = 'Map tiles by <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name = 'Strava.Run'
        ),
        Water = dict(
            url = 'https://heatmap-external-a.strava.com//tiles/water/blue/{z}/{x}/{y}.png?v=19',
            max_zoom = 15,
            attribution = 'Map tiles by <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name = 'Strava.Water'
        ),
        Winter = dict(
            url = 'https://heatmap-external-a.strava.com//tiles/winter/hot/{z}/{x}/{y}.png?v=19',
            max_zoom = 15,
            attribution = 'Map tiles by <a href="https://labs.strava.com/heatmap">Strava 2017</a>',
            name = 'Strava.Winter'
        )
    ),
    Stamen = Bunch(
        Terrain = dict(
            url = 'http://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
            attribution = ''.join([
                'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
                'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            ]),
            name = 'Stamen.Terrain',
            min_zoom = 0,
            max_zoom = 18
        ),
        Toner = dict(
            url = 'http://stamen-tiles-a.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            attribution = ''.join([
                'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
                'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            ]),
            name = 'Stamen.Toner',
            min_zoom = 0,
            max_zoom = 20
        ),
        Watercolor = dict(
            url = 'http://stamen-tiles-a.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
            attribution = ''.join([
                'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
                'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            ]),
            name = 'Stamen.Watercolor',
            min_zoom = 1,
            max_zoom = 18
        )
    )
)
