import "../utils/fade.mjs"
import * as fade from "../utils/fade.mjs";

const foldedHeights = [97, 110];
const sizesBoundaryX = 1160;
const defaultAnimatioDuration = 200;

/**
 * Applies an animation callback to one or more HTML elements.
 *
 * @async
 * @param {Function} callback - Animation function to call on each element
 * @param {HTMLElement|HTMLElement[]|null} elements - Single element, array of elements, or null
 * @param {number} [duration] - Duration of the animation in milliseconds
 * @param {Object} [options] - Additional animation options
 * @returns {Promise<any>} Promise that resolves when the first animation completes
 */
function multiFade(callback, elements, duration, options) {

    if (elements === undefined || elements === null || elements[Symbol.iterator] === undefined) {
        elements = [elements];
    }

    const promises = [];
    elements.forEach((element) => {
        if (!element instanceof HTMLElement) return;

        promises.push(callback(element, duration, options));
    });

    return Promise.all(promises);
}

function fadeOut(elements, duration, options) {
    return multiFade(fade.fadeOut, elements, duration, options);
}

function fadeIn(elements, duration, options) {
    return multiFade(fade.fadeIn, elements, duration, options);
}

function multiAnimation(elements, cssValues, duration, options) {
    options = {
        duration: options?.duration ?? duration ?? defaultAnimatioDuration,
        easing: options?.easing ?? 'ease',
        fill: options?.fill ?? 'forwards',
        ...options,
    };

    if (elements === undefined || elements === null || elements[Symbol.iterator] === undefined) {
        elements = [elements];
    }

    const promises = [];

    elements.forEach((element) => {
        if (!element instanceof HTMLElement) return;

        const promise = element.animate([cssValues], options).finished.then((animation) => {
            animation.commitStyles();
            animation.cancel();
            return element;
        });

        promises.push(promise);
    });

    return Promise.all(promises);
}

async function measureHidden(element, callback) {
    const original = {
        display: element.style.display,
        visibility: element.style.visibility
    };

    element.style.display = 'block';
    element.style.visibility = 'hidden';

    const result = await callback(element);

    element.style.display = original.display;
    element.style.visibility = original.visibility;

    return result;
}

function getFoldedHeight() {
    return foldedHeights[document.documentElement.clientWidth > sizesBoundaryX ? 0 : 1];
}

function closeLecture(lecture) {
    fadeOut(lecture.querySelectorAll('.item-content-full, .show-full'), defaultAnimatioDuration).then(
        () => fadeIn(lecture.querySelector('.item-content-perex'))
    );

    // Manually set height for animation
    lecture.style.height = getComputedStyle(lecture).height;
    lecture.classList.remove('open');
    multiAnimation(lecture, {height: `${(getFoldedHeight())}px`}, defaultAnimatioDuration).then(() => {
        lecture.style.height = '';
    });
}

async function openLecture(lecture, full) {
    const computed = getComputedStyle(lecture);
    const padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
    const height = await measureHidden(full, (el) => parseFloat(el.offsetHeight));

    fadeOut(lecture.querySelectorAll('.item-content-perex'), 200).then(
        () => fadeIn(lecture.querySelectorAll('.item-content-full, .show-full'), 200)
    );

    multiAnimation(lecture, {height: `${height + padding}px`}, defaultAnimatioDuration).then(() => {
            lecture.classList.add('open');
            lecture.style.height = '';
        }
    );
}

export default function () {
    const container = document.querySelector('.lectures-list');
    if (!container) return;

    Array.from(container.children).forEach((lecture, index) => {
        const perex = lecture.querySelector('.item-content-perex');
        const full = lecture.querySelector('.item-content-full');

        full.querySelector('.js-lecture-control').addEventListener('click', (e) => {
            closeLecture(lecture);
        });

        perex.addEventListener('click', async (e) => {
            // Close all other lectures - it's so annoying, disable to sparing the nervous system of our users
            // container.querySelectorAll('li.open').forEach((openLecture) => {
            //     closeLecture(openLecture);
            // });
            openLecture(lecture, full);

            // Scroll to the lecture - this is needed only when is other lectures closed in thi event- above disabled
            // const scrollOver = document.documentElement.clientWidth > 568 ? 200 : 50;
            // const containerPosY = container.getBoundingClientRect().top + window.scrollY;
            // const scrollPosY = containerPosY + (index * getFoldedHeight());
            //
            // window.scrollTo({
            //     top: scrollPosY - scrollOver,
            //     behavior: 'smooth'
            // });
        });
    });
}
