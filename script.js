// This line creates a dayjs object representing the current date
var todaysDate = dayjs();

// Set the text of an element with ID "currentDay" to the current date in the format "dddd, MMMM YYYY"
$("#currentDay").text(todaysDate.format("dddd, MMMM YYYY"));


$(function () {
  // Add a click event listener to all buttons on the page
  $("button").click(function (event) {
    // Get the ID of the closest parent div element with an ID attribute
    var divId = $(this).closest('div[id]').attr('id');
    // Select the parent div element with the ID stored in the previous variable 
    var parentDivSave = $("#" + divId);
    // Find the textarea element within the parent div element 
    var textareaElSave = parentDivSave.find("textarea");
    // Get the value of the textarea element 
    var saveText = textareaElSave.val();
    // Set an item in local storage with a key of "{divId}-data" and a value of the saved text
    localStorage.setItem(divId + "-data", saveText);
  });

  // Get the current hour in 24-hour format and save it to a variable
  var currentHour = todaysDate.format("H");
  // Loop over all the div elements with IDs of the form "hour-{number}"
  for (let i = 1; i < 13; i++) {
    // Get the div element with the ID "hour-{number}" and save it to a variable
    var hourEl = $("#hour-" + i);
    // Get the ID of the div element and save it to a variable
    var divId = hourEl.attr("id");
    // If the ID is truthy (i.e. not null or undefined), continue
    if (divId) {
        // Get the hour from the ID by slicing the string starting from index 5 and converting it to a number
      var currentHourBlock = parseInt(divId.slice(5));
        // If the hour is less than 7 (i.e. between 1 and 6), add 12 to convert from 12-hour to 24-hour format
      if (currentHourBlock < 7) {
        currentHourBlock += 12;
      }
        // If the current hour is greater than the hour of the block, add the "past" class to the div element
        // If the current hour is equal to the hour of the block, add the "present" class to the div element
        // If the current hour is less than the hour of the block, do nothing (default class is future)
      if (currentHour > currentHourBlock) {
        hourEl.toggleClass("future");
        hourEl.toggleClass("past");
      } else if (currentHour === currentHourBlock) {
        hourEl.toggleClass("future");
        hourEl.toggleClass("present");
      }
    }
  }

  // Loop over all the div elements with IDs of the form "hour-{number}"
  for (let i = 1; i < 13; i++) {
    // Get the div element with the ID "hour-{number}"
    var parentDiv = $("#hour-" + i);
    // Find the textarea element within the parent div element
    var textareaEl = parentDiv.find("textarea");
    // Get the saved text from local storage for this hour div
    var savedText = localStorage.getItem("hour-" + i + "-data");
    // If there is saved text, set the textarea value to it
    if (savedText) {
      textareaEl.val(savedText);
    }
  }

  // Get a reference to the clear button
    var clearButton = $("#clear-button");

  // Add a click event listener to the button
  clearButton.click(function() {
    // Clear local storage
    localStorage.clear();
    // Reload the page
    location.reload();
  });
});


