export default async function () {
    const container = document.querySelector('.hero-slider');
    if (!container) return;

    const slides = container.children;
    if (!slides.length) return;

    let current = null;

    async function rotate() {
        const list = Array.from(slides);
        if(current) {
            current.classList.remove('active');
            list.splice(list.indexOf(current), 1);
        }

        current = list[Math.floor(Math.random() * list.length)];
        current.classList.add('active');
    }

    requestAnimationFrame(rotate);

    if(slides.length === 1) return;
    setInterval(rotate, 10000);
}
