var file = "";
var hideOtherTopics = 1;
var lastShownTopic = 0;
var maxTopics = 4;
var topics = [];
var topicContainer = document.getElementById("topics");

function getVisibleTopics() {
        var topicsToCheck = document.getElementsByTagName("li");
        var visibleTopics = 0;

        for (i = 0; i < topicsToCheck.length; i++) {
                if (topicsToCheck[i].className != "hidden") {
                        visibleTopics++;
                }
        }

        return visibleTopics;
}

function manageTopics(start) {
        if (topics.length > 0) {
                if (start > 0) {
                        start = (+start + 1);
                }

                var visibleTopics = getVisibleTopics();
                if (visibleTopics == maxTopics) {
                        return;
                }

                if (visibleTopics == 0 && lastShownTopic == topics.length) {
                        document.getElementById("fileSelector").setAttribute("class", "fileSelector hidden");
                }

                var maxTopicsLoop = maxTopics;
                if (visibleTopics > 0) {
                        maxTopicsLoop = (maxTopics - visibleTopics);
                }

                for (i = start; i < topics.length && i < (start + maxTopicsLoop); i++) {
                        var topicItem = document.createElement("li");
                        topicItem.setAttribute("class", "topic");
                        topicItem.setAttribute("id", "topic" + i);
                        topicItem.appendChild(document.createTextNode(topics[i]));

                        if (i == 0) {
                                topicItem.setAttribute("class", "topic current");
                        }

                        topicContainer.appendChild(topicItem);
                        lastShownTopic = i;
                }
        }
}

function readFile() {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
                topics = reader.result.split("\n");
                manageTopics(lastShownTopic);
                document.getElementById("noTopics").setAttribute("class", "hidden");
        }
}

window.onload = function() {
        var fileInput = document.getElementById("fileInput");
        fileInput.addEventListener("change", function(e) {
                file = fileInput.files[0];
                readFile();

                document.getElementById("fileSelector").setAttribute("class", "fileSelector hidden");
        });
}

window.setInterval(function() {
        readFile();
}, 5000);

topicContainer.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "LI") {
                var originalId = e.target.id;
                var id = originalId.replace(/topic/, "");
                var item = document.getElementById(originalId);

                if (hideOtherTopics && item.className != "topic current") {
                        return;
                }

                if (hideOtherTopics) {
                        item.className = "hidden";
                } else {
                        item.className = "topic";
                }

                var nextId = +id + 1;
                var nextElement = document.getElementById("topic" + nextId);
                if (nextElement) {
                        nextElement.setAttribute("class", "topic current");
                }

                var visibleTopics = getVisibleTopics();
                if (topics.length == 0 || visibleTopics == maxTopics) {
                        return;
                }

                if (lastShownTopic > 0 && lastShownTopic > 0 && lastShownTopic != topics.length) {
                        manageTopics(lastShownTopic);
                }
        }
});