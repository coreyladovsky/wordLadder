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

  buildGraph(word) {
    let graph = new Graph(word.length);
    graph.build(word, Array.from(this.dictionary[word.length]));
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
        if (currGraph.hasWord(startWord) && currGraph.hasWord(endWord)) return currGraph;
        if (currGraph.hasWord(startWord) || currGraph.hasWord(endWord)) return false;
        this.addGraph(startWord);
      }

    } else {
      this.addGraph(startWord);
      return this.isPossilbe(startWord, endWord);
    }
  }

  addGraph(word) {
    let graph = this.buildGraph(word);
    this.graphs[word.length]
      ? this.graphs[word.length].push(graph)
      : (this.graphs[word.length] = [graph]);
  }

  findPath(startWord, endWord) {
    let graphOrFalse = this.isPossilbe(startWord, endWord);
    if (graphOrFalse) {
      return this.weightCalc(graphOrFalse, startWord, endWord);
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
