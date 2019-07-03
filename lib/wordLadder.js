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
    graph.build(word, this.dictionary[word.length]);
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
      graphOrFalse.weightCalc(startWord);
      return graphOrFalse.reverseLookUp(startWord, endWord);
    }
      return "Path Not Possible";
  }


}

export default WordLadder;
