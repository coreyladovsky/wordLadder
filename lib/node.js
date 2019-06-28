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

export default Node;
