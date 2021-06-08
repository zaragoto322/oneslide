const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const isMain = str => (/^#{1,2}(?!#)/).test(str)
const isSub = str => (/^#{3}(?!#)/).test(str)

function convert(raw) {
  let arr = raw.split(/\n(?=\s*#)/).filter(s => s!="").map(s => s.trim())

  let html = ''
  for(let i=0; i<arr.length; i++) {

    if(arr[i+1] !== undefined) {
      if(isMain(arr[i]) && isMain(arr[i+1])) {
        html += `
<section data-markdown>
<textarea data-template>
${arr[i]}
</textarea>
</section>
` 
      } else if(isMain(arr[i]) && isSub(arr[i+1])) {
        html += `
<section>
<section data-markdown>
<textarea data-template>
${arr[i]}
</textarea>
</section>
`
      } else if(isSub(arr[i]) && isSub(arr[i+1])) {
        html += `
<section data-markdown>
<textarea data-template>
${arr[i]}
</textarea>
</section>
`
      } else if(isSub(arr[i]) && isMain(arr[i+1])) {
        html += `
<section data-markdown>
<textarea data-template>
${arr[i]}
</textarea>
</section>
</section>
`
      }      

    } else {
      if(isMain(arr[i])) {
        html += `
<section data-markdown>
<textarea data-template>
${arr[i]}
</textarea>
</section>
`        
      } else if(isSub(arr[i])) {
        html += `
<section data-markdown>
<textarea data-template>
${arr[i]}
</textarea>
</section>
</section>
`        
      }
    }

  }

  return html
}






function loadMarkdown(raw) {
	localStorage.markdown = raw
	location.reload()
}

function start() {
	let TPL = `# One Slide`
	let html = convert(localStorage.markdown || TPL)
	document.querySelector('.slides').innerHTML = html
}

const Editor = {
  init() {
    console.log('editor init')

  }
}

const Menu = {
  init() {
    console.log('menu init')
    this.$settingIcon = $('.control .icon-setting')
    this.$menu = $('.menu')
    this.$closeIcon = $('.menu .icon-close')
    this.$$tabs = $$('.menu .tab')
    this.$$contents = $$('.menu .content')

    this.bind()
  },

  bind() {
    let self = this
    this.$settingIcon.onclick = function() {
      self.$menu.classList.add('open')
    }

    this.$closeIcon.onclick = function() {
      self.$menu.classList.remove('open')
    }

    this.$$tabs.forEach($tab => $tab.onclick = function() {
      self.$$tabs.forEach($tab => $tab.classList.remove('active'))
      this.classList.add('active')
      self.$$contents.forEach($content => $content.classList.remove('active'))
      let i = [...self.$$tabs].indexOf(this)
      self.$$contents[i].classList.add('active')
      


    })
  }


  

}

const App = {
  init() {
    [...arguments].forEach(Module => Module.init())
  }
}

App.init(Menu, Editor)









start()
