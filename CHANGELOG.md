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
