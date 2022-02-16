



$(document).ready(function() {

  $('#movies, #restaurants, #books, #products').sortable({
    items: 'tr:not(:first)',
    connectWith: '.sortable',
    cursor: 'move',
    helper: 'clone'
  }).disableSelection();
})


