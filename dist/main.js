!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r={GITHUB_SEARCH_PAGE_URL:"https://github.com/search?o=desc&p=PAGE&q=QUERY&s=indexed&type=Code",BAD_WORD:"ZnVjaw==",NICE_WORD:"butterfly"},o=e=>{const t=document.createElement("div");return t.innerHTML=e,t},a=e=>{var t=document.createElement("p");t.innerText=e,document.body.insertBefore(t,document.body.firstChild)},u={Clean:(e,t,n)=>e.replace(new RegExp(t,"ig"),n)};let c=atob(r.BAD_WORD),l=r.NICE_WORD;(()=>new Promise((e,t)=>{c=prompt("Enter the word you want to get rid from Internet (leave empty to use custom):")||c,l=prompt("Enter the word you want the previous world to be replaced with (leave empty to use custom):")||l,e()}))().then(()=>new Promise((e,t)=>{a("Fetching search results...");const n=new XMLHttpRequest;n.onreadystatechange=function(){4==n.readyState&&200==n.status&&e(n.responseText)},n.open("GET",r.GITHUB_SEARCH_PAGE_URL.replace("QUERY",c).replace("PAGE",Math.floor(100*Math.random())+1),!0),n.send()})).then(e=>new Promise((t,n)=>{a("Picking random file...");const r=o(e).querySelectorAll(".code-list-item");let u=r[Math.floor(Math.random()*r.length)+1].querySelector("a:nth-child(2)").href;a("Original url: "+u),t(u=u.split("/").map((e,t)=>6===t?"master":e).join("/"))})).then(e=>new Promise((t,n)=>{a("Fetching file form: "+e);const r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState&&200==r.status){const n=o(r.responseText).querySelector(".octicon-pencil").parentElement.parentElement.querySelectorAll("input")[1];t({url:e,token:n.value})}},r.open("GET",e),r.send()})).then(e=>new Promise((t,n)=>{const r=e.url.replace("/blob/","/edit/");a("Fetching edit form: "+r);const o=new XMLHttpRequest;o.onreadystatechange=function(){4==o.readyState&&200==o.status&&t({url:e.url,html:o.responseText})},o.open("POST",r);var u=new FormData;u.append("utf8","✓"),u.append("authenticity_token",e.token),o.send(u)})).then(e=>new Promise((t,n)=>{const r=e.url.replace("/blob/master/","/tree-save/master/");a("Sending propose change data: "+r);const i=o(e.html),p=new XMLHttpRequest;p.onreadystatechange=function(){4==p.readyState&&200==p.status&&t(p.responseURL)},p.open("POST",r);var s=new FormData;s.append("utf8","✓"),s.append("authenticity_token",i.querySelector(".js-blob-form>input[name=authenticity_token]").value),s.append("filename",i.querySelector("input[name=filename]").value),s.append("new_filename",i.querySelector("input[name=new_filename]").value),s.append("commit",i.querySelector(".js-commit-oid").value),s.append("quick_pull",i.querySelector("input[name=quick_pull]").value),s.append("pr",""),s.append("content_changed","true"),s.append("value",u.Clean(i.querySelector(".js-code-textarea").value,c,l)),s.append("message",""),s.append("placeholder_message","Internet cleaning"),s.append("description","Powered by [Internet Cleaner®️](https://github.com/404-html/internet-cleaner)"),p.send(s)})).then(e=>(a("Fetching propose change form: "+e),new Promise((t,n)=>{const r=new XMLHttpRequest;r.onreadystatechange=function(){4==r.readyState&&200==r.status&&t(r.responseText)},r.open("GET",e,!0),r.send()}))).then(e=>{document.open("text/html","replace"),document.write(e),document.close(),setTimeout(()=>{document.querySelector(".compare-pr-placeholder>button").click()},700),a("I'm done!")}).catch(e=>{a("Something went wrong! Bad side of Internet is defending itself..."),a(e)})}]);