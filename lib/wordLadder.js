import Graph from "./graph.js";

class WordLadder {
  constructor(dictionary) {
    this.dictionary = this.setUpDictionary(dictionary);
    this.graphs = {};
  }

  setUpDictionary(dictionary) {
    return dictionary.reduce((dict, word) => {
      dict[word.length]
        ? dict[word.length].add(word)
        : (dict[word.length] = new Set([word]));
      return dict;
    }, {});
  }

  buildGraph(startWord, endWord) {
    let graph = new Graph(startWord.length);
    graph.build(
      startWord,
      Array.from(this.dictionary[startWord.length])
    );
    return graph;
  }

  isPossilbe(startWord, endWord) {
    if (startWord.length !== endWord.length) return false;
    if (
      !this.dictionary[startWord.length].has(startWord) ||
      !this.dictionary[endWord.length].has(endWord)
    )
      return false;

    if (this.graphs[startWord.length]) {

      let graphArr = this.graphs[startWord.length];

      for (let i = 0; i < graphArr.length; i++) {
        let currGraph = graphArr[i];
        if (currGraph.hasWord(startWord) && currGraph.hasWord(endWord)) {
          return currGraph;
        } else if (currGraph.hasWord(startWord) || currGraph.hasWord(endWord) ) {
          return false;
        }
        else {
          let graph = this.buildGraph(startWord, endWord);
          this.graphs[startWord.length].push(graph);
        }
      }

    } else {
      let graph = this.buildGraph(startWord, endWord);
      this.graphs[startWord.length] = [graph];
      return this.isPossilbe(startWord, endWord);
    }
  }

  findPath(startWord, endWord) {
    let possible = this.isPossilbe(startWord, endWord);
    if (!!possible) {
      return this.weightCalc(possible, startWord, endWord);
    } else {
      return "Path Not Possible";
    }
  }

  weightCalc(graph, startWord, endWord) {
    let start = graph.getNode(startWord);
    start.weight = 0;
    start.visited = true;
    let queue = [start];
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
    return this.reverseLookUp(graph, startWord, endWord);
  }

  reverseLookUp(graph, startWord, endWord) {
    let output = [endWord];
    let currentNode = graph.getNode(endWord);
    while (currentNode.val !== startWord) {
      currentNode = currentNode.children.reduce((acc, curr) => {
        if (curr.weight < acc.weight) {
          acc = curr;
        }
        return acc;
      });
      output.unshift(currentNode.val);
    }
    
    graph.reset();
    return output;
  }
}

export default WordLadder;
