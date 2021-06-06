let raw = 
`
    # Oneslide

## 第一页

## 第二页

## 第三页

### 问题1

### 问题2

## 第四页
`
const isMain = str => (/^#{1,2}(?!#)/).test(str)
const isSub = str => (/^#{3}(?!#)/).test(str)

function convert(raw) {
    let arr = raw.split(/\n(?=\s*#)/).filter(s => s!='').map(s => s.trim())
    let html = ''
    for(i=0; i<arr.length; i++) {
        if(arr[i+1]!=undefined) {

            if(isMain(arr[i]) && isMain(arr[i+1])) {
                html += 
                `
                <section data-markdown>
                <textarea data-template>
${arr[i]}
                </textarea>
                </section>
                `
            }else if(isSub(arr[i]) && isSub(arr[i+1])) {
                html +=
                `
                <section data-markdown>
                <textarea data-template>
${arr[i]}
                </textarea>
                </section>
                `
            }else if(isMain(arr[i]) && isSub(arr[i+1])) {
                html +=
                `
                <section>
                <section data-markdown>
                <textarea data-template>
${arr[i]}
                </textarea>
                </section>
                `
            }else if(isSub(arr[i]) && isMain(arr[i+1])) {
                html +=
                `
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
                html +=
                `
                <section data-markdown>
                <textarea data-template>
${arr[i]}
                </textarea>
                </section>
                `
            }else if(isSub(arr[i])) {
                html +=
                `
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
	document.querySelector('.slide').innerHTML = html
	
}

start()

document.querySelectorAll('textarea').forEach(s => s.setAttribute('readonly',''))
