$(function () {
    //count current cases
    var counts = $('.flow-project').length;
    $('#counter').text(counts);
  })

  let old_url = window.location.pathname;

  $(document).ready(function () {
    $("a.show-Modal").on("click", function () {
      // console.log("clicked");
      $(this).next().removeClass("hide");
      $(this).next().addClass("is-active");
      // $(this).next().addClass("modal-fx-slideRight");
      $("html").addClass("is-clipped");

      let new_url = old_url + "#" + $(this).next().attr("id")
      window.history.pushState({}, 0, new_url)

    });
  });

  $(".modal-close").click(function () {
    $(".modal").removeClass("is-active");
    // $(".modal").removeClass("modal-fx-slideRight");
    $("html").removeClass("is-clipped");

    let new_url = old_url
    window.history.pushState({}, 0, new_url)
  });

  $(".modal-background").click(function () {
    $(".modal").removeClass("is-active");
    // $(".modal").removeClass("modal-fx-slideRight");
    $("html").removeClass("is-clipped");

    let new_url = old_url
    window.history.pushState({}, 0, new_url)
  })

  // filter function
  $(".filters-select").change(function () {
    // var filterValue = [];

    // var topic = $('.topic-item:checked').map(function () {
    //   return $(this).val();
    // }).get();

    // if (topic) filterValue.push(topic);

    // console.log("active filters:", filterValue);

    // if (filterValue[0].length === 0) {
    //     $('.flow-project').show();
    //     $('#counter').text($('.flow-project').length);
    //     return;
    // }

    // $('.flow-project').each(function() {
    //   var el = $(this);
    //   var matches = filterValue[0].some(function(filter) {
    //     return el.hasClass(filter);
    //   });
    //   if  (matches) {
    //     el.show();
    //   } else {
    //     el.hide();
    //   }
    // });


    // $("#mySearch").val("");
    // $("#searchDelete").addClass("is-invisible");

    // var counts = $('.flow-project:visible').length;
    // console.log(counts);
    // $('#counter').text(counts);
    applyFilters();

  })

  // search function
  $("#applySearch").click(function () {
    // var search = $("#mySearch").val();
    // var row = $('.flow-project');

    // row.each(function (i, el) {
    //   if ($(el).text().search(new RegExp(search, 'i')) < 0) {
    //     $(el).hide();
    //   } else {
    //     $(el).show();
    //   }
    // });

    $("#searchDelete").addClass("is-invisible");
    // var counts = $('.flow-project:visible').length;
    // // console.log(counts);
    // $('#counter').text(counts);

    applyFilters()
  });

  $("#mySearch").keyup(function () {
    $("#searchDelete").removeClass("is-invisible");
    var row = $('.flow-project');

    if ($(this).val().length === 0) {
      $("#searchDelete").addClass("is-invisible");
      row.each(function (i, el) {
        $(el).show();
      })
    };

  // $(".filters-select").val($("option:first").val())


  var input = document.getElementById("mySearch");

  input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("applySearch").click();
      }
  });

  var counts = $('.flow-project:visible').length;
  // console.log(counts);
  $('#counter').text(counts);

  })

  // Combined filter and search function
