let current = 0;
let firstCopy = $('.slideshow > img').eq(0).clone(true)
let lastCopy = $('.slideshow > img').eq(length-1).clone(true)

$('.slideshow').append(firstCopy)
$('.slideshow').prepend(lastCopy)

$('.slideshow').css({transform:'translateX(-300px)'})

let buttonsLength = $('.buttons>button').length

$('.buttons>button').on('click',function(e){
	let index = $(e.currentTarget).index()
	goToSlide(index)
})

$('#previous').on('click',function(){
	goToSlide(current-1)
})

$('#next').on('click',function(){
	goToSlide(current+1);
})

let autoPlay = setInterval(function(){
	goToSlide(current+1)
},1500)

$('.window').on('mouseenter',function(){
	window.clearInterval(autoPlay)
})

$('.window').on('mouseleave',function(){
	autoPlay = setInterval(function(){
		goToSlide(current+1)
	},1500)
})

$(document).on("visibilitychange", function(){
	if(document.visibilityState === 'hidden'){
		window.clearInterval(autoPlay)
	}else if(document.visibilityState === 'visible'){
		autoPlay = setInterval(function(){
			goToSlide(current+1)
		},1500)
	}
})

function goToSlide (index){
	if(index>buttonsLength-1){
		index=0
	}else if(index<0){
		index=buttonsLength-1
	}

	if(current === 0 && index === buttonsLength-1){
		$('.slideshow').css({transform:'translateX(0px)'})
			.one('transitionend',function(){
				$('.slideshow').hide().offset()
				$('.slideshow').css({transform:`translateX(${-(index+1)*300}px)`}).show()
			})
	}else if(current === buttonsLength-1 && index === 0){
		$('.slideshow').css({transform:`translateX(${-(buttonsLength+1)*300}px)`})
			.one('transitionend',function(){
				$('.slideshow').hide().offset()
				$('.slideshow').css({transform:`translateX(${-(index+1)*300}px)`}).show()
			})
	}else{
		$('.slideshow').css({transform:`translateX(${-(index+1)*300}px)`})
	}

	current = index
}