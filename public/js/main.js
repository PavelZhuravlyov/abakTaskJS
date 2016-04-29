$(document).ready(function(){
	//Slider
	// (function(){
		
	// 	this.initSlider = function($slider, countSlides, slideActivePos, slideWidth){
	// 		var	sliderItem     = $('.slider-img'),
	// 			navLink        = '.slider-arrow';

	// 		addSlideBefore_AfterActive($slider, slideActivePos, countSlides, slideWidth, true);
	// 		checkCommentField($slider, '.slider-img-comment');

	// 		var interval = setInterval(function(){
	// 			$('.slider-arrow[data-slide="1"]').trigger('click');
	// 		}, 7000);

	// 		$(document).on('click', navLink, function(){
	// 			if(sliderItem.length <= 1) return false;

	// 			clearInterval(interval);
	// 			var dataSlide      = $(this).data('slide'),
	// 				activeSlide    = $('.slider').find('.slider-active'),
	// 				activeSlidePos = activeSlide.index();

	// 			$('body').addClass('body-bg');
	// 			console.log(slideActivePos);

	// 			moveActiveClass($slider, activeSlidePos, dataSlide, slideWidth, function(){
	// 				addItemBefore_AfterActive($slider, activeSlidePos, countSlides, dataSlide, slideWidth);
	// 				$('body').removeClass('body-bg');
	// 			});

	// 			interval = setInterval(function(){
	// 				$('.slider-arrow[data-slide="1"]').trigger('click');
	// 			}, 7000);

	// 			return false;
	// 		});

	// 		// $(document).on('click', '.slider-navigation-circle', function(){
	// 		// 	clearInterval(interval);
	// 		// 	var item = $(this).data('item');

	// 		// 	console.log(slideActivePos);

	// 		// 	moveActiveClass($slider, item-1, 1, slideWidth, function(){
	// 		// 		addItemBefore_AfterActive($slider, item, countSlides, 1, slideWidth);
	// 		// 		$('body').removeClass('body-bg');
	// 		// 	});

	// 		// 	interval = setInterval(function(){
	// 		// 		$('.slider-arrow[data-slide="1"]').trigger('click');
	// 		// 	}, 7000);

	// 		// 	return false;
	// 		// });
	// 	}

	// 	//удалить все пустые поля для комментариев
	// 	function checkCommentField(){
	// 		$(".slider-img-comment").detach(":empty");
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
	// 		if(callback && typeof callback == "function") callback();
	// 	}

	// })();

	// (function(){
	// 	var slideWidth     = $('.slider-img').outerWidth(),
	// 		slideActive    = $('.slider').find('.slider-active'),
	// 		slideActivePos = slideActive.index(),
	// 		countSlides    = $('.slider').find('.slider-img').length-1;

	// 		initSlider($('.slider'), countSlides, slideActivePos, slideWidth);
	// })();
	

	(function(){

		this.initSlider = function($slider, nav, slideSelector, activeSlideClass){
			if($slider.find(slideSelector).length <= 1){
				var positionActiveSlide = $(activeSlideClass).data('item');

				checkComment($slider, '.slider-img-comment');
				$(nav).fadeOut();
				console.log($(slideSelector).data('item'));
				genNavigatActive($(slideSelector).data('item'), '.slider-navigation-circle');

				return false;	
			} 

			var slidesArr   = $slider.find(slideSelector),
				slidesCount = slidesArr.length - 1,
				slide       = slidesArr.first(),
				slideWidth  = slide.outerWidth();
				positionActiveSlide = $(activeSlideClass).data('item');

			console.log(positionActiveSlide);

			if(!$slider) return false;

			addSlideToEnd_Start($slider, slidesArr, activeSlideClass);
			moveToActiveSlide($slider, activeSlideClass, slideWidth);
			genNavigatActive(positionActiveSlide, '.slider-navigation-circle');
			checkComment($slider, '.slider-img-comment');

			var interval = setInterval(function(){
				$('.slider-arrow[data-slide="1"]').trigger('click');
			}, 7000);
			
			$(document).on('click', nav, function(){
				if($slider.find(slideSelector).length <= 1) return false;

				clearInterval(interval);
				$('body').addClass('body-bg');

				var dataMove         = $(this).data('slide'),
					indexActiveSlide = $(activeSlideClass).index(),
					itemActiveSlide  = 0;

				moveToActiveSlide($slider, activeSlideClass, slideWidth, dataMove, slideSelector);

				interval = setInterval(function(){
					$('.slider-arrow[data-slide="1"]').trigger('click');
				}, 7000);

				return false;
			});

			$(document).on('click', '.slider-navigation-circle', function(){
				if($slider.find(slideSelector).length <= 1) return false;

				clearInterval(interval);

				var dataItem = $(this).data('item'),
					activeSlideClassCopy = (activeSlideClass.indexOf('.') >= 0) ? activeSlideClass.replace('.', '') : activeSlideClass;

				$(slideSelector).siblings().removeClass(activeSlideClassCopy);
				$(slideSelector +'[data-item="'+ dataItem +'"]').addClass(activeSlideClassCopy);

				moveToActiveSlide($slider, activeSlideClass, slideWidth, 0, slideSelector, true);

				interval = setInterval(function(){
					$('.slider-arrow[data-slide="1"]').trigger('click');
				}, 7000);

				return false;
			});
		}

		// Навигация
		function genNavigatActive(indexActiveSlide, navItemClass){
			$(navItemClass).siblings().removeClass('active');
			$(navItemClass + '[data-item="'+ indexActiveSlide +'"]').addClass('active');
		}

		// Проверка блока на наличие комментов
		function checkComment($slider, classComment){
			$slider.find(classComment).each(function(){
				if($(this).html() == '') $(this).remove();
			})
		}

		// Присваиваем active новому слайду
		function changeActiveSlide($slider, slideSelector, activeSlideClass, indexActiveSlide, callback){
			var activeSlideClass = (activeSlideClass.indexOf('.') >= 0) ? activeSlideClass.replace('.', '') : activeSlideClass;
			
			$slider.find(slideSelector).siblings().removeClass(activeSlideClass);
			$slider.find(slideSelector).eq(indexActiveSlide).addClass(activeSlideClass);

			if(callback && typeof callback == "function") callback();
		}

		// Поиск активного слайда
		function findActiveSlide($slider, activeSlideClass){
			return $slider.find(activeSlideClass).index();
		}

		// Копируем и добавляем первый слайд вконец, а последний вначало
		function addSlideToEnd_Start($slider, slidesArr, activeSlideClass){
			var activeSlideClass = activeSlideClass.replace('.', ''),
				$startSlide   = slidesArr.eq(0).clone().removeClass(activeSlideClass).removeAttr('data-item'),
				$endSlide     = slidesArr.eq(slidesArr.length-1).clone().removeClass(activeSlideClass).removeAttr('data-item'),
				$startSlide_1 = slidesArr.eq(1).clone().removeClass(activeSlideClass).removeAttr('data-item'),
				$endSlide_1   = slidesArr.eq(slidesArr.length-2).clone().removeClass(activeSlideClass).removeAttr('data-item');

			$slider.prepend($endSlide);
			$slider.append($startSlide);
			$slider.prepend($endSlide_1);
			$slider.append($startSlide_1);
		}

		// Найти активный слайд и переместить на него. Callback для определения следующего слайда (последний/первый)
		function moveToActiveSlide($slider, activeSlideClass, slideWidth, dataMove, slideSelector, clickNav, callback){
			var dataMove = dataMove || 0,
				clickNav = clickNav || false,
				indexActiveSlide = findActiveSlide($slider, activeSlideClass) + dataMove;
			
			move($slider, slideWidth, indexActiveSlide, slideSelector, activeSlideClass, function(){
				if(!clickNav) changeActiveSlide($slider, slideSelector, activeSlideClass, indexActiveSlide);
			});

			if(callback && typeof callback == "function") callback();
		}

		// Сама функция перемещения. 
		function move($slider, slideWidth, indexActiveSlide, slideSelector, activeSlideClass, callback){
			var countSlides = $slider.find(slideSelector).length;

			$slider.transition({
				'marginLeft' : -slideWidth * indexActiveSlide
			}, function(){
				activeIndexClass = $(activeSlideClass).data('item');

				if(indexActiveSlide == countSlides-2) {
					console.log("HERE");
					$slider.css({
						'marginLeft' : -slideWidth * 2
					});
					changeActiveSlide($slider, slideSelector, activeSlideClass, 2, function(){
						genNavigatActive(0, '.slider-navigation-circle');
					});
				}
				else if(indexActiveSlide == 1){
					$slider.css({
						'marginLeft' : -slideWidth * (countSlides-3)
					});
					changeActiveSlide($slider, slideSelector, activeSlideClass, countSlides-3, function(){
						genNavigatActive(countSlides-5, '.slider-navigation-circle');
					});
				}
				else genNavigatActive(activeIndexClass, '.slider-navigation-circle');

				$('body').removeClass('body-bg');			
			});

			if(callback && typeof callback == "function") callback();
		}

	})();

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

			console.log(activeSlide, selectActiveSlide);
			if(activeSlide == 0){
				selectActiveSlide = 1;
			}
			else{
				if(selectActiveSlide == activeSlide) selectActiveSlide = 0;   
				else if(selectActiveSlide > activeSlide) selectActiveSlide = selectActiveSlide-1;
			}
			// else selectActiveSlide = activeSlide-1;

			console.log(selectActiveSlide);

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

				$('.slider-w').append(renderSliderInsert(arrFotoObj, $('#sliderList')));
				$('.slider-main-w').append(renderSliderInsert(arrFotoObj, $('#slider-navigation')));
				$('.slider-img[data-item="'+ selectActiveSlide +'"]').addClass('slider-active');
				
				fadeBlock($('.wr-blocks-w'), 1, function(){
					var slideWidth     = $('.slider-img').outerWidth(),
						slideActive    = $('.slider').find('.slider-active'),
						slideActivePos = slideActive.index(),
						countSlides    = $('.slider').find('.slider-img').length-1;

						initSlider($('.slider'), '.slider-arrow', '.slider-img', '.slider-active');
						
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
		function renderSliderInsert(arrObjects, $pattern){
			var source   = $pattern.html();
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