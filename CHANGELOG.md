## v0.19.1

Version 0.19.0 did not contain a valid release on npm. This release is to fix that.

## v0.19.0

### New Features

* feat: introduce leaflet-geoman as an alternative to leaflet-draw by @iisakkirotko in https://github.com/jupyter-widgets/ipyleaflet/pull/1181

### Documentation

* Add colormaps to choropleth docs by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1157
* Marker cluster api docs by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1151

### Maintenance

* Ruff linting by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1158
* Switch to using TypeScript by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1159
* Start adding types by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1160
* Migrate to Hatch by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1166
* Leaflet update by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1164
* Split Python and JavaScript packages by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1168
* Update yarn.lock files by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1170
* Add leaflet as singleton by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1176
* fix: Support for Python 3.8 was removed by @iisakkirotko in https://github.com/jupyter-widgets/ipyleaflet/pull/1180
* fix: outdated installation instructions in README.md by @iisakkirotko in https://github.com/jupyter-widgets/ipyleaflet/pull/1179
* fix: cast this.get_options to support @types/leaflet@1.9.9 by @iisakkirotko in https://github.com/jupyter-widgets/ipyleaflet/pull/1186
* Use hatch-nodejs-version for the jupyter-leaflet versioning by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1188
* Refactor: remove ipyleaflet-core and have only ipyleaflet and jupyter-leaflet packages by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1189

### New Contributors

* @iisakkirotko made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/1180

**Full Changelog:** https://github.com/jupyter-widgets/ipyleaflet/compare/0.18.2...0.19.0

## v0.18.2

### What's Changed

* Add leaflet as singleton by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1175

**Full Changelog:** https://github.com/jupyter-widgets/ipyleaflet/compare/0.18.1...0.18.2

## v0.18.1

### New features

* Add "collapsed" property to the "LayersControl" by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1156
* Add "index" argument to the Map's "add" method by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1156

### Documentation

* Documentation: Fix CSS issue by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1154

### Maintenance

* Update galata bot by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1152
* Fix missing hub command in bot action by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1153
* Change jupyterlab version and add yarn dependency by @gjmooney in https://github.com/jupyter-widgets/ipyleaflet/pull/1149

### New Contributors

* @gjmooney made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/1149

**Full Changelog:** https://github.com/jupyter-widgets/ipyleaflet/compare/0.18.0...0.18.1

## v0.18.0

### What's Changed

* Removed the unwanted character from Python code. by @frankwwu in https://github.com/jupyter-widgets/ipyleaflet/pull/1139
* Added Jupyter Lab 4 support by @cdanielw in https://github.com/jupyter-widgets/ipyleaflet/pull/1146
* Add support for PMTiles by @giswqs in https://github.com/jupyter-widgets/ipyleaflet/pull/1138
* Towards ipyleaflet 0.18.0 by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1147

### New Contributors

* @frankwwu made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/1139
* @cdanielw made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/1146

**Full Changelog:** https://github.com/jupyter-widgets/ipyleaflet/compare/0.17.4...0.18.0

## v0.17.3

### What's Changed

* Add image service layers to address https://github.com/jupyter-widgets/ipyleaflet/pull/932 by @tsutterley in https://github.com/jupyter-widgets/ipyleaflet/pull/933
* Revert change from https://github.com/jupyter-widgets/ipyleaflet/pull/965 that sets the default zoom to None by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1068
* Fix in tab by @maartenbreddels in https://github.com/jupyter-widgets/ipyleaflet/pull/1099

### New Contributors

* @tsutterley made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/933
* @maartenbreddels made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/1099

**Full Changelog:** https://github.com/jupyter-widgets/ipyleaflet/compare/0.17.2...0.17.3

## v0.17.2

### Bug fixes

* Fix view bounds by @davidbrochart in https://github.com/jupyter-widgets/ipyleaflet/pull/1064

### New features

* Add subitems to layers by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/1011

### Maintenance

* JS linters by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1057
* Add pandas to bot by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1056
* Fix Galata bot by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1055
* Update the way we run UI-tests by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1054
* Corrected cursor name by @tylere in https://github.com/jupyter-widgets/ipyleaflet/pull/1047
* Fixup yarn.lock by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/1043

Full Changelog: https://github.com/jupyter-widgets/ipyleaflet/compare/0.17.1...0.17.2

## v0.17.1

### New features

* Add a colormap control to be used with Choropleth layer by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/1010
* Add zoom_offset param to TileLayer by @ned2 in https://github.com/jupyter-widgets/ipyleaflet/pull/1023
* Add support for as_leaflet_layer in Map.add by @banesullivan in https://github.com/jupyter-widgets/ipyleaflet/pull/1033 and @davidbrochart in https://github.com/jupyter-widgets/ipyleaflet/pull/1037
* ipywidgets 8.0 support by @jasongrout in https://github.com/jupyter-widgets/ipyleaflet/pull/968

