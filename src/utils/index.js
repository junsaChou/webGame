/**
 * 对象深拷贝
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  return JSON.parse(JSON.stringify(source))
}

/**
 * 获取粘贴时的纯文本
 * @param e
 * @returns {string}
 */
export function getPlainText(e) {
  function uniform(str) {
    const _str = supportIE(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const arr = _str.split(/\r\n|\r|\n/)
    if (arr) {
      return arr.map(item => {
        if (item.length > 0) {
          return '<div>' + item + '</div>'
        }
        return '<div><br></div>'
      }).join('')
    }
    return _str
  }
  let innerText = ''
  const TAB = ' '.repeat(2)
  e.preventDefault()
  if (e.clipboardData) {
    innerText = (e.originalEvent || e).clipboardData.getData('text/plain').replace(/\t/g, TAB)
    document.execCommand('insertHtml', false, uniform(innerText))
  } else if (window.clipboardData) {
    innerText = window.clipboardData.getData('Text').replace(/\t/g, TAB)
    if (document.selection) {
      document.selection.createRange().pasteHTML(uniform(innerText))
    } else if (window.getSelection) {
      const sel = window.getSelection()
      const range = sel.getRangeAt(0)
      // 创建临时元素，使得TextRange可以移动到正确的位置
      const tempEl = document.createElement('span')
      tempEl.innerHTML = '&#FEFF;'
      range.deleteContents()
      range.insertNode(tempEl)
      const textRange = document.body.createTextRange()
      textRange.moveToElementText(tempEl)
      tempEl.parentNode.removeChild(tempEl)
      textRange.pasteHTML(uniform(innerText))
      textRange.collapse(false)
      textRange.select()
    }
  }
  return uniform(innerText)
}

/**
 * IE中的p标签转换成div
 * @param str
 * @returns {*}
 */
export function supportIE(str) {
  return str.replace(/<(\/?)p>/g, '<$1div>')
}

/**
 * contenteditable 光标定位到最后
 * @param target
 * */
export function keepCursorEnd(target) {
  // 非IE浏览器
  if (window.getSelection) {
    // 解决Firefox不获取焦点无法定位问题
    target.focus()
    // 创建range对象
    const range = window.getSelection()
    // 选择target下所有子内容
    range.selectAllChildren(target)
    // 光标移至最后
    range.collapseToEnd()
  } else if (document.selection) { // IE浏览器
    // 创建range对象
    const range = document.selection.createRange()
    // 定位到target
    range.moveToElementText(target)
    // 光标移至最后
    range.collapse(false)
    range.select()
  }
}

/**
 * 将base64图片数据转换成Blob
 * @param image
 * @returns {Blob}
 */
export function base64toBlob(image) {
  const bytes = window.atob(image.split(',')[1])
  const array = []
  for (let i = 0; i < bytes.length; i++) {
    array.push(bytes.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' })
}

/**
 * 计算图片宽高及比率
 * @param imageTrueW 图片实际宽
 * @param imageTrueH 图片实际高
 * @param showAreaW 展示区宽度
 * @param showAreaH 展示区高度
 * */
export function calcImageSize(imageTrueW, imageTrueH, showAreaW, showAreaH) {
  let [width, height, ratio] = [0, 0, 0]
  // 图片真实宽大于真实高
  if (imageTrueW > imageTrueH) {
    if (imageTrueW >= showAreaW) { // 真实宽大于或等于展示区最大宽
      const imageRatioH = imageTrueH * (showAreaW / imageTrueW)
      // 按展示区最大宽与实际宽比率换算后，高度大于显示高度时
      if (imageRatioH >= showAreaW) {
        width = imageTrueW * (showAreaH / imageTrueH)
        height = showAreaH
        ratio = imageTrueH / showAreaH
      } else {
        width = showAreaW
        height = imageRatioH
        ratio = imageTrueW / showAreaW
      }
    } else {
      width = imageTrueW
      height = imageTrueH
      ratio = 1
    }
  } else { // 图片真实宽小于或等于真实高
    if (imageTrueH >= showAreaH) { // 真实高大于或等于展示区最大高
      width = imageTrueW * (showAreaH / imageTrueH)
      height = showAreaH
      ratio = imageTrueH / showAreaH
    } else {
      width = imageTrueW
      height = imageTrueH
      ratio = 1
    }
  }
  return {
    width,
    height,
    ratio
  }
}
export  function imgRegSrc(item,flag) {
  // console.log(item)
  let reg =  new RegExp('<[^>]+>','gi');  //过滤全部的html标签，不包括内容

  // let reg2 = /<(img|br|hr|input)[^>]*>/gi;  //只匹配img、br、hr、input标签
  let reg2 = new RegExp('<(img|br|hr|input)[^>]*>','gi');  //只匹配img、br、hr、input标签

  // let reg3 = /<(\S*)[^>]*>[^<]*<\/(\1)>/gi;        //分组匹配，过滤全部的html标签，包括内容
  let reg3 = new RegExp('<(\\S*)[^>]*>[^<]*<\\/(\\1)>','gi');  //分组匹配，过滤全部的html标签，包括内容

  let imgReg = /<img.*?(?:>|\/>)/gi //匹配图片中的img标签
  let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
  let str = item.content
  let detail = str.replace(reg,'');
  if(flag){
     detail = str.replace(reg2,'');
    // console.log(detail2)
  }

  let arr = str.match(imgReg)  //筛选出所有的img
  // console.log(arr)
  let srcArr = []

  if( arr ){
    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].match(srcReg)
      // 获取图片地址
      srcArr.push(src[1])
    }
  }else{
    srcArr = null;
  }
  // let detail = str.match(pCon);

  return {srcArr,detail}
}
export  function   toTop() { //回到顶部
      
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  if ( top < 9 )return;
  // 实现滚动效果 
  const timeTop = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
    if (top <= 0) {
      clearInterval(timeTop);
    }
  }, 10);
}
export function metaAppend(content,name){
  // <meta name="twitter:title" content="How to play Adamant Mine? Check this Strategy!">
  // <meta name="twitter:description" content="Up than 200 characters.">
  // <meta name="twitter:image" content="https://gameway.fun/articledetails">
  var oMeta = document.createElement('meta');
  oMeta.name = name;
  oMeta.content = content;
  document.getElementsByTagName('head')[0].appendChild(oMeta);
}
export function  formatMonth(n){
  n = Number(n);
  let val;
  // Jan Feb Mar Apr May Jun Jul Aug Sept Oct Nov Dec
  switch(n){
      case 1:
          val = 'Jan';
          break;
      case 2:
          val = 'Feb';
          break;
      case 3:
          val = 'Mar';
          break
      case 4:
          val = 'Apr';
          break
      case 5:
          val = 'May';
          break
      case 6:
          val = 'Jun';
          break
      case 7:
          val = 'Jul';
          break
      case 8:
          val = 'Aug';
          break
      case 9:
          val = 'Sept';
          break
      case 10:
          val = 'Oct';
          break
      case 11:
          val = 'Nov';
          break
      case 12:
        
        val = 'Dec';
        break
      // default:
          // 与 case 1 和 case 2 不同时执行的代码
  }
  return val
  console.log(val)
}
export function _isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}

// https://twitter.com/share?text=Facebook:%20Please%20Stop%20Talking%20About%20Metaverse&url=http://192.168.103.109:8004/gameway-website/noLogin/game-content/share/new?meta=twitter%253Aurl%252Chttp%253A%252F%252F192.168.103.176%253A8000%252Farticledetails%253Fid%253D49%2526title%253DFacebook%25253A%252520Please%252520Stop%252520Talking%252520About%252520Metaverse%252Ctwitter%253Asite%252C%2540GameWayFun%252Ctwitter%253Atitle%252CFacebook%253A%2520Please%2520Stop%2520Talking%2520About%2520Metaverse%252Ctwitter%253Adescription%252CFacebook%253A%2520Please%2520Stop%2520Talking%2520About%2520Metaverse%252Ctwitter%253Acard%252Csummary_large_image%252Ctwitter%253Aimage%252Chttps%253A%252F%252Fslideshow-photo.oss-ap-southeast-1.aliyuncs.com%252Fgameinfo%252F20211123%252F30e5adbcb8f745c5a03cc6e0d26fa624.png&webUrl=http://192.168.103.176:8000/articledetails?id=49&title=Facebook%3A%20Please%20Stop%20Talking%20About%20Metaverse