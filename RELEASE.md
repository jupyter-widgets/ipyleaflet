# Release workflow

1. Clone new copy of repository:
   ```sh
   git clone git@github.com:jupyter-widgets/ipyleaflet.git
   ```
2. Update the version numbers in the following files (see https://github.com/jupyter-widgets/ipyleaflet/commit/48f3cb68cd07e6c4ae7b353a17861e4e51ca4471)
   - `ipyleaflet/ipyleaflet_core/ipyleaflet/_version.py` (two places)
   - `ipyleaflet/python/jupyter_leaflet/package.json`
   - `environment.yml`
3. Make sure the changelog is updated: `CHANGELOG.md`
4. Build and publish to npm (if yarn prompts for the new version, I give the same as what is already in the `package.json`)
   ```sh
   cd ipyleaflet/python/jupyter_leaflet
   yarn install && yarn run build && yarn publish
   cd ..
   ```
5. Build and publish Python package
   ```sh
   python -m build
   twine upload dist/*
   ```
6. Update environment config with new ipyleaflet pypi download link: `docs/jupyterlite_config.json`
7. Commit and push in git
   ```sh
   git commit -am "Release <VERSION>"
   git tag <VERSION>
   git push origin master --tags
   ```
