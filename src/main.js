const defaultSite = [
    {
        logo: 'a',
        siteUrl: 'acfun.cn',
        id: 0
    }
]

const hashMap = JSON.parse(localStorage.getItem('xxx')) || defaultSite;

let liHtml = hashMap.reduce((liString, item, index) => {
    return liString + `
        <li class="cardItem" data-n="${index}">
            <div class="logo">${item.logo}</div>
            <div class="siteUrl">${item.siteUrl}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </li>
    `
}, '');
$(liHtml).insertBefore('.addItem');


$('.cardItem').on('click', (e) => {
    window.open( '//' + $(e.currentTarget).find('.siteUrl')[0].innerText);
})

listenClose();

$('.addItem').on('click', (e) => {
    let siteUrl = prompt('请输入网址');
    siteUrl = siteUrl.replace('http://', '').replace('https://', '').replace(/\/.*/, '').replace('www.', '');
    hashMap.push({
        logo: siteUrl[0],
        siteUrl,
        id: hashMap.length
    });
    let li = $(`
        <li class="cardItem" data-n="${hashMap.length}">
            <div class="logo">${siteUrl[0]}</div>
            <div class="siteUrl">${siteUrl}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </li>
    `);
    li.insertBefore('.addItem');
    li.on('click', (e) => {
        window.open( '//' + $(e.currentTarget).find('.siteUrl')[0].innerText);
    })
    listenClose();
})

$(document).keydown((e) => {
    console.log('按下键盘');
    console.log(e.key);
    let site = hashMap.find((item) => {
        return item.logo === e.key
    });
    console.log(site);
    site && window.open( '//' + site.siteUrl);
})



function listenClose() {
    $('.close').on('click', (e) => {
        let siteItem = $(e.currentTarget).parent()[0];
        siteItem.remove();
        const index = hashMap.findIndex((item) => {
        return item.id === parseInt(siteItem.dataset.n)
    })
    hashMap.splice(index, 1);
    console.log(hashMap);
    e.stopPropagation();
    })
}

window.addEventListener("beforeunload", ()=>{
    console.log('hashMap', hashMap);
    localStorage.setItem('xxx', JSON.stringify(hashMap));
})