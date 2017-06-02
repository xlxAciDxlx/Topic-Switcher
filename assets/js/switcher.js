var file = "";
var hideOtherTopics = 1;
var lastShownTopic = 0;
var maxTopics = 4;
var start = 0;
var topicContainer = document.getElementById("topics");
var topics = [];

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

function manageTopics() {
        if (topics.length == 0) {
                return;
        }

        if (lastShownTopic > 0) {
                start = lastShownTopic;
        }

        if (topics.length > 0) {
                document.getElementById("fileSelector").setAttribute("class", "fileSelector hidden");
        }

        var visibleTopics = getVisibleTopics();
        if (visibleTopics == maxTopics || visibleTopics == topics.length) {
                return;
        }

        var maxTopicsLoop = maxTopics;
        if (visibleTopics > 0) {
                if (topics.length == 1) {
                        maxTopicsLoop = topics.length;
                } else {
                        maxTopicsLoop = (maxTopics - visibleTopics);
                }
        }

        for (i = start; i < topics.length && i < (start + maxTopicsLoop); i++) {
                if (topics[i].length == 0 || topics[i].length == 1) {
                        maxTopicsLoop++;
                        continue;
                }

                var topicItem = document.createElement("li");
                topicItem.setAttribute("class", "topic");
                topicItem.setAttribute("id", "topic" + i);
                topicItem.appendChild(document.createTextNode(topics[i]));

                if (i == 0) {
                        topicItem.setAttribute("class", "topic current");
                }

                topicContainer.appendChild(topicItem);
                lastShownTopic = (+i + 1);
        }
}

function readFile() {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
                var readerResult = reader.result;
                if (readerResult == "") {
                        return;
                }

                topics = readerResult.split("\n");
                document.getElementById("noTopics").setAttribute("class", "hidden");

                manageTopics();
        }
}

window.onload = function() {
        var fileInput = document.getElementById("fileInput");
        fileInput.addEventListener("change", function(e) {
                file = fileInput.files[0];
                readFile();

                if (topics.length > 0) {
                        document.getElementById("fileSelector").setAttribute("class", "fileSelector hidden");
                }
        });
}

window.setInterval(function() {
        if (!file) {
                return;
        }

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

                if (!item.nextSibling) {
                        return;
                }

                if (hideOtherTopics) {
                        item.className = "hidden";
                } else {
                        item.className = "topic";
                }

                var nextId = +id + 1;
                var nextElement = document.getElementById("topic" + nextId);
                if (!nextElement) {
                        nextElement = document.getElementById("topic" + id).nextSibling;
                }
                var visibleTopics = getVisibleTopics();
                if (topics.length == 0 || visibleTopics == maxTopics) {
                        return;
                }

                if (nextElement) {
                        nextElement.setAttribute("class", "topic current");
                        if (lastShownTopic > 0 && lastShownTopic > 0 && lastShownTopic != topics.length) {
                                manageTopics(lastShownTopic);
                        }
                }
        }
});