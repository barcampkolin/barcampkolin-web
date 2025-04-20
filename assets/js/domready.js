let resolve;
const promise = new Promise(internalResolve => resolve = internalResolve);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', resolve, {once: true, passive: true});
} else {
    resolve();
}

export default function (callback) {
    promise.then(() => {
        // Wrap to setTimeout to prevent abusing microtask queue
        setTimeout(callback, 0);
    });
}
