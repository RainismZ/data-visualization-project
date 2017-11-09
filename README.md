## HCIDLA Affordable Housing Projects

### Overview

This is the course project for WPI CS573 Data Visualization. Project page could be found [here](https://rainismz.github.io/data-visualization-project/).

The dataset used for visualizations is *HCIDLA Affordable Housing Projects Catalog and Listing (2003 To Present)* from [dataLA](https://data.lacity.org), and [Los Angeles Neighborhoods Census Information](http://maps.latimes.com/neighborhoods/neighborhood/list/) from L.A. Times.

The dataset contains 341 rows and 27 columns, while each row is an affordable housing site or location, and each column information can be fond [here](https://data.lacity.org/A-Livable-and-Sustainable-City/HCIDLA-Affordable-Housing-Projects-Catalog-And-Lis/u4mj-cwbz).
<br>[[Downloadable CSV]](https://data.lacity.org/api/views/u4mj-cwbz/rows.csv?accessType=DOWNLOAD), [[Dataset Summary]](https://bl.ocks.org/RainismZ/28059e87d7e8d312261a10d7e9fd6177)

<img width="949" alt="thumbnail" src="https://user-images.githubusercontent.com/22625369/32581590-7b0fe4f2-c4b8-11e7-981d-6d089edbcfeb.PNG">

<p align="center">Figure 1: Screenshot of the project page.</p>

### Descriptions of Visualization and Interactions

As shown in figure 1, there are two parts of the project —— information box (above) and funding details (below) —— each contains an major interaction. 

For information box, I used Google Map API with D3 layers to implement the map window. Each red circle on map presents a row of the dataset, which is an affordable housing site or location. And the information panel on right gives the name, address, construction type, housing type and an image of the location. By clicking a circle, the information on right panel will update to the selected site/location. *(Please notice that in Google Chrome, red circles may not load correctly the first time your visit the page, but they will appear if you reload the page. Edge and Safari don't have this issue. I'm currently working to solve it.)*

In funding details panel below, there's a scrollable list of neighborhoods, each of which has at least one HCIDLA project. The two grouped bar chart on the right presents four types of fundings (HCIDLA Funded, Leverage, Tax Exempt Conduit Bond, TDC) the neighborhood received compare with the L.A. average (calculated from the total 341 projects around L.A.), while the first bar chart shows the per capita numbers, and second bar chart shows per square mile numbers. By clicking a neighborhood in the scrollable list, the two grouped bar charts will update.

## Answered Questions and Discussions

![fundingdetails](https://user-images.githubusercontent.com/22625369/32584328-b7e8f67c-c4c5-11e7-96b8-4e65aaaed57d.jpg)
<p align="center">Figure 2: Sketch of funding details chart from proposal.</p>

As mentioned in proposal, one major question we were trying to answer is **"where did the fund go?"** As I'm currently adding the ethnicity and income tooltip from sketch prototype to bar charts, still we can find some clue.

<img width="697" alt="chinatown" src="https://user-images.githubusercontent.com/22625369/32584686-b6d071c8-c4c7-11e7-9616-7eba61c95a8f.PNG">
<p align="center">Figure 3: Funding details of L.A. China Town.</p>
