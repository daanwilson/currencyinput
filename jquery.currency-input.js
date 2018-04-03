$(function () {
  $.fn.currencyInputs = function (options) {
      var options = $.extend({
          decimals: 2,
          dec_point: '.',
          thousands_sep: ',',
      }, options);
      $.fn.currencyInput = function (options) {
          //input defineren
          var input = $(this);
          //human input aanmaken als clone van het orgineel
          var human = $(this).clone();        
          input.before(human);
          //input op hidden zetten.
          input.prop('type','hidden');
          //human input correct formateren.
          formatHuman();

          human.keyup(function (event) {
              if (human.val() != human.data('value')) {
                  getCurrentCursorPosition(event.key);
                  setValue(); //first set the normal (hidden) input
                  formatHuman(); //then format de value of the hidden input to the human input.
                  setCurrentCursorPosition();
              }
              //return false;
          });

          function formatHuman() {
              var n = input.val();
              //if (parseFloat(n) === -000) {
              //    var value = '';
              //} else {
                  var s = n < 0 ? "-" : "";
                  var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(options.decimals)));
                  var j = (j = i.length) > 3 ? j % 3 : 0;
                  var value = s + (j ? i.substr(0, j) + options.thousands_sep : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + options.thousands_sep) + (options.decimals ? options.dec_point + Math.abs(n - i).toFixed(options.decimals).slice(2) : "");
              //}
              human.val(value);
              human.data('value', value);
          }
          function setValue() {
              var s = human.val();
              s = s.split(options.thousands_sep).join('');
              if (s.lastIndexOf(options.dec_point) > 0) {
                  s = s.replace(options.dec_point, '.');
              } else if (s.length >= options.decimals) {
                  //komma is verwijderd. Dus wel hier behouden indien nodig.
                  s = s.substr(0, (s.length - options.decimals)) + '.' + s.substr(-options.decimals);
              }
              s = parseFloat(s);
              if (isNaN(s)) {
                  s = 0;
              } else {
                  s = parseFloat(s.toFixed(options.decimals));
              }
              input.val(s);
          }
          function getCurrentCursorPosition(key) {
              var pos = 0;
              var val = human.val();
              var d_pos = val.lastIndexOf(options.dec_point);
              var p = human[0].selectionStart;
              if (d_pos < 0) {
                  //return;
                  if (val.length > options.decimals) {
                      //komma is gewist, dus nu wel even de positie van de komma bepalen.
                      d_pos = val.length - options.decimals;
                      p--;//positie aan de andere kant van de komma zetten.
                  } else {
                      d_pos = 0;
                  }
              }
              if (val.length > 0) {
                  d_pos++;                
                  if (p >= d_pos) {
                      //we zitten in de decimalen, dus vanaf links tellen
                      human.data('pos-count', 'left');
                      pos = p;
                  } else {
                      //we zitten voor de decimalen dus vanaf rechts tellen.
                      human.data('pos-count', 'right');
                      pos = val.length - p;                    
                      if(key===',' || key=='.'){pos--;}
                  }
              }
              human.data('pos', pos);//geteld vanaf het einde.
          }
          function setCurrentCursorPosition() {
              var pos = human.data('pos');
              var length = human.val().length;
              if (human.data('pos-count') == 'right') {
                  pos = length - pos;
              }
              human[0].setSelectionRange(pos, pos);
          }

      }

      $(this).each(function () {
          $(this).currencyInput(options);
      });
  };
});
