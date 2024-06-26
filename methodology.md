# Tree Equity Score Methodology 

The methodology used in the tool is based on the [American Forests methodology](https://www.treeequityscore.org/methodology) with some modifications. 

## Data Sources

### Priority Indicators

Data from the [2021 Census Profile](https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/index.cfm?Lang=E) at the [Dissemination Area](https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/az/Definition-eng.cfm?ID=geo021) geography was used to create priority indicators. The following indicators were used to determine the Tree Equity Score.

#### Seniors (65+) and Children (0-4)

The percentage of the Dissemination Area that are seniors or children. 

#### Visible Minority

The percentage of the Dissemination Area classified as [visible minority](https://www12.statcan.gc.ca/census-recensement/2021/ref/98-500/006/98-500-x2021006-eng.cfm).

#### Language Isolation

Percentage of the Dissemination Area that can neither speak English or French.

#### Low Income

Percentage of the Dissemination Area over 18 that are classified under [Low-income measure, after tax (LIM-AT)](https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/az/Definition-eng.cfm?ID=fam021).

#### Unemployment Rate

Unemployment rate of the Dissemination Area.

### Canopy Cover Data

Canopy cover data was obtained from the [City of Calgary Open Data Portal](https://data.calgary.ca/). The data contains polygons outlining the extent of tree cover and large shrubs over 2m tall and was derived using City of Calgary Orthophotos and Lidar. 



## Future Work

The original American Forests methodology includes a heat disparity indicator that uses Land Surface Temperature (LST) obtained from [Landsat Collection 2 Level 2 data](https://www.usgs.gov/landsat-missions/landsat-collection-2-level-2-science-products). This measure tell us where excess heat is generated in an urban area. This indicator was not included in the initial Tree Equity Score release but may be included in a future release. 