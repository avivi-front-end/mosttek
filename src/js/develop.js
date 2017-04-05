function sliderInit(){
    var mainTopSlider = $('.top-slider__wrap');
    if(mainTopSlider.length > 0){
        mainTopSlider.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots:true
        });
        mainTopSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
            checkBackground();
        });
        checkBackground();
    }
}
function checkBackground() {
    if( $('.slick-active')[0].hasAttribute('data-img')){
        $('.video').remove();
        var img = $('.slick-active').data('img');
        if (img!=undefined){$('.top-slider').attr('style','background-image: url('+img+');');}
    }else if($('.slick-active')[0].hasAttribute('data-video')){
        $('.video').remove();
        var vid = $('.slick-active').data('video');
        var html = '<video class="video"  playsinline autoplay muted loop><source src="'+vid+'" type="video/mp4"></video>';
        $('section.slider').prepend(html);
        $('.video').load();
    }
}
function googleMap(mapWrap){
    function initialize() {
        var myLatlng = new google.maps.LatLng(cordX,cordY);
        var myOptions = {
            zoom: 16,
            center: myLatlng,
            disableDefaultUI: false, //без управляющих елементов
            mapTypeId: google.maps.MapTypeId.ROADMAP, // SATELLITE - снимки со спутника,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM // позиция слева внизу для упр елементов
            }
        }
        var map = new google.maps.Map(document.getElementById(mapWrap), myOptions);

        var contentString = '<div class="marker-test">'+googleText+'</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var image = 'images/marker.png';   // иконка картинкой

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP, // анимация при загрузке карты
            icon: image //  иконка картинкой

        });

        /*анимация при клике на маркер*/
        marker.addListener('click', toggleBounce);
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        /*/анимация при клике на маркер*/

        /*По клику открываеться инфоблок*/
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });

    }
    initialize();
}
function butterClick() {
    var menu = $('.butter').next();
    $('.butter').click(function () {
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            menu.slideDown();
        }else{
            menu.slideUp();
        }
    });
}
$(document).ready(function () {
    butterClick();
    sliderInit();
    googleMap('map');
});