/**
 * Created by andre on 17/03/2016.
 */

var tempIndex = 0;

function getEntries() {

    if (localStorage.getItem("objects")) {
        objects = JSON.parse(localStorage.getItem("objects"));
    } else {
        objects = new Array();
    }
    return objects;
}

function saveObjects(objects) {
    localStorage.setItem("objects", JSON.stringify(objects));
}

function refreshHomepage() {

    objects = getEntries();

    $('#entrieslistview').find('li').remove();

    $.each(objects, function (index, item) {
        element = '<li data-icon="edit"><a href="#edit">' + "Title: " + item.title + " Description: " + item.description + '</a></li>';

        $('#entrieslistview').append(element);

    });

    $('#entrieslistview').listview();
    $('#entrieslistview').listview("refresh");
}

function addEntry() {
    var title = $('[name="title"]').val();
    var description = $('[name="description"]').val();
    var entries = getEntries();
    entries.push({title: title, description: description});

    saveObjects(entries);
    window.location.reload();
}

function deleteEntry(){

    $('#titleinput').val("");
    $('#descriptioninput').val("");

    var entries = getEntries();
    entries.splice(tempIndex, 1);

    $( "#savechangesbutton" ).button({
        disabled: true
    });

    saveObjects(entries);

    alert("Entry deleted!")
}

function deleteLatestEntry() {
    var entries = getEntries();
    var entry = entries.pop();

    saveObjects(entries);
    window.location.reload();
}

function setOnClickListenerForListViewElements() {
    $('ul').children('li').on('click', function () {
        
        tempIndex = $(this).index();
        
        var entryString = $(this).text();
        var entryStringArray = entryString.split(" ");

        $('#titleinput').val(entryStringArray[1]);
        $('#descriptioninput').val(entryStringArray[3]);

        $( "#savechangesbutton" ).button({
            disabled: false
        });

        $( "#deleteentrybutton" ).button({
            disabled: false
        });
    });
}

$(document).on('pagebeforeshow', '#entries', function (event) {
    refreshHomepage();
    setOnClickListenerForListViewElements();
    bindSoundSwitch();
});

function bindSoundSwitch() {
    $('#soundswitch').unbind('change');

    $( '#soundswitch').bind( "change", function(event, ui) {
        alert( 'Sound set to ' + $(this).val())
    });
}

function saveChanges() {

    var entries = getEntries();

    entries[tempIndex].title = $('#titleinput').val();
    entries[tempIndex].description = $('#descriptioninput').val();

    saveObjects(entries);

    $( "#deleteentrybutton" ).button({
        disabled: true
    });

    alert("Changes saved!");
}