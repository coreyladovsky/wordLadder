import Graph from './graph.js';

class WordLadder {
  constructor(dictionary) {
    this.dictionary = this.setUpDictionary(dictionary);
    this.graphs = {};
  }

  setUpDictionary(dictionary) {
    let dict = {};
    dictionary.forEach(word => {
      if(dict[word.length]) {
        dict[word.length].push(word)
      } else {
        dict[word.length] = [word]
      }
    })
    return dict;
  }

  buildGraph(startWord, endWord) {
    let graph = new Graph(startWord.length);
    return graph.build(startWord, this.dictionary[startWord.length]);
  }


  isPossilbe(startWord, endWord) {
    if(startWord.length !== endWord.length) {
      return false;
    }
    if(!this.dictionary[startWord.length].includes(startWord)) return false;
    if(!this.dictionary[endWord.length].includes(endWord)) return false;
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
      output.unshift(currentNode.val);
    }
    Object.values(graph).forEach(word => {
      word.visited = false;
      word.weight = null;
    })
    return output
  }

}

export default WordLadder;