function applyFilters() {
    var search = $("#mySearch").val().toLowerCase();
    var filterValues = $('.topic-item:checked').map(function () {
        return $(this).val();
    }).get();
    var specialValues = $('.special-item:checked').map(function () {
        return $(this).val();
    }).get();

    console.log("Active filters:", filterValues, "Search term:", search);

    // Apply filters
    $('.flow-project').each(function () {
        var el = $(this);
        var matchesFilter = filterValues.length === 0 || filterValues.some(function (filter) {
            return el.hasClass(filter);
        });
        var specialFilter = specialValues.length === 0 || specialValues.some(function (filter) {
            return el.hasClass(filter);
        });

        var matchesSearch = search === "" || el.text().toLowerCase().includes(search);

        // Show element only if it matches both the filter and the search
        if (matchesFilter && matchesSearch && specialFilter) {
            el.show();
        } else {
            el.hide();
        }
    });

    // Update the counter
    var counts = $('.flow-project:visible').length;
    console.log("Visible items:", counts);
    $('#counter').text(counts);
}

  // // get tag values and search
  // $(".tag").click(function (value) {
  //   // var value = $(this).val();
  //   // console.log("click");
  //   $("#mySearch").val($(this).text());

  //   var e = $.Event("click");
  //   e.which = 37;
  //   $("#applySearch").trigger(e);
  // })

  // remove search input
  $("#searchDelete").click(function () {
    $("#mySearch").val("");
    var e = $.Event("click");
    e.which = 65;
    $("#applySearch").trigger(e);

    // Update the counter
    var counts = $('.flow-project:visible').length;
    console.log("Visible items:", counts);
    $('#counter').text(counts);
  })

  // back to top button
  var btn = $('#backTotop');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '300');
  });

  // open modal with individual url
  $(document).ready(function () {
    var href = $(location).attr('href');
    var array = href.split('/');
    var lastsegment = array[array.length - 1];

    if (window.location.href.indexOf(lastsegment) != -1) {
      $(lastsegment).removeClass("hide");
      $(lastsegment).addClass("is-active");
      // $("html").addClass("is-clipped");
    }


  });

  // toggle filter menu
  $("#toggleFilter").click(function () {
    $("#filterMenu").toggleClass("is-hidden");
    // add toggle transition effect
  })

  // toggle fixed sidebar on scroll
  document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const introSection = document.querySelector(".intro");
  const introHeight = introSection.scrollHeight + 230;
//   const introHeight = Array.from(introSection.children).reduce((total, child) => {
//     return total + child.offsetHeight;
// }, 0);
  
  // const offset = 100;

  window.addEventListener("scroll", function () {
    if (window.scrollY > introHeight) {
      console.log(introHeight);
      sidebar.classList.add("fixed");
    } else {
      sidebar.classList.remove("fixed");
    }

    // const introTop = introSection.getBoundingClientRect().top;
    // if (introTop <= 0) {
    //   sidebar.classList.add("fixed");
    // } else {
    //   sidebar.classList.remove("fixed");
    // }

  });
});

// sidebar mobile toggle
$(document).ready(function() {

  // DOM elements
  const $sidebarContainer = $('#filterMenu');
  const $sidebarToggle = $('#sidebarToggle');
  
  // Create overlay element for mobile
  const $overlay = $('<div class="sidebar-overlay"></div>');
  $('body').append($overlay);
  
  // Function to open sidebar on mobile
  function openSidebar() {
    console.log('Opening sidebar');
    $sidebarContainer.toggleClass('is-hidden');
    $sidebarContainer.addClass('is-active');
    $overlay.addClass('is-active');
    $('body').css('overflow', 'hidden'); // Prevent scrolling when sidebar is open
  }
  
  // Function to close sidebar on mobile
  function closeSidebar() {
    console.log('Closing sidebar');
    $sidebarContainer.toggleClass('is-hidden');
    $sidebarContainer.removeClass('is-active');
    $overlay.removeClass('is-active');
    $('body').css('overflow', '');
  }
  
  // Event listeners with debugging
  $sidebarToggle.on('click', function() {
    console.log('Sidebar toggle clicked');
    openSidebar();
  });
  
  $overlay.on('click', closeSidebar);
  
  // Close on escape key
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSidebar();
    }
  });
  
  // Handle window resize
  $(window).on('resize', function() {
    if ($(window).width() > 768 && $sidebarContainer.hasClass('is-active')) {
      closeSidebar();
    }
  });
  
  // Maintain fixed sidebar on desktop when scrolling
  let lastScrollTop = 0;
  const $sidebar = $('.sidebar');
  const sidebarTop = $sidebar.offset() ? $sidebar.offset().top : 0;
  
  $(window).on('scroll', function() {
    if ($(window).width() > 768) {
      const scrollTop = $(window).scrollTop();
      
      if (scrollTop > sidebarTop) {
        $sidebar.addClass('fixed');
      } else {
        $sidebar.removeClass('fixed');
      }
      
      lastScrollTop = scrollTop;
    }
  });
  
  // Debug info
  console.log('Sidebar script loaded');
  console.log('Sidebar container exists:', $sidebarContainer.length > 0);
  console.log('Toggle button exists:', $sidebarToggle.length > 0);
});