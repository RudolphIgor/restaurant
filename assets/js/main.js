(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
    	$('body,html').animate({
        	scrollTop: 0
    	}, 800);
    return false;
    });
  


	//Tabs
	$('.nav-link').on('click', function (event) {
		event.preventDefault();
		let currtTab = $(this).index();
		$('.nav-link').removeClass(' active');
		$(this).addClass('active')
		$('.fade').removeClass('show active');
		$('.fade').eq(currtTab).addClass('show active');
	})


	//Parallax
	const parallaxInstance = new Parallax($('#scene').get(0));

	//Slider
	const swiper = new Swiper('.swiper', {
		direction: 'horizontal',
		spaceBetween: 50,
		loop: true,
		stopOnLastSlide : false,
		autoplay : {
			delay : 3000
		}
	});

	//Hamburger

$('.slicknav_btn').on('click', function() {
	$('.burger').toggle();
})

	//modal
	$('.header-btn').on('click', function() {
		$('.wrapper-modal').fadeIn();
	})
	$('.overlay').on('click', function() {
		$('.wrapper-modal').fadeOut();
	})
	$('.close-btn').on('click', function() {
		$('.wrapper-modal').fadeOut();
	})
	

	//validate
	$(document).ready(function() {
		$('[data-submit]').on('click', function(e) {
			e.preventDefault();
			$(this).parent('form').submit();
		})
		$.validator.addMethod(
			"regex",
			function(value, element, regexp) {
				var re = new RegExp(regexp);
				return this.optional(element) || re.test(value);
			},
			"Please check your input."
		);
	
		// Функция валидации и вывода сообщений
		function valEl(el) {
			el.validate({
				rules: {
					phone: {
						required: true,
						regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
					},
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					tel: {
						required: 'Поле обязательно для заполнения',
						regex: 'Телефон может содержать символы + - ()'
					},
					name: {
						required: 'Поле обязательно для заполнения',
					},
					email: {
						required: 'Поле обязательно для заполнения',
						email: 'Неверный формат E-mail'
					}
				},
	
				// Начинаем проверку id="" формы
				submitHandler: function(form) {
					$('#preloader-active').fadeIn();
					var $form = $(form);
					var $formId = $(form).attr('id');
					switch ($formId) {
						// Если у формы id="form-cover" - делаем:
						case 'form-cover':
							$.ajax({
									type: 'POST',
									url: $form.attr('action'),
									data: $form.serialize(),
								})
								.done(function() {
									console.log('Success');
								})
								.fail(function() {
									console.log('Fail');
								})
								.always(function() {
									console.log('Always');
									setTimeout(function() {
										$form.trigger('reset');
										$('#preloader-active').fadeIn();
									}, 1100);
									setTimeout(function() {
										$('#preloader-active').fadeOut();
									}, 1100);
								});
							break;
						// Если у формы id="form-modal" - делаем:
						case 'form-modal':
							$.ajax({
								type: 'POST',
								url: $form.attr('action'),
								data: $form.serialize(),
							})
							.done(function() {
								console.log('Success');
							})
							.fail(function() {
								console.log('Fail');
							})
							.always(function() {
								console.log('Always');
								setTimeout(function() {
									$form.trigger('reset');
									$('#preloader-active').fadeIn();
								}, 1100);
								setTimeout(function() {
									$('#preloader-active').fadeOut();
									$('.wrapper-modal').fadeOut();
								}, 1100);
							});
						break;
					}
					return false;
				}
			})
		}
	
		// Запускаем механизм валидации форм, если у них есть класс .form-book
		$('.form-book').each(function() {
			valEl($(this));
		});
		
	});
})(jQuery);
