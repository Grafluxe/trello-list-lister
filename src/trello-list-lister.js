/**
 * @author Leandro Silva
 * @copyright 2014, 2017 Leandro Silva (http://grafluxe.com)
 * @license MIT
 */

/* global TrelloListLister*/
// jshint esversion: 5, browser: true, jquery: true

(function () {
  "use strict";

  var $listerBtns = $(".trello-list-lister"),
      $trelloLists = $(".list");

  if ($listerBtns.length) {
    if ($trelloLists.length === TrelloListLister.$lists.length) {
      $listerBtns.toggle();
      if (TrelloListLister.$view) {
        TrelloListLister.$view.hide();
      }
      return;
    } else {
      $listerBtns.remove();
      TrelloListLister.$view.remove();
      TrelloListLister.$view = null;
    }
  }

  window.TrelloListLister = {
    version: "1.0.0",

    init: function () {
      var $btn = $("<button>").addClass("trello-list-lister").text("List Cards").css({
        margin: "5px",
        width: "96%",
        fontSize: "12px",
        fontWeight: "500",
        minHeight: "22px",
        padding: "0",
        opacity: "0.8"
      }).click($.proxy(this.getData, this));

      this.$lists = $trelloLists;

      $trelloLists.each(function (i, el) {
        if (i < $trelloLists.length) {
          $(el).prepend($btn.clone(true));
        }
      });
    },

    getData: function (evt) {
      var out = "",
          count = 0,
          $listParent = $(evt.target).parent(),
          $listCards = $listParent.find(".list-cards").children();

      $listCards.each(function (i) {
        count++;
        out += "- " + $(this).find(".list-card-title").eq(0).contents().eq(1).text() + (i < $listCards.length - 1 ? "&#10;" : "");
      });

      if (!this.$view) {
        this.createView();
        this.createModal();
      } else {
        this.$view.show();
      }

      this.fillModal(
        $listParent.find(".list-header-name-assist").text(),
        count,
        out
      );
    },

    createView: function () {
      this.$view = $("<div>").addClass("window-overlay").css("display", "block").appendTo("body").click($.proxy(function (evt) {
        if (evt.target.className === "window-overlay") {
          this.$view.hide();
        }
      }, this));
    },

    createModal: function () {
      var $modal = $("<div>").css({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        maxWidth: "600px",
        height: "75%",
        backgroundColor: "#E2E4E6",
        zIndex: 99,
        borderRadius: "3px",
        boxShadow: "0 0 20px #333",
        padding: "15px"
      }).appendTo(this.$view);

      $("<a href='#'>").appendTo($modal).addClass("icon-lg icon-close dialog-close-button").click($.proxy(function () {
        this.$view.hide();
      }, this));

      this.$header = $("<h2>").appendTo($modal);
      this.$count = $("<p>").appendTo($modal);
      this.$items = $("<textarea>").appendTo($modal).css({
        height: "calc(100% - 70px)",
        resize: "none",
        padding: "5px 10px"
      }).addClass("comment-frame");
    },

    fillModal: function (header, count, list) {
      this.$header.text(header);
      this.$count.text(count + " card" + (count !== 1 ? "s" : ""));
      this.$items.html(list);
    }
  };

  window.TrelloListLister.init();
}());
