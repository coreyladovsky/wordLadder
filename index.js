import WordLadder from './lib/wordLadder.js';
// import words from 'an-array-of-english-words';
import * as d3 from 'd3'

document.addEventListener("DOMContentLoaded", () => {
  let words = ["cat", "can", "car", "bar", "bat", "bit"]
  let ladder = new WordLadder(words)
  let submit = document.querySelector("form");
  let ul = document.querySelector("ul")

  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    ul.innerText = "Thinking... Please wait"
    let inputs = document.querySelectorAll("input")
    let path = "Path Not Possible"

    if(inputs[0].value && inputs[0].value) {

      setTimeout(function() {
        path = ladder.findPath(inputs[0].value.toLowerCase(), inputs[1].value.toLowerCase())
        ul.innerText = null;
        if(path === "Path Not Possible") {
          ul.innerText = path
        } else {
          path.forEach(word => {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.href = "https://www.merriam-webster.com/dictionary/" + word
            a.target = "_blank"
            a.innerText = word;
            li.appendChild(a)
            ul.appendChild(li)
          })

          let svg = d3.select('body').append('svg')
            .attr('width', 800)
            .attr('height', 800);

            let simulation = d3.forceSimulation()
              .force("link",d3.forceLink().id(function (d) {return d.val;}).distance(100).strength(1))
              .force("charge", d3.forceManyBody())
              .force("center", d3.forceCenter(width / 2, height / 2));

                        // .nodes(d3.values(ladder.currGraph.graph))
                        // .links(ladder.currGraph.links)
                        // .gravity(.05)
                        // .distance(100)
                        // .charge(-100)
                        // .start()

            let link = svg.selectAll('.link')
                        .data(ladder.currGraph.links)
                        .enter()
                        .append('line')
                        .attr('class', 'link')

            let node = svg.selectAll('.node')
                        .data(force.nodes())
                        .enter()
                        .append('circle')
                        .attr('class', 'node')
                        .attr('r', 800 * 0.03)
          console.log(ladder.currGraph)

        }
      }, 0)

    }

  })
})
