$(function () {

    var blockList = new Array();

    chrome.storage.sync.get(['list1'], function (val) {
        if (val.list1.length > 0)
            blockList = val.list1;
        console.log("val.list1 :" + val.list1);
        //displaying the old items
        for (var i = 0; i < blockList.length; i++) {
            addBlockedSite(blockList[i]);
        }
    })


    $('#addButtonTask').click(function () {
        var newBlockedSite = $('#taskInput').val();
        //adding the new item to tasklist array
        blockList.push(newBlockedSite);
        console.log("blockList under click :" + blockList);
        addBlockedSite(newBlockedSite);
        //adding the new list back to chrome storage
        chrome.storage.sync.set({
            'list1': blockList
        })


    });

    function addBlockedSite(value) {
        console.log("addBlockedSite");
        document.getElementById("taskInput").value = "";
        var ul = document.getElementById("todo-listUl");

        addUI(ul, value, 1)
    }

    function addUI(ul, value, num) {
        var li = document.createElement("li");
        $("li").addClass("list-group-item");
        li.appendChild(document.createTextNode(value));

        if (value === '') {
            //do nothing
            //alert("You must write something!");
        } else {
            ul.appendChild(li);
        }


        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        if (num === 1) {
            span.className = "close1";
            span.appendChild(txt);
            li.appendChild(span);

            $(".close1").click(function () {
                var index = $(this).index(".close1");

                console.log(index);
                var div = this.parentElement;
                div.style.display = "none";
                removeItem(index);
                $(".close1").eq(index).remove();

            })
        }
    }

        function removeItem(itemIndex) {
            console.log("removeitem");
            chrome.storage.sync.get(['list1'], function (val) {
                blockList = val.list1;
                blockList.splice(itemIndex, 1);
                console.log("new list", blockList);

                chrome.storage.sync.set({
                    'list1': blockList
                })

            })

        }
    }
)