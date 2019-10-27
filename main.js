const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const xObject = JSON.parse(localStorage.getItem('site'));
let $logo;
const hashMap = xObject || [
  { logo: "A", logoType: "text", url: "https://www.acfun.cn" },
  {
    logo:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3335851201,737797255&fm=26&gp=0.jpg",
    logoType: "image",
    url: "https://www.bilibili.com"
  }
];

const render = () => {
  $siteList.find("li:not(.last)").remove();

  hashMap.forEach(node => {
    if (node.logoType === 'text') {
      $logo = node.url[parseInt(Math.random()*10, 10)]
    } else if(node.logoType === 'image') {
      $logo = `<img src="${node.logo}" alt=""></img>`
    }
    const $li = $(`<li>
          <a href="${node.url}">
            <div class="site">
              <div class="logo">${$logo}</div>
              <div class="link">${node.url}</div>
            </div>
          </a>
    </li>`).insertBefore($lastLi);
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: url[0],
    logoType: "text",
    url: url
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("site", string);
};
