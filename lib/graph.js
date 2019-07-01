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
      if(offCounts > 1) return false
    }
    return offCounts === 0 ? false : true
  }

  addNode(node) {
    this.graph[node.val] = node;
  }

  build(startWord, wordsToBuild) {
    let startWordNode = new Node(startWord);
    this.addNode(startWordNode)
    let queue = [startWordNode]
    while(queue.length) {
      let nextWord = queue.shift();
      for(let i = 0; i < wordsToBuild.length; i++) {
        if(this.isOneOff(nextWord.val, wordsToBuild[i])) {
          let newWord;
          if(!this.graph[wordsToBuild[i]]) {
            newWord = new Node(wordsToBuild[i])
            this.graph[wordsToBuild[i]] = newWord;
            queue.push(newWord);
          } else {
            newWord = this.graph[wordsToBuild[i]]
          }
          this.connect(nextWord, newWord)
        }
      }
    }
    return this.graph
  }

}

export default Graph;
