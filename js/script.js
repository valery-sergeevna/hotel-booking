//jQuery
$(document).ready(function () {
    $('.slick-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
    });

    $('.attractions').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]

    });

    $('.package__link').slick({
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 768,
                settings: 'unslick'
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
});

//native JS

//burger-menu
window.addEventListener("DOMContentLoaded", () => {

    //burger-menu
    const burger = document.querySelector('.nav-toggle'),
        burgerMenu = document.querySelector('.burger-menu'),
        burgerClose = document.querySelector('.burger-menu__close');

    burger.addEventListener('click', () => {
        burgerMenu.classList.add('open');
        burgerMenu.classList.add('animation');
    });

    burgerClose.addEventListener('click', () => {
        burgerMenu.classList.remove('open');
    });

    //tabs
    const packageLink = document.querySelector('.package__link'),
        tabsContent = document.querySelectorAll('.content'),
        tabs = document.querySelectorAll('.package__item');

    const hideTabs = () => {
        tabs.forEach(tab => {
            tab.classList.remove('open', 'tabs_animation');
            tab.classList.remove('package__item_active');
        });

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('open');
        });
    };

    const showTabs = (i = 0) => {
        tabs[i].classList.add('package__item_active');
        tabsContent[i].classList.add('open', 'tabs_animation');
        tabsContent[i].classList.remove('hide');
    };

    hideTabs();
    showTabs();

    packageLink.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('package__item')) {
            tabs.forEach((item, i) => {
                //активировать функции 
                if (target == item) {
                    hideTabs();
                    showTabs(i);
                }

            });
        }
    });

    //accordion
    const btns = document.querySelectorAll('.accordion__btn'),
        headings = document.querySelectorAll('.accordion__heading'),
        accordionContent = document.querySelectorAll('.accordion__block');

    btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            headings[i].classList.toggle('active');
            accordionContent[i].classList.toggle('active-content');

            if (headings[i].classList.contains('active')) {
                accordionContent[i].style.maxHeight = accordionContent[i].scrollHeight + 40 + 'px';
                btns[i].style.transform = "rotate(-135deg)";
            } else {
                accordionContent[i].style.maxHeight = "0";
                btns[i].style.transform = "rotate(45deg)";
            }
        });
    });

});