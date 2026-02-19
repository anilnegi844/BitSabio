$(document).ready(function () {

  const $services = $('#services');
  const $tabs = $services.find('.services-tabs');
  const $sections = $services.find('.services-content');

  // 🔥 Scroll Spy
  $(window).on('scroll', function () {

    let current = '';

    $sections.each(function () {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).outerHeight();

      if ($(window).scrollTop() >= sectionTop - 200) {
        current = $(this).attr('id');
      }
    });

    $tabs.removeClass('active');

    $tabs.each(function () {
      if ($(this).data('target') === current) {
        $(this).addClass('active');
      }
    });

  });

  // 🔥 Smooth Scroll on Click
  $tabs.on('click', function () {

    const targetId = $(this).data('target');
    const $target = $('#' + targetId);

    $('html, body').animate({
      scrollTop: $target.offset().top - 100
    }, 600);

  });

});
