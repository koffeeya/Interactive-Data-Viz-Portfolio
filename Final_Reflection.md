# Final Reflection



My overall goal when designing a data visualization is to inspire curiosity. I like the idea of recreating my own experience of feeling intrigued about a topic. If I can get a friend even a little bit interested and asking questions, then I feel like I’m onto something.

I don’t always succeed in conveying everything I find interesting about a data source. That’s something I still find challenging from a design perspective -- how do I create a narrative from disparate charts and points of interest? How can I give readers the context they need to get curious? But the two projects I worked on this semester gave me a lot of opportunity to flex those muscles.

<br />

### Exploratory Project: Dominant Color of MoMA Paintings

My original inspiration for this project came from Picasso’s “Blue Period.” I wondered -- could I “see” the Blue Period, if the dominant color of each of Picasso’s paintings were lined up next to each other? The pattern seemed clear just from viewing the artist’s paintings as a whole, but I was drawn to the idea of “dominant color” as a way of making art more approachable.

I went in search of a dataset that could help answer this question and was happy to find the Museum of Modern Art’s GitHub repository, which contained a tidy dataset with information on each work in the collection. Unlike the GitHub repos of other museums, MoMA also helpfully provided thumbnail images of each of the works in its collection, including sculptures and sketches. I uploaded the dataset to Python for cleaning and analysis, and exported a clean CSV for import into D3.

My final design -- with the waffle chart as the page’s centerpiece, and information along the edges -- drew inspiration from how artwork is typically displayed in a museum. The simple black and white color palette was also drawn from MoMA’s website and my own ideas of what “modern” looks like.

I’m pretty happy with how this project turned out, but if I had more time, I would definitely start with cleaning up the code. Instead of using CSS Flexbox to individually position each square, I would use D3, which might help with the project’s performance issues -- I notice it uses up a ton of memory and causes my poor laptop to whirr its fans at high speed.

(I was curious while writing this and went down a side mission to investigate the performance issue using Chrome’s developer tools, and it seems like calling “draw” each time I set the Global State caused a lot of lag time -- might be something to try changing in another version of this project. I didn’t do this in my second project and the load time was much faster.)

I would also think about how to better integrate summary data visuals into the final product. The simple bar charts I made are sometimes misaligned and are not interactive -- I would like to have them filter the waffle squares you see on the page.

<br />

### Narrative Project: Native American Tribal Schools

I approached this project very differently from the narrative visualization, with a more ambitious scope and determination to actually plan things out. The idea for the project came from a paper I wrote years ago on Native American tribal schools for an educational policy class. At the time, my professor gave me a “9/10, needs more data.” It stuck with me ever since -- why aren’t there more data visualizations on how tribal schools are doing?

The answer, I soon found out, is because the data is five years old and locked in 184 PDF documents on the Bureau of Indian Education’s website. But I didn’t let that deter me -- I spent a long weekend scraping files, cleaning, and gathering as much information as I could find on tribal schools, nations, and counties.

I gathered so much information that I was quickly overwhelmed at the prospect of making meaning from it all. I explored the data with a few charts in Google Sheets, but they were only marginally helpful in narrowing down my scope. I had to remind myself multiple times that I was not setting out to write a research paper or conduct an in-depth investigation, only to highlight interesting patterns and relationships. But even then, I struggled to know how (and if) to answer the obvious question -- why the data showed the pattern it did. The more I read, the more I learned how Native schools are struggling in more ways than I have data to show.

For example, I had a theory that tribal schools are struggling because of a shortage of Native teachers, which I found repeated anecdotally in multiple places. However, I could never find numbers to back it up. A report from GAO claimed “50 percent of all BIE positions have not been filled according to recent BIE documentation”, but the documentation itself was nowhere to be found. Upon reflection, I think this may also be my own bias showing -- I want to get better at visualizing qualitative data!

If I were to do another project like this, I would spend more time on mockups and writing out a narrative before starting to code. I would also like to get more of a human element in my visualizations -- maybe adding in stories from students in tribal schools or teachers working there.

<br />

### Conclusion

Despite my narrative issues, the biggest challenge I faced in the Interactive Data Visualization course was by far the learning curve. After spending months immersed in the drag-and-drop data viz of Tableau, I frequently felt frustrated at the wide gap between the charts I wanted to make -- that were so cool in my head -- and what I could actually make with the skills I had in hand. I copied code from the D3 tutorials a little blindly, never 100% sure why it did or didn’t work.

But somewhere in the middle of struggling with scrollytelling in the second project, it all clicked. I could more clearly see the levers to push that would (almost, a little bit) make the charts I envisioned. I finally understood the relationship between the DOM, D3, and data, and grasped the design patterns to build different chart types. And I could actually use GitHub! I feel understanding these concepts has been among the most valuable knowledge that I gained in the course.

I also found the design reviews very helpful. Apart from serving as a motivating deadline, I got so many great ideas from hearing the thoughts of my classmates and seeing their own unique and exciting approaches to data visualization and design.

Overall, Interactive Data Viz was definitely challenging, but for me, it worked in the best possible way. I now feel more confident in my abilities as a designer and developer. My job is also evolving to include more D3 and programming -- something I only dreamed about before this semester. I’m so grateful to Aucher and Ellie for leading this course, and excited for part two in the fall!

