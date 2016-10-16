var hideOtherTopics = 1; // Change this to 0 to not hide non-current topics
var topics = [
	// Change the following lines to your topics
	"Topic 1",
	"Topic 2",
	"Topic 3"
];

//////////////////////////////
//	DO NOT EDIT PAST HERE	//
//////////////////////////////

var topicContainer = document.getElementById("topics");
if(!topicContainer)
{
	console.error("Can't find topics container!");
}

if(topics.length == 0)
{
	document.write("No topics have been entered!");
}

for(i = 0; i < topics.length; i++)
{
	var topicItem = document.createElement("li");
	topicItem.setAttribute("id", "topic" + i);
	topicItem.appendChild(document.createTextNode(topics[i]));

	if(i == 0)
	{
		topicItem.setAttribute("class", "current");
	}

	topicContainer.appendChild(topicItem);
	console.info("Added topic to list: " + topics[i]);
}

topicContainer.addEventListener("click", function(e)
{
	if(e.target && e.target.nodeName == "LI")
	{
		var originalId = e.target.id,
			id = originalId.replace(/topic/, ""),
			item = document.getElementById(originalId);

		if(id == 0)
		{
			lastItem = (topics.length - 1);
		}
		else
		{
			lastItem = (id - 1);
		}

		lastItemElement = document.getElementById("topic" + lastItem);
		lastItemElement.setAttribute("class", "");

		if(hideOtherTopics > 0)
		{
			lastItemElement.setAttribute("style", "border: 0; font-size: 0; height: 0; padding: 0;");
		}

		item.className = "current";
	}
});
