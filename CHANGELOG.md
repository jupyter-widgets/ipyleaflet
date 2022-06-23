## v0.17.0
### New Features

* Make it possible to use Choropleth layer with data containing NaNs [#972](https://github.com/jupyter-widgets/ipyleaflet/pull/972)
* Add Map panes [#999](https://github.com/jupyter-widgets/ipyleaflet/pull/999)
* Allow setting Map.dragging [#1001](https://github.com/jupyter-widgets/ipyleaflet/pull/1001)
* Add visible attribute to GeoJSON layer [#1002](https://github.com/jupyter-widgets/ipyleaflet/pull/1002)
* [BREAKING CHANGE] Remove get and set decorators in LegendControl [#979](https://github.com/jupyter-widgets/ipyleaflet/pull/979)

## Maintenance

* Compute the public path automatically [#988](https://github.com/jupyter-widgets/ipyleaflet/pull/988)

### Docs

* Document use of multiple basemaps [#971](https://github.com/jupyter-widgets/ipyleaflet/pull/971)
* Add a small introduction text [#992](https://github.com/jupyter-widgets/ipyleaflet/pull/992)

**Full Changelog**: https://github.com/jupyter-widgets/ipyleaflet/compare/0.16.0...0.17.0

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
