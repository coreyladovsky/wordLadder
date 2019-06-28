import { words } from "./dict.js"
import WordLadder from './lib/wordLadder.js';

document.addEventListener("DOMContentLoaded", () => {
  let ladder = new WordLadder(words)
  let submit = document.querySelector("form");
  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    let ul = document.querySelector("ul")
    ul.innerText = "Thinking... Please wait"
    let inputs = document.querySelectorAll("input")
    let path = ladder.findPath(inputs[0].value, inputs[1].value)
    ul.innerText = null;
    if(path === "Path Not Possible") {
      ul.innerText = path
    } else {
      path.forEach(word => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "https://www.merriam-webster.com/dictionary/" + word
        a.target = "_blank"
        a.innerText = word;
        li.appendChild(a)
        ul.appendChild(li)
      })

    }
  })
})
