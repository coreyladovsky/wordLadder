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

          let canvas = d3.select('#canvas');
          let width = canvas.attr("width");
          let height = canvas.attr("height");
          let radius = 3;
          let ctx = canvas.node().getContext("2d");

          Object.values(ladder.currGraph.graph).forEach(node => {
            node.x = Math.random() * width;
            node.y = Math.random() * y;
          })

          function update() {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            Object.values(ladder.currGraph.graph).forEach(drawNode);
            ctx.fill();
          }

          function drawNode(node) {
            ctx.moveTo(node.x, node.y);
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
          }

          update();

          // let svg = d3.select('body').append('svg')
          //   .attr('width', 800)
          //   .attr('height', 800);
          //
          //   let simulation = d3.forceSimulation()
          //     .force("link", d3.forceLink(ladder.currGraph.links))
          //     .force("link",d3.forceLink().id(function (d) {return d.val;}).distance(100).strength(1))
          //     .force("charge", d3.forceManyBody())
          //     .force("center", d3.forceCenter(800 / 2, 800 / 2));
          //
          //     simulation
          //       .nodes(ladder.currGraph.graph)
          //       .on("tick", ticked);
          //
          //   simulation.force("link")
          //       .links(ladder.currGraph.links);
          //
          //     simulation.nodes()
          //
          //
          //     function ticked() {
          //         context.clearRect(0, 0, width, height);
          //
          //         context.beginPath();
          //         graph.links.forEach(drawLink);
          //         context.strokeStyle = "#aaa";
          //         context.stroke();
          //
          //         context.beginPath();
          //         graph.nodes.forEach(drawNode);
          //         context.fill();
          //         context.strokeStyle = "#fff";
          //         context.stroke();
          //       }
                        // .nodes(d3.values(ladder.currGraph.graph))
                        // .links(ladder.currGraph.links)
                        // .gravity(.05)
                        // .distance(100)
                        // .charge(-100)
                        // .start()
                        // console.log(simulation);

            // let link = svg.selectAll('.link')
            //             .data(ladder.currGraph.links)
            //             .enter()
            //             .append('line')
            //             .attr('class', 'link')
            // //
            // let node = svg.selectAll('.node')
            //             .data(ladder.currGraph.graph)
            //             .enter()
            //             .append('circle')
            //             .attr('class', 'node')
            //             .attr('r', 800 * 0.03)

          // console.log(ladder.currGraph)

        }
      }, 0)

    }

  })
})
