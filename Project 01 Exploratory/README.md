# **Project 1: Exploratory Visualization**
*How does the dominant color of an artist’s works change over time?*

<br />

## **A. PROSPECTUS**

My project aims to explore how the dominant color of an artist’s works might change over time -- their “color history”. I was inspired by looking at the monochromatic works from Pablo Picasso’s [Blue Period](https://en.wikipedia.org/wiki/Picasso%27s_Blue_Period). I wondered how that period would look in a data visualization -- if I put his works on a timeline, could I “point out” the Blue Period without being told when it started?

### DATA SOURCE
My data source will be the [Museum of Modern Art's Collection](https://github.com/MuseumofModernArt/collection) on GitHub, which has a wealth of metadata on ~200,000 items available in JSON and CSV formats.

**Here is my [Python script](https://colab.research.google.com/drive/1Mg13RVgo_NEBKDEEI8-q0TR400XRvZOV#scrollTo=KoYefew0DvCM), where I am working on cleaning the data.**  

### WORK PLAN

1. First, I will download the “Artworks” dataset from the [MoMA GitHub](https://github.com/MuseumofModernArt/collection) in either a CSV or JSON format -- I’m not sure which one would be better at this point. Then, I’ll import the dataset to Python.

2. In Python, I’ll filter the dataset to only show:

     a. Artists that have 10 or more works on display (otherwise there might not be much to show in the timeline); and

     b. Works that are paintings (since I’m not planning to include sculptures or mixed media).

3. Then, I’ll use the `scikit-image`, `pandas`, and `numpy` libraries to loop through the pixels in each Thumbnail image and get the average `R`, `G`, and `B` values.

4. Finally, I’ll read this dataset into a new CSV / JSON file and save it in my repository. From there, I could use D3 to create a custom `colorScale` from the average RGB values, and use some of the other fields in the dataset as filters or descriptions in the page. I would love to show the painting itself in a tooltip.

Ultimately, I hope to spark curiosity by representing an artist’s work in this way. I want people to explore different artists, notice patterns in the dominant color of their works, and feel curious about the history behind what they see.  

<br />




## **B. SKETCHES & MOCKUPS**
*In Progress*

<br />



## **C. ARCHITECTURAL SCHEMA**
*In Progress*

<br />



## **D. FINAL PROJECT**
*In Progress*

<br />


## **E. SOURCES**
[Museum of Modern Art's Collection](https://github.com/MuseumofModernArt/collection)

<br />

