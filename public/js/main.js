$(document).ready(function(){

	// Slider
	// (function(){
	// 	var slideWidth = $('.slider-img').outerWidth(),
	// 		$slider    = $('.slider'),
	// 		dataSlide      = $(this).data('slide'),
	// 		slideActive    = $('.slider').find('.slider-active'),
	// 		slideActivePos = slideActive.index(),
	// 		countSlides    = $slider.find('.slider-img').length-1;	

	// 	initSlider($('.slider'), countSlides, slideActive, slideActivePos, slideWidth);

	// 	var interval = setInterval(function(){
	// 		$('.slider-arrow[data-slide="1"]').trigger('click');
	// 	}, 3000);

	// 	$(document).on('click', '.slider-arrow', function(){
	// 		clearInterval(interval);
	// 		var dataSlide      = $(this).data('slide'),
	// 			activeSlide    = $('.slider').find('.slider-active'),
	// 			activeSlidePos = activeSlide.index();

	// 		$('body').addClass('body-bg');

	// 		moveActiveClass($('.slider'), activeSlidePos, dataSlide, slideWidth, function(){
	// 			addItemBefore_AfterActive($('.slider'), activeSlidePos, 3, dataSlide);
	// 			$('body').removeClass('body-bg');
	// 		});

	// 		interval = setInterval(function(){
	// 			$('.slider-arrow[data-slide="1"]').trigger('click');
	// 		}, 3000);

	// 		return false;
	// 	});

	// 	function initSlider($slider, countSlides, slideActive, slideActivePos, slideWidth){
	// 		addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, true);
	// 	}

	// 	function addItemBefore_AfterActive($slider, activeSlidePos, countSlides, dataSlide){
	// 		var nextSlide = activeSlidePos + 1,
	// 			prevSlide = activeSlidePos - 1,
	// 		    lastSlide    = $('.slider-img').eq(countSlides),
	// 			startSlide   = $('.slider-img').eq(0),
	// 			currentSlide = $('.slider-img').eq(activeSlidePos);

	// 		if((nextSlide == countSlides-1) && dataSlide > 0) {
	// 			var sliderML = parseInt($slider.css('left'));
	// 			startSlide.insertAfter(lastSlide);
	// 			$slider.css({
	// 				'left' : sliderML + slideWidth 
	// 			})
	// 		}
	// 		else if((prevSlide == 0) && dataSlide < 0) {
	// 			var sliderML = parseInt($slider.css('left'));
	// 			lastSlide.insertBefore(startSlide);
	// 			$slider.css({
	// 				'left' : sliderML - slideWidth 
	// 			})
	// 		}
	// 	}

	// 	// Функция должна сдвигать слайдер, dataSlide=1 для setInterval
	// 	function moveActiveClass($slider, activeSlidePos, dataSlide, slideWidth, callback){
	// 		var dataSlide = dataSlide || 1,
	// 			activeSlidePosD = activeSlidePos;

	// 		(dataSlide > 0) ? activeSlidePosD += 1 : activeSlidePosD -= 1

	// 		$('.slider-img').siblings().removeClass('slider-active');
	// 		$('.slider-img').eq(activeSlidePosD).addClass('slider-active');

	// 		moveToActiveSlide($slider, slideWidth, activeSlidePosD);

	// 		setTimeout(function(){
	// 			callback();
	// 		}, 500);
	// 	}

	// 	// Переход к слайду с классом active
	// 	function initMoveToActive($slider, slideWidth, slideActivePos){
	// 		moveToActiveSlide($slider, slideWidth, slideActivePos);
	// 	}

	// 	// Добавить слайл перед или после активного при инициализации
	// 	function addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, initSlider){
	// 		var lastSlide    = $('.slider-img').eq(countSlides),
	// 			startSlide   = $('.slider-img').eq(0),
	// 			currentSlide = $('.slider-img').eq(slideActivePos),
	// 			initSlider   = initSlider || false;

	// 		if(slideActivePos == 0){
	// 			lastSlide.insertBefore(startSlide);
	// 			if(initSlider === true) {
	// 				moveToActiveSlide($slider, slideWidth);
	// 				// addTransition($slider);
	// 			}
	// 		}
	// 		else if(slideActivePos == countSlides){
	// 			startSlide.insertAfter(lastSlide);
	// 			if(initSlider === true) {
	// 				moveToActiveSlide($slider, slideWidth, countSlides-1);
	// 				// addTransition($slider);
	// 			}
	// 		}
	// 		else{
	// 			initMoveToActive($slider, slideWidth, slideActivePos);
	// 			// addTransition($slider);
	// 		}
				
	// 	}

	// 	// Задержка добавления анимации к слайдеру во время инициализации
	// 	// function addTransition($slider){
	// 	// 	setTimeout(function(){
	// 	// 		// $slider.css({
	// 	// 		// 	'transition' : 'all .5s'
	// 	// 		// });
	// 	// 	}, 100);
	// 	// }

	// 	// сдвиг слайдера
	// 	function moveToActiveSlide($slider, slideWidth, slidePos){
	// 		var slidePos = slidePos || 1;
	// 		$slider.animate({
	// 			'left' : -slideWidth*(slidePos)
	// 		});
	// 	}

	// })();

	(function(){
		var fotos = {},
			arrEmptyBlocksIndex = [],
			arrFotoObj = [],
			arrFields  = [];

		$(document).on('click', '.wr-form_datas-btn', function(){
			var arrUrls = [],
			    str = $('.wr-form_datas-inp[name="datas"]').val(),
			    arrUrls;

			// if(str.replace(/\s/g, '') === '') return false;

			arrUrls = generateArrUrls(str)
			fotos = generateJSONArray(arrUrls);

			// Рендер шаблона
			var template = Handlebars.compile($('#template').html());
			$('.wr-blocks-w').append(template(fotos));

			$('#template').insertBefore('.wr-blocks-w'); // Чтоб индексы шли с нуля

			fadeBlock($('.wr-form_datas'), 1);

			return false;
		});

		$(document).on('click', '.wr-block-delete', function(){
			var fotoBlockNum = $(this).closest('.wr-block').index();
			$('.wr-block').eq(fotoBlockNum).html('');
			fotos['fotos'][fotoBlockNum] = '';
			arrEmptyBlocksIndex.push(fotoBlockNum);

			console.log(fotoBlockNum);

			console.log(fotos['fotos']);
			return false;
		});

		$(document).on('click', '.wr-form_blocks-btn', function(){
			deleteEmptyElements($('.wr-block'), arrEmptyBlocksIndex, fotos['fotos']);

			arrFotoObj = rewriteArrObjects(deleteEmptyFieldsInArr(fotos['fotos']));
			arrFields = generateArrNewFields($('.wr-block'), ".wr-block-comment-lb-inp");
			
			addNewFieldToArrayObj(arrFotoObj, arrFields, function(){
				fadeBlock($('.wr-blocks-w'), 1)
			});
			console.log(arrFotoObj);
			
			return false;
		});

		/* Test Callback
			var index = 11;

			testCallback(index, function(index){
				console.log(index);
			})

			function testCallback(indexAr, callback){
				var a = indexAr+1000;
				console.log(a);
				callback(indexAr);
			}
		*/

		function addNewFieldToArrayObj(arrObjects, arrNewFields, callback){
			for(var i=0; i<arrObjects.length; i++){
				arrObjects[i].comment = arrNewFields[i];
			}
			callback();
		}

		// Поиск комментариев к каждой фотографии
		function generateArrNewFields($parent, fieldSelector){
			var arrNewFields = [],
				lengthParent = $parent.length;

			for(var i=0; i<lengthParent; i++){
				arrNewFields.push($parent.find(fieldSelector).eq(i).val());
			}
			return arrNewFields; //Массив комментариев
		}


		// Перезапись массива объектов в новый массив, чтобы обеспечить индексацию массива с нуля
		function rewriteArrObjects(arrObjects){
			var newArrObjects = [];

			for(var i=0, j=0; i<arrObjects.length; i++, j++){
				if(arrObjects[i] == undefined) j--;
				else newArrObjects[j] = arrObjects[i];	
			} 
			return newArrObjects;
		}	


		// Удаление пустых строк (объектов, которые пользователь сам удалил) из общего массива объектов
		function deleteEmptyFieldsInArr(arrObjects){
			for(var i=0; i<arrObjects.length; i++){
				if(typeof arrObjects[i] === 'string' || arrObjects[i] instanceof String){
					delete arrObjects[i];
					i = 0;
				}
			}
			return arrObjects;
		}

		// Удаление пустых div'ов из DOM
		function deleteEmptyElements($element, arrEmptyElements){
			for(var i=0; i<arrEmptyElements.length; i++){
				$element.eq(arrEmptyElements[i]).remove();
			}
		}

		// Генерация массива из входной строки
		function generateArrUrls(strUrls){
			strUrls = strUrls.replace(/\[|\]|\'|\s/g, '');
			return strUrls.split(',');
		}

		// Генерируем объект в котором есть массив с сылками на фото
		function generateJSONArray(strUrls){
			var obj = {
				fotos: []
			};

			for(var i=0; i<strUrls.length; i++){
				obj['fotos'][i] = {
					foto: strUrls[i]
				}
			}

			return obj;
		}

		function fadeBlock($block, animation){ // animation может быть 1=up, 2=left, 3=right
			var animation = animation || 1;

			switch(animation){
				case 1:
					var marginTop = parseInt($block.css('marginTop'));
					$block.fadeOut(1500).css('marginTop', -marginTop);
					break;

				case 2:
					var marginLeft = parseInt($block.css('marginLeft'));
					$block.css({
						'marginBottom': 0,
						'marginTop': 0
					}).fadeOut(400).css('marginLeft', -marginLeft); 
					break;

				case 3:
					var marginRight = parseInt($block.css('marginRight'));
					$block.css({
						'marginBottom': 0,
						'marginTop': 0
					}).fadeOut(400).css('marginRight', -marginRight); 
					break;
			}	
		}

	})();

});