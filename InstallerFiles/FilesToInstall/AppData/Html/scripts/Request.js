﻿/// <reference path="Ace/ace.js" />
/// <reference path="jquery.min.js" />
showTab("Raw", "response");
showTab("Raw", "request");

// code to activate relevant tab
$(".formattingResponseBody a").click(function () {
    var el = this;
    showTab(el, "response");
});
$(".formattingRequestBody a").click(function () {
    var el = this;
    showTab(el, "request");
});

function showTab(elOrName, type) {
    var prefix = "ResponseBody";
    if (type == "request")
        prefix = "RequestBody";
    
    var tab = "";
    if (typeof(elOrName) === "string")
        tab = elOrName;
    else {
        var $el = $(elOrName);
        tab = $el.data("id");     
    }
    if (!tab)
        return;

    $("pre[id^=" + prefix + "]").hide();
    $("#" +prefix + tab).show();
    
    // button handling
    $(".formatting" + prefix + " a").removeClass("active");
    $(".formatting" + prefix + " a[data-id=" + tab + "]").addClass("active");    
}


function configureAceEditor(editor, serverVars) {
    var session = editor.getSession();

    editor.setTheme("ace/theme/" + serverVars.theme);
    //editor.setTheme("ace/theme/textmate");
    //editor.setTheme("ace/theme/clouds");
    //editor.setTheme("ace/theme/xcode");
    //editor.setTheme("ace/theme/eclipse");
    //editor.setTheme("ace/theme/mono_industrial");

    // set below
    //session.setMode("ace/mode/" + serverVars.language);
    editor.setFontSize(13);

    if (!serverVars.allowEdit) {
        editor.setReadOnly(true);
        editor.setHighlightActiveLine(false);
    } else
        editor.setHighlightActiveLine(true);
    editor.renderer.setShowGutter(serverVars.showLineNumbers);
    editor.renderer.setPadding(10);

    // fill entire view
    editor.setOptions({
        maxLines: Infinity,
        minLines: 3
    });

    editor.setShowPrintMargin(false);

    session.setTabSize(3);
    //editor.getSession().setUseWrapMode(true);
    return editor;
}

setTimeout(function() {
// attach ace to formatted code controls if they are loaded and visible
    try {
        window.aceEditorRequest = ace.edit("RequestBodyFormatted");
        configureAceEditor(aceEditorRequest, serverVars);
        aceEditorRequest.getSession().setMode("ace/mode/" + serverVars.requestLanguage);
    } catch (ex) {;
    }

    try {
        window.aceEditor = ace.edit("ResponseBodyFormatted");
        configureAceEditor(aceEditor, serverVars);
        aceEditor.getSession().setMode("ace/mode/" + serverVars.responseLanguage);
    } catch (ex) {;
    }
}, 100);


//setTimeout(function () {
//    $("#ResponseOutputFormatted").hide();
//    console.log('hiding');
//}, 1000);