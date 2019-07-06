import Node from './node.js'

class Graph {
  constructor(wordLength) {
    this.graph = {};
    this.wordLength = wordLength
    this.links = [];
  }

  resetWeight() {
    Object.values(this.graph).forEach(node => node.resetWeight())
  }

  resetVisited() {
    Object.values(this.graph).forEach(node => node.resetVisited())
  }

  connect(node1, node2) {
    if(!node1.hasChild(node2) || !node2.hasChild(node1)) {
      this.links.push({ source: node1, target: node2})
    }
    node1.addChild(node2);
    node2.addChild(node1)
  }

  isOneOff(str1, str2) {
    let offCounts = 0;
    for(let i = 0; i < str1.length; i++) {
      if(str1[i] !== str2[i]) offCounts++
      if(offCounts > 1) break
    }
    return offCounts === 1 ? true : false;
  }

  addNode(node) {
    this.graph[node.val] = node;
  }

  hasWord(word) {
    return !!this.graph[word]
  }

  getNode(word) {
    return this.graph[word];
  }

  build(word, wordsToBuild) {
    let node = new Node(word);
    this.addNode(node);
    let queue = [ node ];

    while(queue.length) {
      let currentNode = queue.shift();

      wordsToBuild.forEach(word => {

        if(this.isOneOff(currentNode.val, word)) {
          let wordNode;

          if(this.hasWord(word)) {
            wordNode = this.getNode(word);
          } else {
            wordNode = new Node(word);
            this.addNode(wordNode);
            queue.push(wordNode);
          }

          this.connect(currentNode, wordNode);
        }
      })
    }
    return this.graph;
  }


  weightCalc(word) {
    let start = this.getNode(word);
    start.weight = 0;
    start.visited = true;
    let queue = [ start ];
    while (queue.length) {
      let node = queue.shift();

      node.children.forEach(child => {
        let possWeight = node.weight + 1;
        if (child.visited) {
          child.weight = Math.min(possWeight, child.weight);
        } else {
          child.visited = true;
          child.weight = possWeight;
          queue.push(child);
        }
      });

    }
  }


  reverseLookUp(startWord, endWord) {
    let currentNode = this.getNode(endWord);
    let output = [ currentNode ];

    while (currentNode.weight) {

      for(let i = 0; i < currentNode.children.length; i++) {
        if(currentNode.children[i].weight + 1 === currentNode.weight) {
          currentNode = currentNode.children[i];
          break;
        }
      }

      output.unshift(currentNode);
    }

    // this.reset();
    return output;
  }
}

export default Graph;
