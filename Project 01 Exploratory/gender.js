class Gender {
    constructor(state, setGlobalState){
      
      console.log("Constructing Gender Summary!")

      this.width = document.getElementById('filters').clientWidth * 0.7;
      this.height = document.getElementById('filters').clientHeight * 0.7;
      this.margins = { top: 10, bottom: 10, left: 10, right: 10 };

      this.svg = d3
        .select("#summary-chart")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

    }

    draw(state, setGlobalState) {

      console.log(state.summaryData)

      this.yScale = d3
          .scaleBand()
          .domain(state.summaryData.map(d => d.category))
          .range([this.height - this.margins.top, this.margins.bottom]);
  
      this.xScale = d3
          .scaleLinear()
          .domain([0, d3.max(state.summaryData, d => d.count)])
          .range([this.margins.left, this.width - this.margins.right])

       this.yAxis = d3
          .axisLeft(this.yScale)
          .ticks(state.summaryData.length);

      const rect = this.svg
          .selectAll("rect")
          .data(state.summaryData)
          .join("rect")
          // set the coordinates for the top-left corner of each rect as scaled values
          .attr("y", d => this.yScale(d.category))
          .attr("x", d => this.xScale(this.margins.left + (this.width * 0.04)))
          // set the width, height, and color of each bar
          .attr("width", d => this.xScale(d.count))
          .attr("height", this.yScale.bandwidth())
          .attr("fill", "grey");

        const text = this.svg
          .selectAll("text")
          .data(state.summaryData)
          .join("text")
          .attr("class", "label")
          // set coordinates for label
          .attr("y", d => this.yScale(d.category) + (this.yScale.bandwidth()/1.5))
          .attr("x", d => (this.margins.left + (this.width * 0.07)))
          .text(d => d.category + ', ' + d.count)
          .attr("style", "text-color: white;");

    }
}

export {
    Gender
};