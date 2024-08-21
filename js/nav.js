"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Show submit form when click "submit" */
function navSubmitStoryClick(evt){
  console.debug("navSubmitStoryClick",evt);
  hidePageComponents()
  $("#submit-story-section").show()
}
$navSubmit.on("click", navSubmitStoryClick)


function navFavoriteClick(evt){
  console.debug("navFavoritesClick", evt);
  hidePageComponents()

  // Empties the current stories list and rebuild it with favorites
  $allStoriesList.empty()

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story)
    $allStoriesList.append($story)
  }

  $allStoriesList.show()
}
$navFavorites.on("click", navFavoriteClick)

/** Show user's own stories when clicking on "my stories" */
function navMyStoriesClick(evt){
  console.debug(object);
  hidePageComponents()

  // Empty the current stories list and rebuild it with the user's own stories
  $allStoriesList.empty()

  for (const story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story)
    $allStoriesList.append($story)
  }
  $allStoriesList.show()
}
// add event listener for "my stories" link
$navMyStories.on("click", navMyStoriesClick)




