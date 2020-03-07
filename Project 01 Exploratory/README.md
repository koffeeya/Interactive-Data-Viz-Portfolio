# **Project 1: Exploratory Visualization**

## **A. PROSPECTUS**

My project aims to explore how the dominant color of an artist’s works might change over time -- their “color history”. I was inspired by looking at the monochromatic works from Pablo Picasso’s [Blue Period](https://en.wikipedia.org/wiki/Picasso%27s_Blue_Period). I wondered how that period would look in a data visualization -- if I put his works on a timeline, could I “point out” the Blue Period without being told when it started?

My data source will be the [Museum of Modern Art's Collection](https://github.com/MuseumofModernArt/collection) on GitHub, which has a wealth of metadata on ~2000 items available in JSON and CSV formats. Here is an example of of work of art from the “Artworks” JSON file:

`{
  "Title": "The Diver (La Plongeuse)",
  "Artist": [
    "Pablo Picasso"
  ],
  "ConstituentID": [
    4609
  ],
  "ArtistBio": [
    "Spanish, 1881-1973"
  ],
  "Nationality": [
    "Spanish"
  ],
  "BeginDate": [
    1881
  ],
  "EndDate": [
    1973
  ],
  "Gender": [
    "Male"
  ],
  "Date": "1932",
  "Medium": "Etching with collage additions",
  "Dimensions": "plate: 5 1/2 x 4 7/16\" (13.9 x 11.3 cm)",
  "CreditLine": "Purchase",
  "AccessionNumber": "8.1945",
  "Classification": "Print",
  "Department": "Drawings & Prints",
  "DateAcquired": "1945-01-03",
  "Cataloged": "Y",
  "ObjectID": 59731,
  "URL": "http://www.moma.org/collection/works/59731",
  "ThumbnailURL": "http://www.moma.org/media/W1siZiIsIjE1Mzg2NCJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDMwMHgzMDBcdTAwM2UiXV0.jpg?sha=de98c443c1e44138",
  "Height (cm)": 13.9,
  "Width (cm)": 11.3
}`

Here is my plan:

1. First, I will download the “Artworks” dataset from the [MoMA GitHub](https://github.com/MuseumofModernArt/collection) in either a CSV or JSON format -- I’m not sure which one would be better at this point. Then, I’ll import the dataset to Python.

2. In Python, I’ll filter the dataset to only show:

     a. Artists that have 10 or more works on display (otherwise there might not be much to show in the timeline); and

     b. Works that are painted on a canvas (since I’m not planning to include sculptures or mixed media).

3. Then, I’ll use the `scikit-image` and `numpy` [libraries](https://scikit-image.org/) to loop through the pixels in each Thumbnail image and get the average `R`, `G`, and `B` value of the image.

4. Finally, I’ll read this dataset into a new CSV / JSON file and save it in my repository. From there, I could use D3 to create a custom `colorScale` from the average RGB values, and use some of the other fields in the dataset as filters or descriptions in the page. I would love to show the painting itself in a tooltip.

Ultimately, I hope to spark curiosity by representing an artist’s work in this way. I want people to explore different artists, notice patterns in the dominant color of their works, and feel curious about the history behind what they see.


-----


## **B. SKETCHES & MOCKUPS**

## **C. ARCHITECTURAL SCHEMA**

## **D. FINAL PROJECT**
