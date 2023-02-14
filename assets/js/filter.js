// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.element-item'
  // layoutMode: 'fitRows'
});
// filter functions
// var filterFns = {
//   // show if name match
//   ium: function() {
//     var name = $(this).find('.name').text();
//     return name.match( /ium$/ );
//   }
// };
// bind filter on select change
$('.filters-select').on( 'change', function() {
  // get filter value from option value
  var filterValue = this.value;
  console.log(filterValue);
  // use filterFn if matches value
  // filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});
