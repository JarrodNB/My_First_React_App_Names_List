This project was completed as part of the interview process for a company. It is a React SPA application that allows you to store a list of baby names.

The live demo can be found at https://modest-boyd-01e715.netlify.app/. If visiting, allow a few seconds for the API on Heroku to boot up.

Requirements:
  
  Implement a web app (REST API + SPA) that displays a list of baby names that a user submits.
  The user experience can simply be a text input with a submit button (and a growing list of
  names below it) on one page.


  ● Upon first visit, Users should default to working on a new distinct list.
  ● A user’s list should have an ID (alphanumeric 12-character string) that uniquely identifies
  it.
  ● The URL upon first visit should include (?list_id=) and the auto-generated list_id.
  ● If a user goes to “/” they should be redirected to “/?list_id=xxxxxxxxxx” (a new list)
  ● Users can return to a list by visiting a URL with their distinct list_id parameter
  ● Users should be able to add as many names as they would like in a list.
  ● Whitespace should be trimmed from both ends of the submitted names.
  ● Duplicate names (case-insensitive, per-list) should be prevented and result in
  appropriate error messaging to the user.
  ● Use PostgreSQL for your database engine
  ● SPA is fully static and implemented using ReactJS

  ● Use Redux state management for the UI
  ● Clicking on a name crosses it out (and clicking again un-crosses it out). This crossed-out
  state should persist across sessions and between users viewing the same list.
  ● Only allow names with letters and (at most) one space.
  ○ Good: ‘Sally Lou’, ’Stanley’, ‘JoeBob Pringles’
  ○ Bad: ‘C3P0’, ’Stan the Man’
  ● Real-time updates when multiple people are working on the same list
  ● Client-side sorting of names (Alphabetical, By Input Time, By Length)
