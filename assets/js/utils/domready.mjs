const promise = new Promise((resolve) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve, {once: true, passive: true});
    } else {
        resolve();
    }
});

export default function (callback) {
    promise.then(() => {
        // Wrap to setTimeout to prevent abusing microtask queue
        setTimeout(callback, 0);
    });
}
