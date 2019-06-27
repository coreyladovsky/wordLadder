class Node {
  constructor(val) {
    this.val = val;
    this.children = [];
  }
}

class Graph {
  constructor() {
    this.includes = {};
  }

  connect(node1, node2) {
    node1.children.push(node2)
    node2.children.push(node1)
  }

  build(words, wordLength) {
    let wordsToBuild = words.filter(word => word.length === wordLength)
  }

}
