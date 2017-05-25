(function () {
  "use strict";

  var $gxListLister = $(".gxListLister");

  if ($gxListLister.length) {
    if ($(".list").length === window.ListLister.$list.length) {
      $gxListLister.toggle();
      return;
    } else {
      $gxListLister.remove();
    }
  }

  var ListLister;

  ListLister = function () {
    $(function () {
      var style = "style='margin: 5px auto; width: 96%; font-size: 12px; font-weight: 500; min-height: 22px; padding: 0; opacity: 0.8;'";

      ListLister.$list = $(".list");

      ListLister.$list.each(function (i) {

        if (i < ListLister.$list.length) {
          $(this).prepend("<button class='gxListLister' " + style + " onclick='ListLister.getData(this);'>List Data</button>");
        }
      });
    });
  };

  ListLister.getData = function (list) {
    var out = "";

    $(list).parent().find(".list-cards").children().each(function () {
      out += "- " + $(this).find(".list-card-title")[0].lastChild.textContent + "\n";
    });

    alert(out);
  };

  ListLister();

  window.ListLister = ListLister;
}(window.gx));

void(0);
