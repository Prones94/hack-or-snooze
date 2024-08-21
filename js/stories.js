"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);
  const isFavorite = currentUser.isFavorite(story)
  const starType = isFavorite ? "fas" : "far" // Sollid star if favorite, otherwise regular star
  const hostName = story.getHostName();

  return $(`
      <li id="${story.storyId}">
        <span class="star">
          <i class="${starType} fa-star"></i>
        </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Handle favorite/unfavorite clicks */
$allStoriesList.on("click", ".star", async function(evt){
  console.debug("Favorite/unfavorite story");

  // gets story ID from the clicked element's parent <li> tag
  const $closestLi = $(evt.target).closest("li")
  const storyId = $closestLi.attr("id")

  // Find the story in the global story list
  const story = storyList.stories.find(s => s.storyId === storyId)

  // Toggle the favorite status
  if (currentUser.isFavorite(story)){
    await currentUser.removeFavorite(story)
    $(evt.target).removeClass("fas").addClass("far") //  empty star
  } else {
    await currentUser.addFavorite(story)
    $(evt.target).removeClass("far").addClass("fas") // solid star
  }
})


async function submitNewStory(evt) {
  console.debug("submitNewStory",evt);
  evt.preventDefault()

  const title = $("#title").val()
  const author = $("#author").val()
  const url = $("#url").val()

  const newStory = await storyList.addStory(currentUser, {title, author, url})

  const $story = generateStoryMarkup(newStory)
  $allStoriesList.prepend($story)

  $("#submit-story-form").trigger("reset")
  hidePageComponents()
  putStoriesOnPage()
}

$("#submit-story-form").on("submit", submitNewStory)
