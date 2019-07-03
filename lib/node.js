class Node {
  constructor(val) {
    this.val = val;
    this.children = [];
    this.childrenValues = new Set()
    this.weight = null;
    this.visited = false;
  }

  addChild(child) {
    if(this.hasChild(child)) {
      return false;
    } else {
      this.children.push(child);
      this.childrenValues.add(child.val)
      return true;
    }
  }

  hasChild(child) {
    return this.childrenValues.has(child.val);
  }

  reset() {
    this.weight = null;
    this.visited = false;
  }
}

export default Node;
