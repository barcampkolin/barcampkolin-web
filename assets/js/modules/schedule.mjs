export default async function () {
    const schedule = document.querySelector("#schedule");

    const getDataJson = (el, key) => JSON.parse(el.dataset[key] ?? "null");
    const config = {};

    if (!schedule
        || !(config.features = getDataJson(schedule, "features"))
        || !(config.dates = getDataJson(schedule, "dates"))
        || !(config.steps = getDataJson(schedule, "steps"))
    ) {
        return;
    }

    registerViewportObserver(render, 0.25).observe(schedule);

    resetConfig();
    setConfig();

    function registerViewportObserver(callback, threshold, root = null) {
        return new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        callback();
                        observer.disconnect();
                    }
                });
            },
            {root, threshold}
        );
    }

    function render() {
        schedule.classList.add("animate");
        schedule.querySelector(".schedule").classList.add("animate");
    }

    function resetConfig() {
        schedule.querySelectorAll("li").forEach((item) => {
            item.classList.remove("item-active", "item-done");
        });
        schedule.querySelectorAll("div.progress").forEach((slider) => {
            setSliderEmpty(slider);
            slider.classList.remove("active");
        });
    }

    function setConfig() {
        config.steps.forEach(function (item) {
            const key = item.key;
            const step = schedule.querySelector(`li[data-step-name="${CSS.escape(key)}"]`);
            const sliderBefore = step.querySelector("div.progress-before");
            const sliderAfter = step.querySelector("div.progress-after");
            if (item.isCurrent) {
                step.classList.add("item-active");
                setSliderFull(sliderBefore);

                sliderAfter.classList.add("active");
                setSliderPercentagle(sliderAfter);
            }
            if (item.isDone) {
                step.classList.add("item-done");
                setSliderFull(sliderBefore);
                setSliderFull(sliderAfter);
            }
            if (item.isNext) {
                sliderBefore?.classList.add("active");
                setSliderPercentagle(sliderBefore);
            }
        });
    }

    function getCurrentStepTimeIntervalRatio() {
        const start = new Date(config.dates.scheduleBegin).getTime();
        const end = new Date(config.dates.scheduleEnd).getTime();
        const current = new Date().getTime();

        const isInvalid = [start, end, current].some(isNaN);

        if (isInvalid || start >= end || start > current) {
            return 0;
        }
        if (current > end) {
            return 1;
        }

        return (current - start) / (end - start);
    }

    function setSliderSizes(slider, size) {
        slider.style.width = size[0] + "%";
        slider.style.height = size[1] + "%";
    }

    function setSliderPercentagle(slider) {
        if (!slider) return;

        const percent = getCurrentStepTimeIntervalRatio();
        const limits = parseSliderLimits(slider);

        const sizes = [
            limits.min[0] + (limits.max[0] - limits.min[0]) * percent,
            limits.min[1] + (limits.max[1] - limits.min[1]) * percent,
        ];
        setSliderSizes(slider, sizes);
    }

    function setSliderEmpty(slider) {
        if (!slider) return;
        const limits = parseSliderLimits(slider);
        setSliderSizes(slider, limits.empty);
    }

    function setSliderFull(slider) {
        if (!slider) return;
        const limits = parseSliderLimits(slider);
        setSliderSizes(slider, limits.full);
    }

    function parseSliderLimits(slider) {
        const seg = getDataJson(slider, "visualLimits");
        return {
            "empty": [seg[0], seg[1]],
            "min": [seg[2], seg[3]],
            "max": [seg[4], seg[5]],
            "full": [seg[6], seg[7]],
        };
    }
}
