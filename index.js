import WordLadder from './lib/wordLadder.js';
import words from 'an-array-of-english-words';
import VisualBuild from './lib/visualBuild.js';
import * as d3 from 'd3'

document.addEventListener("DOMContentLoaded", () => {
  let words = ["cat", "can", "car", "bar", "bat", "bit", "hit", "him", "hid", "did", "dig", "dad", "bad", "big", "gig", "gave", "give"]
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
        path = ladder.findPath(inputs[0].value.toLowerCase().trim(), inputs[1].value.toLowerCase().trim())
        ul.innerText = null;
        if(path === "Path Not Possible") {
          ul.innerText = path
        } else {
          path.forEach(word => {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.href = "https://www.merriam-webster.com/dictionary/" + word
            a.target = "_blank"
            a.innerText = word.val;
            li.appendChild(a)
            ul.appendChild(li)
          })
          let visual = new VisualBuild();
          visual.buildStartWordToEndWord(path[0], path[path.length - 1])
        //   let canvas = d3.select('#canvas');
        //   let width = canvas.attr("width");
        //   let height = canvas.attr("height");
        //   let radius = 3;
        //   let color = d3.scaleOrdinal(d3.schemeCategory10)
        //   let ctx = canvas.node().getContext("2d");
        //
        //   let simulation = d3.forceSimulation()
        //     .force("x", d3.forceX(width / 2))
        //     .force("y", d3.forceY(height / 2))
        //     .force("collide", d3.forceCollide(radius + 1))
        //     .force("charge", d3.forceManyBody().strength(-200))
        //     .force("link", d3.forceLink().id((d) => d.val))
        //     .on("tick", update)
        //
        //     simulation.nodes(Object.values(ladder.currGraph.graph))
        //     simulation.force("link")
        //         .links(ladder.currGraph.links)
        //
        //
        // canvas
        //     .call(d3.drag()
        //         .container(canvas.node())
        //         .subject(dragsubject)
        //         .on("start", dragstarted)
        //         .on("drag", dragged)
        //         .on("end", dragended));
        //
        //   function update() {
        //     ctx.clearRect(0, 0, width, height);
        //     ctx.globalAlpha = 0.8;
        //     ctx.beginPath();
        //     ctx.strokeStyle = "#aaa"
        //     ladder.currGraph.links.forEach(drawLink);
        //     ctx.stroke();
        //     Object.values(ladder.currGraph.graph).forEach(drawNode);
        //   }
        //
        //   // credit to https://bl.ocks.org/mbostock/ad70335eeef6d167bc36fd3c04378048
        //
        //   function dragsubject() {
        //     return simulation.find(d3.event.x, d3.event.y);
        //   }
        //   function drawNode(node) {
        //     ctx.beginPath();
        //
        //     ctx.fillStyle = color(node.weight)
        //     ctx.moveTo(node.x, node.y);
        //     ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
        //     ctx.fill()
        //     ctx.beginPath();
        //     ctx.fillStyle = "black"
        //     ctx.fillText(node.val, node.x - 10, node.y + 10)
        //   }
        //
        //   function drawLink(link) {
        //     ctx.moveTo(link.source.x, link.source.y)
        //     ctx.lineTo(link.target.x, link.target.y, radius, 0, 2 * Math.PI)
        //
        //   }
        //
        //   function dragstarted() {
        //     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        //     d3.event.subject.fx = d3.event.subject.x;
        //     d3.event.subject.fy = d3.event.subject.y;
        //   }
        //
        //   function dragged() {
        //     d3.event.subject.fx = d3.event.x;
        //     d3.event.subject.fy = d3.event.y;
        //   }
        //
        //   function dragended() {
        //     if (!d3.event.active) simulation.alphaTarget(0);
        //     d3.event.subject.fx = null;
        //     d3.event.subject.fy = null;
        //   }
        //
        }
      }, 0)

    }

  })
})
