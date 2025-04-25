import $ from 'jquery';
import 'slick-carousel/slick/slick.js';
import 'nette.ajax.js';
import '@vendor/nette/forms/src/assets/netteForms.js';
import domready from './utils/domready.mjs';
import {toggle as slideToggle} from 'slide-element';

// Modules
import schedule from './modules/schedule.mjs';
import heroslider from './modules/heroslider.mjs';
import lectures from './modules/lectures.mjs';

// Call LESS processor
import '../less/main.less';

/**
 * @global
 * @const {string} currentYear
 */

window.barcamp = window.barcamp || {};
const barcamp = window.barcamp;

barcamp.imageFailover = async function () {
    document.querySelectorAll('img.failover').forEach((img) => {
        const fix = () => img.src = `/static/${currentYear}/img/logo-icon-96.png`;
        if (img.complete) {
            if (img.naturalHeight === 0) {
                fix();
            }
        } else {
            img.addEventListener('error', fix, {once: true, passive: true});
        }
    });
};

barcamp.openNav = async function () {
    const header = document.querySelector('header');
    header.querySelector('.btn-mobile-menu-open-container').addEventListener('click', function (e) {
        const container = e.currentTarget;
        const mobileMenu = container.querySelector('.btn-mobile-menu-open');

        slideToggle(header.querySelector('.header-nav'), {duration: 200});
        mobileMenu.classList.toggle('active');
        container.querySelector('.item-text').innerText = mobileMenu.classList.contains('active') ? 'Zavřít' : 'Menu';
    });
};

barcamp.slider = heroslider;

barcamp.accordion = async function () {
    const container = document.querySelector('.faq');
    if (!container) {
        return;
    }

    container.querySelectorAll('.accordion-list>li').forEach((li) => {
        li.querySelector('.accordion-heading').addEventListener('click', function () {
            li.classList.toggle('accordion-open');
            slideToggle(li.querySelector('.accordion-content'), {duration: 200});
        });
    });

};

barcamp.smoothScroll = async function () {

    document.querySelectorAll('a.scrollto').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.length === 0 || href[0] !== '#') {
            return;
        }

        const target = document.querySelector(href);

        if (!target) {
            return;
        }

        link.addEventListener('click', function (e) {
            e.preventDefault();
            target.scrollIntoView({behavior: "smooth"});
        });
    });
};

barcamp.schedule = schedule;

barcamp.lectures = lectures;

barcamp.program = async function () {
    var val, vals = "";

    $('.js-program-filter input').change(function () {
        vals = "";

        if ($(this).val() == '*' && $(this).is(":checked")) {
            $('.js-program-filter input:not(.check-all)').each(function () {
                $(this).prop('checked', false);
            });
        } else if ($(this).val() != '*') {
            $('.js-program-filter input.check-all').prop('checked', false);
        }

        $('.js-program-filter input:checked').each(function () {
            val = $(this).val();
            vals += "." + val + ",";
        });

        if (val == '*' || vals == '') {
            $('.js-program-filter input.check-all').prop('checked', true);
            vals = "";
            $(this).parent().parent().parent().find('.program-item').removeClass('active inactive');
        } else {
            $(this).parent().parent().parent().find('.program-item').removeClass('active').addClass('inactive');
            $(this).parent().parent().parent().find(vals.slice(0, -1)).removeClass('inactive').addClass('active');
        }
    });

    function fixedHeader() {
        if (document.documentElement.clientWidth <= 768) {

            var header = $('.program-header');
            var program = $('.program');

            if (header.length == 0 || program.length == 0) {
                return;
            }

            var topofDiv = header.offset().top;
            var topofParent = program.offset().top;
            var scroll = 0;

            $(window).scroll(function () {
                scroll = $(window).scrollTop() - topofParent;

                if ($(window).scrollTop() >= topofDiv) {
                    if (!header.hasClass('fixed')) {
                        header.addClass('fixed');
                    }
                    header.css("top", scroll + "px");
                } else {
                    if (header.hasClass('fixed')) {
                        header.removeClass('fixed');
                    }
                }
            });
        }
    }

    function scrollLeftMobile() {
        if (document.documentElement.clientWidth <= 768) {
            $('.program-container').scrollLeft(100);
        }
    }

    fixedHeader();
    scrollLeftMobile();

    $(window).on("orientationchange", function () {
        fixedHeader();
    });

    $(window).on("resize", function () {
        fixedHeader();
    });

};

barcamp.avatarUploader = async function () {
    var $button = $('#avatar-upload-button');
    if ($button.length === 0) {
        return;
    }

    var $input = $('#avatar-upload-input');
    var $image = $('#avatar');
    var uploadUrl = $button.attr('href');

    $button.click(function (e) {
        e.preventDefault();
        $input.click();
    });

    $input.change(function () {
        $image.addClass('pulse');
        var file = this.files[0];
        var form = new FormData();
        form.append('file', file);
        upload(form);
    });

    var upload = function (form) {
        $.ajax({
            url: uploadUrl,
            method: 'POST',
            data: form,
            contentType: false,
            processData: false,
            dataType: 'json'
        })
            .done(function (json) {
                $image.removeClass('pulse');
                var value = 'url(\'' + json.avatarUrl + '\')';
                $image.css('background-image', value);
            })
            .fail(function (error) {
                $image.removeClass('pulse');
                alert('Tento obrázek není možné načíst, zkuste jej prosím zmenšit.');
                console.log(error);
            });
    };
};

barcamp.talkVote = async function () {
    var $list = $('.lectures-list,.talk-detail');

    if ($list.length === 0) {
        return;
    }

    $list.on('click', '.vote-ajax', function (e) {
        e.preventDefault();
        var $button = $(this);
        $button.addClass('disabled');
        var $item = $button.closest('.item-vote-box');
        var url = $button.attr('href');

        var isDetail = !!$item.closest('.talk-detail').length;

        dataLayer.push({
            'event': 'bck-talk-vote',
            'action': isDetail ? 'vote-detail' : 'vote-list',
            'label': $button.data('id'),
            'value': ($button.data('dir') === 'unvote') ? -1 : 1
        });

        $.ajax({
            url: url,
            dataType: 'json'
        }).done(function (json) {
            $button.removeClass('disabled');
            $('.item-count', $item).text(json.votes);
            $('.is-voted,.is-not-voted', $item).toggle();
        }).fail(function (error) {
            alert('Váš hlas se nepovedlo uložit. Omlouváme se. Zkuste to prosím znovu.');
            console.log(error);
        });
    });

};

// TODO: Remove placeholders
barcamp.disabledLinks = async function () {
    $('a.disabled').click(function (e) {
        e.preventDefault();
        console.log('Clicked to disabled link');
    });
    $('a[href^="https://example.com"]').click(function (e) {
        e.preventDefault();
        console.log('Clicked to placeholder link');
        alert('Omlouváme se, tato funkce ještě není dostupná');
    })
};

barcamp.netteInit = async function () {
    $.nette.init();
};

barcamp.init = async function () {
    barcamp.netteInit();
    barcamp.imageFailover();
    barcamp.openNav();
    barcamp.slider();
    barcamp.accordion();
    barcamp.smoothScroll();
    barcamp.schedule();
    barcamp.lectures();
    barcamp.program();
    barcamp.avatarUploader();
    barcamp.talkVote();
    barcamp.disabledLinks();
};

domready(function () {
    barcamp.init();
    $("body").removeClass("preload").removeClass("no-js");
});

