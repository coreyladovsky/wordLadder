import * as d3 from 'd3'

class VisualBuild {
  constructor(graph) {
    this.graph = graph;
  }

  buildStartWordToEndWord(startWord, endWord) {
    let nodes = [startWord]
    let queue = [startWord]
    // this.drawNodes(nodes)
    while(queue.length) {
      let curr = queue.shift();
      curr.children.forEach(node => {
        if(node.weight <= endWord.weight && !node.visited) {
          node.visited = true;
          queue.push(node)
          nodes.push(node)
          // this.drawNodes(nodes)
        }
      })
    }

    this.drawNodes(nodes);

  }

  drawNodes(nodes) {
    let canvas = d3.select('#canvas');
    let width = canvas.attr("width");
    let height = canvas.attr("height");
    let radius = 3;
    let color = d3.scaleOrdinal(d3.schemeCategory10)
    let ctx = canvas.node().getContext("2d");

    let simulation = d3.forceSimulation()
      .force("x", d3.forceX(width / 2))
      .force("y", d3.forceY(height / 2))
      .force("collide", d3.forceCollide(radius + 1))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("link", d3.forceLink().id((d) => d.val))
      .on("tick", update)

      simulation.nodes(nodes)
      // simulation.force("link")
      //     .links(ladder.currGraph.links)


  canvas
      .call(d3.drag()
          .container(canvas.node())
          .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    function update() {
      ctx.clearRect(0, 0, width, height);
      // ctx.globalAlpha = 0.8;
      // ctx.beginPath();
      // ctx.strokeStyle = "#aaa"
      // ladder.currGraph.links.forEach(drawLink);
      // ctx.stroke();
      // for(let i = 0; i < nodes.length; i++) {
      //   setTimeout(() => {
      //     drawNode(nodes[i])
      //   }, nodes[i].weight * 10)
      //
      // }
      console.log("NODES", nodes);
      nodes.forEach(drawNode);
    }

    // credit to https://bl.ocks.org/mbostock/ad70335eeef6d167bc36fd3c04378048

    function dragsubject() {
      return simulation.find(d3.event.x, d3.event.y);
    }
    function drawNode(node) {
      console.log("DRAW", node);
      ctx.beginPath();

      ctx.fillStyle = color(node.weight)
      ctx.moveTo(node.x, node.y);
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.beginPath();
      ctx.fillStyle = "black"
      ctx.fillText(node.val, node.x - 10, node.y + 10)

    }

    function drawLink(link) {
      ctx.moveTo(link.source.x, link.source.y)
      ctx.lineTo(link.target.x, link.target.y, radius, 0, 2 * Math.PI)

    }

    function dragstarted() {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
      if (!d3.event.active) simulation.alphaTarget(0);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }


  }
}

export default VisualBuild
