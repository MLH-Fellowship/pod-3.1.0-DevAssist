console.log("from background")

//inject into foreground
// takes tabid, file(script) to inject, then a callback
// if you want active tab pass null
chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log("foreground injected") )

// chrome.tabs.onActivated.addListener( tab=>{
//     console.log(tab)
// })

// chrome.tabs.onActivated.addListener( tab=>{
//     chrome.tabs.get(tab.tabId, current_tab_info => {
//         console.log(current_tab_info)
//     })
//     console.log(tab)
// })

//to inject scripts smartly
chrome.tabs.onActivated.addListener( tab=>{
    chrome.tabs.get(tab.tabId, current_tab_info => {
        if  (/^https:\/\/www\.google/.test(current_tab_info)){
            chrome.tabs.executeScript(null, {file: './foreground.js'}, ()=> console.log("foreground injected") )
        }
        console.log(current_tab_info)
    })
    console.log(tab)
})