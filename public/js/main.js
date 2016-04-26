$(document).ready(function(){

	// Slider
	(function(){
		var slideWidth = $('.slider-img').outerWidth(),
			$slider    = $('.slider'),
			dataSlide      = $(this).data('slide'),
			activeSlide    = $('.slider').find('.slider-active'),
			activeSlidePos = activeSlide.index();	

		initSlider($('.slider'));

		var interval = setInterval(function(){
			$('.slider-arrow[data-slide="1"]').trigger('click');
		}, 3000);

		$(document).on('click', '.slider-arrow', function(){
			clearInterval(interval);
			var dataSlide      = $(this).data('slide'),
				activeSlide    = $('.slider').find('.slider-active'),
				activeSlidePos = activeSlide.index();

			$('body').addClass('body-bg');

			moveActiveClass($('.slider'), activeSlidePos, dataSlide, slideWidth, function(){
				addItemBefore_AfterActive($('.slider'), activeSlidePos, 3, dataSlide);
				$('body').removeClass('body-bg');
			});

			interval = setInterval(function(){
				$('.slider-arrow[data-slide="1"]').trigger('click');
			}, 3000);

			return false;
		});

		function addItemBefore_AfterActive($slider, activeSlidePos, countSlides, dataSlide){
			var nextSlide = activeSlidePos + 1,
				prevSlide = activeSlidePos - 1,
			    lastSlide    = $('.slider-img').eq(countSlides),
				startSlide   = $('.slider-img').eq(0),
				currentSlide = $('.slider-img').eq(activeSlidePos);

			if((nextSlide == countSlides-1) && dataSlide > 0) {
				var sliderML = parseInt($slider.css('left'));
				startSlide.insertAfter(lastSlide);
				$slider.css({
					'left' : sliderML + slideWidth 
				})
			}
			else if((prevSlide == 0) && dataSlide < 0) {
				var sliderML = parseInt($slider.css('left'));
				lastSlide.insertBefore(startSlide);
				$slider.css({
					'left' : sliderML - slideWidth 
				})
			}

			console.log(prevSlide, countSlides-1);
		}

		// Функция должна сдвигать слайдер, dataSlide=1 для setInterval
		function moveActiveClass($slider, activeSlidePos, dataSlide, slideWidth, callback){
			var dataSlide = dataSlide || 1,
				activeSlidePosD = activeSlidePos;

			(dataSlide > 0) ? activeSlidePosD += 1 : activeSlidePosD -= 1

			$('.slider-img').siblings().removeClass('slider-active');
			$('.slider-img').eq(activeSlidePosD).addClass('slider-active');

			console.log(activeSlidePos);

			moveToActiveSlide($slider, slideWidth, activeSlidePosD);

			setTimeout(function(){
				callback();
			}, 500);
		}

		function initSlider($slider){
			var countSlides    = $slider.find('.slider-img').length-1,
				slideActive    = $slider.find('.slider-active'),
				slideActivePos = slideActive.index(),
				slideWidth     = $('.slider-img').outerWidth();

			addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, true);

			return [countSlides, slideActive, slideActivePos, slideWidth];
		}

		// Переход к слайду с классом active
		function initMoveToActive($slider, slideWidth, slideActivePos){
			moveToActiveSlide($slider, slideWidth, slideActivePos);
		}

		// Добавить слайл перед или после активного при инициализации
		function addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, initSlider=false){
			var lastSlide    = $('.slider-img').eq(countSlides),
				startSlide   = $('.slider-img').eq(0),
				currentSlide = $('.slider-img').eq(slideActivePos);

			if(slideActivePos == 0){
				lastSlide.insertBefore(startSlide);
				if(initSlider === true) {
					moveToActiveSlide($slider, slideWidth);
					addTransition($slider);
				}
			}
			else if(slideActivePos == countSlides){
				startSlide.insertAfter(lastSlide);
				if(initSlider === true) {
					moveToActiveSlide($slider, slideWidth, countSlides-1);
					addTransition($slider);
				}
			}
			else{
				initMoveToActive($slider, slideWidth, slideActivePos);
				addTransition($slider);
			}
				
		}

		// Задержка добавления анимации к слайдеру во время инициализации
		function addTransition($slider){
			setTimeout(function(){
				// $slider.css({
				// 	'transition' : 'all .5s'
				// });
			}, 100);
		}

		// сдвиг слайдера
		function moveToActiveSlide($slider, slideWidth, slidePos=1){
			$slider.animate({
				'left' : -slideWidth*(slidePos)
			});
		}

	})();

});