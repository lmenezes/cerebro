define("ace/theme/cerebro",["require","exports","module","ace/lib/dom"],function(e,t,n){
  t.isDark=!1;
  t.cssClass="ace-cerebro";
  t.cssText='' +
      '.ace-cerebro .ace_gutter {background: #373a3c;color: #c0c0c0;}' +             // Gutter
      '.ace-cerebro  {background: #434749; color: #f0f0f0;}' +                       // Editor content
      '.ace-cerebro .ace_string {color: #1AC98E;}' +                                 // String type
      '.ace-cerebro .ace_boolean {font-weight: bold; color: #1CA8DD;}' +             // Boolean type
      '.ace-cerebro .ace_constant.ace_numeric {color: #9F85FF;}' +                   // Numeric type
      '.ace-cerebro .ace_paren {font-weight: bold;}' +                               // Brackets
      '.ace-cerebro .ace_cursor {border-left: 2px solid #f0f0f0;}' +                 // Cursor
      '.ace-cerebro .ace_marker-layer .ace_active-line {background: #373a3c;}' +     // Active line
      '.ace-cerebro .ace_marker-layer .ace_selection {background: #55595c;}' +       // Selected text
      '.ace-cerebro .ace_print-margin {width: 1px;background: #55595c;}' +           // Right margin
      '.ace-cerebro .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y; opacity: 0.2}' +         // Indent guide
      '.ace-cerebro .ace_variable.ace_class {color: red;}' +                         // ????
      '.ace-cerebro .ace_constant.ace_buildin {color: #0086B3;}' +                   // ????
      '.ace-cerebro .ace_support.ace_function {color: #0086B3;}' +                   // ????
      '.ace-cerebro .ace_comment {color: #998;font-style: italic;}' +                // ????
      '.ace-cerebro .ace_variable.ace_language  {color: #0086B3;}' +                 // ????
      '.ace-cerebro .ace_keyword {font-weight: bold;}' +                             // ????
      '.ace-cerebro .ace_string.ace_regexp {color: #009926;font-weight: normal;}' +  // ????
      '.ace-cerebro .ace_variable.ace_instance {color: teal;}' +                     // ????
      '.ace-cerebro .ace_constant.ace_language {font-weight: bold;}' +               // ????
      '.ace-cerebro .ace_overwrite-cursors .ace_cursor {border-left: 0px;border-bottom: 1px solid red;}' +
      '.ace-cerebro.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;border-radius: 2px;}' +
      '/* bold keywords cause cursor issues for some fonts *//* this disables bold style for editor and keeps for static highlighter */' +
      '.ace-cerebro.ace_nobold .ace_line > span {font-weight: normal !important;}' +
      '.ace-cerebro .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}' +
      '.ace-cerebro .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}' +
      '.ace-cerebro .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}' +
      '.ace-cerebro .ace_gutter-active-line {background-color : #333;}' +
      '.ace-cerebro .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}';

  var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)});
