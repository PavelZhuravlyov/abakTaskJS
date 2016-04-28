$(document).ready(function(){

	//Slider
	(function(){
		
		this.initSlider = function($slider, countSlides, slideActivePos, slideWidth){
			var	sliderItem     = $('.slider-img'),
				navLink        = '.slider-arrow';

			addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, true);
			checkCommentField($slider, '.slider-img-comment');

			var interval = setInterval(function(){
				$('.slider-arrow[data-slide="1"]').trigger('click');
			}, 7000);

			$(document).on('click', navLink, function(){
				if(sliderItem.length <= 1) return false;

				clearInterval(interval);
				var dataSlide      = $(this).data('slide'),
					activeSlide    = $('.slider').find('.slider-active'),
					activeSlidePos = activeSlide.index();

				$('body').addClass('body-bg');
				console.log(slideActivePos);

				moveActiveClass($slider, activeSlidePos, dataSlide, slideWidth, function(){
					addItemBefore_AfterActive($slider, activeSlidePos, countSlides, dataSlide, slideWidth);
					$('body').removeClass('body-bg');
				});

				interval = setInterval(function(){
					$('.slider-arrow[data-slide="1"]').trigger('click');
				}, 7000);

				return false;
			});

			// $(document).on('click', '.slider-navigation-circle', function(){
			// 	clearInterval(interval);
			// 	var item = $(this).data('item');

			// 	console.log(slideActivePos);

			// 	moveActiveClass($slider, item-1, 1, slideWidth, function(){
			// 		addItemBefore_AfterActive($slider, item, countSlides, 1, slideWidth);
			// 		$('body').removeClass('body-bg');
			// 	});

			// 	interval = setInterval(function(){
			// 		$('.slider-arrow[data-slide="1"]').trigger('click');
			// 	}, 7000);

			// 	return false;
			// });
		}

		//удалить все пустые поля для комментариев
		function checkCommentField(){
			$(".slider-img-comment").detach(":empty");
		}

		// Проверяет, если след слайд последний или первый, то добавить перед ним/после него последний/первый слайд
		function addItemBefore_AfterActive($slider, activeSlidePos, countSlides, dataSlide, slideWidth){
			var sliderItem   = $('.slider-img'),
				nextSlide 	 = activeSlidePos + 1,
				prevSlide 	 = activeSlidePos - 1,
			    lastSlide    = sliderItem.eq(countSlides),
				startSlide   = sliderItem.eq(0),
				currentSlide = sliderItem.eq(activeSlidePos);

			if((nextSlide == countSlides) && dataSlide > 0) {
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
		}

		//Функция должна сдвигать слайдер, dataSlide=1 для setInterval
		function moveActiveClass($slider, activeSlidePos, dataSlide, slideWidth, callback){
			var dataSlide       = dataSlide || 1,
				activeSlidePosD = activeSlidePos;

			(dataSlide > 0) ? activeSlidePosD += 1 : activeSlidePosD -= 1

			$('.slider-img').siblings().removeClass('slider-active');
			$('.slider-img').eq(activeSlidePosD).addClass('slider-active');

			moveToActiveSlide($slider, slideWidth, activeSlidePosD);

			setTimeout(function(){
				if(callback && typeof callback == "function") callback();
			}, 500);
		}

		// Добавить слайл перед или после активного при инициализации
		function addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, initSlider){
			var sliderItem   = $('.slider-img'),
				lastSlide    = sliderItem.eq(countSlides),
				startSlide   = sliderItem.eq(0),
				currentSlide = sliderItem.eq(slideActivePos).index(),
				initSlider   = initSlider || false;


			if(slideActivePos == 0){
				lastSlide.insertBefore(startSlide);
				if(initSlider) {
					moveToActiveSlide($slider, slideWidth);
				}
			}
			else if(slideActivePos == countSlides){
				console.log(countSlides);
				startSlide.insertAfter(lastSlide);
				if(initSlider) {
					moveToActiveSlide($slider, slideWidth, countSlides-1);
				}
			}
			else{
				moveToActiveSlide($slider, slideWidth, currentSlide);
			}
				
		}

		// сдвиг слайдера
		function moveToActiveSlide($slider, slideWidth, slidePos, callback){
			var slidePos =  (slidePos >= 0) ? slidePos : 1;
			$slider.transition({'left' : -slideWidth*(slidePos)})
			if(callback && typeof callback == "function") callback();
		}

	})();

	// (function(){
	// 	var slideWidth     = $('.slider-img').outerWidth(),
	// 		slideActive    = $('.slider').find('.slider-active'),
	// 		slideActivePos = slideActive.index(),
	// 		countSlides    = $('.slider').find('.slider-img').length-1;

	// 		initSlider($('.slider'), countSlides, slideActivePos, slideWidth);
	// })();
	
	(function(){
		var fotos = {},
			arrEmptyBlocksIndex  = [],
			arrFotoObj 		  	 = [],
			arrFields  		     = [],
			selectActiveSlide    = 0;

		$(document).on('change', '.wr-block-select_active-radio', function(){
			selectActiveSlide = $(this).val();
			console.log(selectActiveSlide);
		});

		$(document).on('click', '.wr-form_datas-btn', function(){
			var arrUrls = [],
			    str = $('.wr-form_datas-inp[name="datas"]').val(),
			    arrUrls;

			if(str.replace(/\s/g, '') === ''){
				$('body').append(errEmptyArrObj($('#errorPopUp'), {title: 'Ошибка', text: 'Введите данные'}));
				fadePopUp($('.errMes'));
				return false;	
			} 

			arrUrls = generateArrUrls(str)
			fotos = generateJSONArray(arrUrls);

			// Рендер шаблона
			var template = Handlebars.compile($('#template').html());
			
			fadeBlock($('.wr-form_datas'), 3, function(){
				// Вывод шаблона
				$('.wr-blocks-w').append(template(fotos)).fadeIn(500);
				$('#template').insertBefore('.wr-blocks-w'); // Чтоб индексы шли с нуля
			});
		
			return false;
		});

		// Переход на экран 2
		$(document).on('click', '.wr-block-delete', function(){
			var parentBlock  = $(this).closest('.wr-block'),
				activeSlide  = parentBlock.find('.wr-block-select_active-radio').val(),
				fotoBlockNum = parentBlock.index();

			$('.wr-block').eq(fotoBlockNum).html('');
			fotos['fotos'][fotoBlockNum] = '';
			arrEmptyBlocksIndex.push(fotoBlockNum);

			if(selectActiveSlide == activeSlide) selectActiveSlide = 0;   
			else if(selectActiveSlide > activeSlide) selectActiveSlide -=1;

			return false;
		});

		// Переход на экран 3
		$(document).on('click', '.wr-form_blocks-btn', function(){
			deleteEmptyElements($('.wr-block'), arrEmptyBlocksIndex, fotos['fotos']);

			arrFotoObj = rewriteArrObjects(deleteEmptyFieldsInArr(fotos['fotos']));
			arrFields = generateArrNewFields($('.wr-block'), ".wr-block-comment-lb-inp");
			
			addNewFieldToArrayObj(arrFotoObj, arrFields, function(){
				if(!arrFotoObj.length){
					$('body').append(errEmptyArrObj($('#errorPopUp'), {title: 'Ошибка', text: 'Нет слайдов'}));
					fadePopUp($('.errMes'));
					return false;
				}

				console.log(arrFotoObj);

				$('.slider-w').append(renderSliderInsert(arrFotoObj));
				$('.slider-img[data-item="'+ selectActiveSlide +'"]').addClass('slider-active');
				
				fadeBlock($('.wr-blocks-w'), 1, function(){
					var slideWidth     = $('.slider-img').outerWidth(),
						slideActive    = $('.slider').find('.slider-active'),
						slideActivePos = slideActive.index(),
						countSlides    = $('.slider').find('.slider-img').length-1;

						initSlider($('.slider'), countSlides, slideActivePos, slideWidth);
						setTimeout(function(){
							$('.slider-main-w').css({
								'position': 'relative',
								'left': 'inherit'
							});
							$('.slider-w').css('opacity', 1);
						}, 500)
				})
			});
			
			return false;
		});

		// Рендер внутренностей каждого слайда
		function renderSliderInsert(arrObjects){
			var source   = $('#sliderList').html();
			var template = Handlebars.compile(source);
			var wrapper  = {slide: arrObjects};

			return template(wrapper);
		}

		// Всплывашка для ошибок
		function fadePopUp($popup){
			$popup.fadeIn(500, function(){
				setTimeout(function(){
					$popup.fadeOut(500, function(){
						$popup.remove();
					});
				}, 2000);
			});
		}

		// Рендер шаблона для ошибок
		function errEmptyArrObj($patternError, errObj){
			var template = Handlebars.compile($patternError.html());
			return template(errObj);
		}

		// Добавляем свойство comment(комментарии) к каждой картинке в массиве
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
					slideNumber: i,
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