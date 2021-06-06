const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

let arr = $$('section')
arr[0].classList.add('active')