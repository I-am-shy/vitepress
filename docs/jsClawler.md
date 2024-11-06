# js爬虫

**代码示例**

index.js
```js
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import file from './file.js';


const baseUrl = "https://pic.netbian.com/4kdongman"
const filePath = "./img.json"
const imgList = []

/**
 * 
 * @param {number} num 获取的图片的页数
 */

function getImgList(num) {
  let i = 2
  let url = `${baseUrl}/index.html`
  requestData(url)
  while (i <= num) {
    url = `${baseUrl}/index_${i}.html`
    requestData(url)
    i++;
  }

}


/**
 * 
 * @param {string} url 请求地址 
 */

function requestData(url) {
  fetch(url)
    .then(res => res.text())
    .then(data => {
      const $ = cheerio.load(data)
      $('.slist ul li').each((index, element) => {
        const img = $(element).find('a img').attr('src')
        imgList.push("https://pic.netbian.com" + img)
        console.log(`正在获取第${index + 1}图片`)
      })
      file(filePath, imgList)
    })
}
getImgList(8)


```
file.js
```js
import fs from 'fs'

/**
 * @param {string} path 文件路径
 * @param {Array} newData 新增的数据
 * @returns {boolean} 文件写入成功返回true，失败返回false
 * 
 * 先读取愿内容，然后添加新的内容，最后再写回文件
 */
export default function file(path,newData){
  let oldData = [],resultData = []
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return false
    } else {
      if(data) oldData = JSON.parse(data)
    }
    if(oldData) resultData = [...oldData,...newData ]
    else resultData =[...newData]
    fs.writeFile(path, JSON.stringify(resultData) , (err) => {
      if (err) {
        console.log(err)
        return false
      } else {
        console.log('done')
      }
    })
  })
  return true
}

// file('./img.json',[])
```
preview.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>预览图片</title>
</head>

<body>

  <script>
    fetch("./img.json")
      .then(response => response.json())
      .then(data => {
        const imgContainer = document.createElement('div');
        imgContainer.style.display = 'flex';
        imgContainer.style.flexWrap = 'wrap';
        imgContainer.style.maxWidth = '100%';
        imgContainer.style.overflow = 'auto';

        data.forEach(img => {
          const imgElement = document.createElement('img');
          imgElement.src = img;
          imgElement.style.width = '100px';
          imgElement.style.height = '100px';
          imgElement.style.margin = '5px';
          imgElement.style.objectFit = 'cover';
          imgContainer.appendChild(imgElement);
        })
        document.body.appendChild(imgContainer);
      })
  </script>
</body>

</html>
```

package.json
```json
{
  "name": "first-clawler",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "cheerio": "^1.0.0",
    "node-fetch": "^3.3.2"
  }
}
```


目录结构：
``` 
first-clawler
├── node_modules
├── file.js
├── img.json
├── index.js
├── package.json
├── package-lock.json
└── preview.html
```
