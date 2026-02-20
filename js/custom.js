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


// Stats counter js 

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector("#stats-section");
    let hasRun = false;

    function startCounters() {

        // 🔥 Select counters ONLY inside this section
        const counters = section.querySelectorAll(".stats-value");

        counters.forEach(counter => {

            const targetText = counter.getAttribute("data-target");

            // Skip non-numbers like 24/7
            if (!/^\d+$/.test(targetText)) {
                counter.innerText = targetText;
                return;
            }

            const target = parseInt(targetText);
            let count = 0;
            const speed = 15;

            const updateCount = () => {
                if (count < target) {
                    count++;
                    counter.innerText = count + "+";
                    setTimeout(updateCount, speed);
                } else {
                    counter.innerText = target + "+";
                }
            };

            updateCount();
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                startCounters();
                hasRun = true;
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(section);

});
