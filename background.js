chrome.contextMenus.create({title: "In Order Tab", onclick: inOrderTab}, function(){
});

chrome.browserAction.onClicked.addListener(function(){
  inOrderTab();
});

function inOrderTab() {
  chrome.tabs.query({}, tabs => {
    let urls = [];
    let tabids = [];
    
    for(let i = 0; i < tabs.length; i++) {
      urls.push(tabs[i].url);
      tabids.push(tabs[i].id);
    }

    urls.sort();

    // youtubeは先頭にする
    let youtube_index = [];
    for(let j = 0; j < urls.length; j++) {
      if(urls[j].indexOf("youtube") != -1) {
        youtube_index.push(j);
      }
    }
    youtube_index.forEach(index => {
      urls.unshift(urls[index]);
      urls.splice(index+1, 1);
    });
    
    // 現在開いているタブを削除
    for(let j = 0; j < tabids.length; j++) {
      chrome.tabs.remove(tabids[j]);
    }

    // タブの並び替え
    for(let j = 0; j < urls.length; j++) {
      chrome.tabs.create({url: urls[j]});
    }
  });
};

