define(["jquery"],function(){
	function init(){
		new Swiper("#swiper1",{
			autoplay:5000,
			loop:true,
			effect:"fade",
			pagination :'.swiper-pagination',
			paginationClickable :true,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
			noSwipingClass :'.swiper-slide',
			noSwiping : true,
		})
	}
	return {
		init:init
	}
})