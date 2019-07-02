import Node from './node.js'

class Graph {
  constructor(wordLength) {
    this.graph = {};
    this.wordLength = wordLength
  }

  reset() {
    Object.values(this.graph).forEach(node => node.reset())
  }

  connect(node1, node2) {
    node1.addChild(node2);
    node2.addChild(node1)
  }

  isOneOff(str1, str2) {
    let offCounts = 0;
    for(let i = 0; i < str1.length; i++) {
      if(str1[i] !== str2[i]) {
        offCounts++
      }
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

  build(startWord, wordsToBuild) {
    let startWordNode = new Node(startWord);
    this.addNode(startWordNode)
    let queue = [startWordNode]

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

          this.connect(currentNode, wordNode)
        }
      })
    }
    return this.graph
  }
}

export default Graph;
