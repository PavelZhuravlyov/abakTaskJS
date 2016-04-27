$(document).ready(function(){

	//Slider
	// (function(){
		
	// 	this.initSlider = function($slider, countSlides, slideActivePos, slideWidth){
	// 		var 
	// 			//$slider    	   = $('.slider'),
	// 			sliderItem     = $('.slider-img'),
	// 			//slideWidth     = $('.slider-img').outerWidth(),
	// 			//slideActive    = $('.slider').find('.slider-active'),
	// 			// slideActivePos = slideActive.index(),
	// 			//countSlides    = $slider.find('.slider-img').length-1,
	// 			navLink        = '.slider-arrow';

	// 		addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, true);

	// 		var interval = setInterval(function(){
	// 			$('.slider-arrow[data-slide="1"]').trigger('click');
	// 		}, 3000);

	// 		$(document).on('click', navLink, function(){
	// 			clearInterval(interval);
	// 			var dataSlide      = $(this).data('slide'),
	// 				activeSlide    = $('.slider').find('.slider-active'),
	// 				activeSlidePos = activeSlide.index();

	// 			$('body').addClass('body-bg');

	// 			moveActiveClass($slider, activeSlidePos, dataSlide, slideWidth, function(){
	// 				addItemBefore_AfterActive($slider, activeSlidePos, countSlides, dataSlide, slideWidth);
	// 				$('body').removeClass('body-bg');
	// 			});

	// 			interval = setInterval(function(){
	// 				$('.slider-arrow[data-slide="1"]').trigger('click');
	// 			}, 3000);

	// 			return false;
	// 		});
	// 	}

	// 	// Проверяет, если след слайд последний или первый, то добавить перед ним/после него последний/первый слайд
	// 	function addItemBefore_AfterActive($slider, activeSlidePos, countSlides, dataSlide, slideWidth){
	// 		var sliderItem   = $('.slider-img'),
	// 			nextSlide 	 = activeSlidePos + 1,
	// 			prevSlide 	 = activeSlidePos - 1,
	// 		    lastSlide    = sliderItem.eq(countSlides),
	// 			startSlide   = sliderItem.eq(0),
	// 			currentSlide = sliderItem.eq(activeSlidePos);

	// 		if((nextSlide == countSlides) && dataSlide > 0) {
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

	// 	//Функция должна сдвигать слайдер, dataSlide=1 для setInterval
	// 	function moveActiveClass($slider, activeSlidePos, dataSlide, slideWidth, callback){
	// 		var dataSlide       = dataSlide || 1,
	// 			activeSlidePosD = activeSlidePos;

	// 		(dataSlide > 0) ? activeSlidePosD += 1 : activeSlidePosD -= 1

	// 		$('.slider-img').siblings().removeClass('slider-active');
	// 		$('.slider-img').eq(activeSlidePosD).addClass('slider-active');

	// 		moveToActiveSlide($slider, slideWidth, activeSlidePosD);

	// 		setTimeout(function(){
	// 			if(callback && typeof callback == "function") callback();
	// 		}, 500);
	// 	}

	// 	// Добавить слайл перед или после активного при инициализации
	// 	function addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, initSlider){
	// 		var sliderItem   = $('.slider-img'),
	// 			lastSlide    = sliderItem.eq(countSlides),
	// 			startSlide   = sliderItem.eq(0),
	// 			currentSlide = sliderItem.eq(slideActivePos).index(),
	// 			initSlider   = initSlider || false;


	// 		if(slideActivePos == 0){
	// 			lastSlide.insertBefore(startSlide);
	// 			if(initSlider) {
	// 				moveToActiveSlide($slider, slideWidth);
	// 			}
	// 		}
	// 		else if(slideActivePos == countSlides){
	// 			console.log(countSlides);
	// 			startSlide.insertAfter(lastSlide);
	// 			if(initSlider) {
	// 				moveToActiveSlide($slider, slideWidth, countSlides-1);
	// 			}
	// 		}
	// 		else{
	// 			moveToActiveSlide($slider, slideWidth, currentSlide);
	// 		}
				
	// 	}

	// 	// сдвиг слайдера
	// 	function moveToActiveSlide($slider, slideWidth, slidePos, callback){
	// 		var slidePos =  (slidePos >= 0) ? slidePos : 1;
	// 		$slider.transition({'left' : -slideWidth*(slidePos)})
	// 		if(callback) callback();
	// 	}

	// })();

	// Slider Start
	// (function(){
	// 	var slideWidth     = $('.slider-img').outerWidth(),
	// 		slideActive    = $('.slider').find('.slider-active'),
	// 		slideActivePos = slideActive.index(),
	// 		countSlides    = $('.slider').find('.slider-img').length-1;

	// 		initSlider($('.slider'), countSlides, slideActivePos, slideWidth);
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

			if(str.replace(/\s/g, '') === '') return false;

			arrUrls = generateArrUrls(str)
			fotos = generateJSONArray(arrUrls);

			// Рендер шаблона
			var template = Handlebars.compile($('#template').html());
			
			fadeBlock($('.wr-form_datas'), 3, function(){
				// Вывод шаблона
				$('.wr-blocks-w').append(template(fotos));

				$('#template').insertBefore('.wr-blocks-w'); // Чтоб индексы шли с нуля
			});
		

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
				if(callback && typeof callback == "function") callback();(indexAr);
			}
		*/

		function addNewFieldToArrayObj(arrObjects, arrNewFields, callback){
			for(var i=0; i<arrObjects.length; i++){
				arrObjects[i].comment = arrNewFields[i];
			}

			if(callback && typeof callback == "function") callback();
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

		function fadeBlock($block, animation, callback){ // animation может быть 1=up, 2=left, 3=right
			var animation = animation || 1;
			$block.css({
				'top': 0,
				'left': 0,
				'right': 0,
				'bottom': 0
			});

			switch(animation){
				case 1:
					var offsetTop = $block.offset().top + $block.height();
					$block.css('top', -offsetTop*2).delay(200).fadeOut(400, function(){
						if(callback && typeof callback == "function") callback();
					});
					break;

				case 2:
					var offsetLeft = $block.offset().left + $block.width();
					$block.css('left', -offsetLeft*2).delay(200).fadeOut(400, function(){
						if(callback && typeof callback == "function") callback();
					}); 
					break;

				case 3:
					var offsetRight = $block.offset().left + $block.width();
					$block.css('left', offsetRight*2).delay(200).fadeOut(400, function(){
						if(callback && typeof callback == "function") callback();
					}); 
					break;
			}
			
		}

	})();

});