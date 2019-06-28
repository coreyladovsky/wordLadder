// import { words } from "./dict.js"
import WordLadder from './lib/wordLadder.js';

document.addEventListener("DOMContentLoaded", () => {
  let words = ["cat", "bat", "bar", "car", "cart", "git", "get", "gin", "card", "cord", "bad", "dad", "did", "dig", "hat", "ham"]

  let ladder = new WordLadder(words)
  let submit = document.querySelector("button");
  submit.addEventListener("click", () => {
    let ul = document.querySelector("ul")
    ul.innerText = null;
    let inputs = document.querySelectorAll("input")
    let path = ladder.findPath(inputs[0].value, inputs[1].value)
    if(path === "Path Not Possible") {
      ul.innerText(path)
    } else {
      path.forEach(word => {
        let li = document.createElement("li");
        li.innerText = word;
        ul.appendChild(li)
      })

    }
  })
})
//
// let arr = ["cat", "bat", "bar", "car", "cart", "git", "get", "gin", "card", "cord", "bad", "dad", "did", "dig", "hat", "ham"]
// let ladder = new WordLadder(arr)
// console.log(ladder)
// console.log(ladder.findPath("car", "bat"))
// console.log(ladder.findPath("bat", "car"))
// console.log(ladder.findPath("car", "gin"))
// console.log(ladder.findPath("cart", "cord"));
// console.log("Ladder" , ladder)
