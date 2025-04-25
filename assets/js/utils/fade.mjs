// modules/fade.js

/**
 * Fades in an HTML element by animating its opacity from 0 to its original value.
 * If the element is already visible, the function returns immediately without animation.
 *
 * @param {HTMLElement} element - The DOM element to fade in
 * @param {number} [duration=300] - Duration of the animation in milliseconds
 * @param {Object} [options={}] - Additional animation options
 * @param {number} [options.duration] - Override for animation duration
 * @param {string} [options.easing='ease'] - CSS easing function to use
 * @param {string} [options.fill='forwards'] - Animation fill mode
 * @returns {Promise<void>} A promise that resolves when the animation completes
 */
function fadeIn(element, duration = 300, options = {}) {
    const computed = getComputedStyle(element);
    const isHidden = computed.display === 'none' || parseFloat(computed.opacity) === 0;
    if (!isHidden) return Promise.resolve();

    const originalDisplay = element.dataset.originalDisplay || 'block';
    const originalOpacity = element.dataset.originalOpacity || '1';

    element.style.opacity = '0';
    element.style.display = originalDisplay;

    return element.animate([{opacity: 0}, {opacity: originalOpacity}], {
        duration: options.duration ?? duration,
        easing: options.easing ?? 'ease',
        fill: options.fill ?? 'forwards',
        ...options,
    }).finished.then((animation) => {
        element.style.opacity = originalOpacity;
        animation.cancel();
        return element;
    });
}

/**
 * Fades out an HTML element by animating its opacity to 0 and hiding it.
 * If the element is already hidden, the function returns immediately without animation.
 * The function stores the original display value for later restoration.
 *
 * @param {HTMLElement} element - The DOM element to fade out
 * @param {number} [duration=300] - Duration of the animation in milliseconds
 * @param {Object} [options={}] - Additional animation options
 * @param {number} [options.duration] - Override for animation duration
 * @param {string} [options.easing='ease'] - CSS easing function to use
 * @param {string} [options.fill='forwards'] - Animation fill mode
 * @returns {Promise<void>} A promise that resolves when the animation completes
 */
function fadeOut(element, duration = 300, options = {}) {
    const computed = getComputedStyle(element);
    const currentOpacity = parseFloat(computed.opacity);
    if (computed.display === 'none' || currentOpacity === 0) return Promise.resolve();

    if (!element.dataset.originalDisplay && computed.display !== 'none') {
        element.dataset.originalDisplay = computed.display;
    }
    if (!element.dataset.originalOpacity && computed.opacity !== '0') {
        element.dataset.originalOpacity = computed.opacity;
    }

    return element.animate([{opacity: currentOpacity}, {opacity: 0}], {
        duration: options.duration ?? duration,
        easing: options.easing ?? 'ease',
        ...options,
    }).finished.then((animation) => {
        element.style.display = 'none';
        element.style.opacity = element.dataset.originalOpacity ?? '1';
        animation.cancel();
        return element;
    });
}

/**
 * Toggles the visibility of an HTML element by either fading it in or out.
 * If the element is currently visible, it will fade out; if hidden, it will fade in.
 *
 * @param {HTMLElement} element - The DOM element to toggle
 * @param {number} [duration=300] - Duration of the animation in milliseconds
 * @param {Object} [options={}] - Additional animation options
 * @param {number} [options.duration] - Override for animation duration
 * @param {string} [options.easing='ease'] - CSS easing function to use
 * @param {string} [options.fill='forwards'] - Animation fill mode
 * @returns {Promise<void>} A promise that resolves when the animation completes
 */
function fadeToggle(element, duration = 300, options = {}) {
    const computed = getComputedStyle(element);
    const isHidden = computed.display === 'none' || parseFloat(computed.opacity) === 0;

    return isHidden
        ? fadeIn(element, duration, options)
        : fadeOut(element, duration, options);
}

export {fadeIn, fadeOut, fadeToggle};
