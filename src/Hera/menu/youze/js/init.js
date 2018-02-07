/**
 * Created by edeity on 2017/12/19.
 */
$(function () {
    // 导航栏
    var $nav = $('.nav');
    $(window).scroll(function () {
        var top = $(this).scrollTop();
        if(top > 100) {
            if(!$nav.hasClass('fixed')) {
                $nav.addClass('fixed');
            }
        } else {
            if($nav.hasClass('fixed')) {
                $nav.removeClass('fixed');
            }
        }
    });
    // swiper
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: false,
        loop: true,
        effect: 'fade',
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
    // 粒子动画
    particlesJS.load('particle-container', './js/normal.js');
})