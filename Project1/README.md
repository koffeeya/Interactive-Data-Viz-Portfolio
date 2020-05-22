# **Project 1: Exploratory Visualization**
*How does the dominant color of an artist’s works change over time?*

<br />

## **A. PROSPECTUS**

My project aims to explore how the dominant color of an artist’s works might change over time -- their “color history”. I was inspired by looking at the monochromatic works from Pablo Picasso’s [Blue Period](https://en.wikipedia.org/wiki/Picasso%27s_Blue_Period). I wondered how that period would look in a data visualization -- if I put his works on a timeline, could I “point out” the Blue Period without being told when it started?

<br />

### Data Source
My data source was the [Museum of Modern Art's Collection](https://github.com/MuseumofModernArt/collection) on GitHub, which has a wealth of metadata on ~200,000 items available in JSON and CSV formats.

**Here is the [Python script](https://colab.research.google.com/drive/1Mg13RVgo_NEBKDEEI8-q0TR400XRvZOV#scrollTo=KoYefew0DvCM), where I prepared the dataset.**  

### Work Plan

1. First, I downloaded the “Artworks” dataset from the [MoMA GitHub](https://github.com/MuseumofModernArt/collection) in a CSV format.

2. In Python, I cleaned and filtered the dataset to only show paintings.

3. Then, I used the `scikit-image`, `pandas`, and `numpy` libraries to loop through the pixels in each Thumbnail image and get the dominant `R`, `G`, and `B` values.

4. Finally, I read this dataset into a new CSV / JSON file and save it in my repository. From there, I used D3 to create a custom `colorScale` from the average RGB values.

<br />


## **B. SKETCHES & MOCKUPS**

[Mockups (in Google Slides)](https://docs.google.com/presentation/d/1ABtSauyAgViPgbfPnGgv_Xmc_xSX06YHy-kV1rszV1Q/edit?usp=sharing)

<br />



## **C. ARCHITECTURAL SCHEMA**
I didn't prepare a written architectural schema for this project, but I ended up with four main components: a waffle chart, summary bar charts, tooltip that showed up on hover, and filters that interacted with the charts.

<br />


## **E. SOURCES**
[Museum of Modern Art's Collection](https://github.com/MuseumofModernArt/collection)

<br />