### Maintenance

* Pin nodejs=16, drop base setup by @davidbrochart in https://github.com/jupyter-widgets/ipyleaflet/pull/1017
* Remove HikeBike basemap from the examples by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/1039

### Documentation

* Use the latest jupyterlite-sphinx release on ReadTheDocs by @jtpio in https://github.com/jupyter-widgets/ipyleaflet/pull/1026
* Lazy-load the JupyterLite embedded page in documentation by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/1007

### New Contributors

* @ned2 made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/1023

Full Changelog: https://github.com/jupyter-widgets/ipyleaflet/compare/0.17.0...0.17.1

## v0.17.0

Here are some highlights of changes in this version. See the full list of changes for more details: https://github.com/jupyter-widgets/ipyleaflet/compare/0.16.0...0.17.0

### New Features

* Make it possible to use Choropleth layer with data containing NaNs [#972](https://github.com/jupyter-widgets/ipyleaflet/pull/972)
* Add Map panes [#999](https://github.com/jupyter-widgets/ipyleaflet/pull/999)
* Allow setting Map.dragging [#1001](https://github.com/jupyter-widgets/ipyleaflet/pull/1001)
* Add visible attribute to GeoJSON layer [#1002](https://github.com/jupyter-widgets/ipyleaflet/pull/1002)

### Deprecated API

* Deprecate LegendControl properties `name`, `legends`, `positioning`, and `positionning` [#979](https://github.com/jupyter-widgets/ipyleaflet/pull/979) and [#1005](https://github.com/jupyter-widgets/ipyleaflet/pull/1005). Update your code with the following substitutions for a LegendControl `legend`:
  * `legend.name` -> `legend.title`
  * `legend.legends` -> `legend.legend`
  * `legend.positioning` -> `legend.position`
  * `legend.positionnning` -> `legend.position`

  The `name` argument in creating a LegendControl is also deprecated, please use the `title` argument instead: `LegendControl({}, title='My Title')`.
* Deprecate layer and control-specific method names for Map and LayerGroup, in favor of methods that work for both layers and controls [#982](https://github.com/jupyter-widgets/ipyleaflet/pull/982). Update your code with the following substitutions for a Map `map` (or LayerGroup):
  * `map.add_control(...)` or `map.add_layer(...)` -> `map.add(...)`
  * `map.remove_control(...)` or `map.remove_layer(...)` -> `map.remove(...)`
  * `map.substitute_control(...)` or `map.substitute_layer(...)` -> `map.substitute(...)`
  * `map.clear_controls(...)` or `map.clear_layers(...)` -> `map.clear(...)`

  The inline operators still continue to work as before, such as `map += control` or `map -= layer`.

### Maintenance

* Compute the public path automatically [#988](https://github.com/jupyter-widgets/ipyleaflet/pull/988)

### Docs

* Document use of multiple basemaps [#971](https://github.com/jupyter-widgets/ipyleaflet/pull/971)
* Add a small introduction text [#992](https://github.com/jupyter-widgets/ipyleaflet/pull/992)

## v0.16.0
### New features

* Add bounds attribute to TileLayer by @davidbrochart in https://github.com/jupyter-widgets/ipyleaflet/pull/907
* Implemented open_popup and close_popup methods by @PROgram52bc in https://github.com/jupyter-widgets/ipyleaflet/pull/914

### Maintainance

* Stop layer loading spinner when layer is removed by @clydebw in https://github.com/jupyter-widgets/ipyleaflet/pull/903
* Added backward compatibility for dict basemaps by @sackh in https://github.com/jupyter-widgets/ipyleaflet/pull/901
* Pin `openssl=1.1.1l` in CI script by @trungleduc in https://github.com/jupyter-widgets/ipyleaflet/pull/906
* Test `ipyleaflet` widgets with `galata` by @trungleduc in https://github.com/jupyter-widgets/ipyleaflet/pull/905
* Clean up UI tests by @davidbrochart in https://github.com/jupyter-widgets/ipyleaflet/pull/908
* Remove map callbacks when DrawControl removed from map by @clydebw in https://github.com/jupyter-widgets/ipyleaflet/pull/916
* Add Galata bot by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/938
* Fix CI by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/946
* Fix Galata screenshot update CI job by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/945
* Missing jupyter-packaging on CI by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/948
* Fix ui-tests port by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/949
* UI-tests: Update scripts to match bot implementation by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/950
* Remove OpenSSL pinning by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/952
* Update Galata screenshots by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/947
* Update build script by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/954
* Fix watch script in ipyleaflet by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/963

### Docs:

* Fix docs table by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/898
* Update basemaps by @MackyDIARRA in https://github.com/jupyter-widgets/ipyleaflet/pull/924
* Updates on ipyleaflet documentation by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/953
* Change the theme to pydata-sphynx-theme  by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/955
* Update installation instructions by @martinRenou in https://github.com/jupyter-widgets/ipyleaflet/pull/956
* Add to ipyleaflet's documentation some missing attributes sections with autodoc. by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/957
* Add jupyterlite-sphinx by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/958
* Fix formatting issues in the doc for attributes and methods sections using autodoc by @HaudinFlorence in https://github.com/jupyter-widgets/ipyleaflet/pull/959
* radiation notebook updated with SearchControl object adding by @MackyDIARRA in https://github.com/jupyter-widgets/ipyleaflet/pull/899

## New Contributors
* @clydebw made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/903
* @trungleduc made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/906
* @PROgram52bc made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/914
* @HaudinFlorence made their first contribution in https://github.com/jupyter-widgets/ipyleaflet/pull/953

**Full Changelog**: https://github.com/jupyter-widgets/ipyleaflet/compare/0.15.0...0.16.0

## v0.15.0

Improvements:

* Add `prefer_canvas` option to the `Map` class
* Use `xyzservices` for base maps
* Add Colab support by default
* Support any layer type in `MarkerCluster`
* Add `location_found` event to the `SearchControl`

## v0.14.0

Improvements:

* Remove Shapely and branca dependencies (for support in JupyterLite)
* Add new options to marker cluster

## v0.13.6

Fixes:

* Fix support for Jupyter Notebook
* Change imports from Phosphor to Lumino

## v0.13.5

Improvements:

* Add support for JupyterLab 3 #714

## v0.13.4

Improvements:

* Improve GeoJSON data update #668
* Add support for WKT layer #679
* Add Gaode basemap #681
* Change SearchControl zoom trait to None #688
* Add example notebooks for KML and GPX file formats #691
* Update GeoData API documentation to add point_stype attribute #695
* Add a callback on found event for searching in GeoJSON layer #707
* Add custom tile server GIF to example notebook #724
* Add support for DivIcon #727
* Support for transparent WidgetControl #732
* Update LeafletJS from 1.3.0 to 1.7.1 #734
* Add Map.fit_bounds(bounds) #737
* Add MagnifyingGlass layer #733

Fixes:

* Add Shapely as a dependency #683
* Add nodejs dependency to Binder environment #700
* Set --minimize=False on Binder #704
* Remove class_name #729
* Change license to MIT #736
* Fix WMS layer options #755

## v0.13.3

Fixes:

* Fix recursion error on GeoJSON #661

## v0.13.2

Improvements:

* Add found_style property to SearchControl #640

Fixes:

* Fix DrawControl position #656
* Fix GeoJSON style update #658

## v0.13.1

Improvements:

* Add layer attribute for search control #622
* Simplify main JS file #631
* Remove Travis #627
* Add GitHub Actions #626
* Add docstrings #623 #628 #630
* Implement `__geo_interface__` #621
* Add pixel_bounds to Map #616
* Enable float zoom levels #608

Fixes:

* Pin branca>=0.3.1,<0.5 #639
* Fix Icon traits #634 #636 #637
* Fix GeoJSON click event #629
* Fix bounds type #625
* Fix ipyleaflet import #624
* Fix EPSG:3413 and EPSG:3031 #620
* Fix layer removal #619
* Fix option update #611
* Fix flake8 errors #609


## v0.13.0

Improvements:

* Add support for custom map and WMS projections #598
* Add SearchControl feature #576
* Add SearchControl documentation #584
* Add window_url attribute to Map #587
* Add Vector tile docs #590

Fixes:

* Fix missing dependency in documentation #581
* Fix overwriting of colormap ranges for Choropleth #577
* Prevent updating dictionary in GeoJSON style_callback #600


## v0.12.6

Improvements:

* Use leaflet-defaulticon-compatibility for icon image bundling #552
* Refactor GeoJSON layer #573
* Add means to save to HTML #574
* Improve docs #575
* Make the xarray dependency optional #561

Fixes:
* Fix in the Vector tile layer #568
* Fix issue with Phosphor dependency #563
* Bug fix with respect to the GeoJSON layer #572


## v0.12.4

Improvements:

* The package now ships the JupyterLab extension automatically. So jupyter labextension install jupyter-leaflet should not be needed anymore #510
* Add support for int data in Choropleth #539
* Add style_callback to GeoJSON/Choropleth/GeoData layers #518
* Rename positional argument in handle_draw callback #530
* Add VectorTilesLayer #544

## v0.12.3

* JupyterLab 2 support #509
* Sync Path's fill_color attribute with color attribute #505
* Documentation improvements #497 #506

## v0.12.2

Fixes:

* Popup creation #489
* DrawControl creation #493

Improvements:

* Smoother URL changes on GridLayers #485
* ScaleControl #492
* Documentation improvements #484 #485
* WMSLayer: Listen for dynamic changes on parameters #494
