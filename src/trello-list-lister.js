//jshint esversion: 5, browser: true, jquery: true

(function () {
  "use strict";

  var $listerBtns = $(".trello-list-lister"),
      $trelloLists = $(".list");

  if ($listerBtns.length) {
    if ($trelloLists.length === window.ListLister.$lists.length) {
      return $listerBtns.toggle();
    } else {
      $listerBtns.remove();
    }
  }

  window.ListLister = {
    init: function () {
      var btnHTML = "";

      this.$lists = $trelloLists;

      btnHTML += "<button class='trello-list-lister' ";
      btnHTML += "style='margin: 5px auto; width: 96%; font-size: 12px; font-weight: 500; min-height: 22px; padding: 0; opacity: 0.8;' ";
      btnHTML += "onclick='ListLister.getData(this);'>List Data</button>";

      $trelloLists.each($.proxy(function (i, el) {
        if (i < $trelloLists.length) {
          $(el).prepend(btnHTML);
        }
      }, this));
    },

    getData: function (trelloList) {
      var out = "";

      $(trelloList).parent().find(".list-cards").children().each(function () {
        out += "- " + $(this).find(".list-card-title")[0].lastChild.textContent + "\n";
      });

      alert(out);
    }
  };

  window.ListLister.init();
}());
