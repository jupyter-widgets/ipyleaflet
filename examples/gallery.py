import xyzservices.providers as basemaps
import json
access_data = json.load(open("access-data.json"))
from ipyleaflet import basemap_to_tiles

## Using a dict of basemaps to use Dropdown widget for basemaps that don't require apikey
def define_basemapsDict():
    WithoutApikeyDict = {}

    for [key, val] in basemaps.items():
        if ('url' in val):
            apiname = val.name
            if (apiname in access_data):
                pass
            else:
                WithoutApikeyDict[apiname] = (basemap_to_tiles(basemaps[apiname]),)

        else:
            newdata = basemaps[key]


            for newval in newdata.values():
                    basemap_name = newval.name
                    apiname = basemap_name.split('.')[0]
                    subname = basemap_name.split('.')[1]

                    if (apiname == 'HERE'):
                        pass
                    elif (apiname in access_data):
                        pass
                    else:
                        WithoutApikeyDict[basemap_name] = (basemap_to_tiles(basemaps[apiname][subname]),)
    return WithoutApikeyDict

def define_basemapsList():
    WithApikeyList = []
    WithoutApikeyList = []
    for [key, val] in basemaps.items():
        if ('url' in val):
            apiname = val.name
            if (apiname in access_data):
                WithApikeyList.append(val.name)
            else:
                WithoutApikeyList.append(val.name)
        else:
            newdata = basemaps[key]

            for newval in newdata.values():
                    basemap_name = newval.name
                    apiname = basemap_name.split('.')[0]

                    if (apiname == 'HERE'):
                        pass
                    elif (apiname in access_data):
                        WithApikeyList.append(newval.name)
                    else:
                        WithoutApikeyList.append(newval.name)
    return WithoutApikeyList, WithApikeyList

def define_basemap_from_list(List, index) :
    basemap_name = List[index]

    if ('.' in basemap_name):
        apiname = basemap_name.split('.')[0]
        subname = basemap_name.split('.')[1]
        basemap = basemaps[apiname][subname]
    else:
        basemap = basemaps[apiname]

    return basemap , apiname

