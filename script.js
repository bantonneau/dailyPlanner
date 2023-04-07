var todaysDate = dayjs();
$("#currentDay").text(todaysDate.format("dddd, MMMM YYYY"));

$(function () {
  $("button").click(function (event) {
    var divId = $(this).closest('div[id]').attr('id');
    var parentDivSave = $("#" + divId);
    var textareaElSave = parentDivSave.find("textarea");
    var saveText = textareaElSave.val();
    localStorage.setItem(divId + "-data", saveText);
  });

  var currentHour = todaysDate.format("H");
  for (let i = 1; i < 13; i++) {
    var hourEl = $("#hour-" + i);
    var divId = hourEl.attr("id");
    if (divId) {

      var currentHourBlock = parseInt(divId.slice(5));
      if (currentHourBlock < 7) {
        currentHourBlock += 12;
      }
      if (currentHour > currentHourBlock) {
        hourEl.toggleClass("future");
        hourEl.toggleClass("past");
      } else if (currentHour === currentHourBlock) {
        hourEl.toggleClass("future");
        hourEl.toggleClass("present");
      }
    }
  }

  for (let i = 1; i < 13; i++) {
    var parentDiv = $("#hour-" + i);
    var textareaEl = parentDiv.find("textarea");
    var savedText = localStorage.getItem("hour-" + i + "-data");
    if (savedText) {
      textareaEl.val(savedText);
    }
  }

    var clearButton = $("#clear-button");

  // Add a click event listener to the button
  clearButton.click(function() {
    // Clear local storage
    localStorage.clear();
    location.reload();
  });
});


