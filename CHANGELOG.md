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


