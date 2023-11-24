# -*- coding: utf-8 -*-

extensions = [
    'jupyter_sphinx', 'jupyterlite_sphinx', 'sphinx.ext.autodoc', 'sphinx.ext.coverage', 'sphinx.ext.napoleon','sphinx.ext.todo', 'sphinx.ext.viewcode'
]

templates_path = ['_templates']

jupyterlite_contents = [
    "../../examples/europe_110.geo.json",
    "../../examples/bars.json",
    "../../examples/demo.json",
    "../../examples/US_Unemployment_Oct2012.csv",
    "../../examples/US_Unemployment_Oct2012_with_NANS.csv",
    "../../examples/us-states.json",
    "../../examples/AntPath.ipynb",
    "../../examples/AwesomeIcons.ipynb",
    "../../examples/BaseMap.ipynb",
#    "../../examples/CanvasRenderer.ipynb", # no python wheel for shapely
    "../../examples/Choropleth.ipynb",
    "../../examples/Choropleth_with_NANS.ipynb",
#    "../../examples/CountriesGeoJSON.ipynb", # cannot access ./europe_110.geo.json
    "../../examples/CustomProjections.ipynb",
    "../../examples/CustomTMS.ipynb",
#    "../../examples/CustomTileServer.ipynb", # Some problem with flask: 'DummyMod' object has no attribute 'startswith'
    "../../examples/DrawControl.ipynb",
    "../../examples/DropdownControl.ipynb",
    "../../examples/Fullscreen.ipynb",
#     "../../examples/GPX.ipynb", # error installing geopandas (missing wheel for pyproj)
#     "../../examples/GeoData.ipynb", # error installing geopandas (missing wheel for pyproj)
#     "../../examples/GeoData_on_hover.ipynb",  # error installing geopandas (missing wheel for pyproj)
    "../../examples/GeoJSON.ipynb",
#     "../../examples/GeoJson_EU_on_hover.ipynb", # cannot load file europe_110.geo.json
    "../../examples/Heatmap.ipynb",
#     "../../examples/Image_slider.ipynb", # error installing rasterio
#     "../../examples/KML.ipynb", # error installing geopandas
    "../../examples/LayerGroup.ipynb",
    "../../examples/LegendControl.ipynb",
    "../../examples/MagnifyingGlass.ipynb",
    "../../examples/MapContainer.ipynb",
    "../../examples/MapCursorStyle.ipynb",
    "../../examples/MapPanes.ipynb", # This works even though it also needs the europe_110.geo.json, so check example above again!
#     "../../examples/MarkerCluster-GeoJson.ipynb", # error installing geopandas
#    "../../examples/MarkerCluster.ipynb", #error install geopandas
#    "../../examples/Max_zoom.ipynb", # test again - not sure if localtileserver package has problems
    "../../examples/MeasureControl.ipynb",
#     "../../examples/Numpy.ipynb", # error installing reasterio
    "../../examples/Primitives.ipynb",
    "../../examples/Radiation.ipynb",
    "../../examples/ScaleControl.ipynb",
#     "../../examples/SearchControl.ipynb", # error installing shapely. Looks like reading a file works if it is readonly (opened with "r")
    "../../examples/Select-GeoJson.ipynb",
    "../../examples/SplitMap.ipynb",
    "../../examples/TileLayer-loading.ipynb",
    "../../examples/Transform.ipynb",
    "../../examples/VectorTiles.ipynb",
#    "../../examples/Velocity.ipynb", # seems like issues with downloading wind-global.nc dataset? Takes a long time
#    "../../examples/Video.ipynb", # error installing rasterio
#     "../../examples/WKTLayer.ipynb", #error importing shapely
    "../../examples/WMSLayer.ipynb",
#    "../../examples/WealthOfNations.ipynb", # did not install bqplot widget as a federated extension?
    "../../examples/WidgetControl.ipynb",
]
def setup(app):
    app.add_css_file("main_stylesheet.css")

master_doc = 'index'
source_suffix = '.rst'

# General information about the project.
project = 'ipyleaflet'
copyright = '(c) Jupyter Development Team'
author = 'Jupyter Development Team'

exclude_patterns = []
highlight_language = 'python'
pygments_style = 'sphinx'

# Output file base name for HTML help builder.
html_theme = "pydata_sphinx_theme"
#html_theme_path = [pydata_sphinx_theme.get_html_theme_path()]
htmlhelp_basename = 'ipyleafletdoc'
html_static_path = ['_static']
