import WordLadder from './lib/wordLadder.js';
import words from 'an-array-of-english-words';

document.addEventListener("DOMContentLoaded", () => {

  let ladder = new WordLadder(words)
  let submit = document.querySelector("form");
  let ul = document.querySelector("ul")

  submit.addEventListener("submit", (e) => {
    e.preventDefault();
    ul.innerText = "Thinking... Please wait"
    let inputs = document.querySelectorAll("input")
    let path = "Path Not Possible"

    if(inputs[0].value && inputs[0].value) {

      setTimeout(function() {
        path = ladder.findPath(inputs[0].value.toLowerCase(), inputs[1].value.toLowerCase())
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
      }, 0)
      
    }

  })
})
