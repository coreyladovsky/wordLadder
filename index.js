class Node {
  constructor(val) {
    this.val = val;
    this.children = [];
    this.childrenValues = new Set()
  }

  hasChild(val) {
    return this.childrenValues.has(val)
  }
}

class Graph {
  constructor(wordLength) {
    this.includes = {};
    this.wordLength = wordLength
  }

  connect(node1, node2) {
    if(!node1.hasChild(node2.val)) {
      node1.childrenValues.add(node2.val)
      node2.childrenValues.add(node1.val)
      node1.children.push(node2)
      node2.children.push(node1)
    }
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

  build(startWord, words) {
    let wordsToBuild = words.filter(word => word.length === this.wordLength)
    let startWordNode = new Node(startWord);
    this.includes[startWord] = startWordNode;
    let queue = [startWordNode]
    while(queue.length) {
      let nextWord = queue.shift();
      for(let i = 0; i < wordsToBuild.length; i++) {
        if(this.isOneOff(nextWord.val, wordsToBuild[i])) {
          let newWord;
          if(!this.includes[wordsToBuild[i]]) {
            newWord = new Node(wordsToBuild[i])
            this.includes[wordsToBuild[i]] = newWord;
            queue.push(newWord);
          } else {
            newWord = this.includes[wordsToBuild[i]]
          }
          this.connect(nextWord, newWord)
        }
      }
    }
    return this.includes
  }

}

class WordLadder {
  constructor(dictionary) {
    this.dictionary = dictionary;
    this.graphs = {};
  }

  buildGraph(startWord, endWord) {
    let graph = new Graph(startWord.length);
    return graph.build(startWord, this.dictionary);
  }


  isPossilbe(startWord, endWord) {
    if(startWord.length !== endWord.length) {
      return false;
    }
    if(this.graphs[startWord.length]) {
      let graphArr = this.graphs[startWord.length];
      for(let i = 0; i < graphArr.length; i++) {
        let currGraph = graphArr[i]
        if(!!currGraph[startWord] && !!currGraph[endWord]) {
          return currGraph;
        } else if(currGraph[startWord] && !currGraph[endWord]) {
          return false;
        } else if(!currGraph[startWord] && currGraph[endWord]) {
          return false
        } else if(!currGraph[startWord] && !currGraph[endWord]){
            let graph = this.buildGraph(startWord, endWord)
            this.graphs[startWord.length].push(graph)
        }
      }

    } else {
        let graph = this.buildGraph(startWord, endWord)
        this.graphs[startWord.length] = [graph]
        return this.isPossilbe(startWord, endWord);
    }
  }

  findPath(startWord, endWord) {
    let possible = this.isPossilbe(startWord, endWord)
    if(!!possible) {
      return this.weightCalc(possible, startWord, endWord)
    } else {
      return "Path Not Possible";
    }
  }

  weightCalc(graph, startWord, endWord) {
    let start = graph[startWord];
    start.weight = 0;
    start.visited = true;
    let queue = [start];
    while(queue.length) {
      let node = queue.shift();
      node.children.forEach(child => {
        let possWeight = node.weight + 1
        if(child.visited) {
          child.weight = Math.min(possWeight, child.weight)
        } else {
          child.visited = true;
          child.weight = possWeight;
          queue.push(child)
        }
      })
    }
    return this.reverseLookUp(graph, startWord, endWord)

  }

  reverseLookUp(graph, startWord, endWord) {
    let output = [endWord];
    let currentNode = graph[endWord];
    while(currentNode.val !== startWord) {
      currentNode = currentNode.children.reduce((acc, curr) => {
        if(curr.weight < acc.weight) {
          acc = curr
        }
        return acc;
      })
      output.unshift(currentNode.val);s
    }
    return output
  }

}

let arr = ["cat", "bat", "bar", "car", "cart", "git", "get", "gin", "card", "cord", "bad", "dad", "did", "dig"]
let ladder = new WordLadder(arr)
// console.log(ladder)
console.log(ladder.findPath("car", "dad"))
// console.log(ladder.findPath("get", "gin"))
// console.log(ladder.findPath("car", "gin"))
// console.log(ladder.findPath("cart", "cord"));
// console.log("Ladder" , ladder)
