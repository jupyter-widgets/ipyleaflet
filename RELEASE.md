# Release workflow

1. Clone new copy of repository:
   ```sh
   git clone git@github.com:jupyter-widgets/ipyleaflet.git
   ```
2. Update the version numbers in the following files
   - `python/ipyleaflet/_version.py` (two places)
   - `python/jupyter_leaflet/package.json`
   - `environment.yml`
3. Make sure the changelog is updated: `CHANGELOG.md`
4. Build and publish to npm (if yarn prompts for the new version, I give the same as what is already in the `package.json`)
   ```sh
   cd python/jupyter_leaflet
   yarn install && yarn run build && yarn publish
   cd ..
   ```
5. Build and publish Python package
   ```sh
   python -m build python/jupyter_leaflet
   twine upload python/jupyter_leaflet/dist/*
   python -m build python/ipyleaflet
   twine upload python/ipyleaflet/dist/*
   ```
6. Update environment config with new ipyleaflet pypi download link: `docs/jupyterlite_config.json`
7. Commit and push in git
   ```sh
   git commit -am "Release <VERSION>"
   git tag <VERSION>
   git push origin master --tags
   ```
