/**
 * Mobilní program — interaktivní Gantt-style timeline (`/program/mobil`).
 *
 * Aktivuje se, pokud stránka obsahuje element `#grid` s vyžadovanými
 * `data-min` / `data-max` / `data-pxmin` / `data-year` atributy plus
 * `<script type="application/json" id="slotsData">` s daty přednášek.
 *
 * Funkce:
 *  - NOW indikátor (svislá čára + label v ose) přepočítáván každých 5 s
 *  - Pinch-to-zoom na kartách (persist v localStorage)
 *  - Long-press na kartě → toggle favorite (žluté zvýraznění, localStorage)
 *  - Tap na kartě → modal s detailem přednášky
 *  - Label v ose se v jump módu přepne na sticky badge se šipkou
 */
export default async function () {
    const grid = document.getElementById('grid');
    if (!grid) return;

    // ── Konfigurace a DOM reference ────────────────────────────────────────
    const YEAR = parseInt(grid.dataset.year, 10);
    const STORAGE_KEY = `bck-favorites-${YEAR}`;
    const ZOOM_STORAGE_KEY = `bck-zoom-${YEAR}`;
    const LABEL_W = 80;
    const minMin = parseInt(grid.dataset.min, 10);
    const maxMin = parseInt(grid.dataset.max, 10);
    const BASE_PX_MIN = parseFloat(grid.dataset.pxmin);
    const ZOOM_MIN = 0.6;
    const ZOOM_MAX = 2.5;
    const LONG_PRESS_MS = 350;
    const MOVE_THRESHOLD = 10;
    const SCROLL_X_THRESHOLD = 80;
    const EDGE_TOL = 4;
    const DRIFT_EDGE_GAP = 60;

    const nowOverrideRaw = grid.dataset.nowOverride;
    const nowOverride = (nowOverrideRaw !== undefined && nowOverrideRaw !== '')
        ? parseInt(nowOverrideRaw, 10) : null;

    let pxMin = BASE_PX_MIN;
    let zoom = clamp(parseFloat(localStorage.getItem(ZOOM_STORAGE_KEY)) || 1, ZOOM_MIN, ZOOM_MAX);

    const gridInner = grid.querySelector('.grid-inner');
    const nowLine = document.getElementById('nowLine');
    const nowLabel = document.getElementById('nowLabel');
    const pastOverlay = document.getElementById('pastOverlay');
    const reloadBtn = document.getElementById('reloadBtn');

    // ── Helpers ────────────────────────────────────────────────────────────
    function clamp(value, min, max) {
        if (!isFinite(value)) return min;
        return Math.max(min, Math.min(max, value));
    }

    const formatHHMM = (min) => {
        const hh = Math.floor(min / 60);
        const mm = min % 60;
        return `${hh < 10 ? '0' : ''}${hh}:${mm < 10 ? '0' : ''}${mm}`;
    };

    const currentMinutes = () => {
        if (nowOverride !== null && !isNaN(nowOverride)) return nowOverride;
        const d = new Date();
        return d.getHours() * 60 + d.getMinutes();
    };

    // ── Slot data (pro modal) ──────────────────────────────────────────────
    const slotsById = {};
    const slotsDataEl = document.getElementById('slotsData');
    if (slotsDataEl) {
        try {
            const rawSlots = JSON.parse(slotsDataEl.textContent);
            for (const room of Object.keys(rawSlots)) {
                for (const slot of rawSlots[room]) {
                    slotsById[slot.id] = slot;
                }
            }
        } catch {
            // modal nebude fungovat, stránka se přesto vykreslí
        }
    }

    // ── Favorites (localStorage) ───────────────────────────────────────────
    const loadFavorites = () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return new Set();
            const arr = JSON.parse(raw);
            return new Set(Array.isArray(arr) ? arr.map(String) : []);
        } catch {
            return new Set();
        }
    };

    const saveFavorites = (set) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
        } catch {
            // quota exceeded — ignore
        }
    };

    const favorites = loadFavorites();

    const applyFavorites = () => {
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.toggle('favorite', favorites.has(card.dataset.id));
        });
    };

    const toggleFavorite = (card) => {
        const id = card.dataset.id;
        if (favorites.has(id)) {
            favorites.delete(id);
        } else {
            favorites.add(id);
        }
        saveFavorites(favorites);
        applyFavorites();
    };

    // ── NOW indikátor ──────────────────────────────────────────────────────
    function updateNow() {
        const nowMin = currentMinutes();

        if (nowMin < minMin) {
            nowLine.style.display = 'none';
            if (nowLabel) nowLabel.style.display = 'none';
            pastOverlay.style.width = '0px';
            updateNowJumpVisibility();
            return;
        }
        if (nowMin > maxMin) {
            nowLine.style.display = 'none';
            if (nowLabel) nowLabel.style.display = 'none';
            pastOverlay.style.width = `${(maxMin - minMin) * pxMin}px`;
            updateNowJumpVisibility();
            return;
        }

        const offset = (nowMin - minMin) * pxMin;
        nowLine.style.display = 'block';
        nowLine.style.left = `${LABEL_W + offset}px`;
        pastOverlay.style.width = `${offset}px`;

        if (nowLabel) {
            nowLabel.textContent = formatHHMM(nowMin);
            // Label je uvnitř .time-axis, která má margin-left:80 — left bez LABEL_W.
            nowLabel.style.left = `${offset}px`;
            nowLabel.style.display = 'inline-block';
        }
        updateNowJumpVisibility();
    }

    /**
     * Když NOW vyleze za okraj viewportu, .now-label se přepne do "jump"
     * módu — text aktuálního času, šipka ke straně kam NOW zmizela,
     * sticky pozicování na kraji viewportu, klikatelné.
     */
    function updateNowJumpVisibility() {
        if (!nowLabel) return;
        if (nowLine.style.display === 'none') return;

        const nowPxGrid = parseFloat(nowLine.style.left);
        if (isNaN(nowPxGrid)) return;

        const viewLeft = grid.scrollLeft;
        const viewRight = viewLeft + grid.clientWidth;
        const nowMin = currentMinutes();
        const offset = (nowMin - minMin) * pxMin;

        nowLabel.textContent = formatHHMM(nowMin);

        if (nowPxGrid < viewLeft - EDGE_TOL) {
            nowLabel.classList.add('jump', 'jump-left');
            nowLabel.classList.remove('jump-right');
            nowLabel.style.left = '';
        } else if (nowPxGrid > viewRight + EDGE_TOL) {
            nowLabel.classList.add('jump', 'jump-right');
            nowLabel.classList.remove('jump-left');
            nowLabel.style.left = '';
        } else {
            nowLabel.classList.remove('jump', 'jump-left', 'jump-right');
            nowLabel.style.left = `${offset}px`;
        }
    }

    function scrollNowToCenter() {
        if (nowLine.style.display === 'none') return;
        const nowPxGrid = parseFloat(nowLine.style.left);
        if (isNaN(nowPxGrid)) return;
        grid.scrollLeft = Math.max(0, nowPxGrid - grid.clientWidth / 2);
    }

    function autoScrollToNow() {
        const nowMin = currentMinutes();
        let target;
        if (nowMin < minMin) {
            target = 0;
        } else if (nowMin > maxMin) {
            target = grid.scrollWidth;
        } else {
            const offset = (nowMin - minMin) * pxMin;
            // NOW na ~1/3 zleva; aktuální přednáška od počátku 90 min zpět,
            // ale ne tak, aby NOW vyletěla z viewportu.
            const leftPad = Math.min(grid.clientWidth / 3, 90 * pxMin);
            target = LABEL_W + offset - leftPad;
        }
        grid.scrollLeft = Math.max(0, target);
    }

    /**
     * Po probuzení mobilu / návratu na záložku přepočítat NOW a pokud byla
     * čára před uspáním vidět, ale teď už ne, posunout scroll na novou pozici.
     */
    function refreshNowAndScrollIfDrifted() {
        if (nowOverride !== null) {
            updateNow();
            return;
        }
        const oldLeftStr = nowLine.style.left;
        const oldNowPx = (nowLine.style.display !== 'none' && oldLeftStr)
            ? parseFloat(oldLeftStr) : null;

        updateNow();

        if (oldNowPx === null || nowLine.style.display === 'none') return;
        const newNowPx = parseFloat(nowLine.style.left);
        const viewLeft = grid.scrollLeft;
        const viewRight = viewLeft + grid.clientWidth;
        const oldWasVisible = oldNowPx >= viewLeft && oldNowPx <= viewRight;
        const newComfortablyVisible =
            newNowPx >= viewLeft + DRIFT_EDGE_GAP &&
            newNowPx <= viewRight - DRIFT_EDGE_GAP;
        if (oldWasVisible && !newComfortablyVisible) {
            autoScrollToNow();
        }
    }

    // ── Sticky labely sálů (úzké rotated zobrazení při scrollu) ────────────
    function updateScrolledClass() {
        grid.classList.toggle('scrolled-x', grid.scrollLeft > SCROLL_X_THRESHOLD);
    }

    // ── Pinch zoom ─────────────────────────────────────────────────────────
    function applyZoom(newZoom, anchorScreenX) {
        const oldPxMin = pxMin;
        zoom = clamp(newZoom, ZOOM_MIN, ZOOM_MAX);
        pxMin = BASE_PX_MIN * zoom;

        gridInner.style.setProperty('--zoom', zoom);
        gridInner.style.width = `${(maxMin - minMin) * pxMin + LABEL_W}px`;

        grid.querySelectorAll('.time-axis .hour').forEach((el) => {
            el.style.width = `${60 * pxMin}px`;
        });

        grid.querySelectorAll('.card').forEach((card) => {
            const sm = parseInt(card.dataset.startmin, 10);
            const dm = parseInt(card.dataset.durmin, 10);
            card.style.left = `${(sm - minMin) * pxMin}px`;
            card.style.width = `${dm * pxMin}px`;
        });

        // Zachovat anchor: pozice pod prsty zůstane na stejném místě obrazovky.
        if (anchorScreenX !== undefined && oldPxMin > 0) {
            const rect = grid.getBoundingClientRect();
            const screenInGridX = anchorScreenX - rect.left;
            const oldGridX = grid.scrollLeft + screenInGridX;
            const ratio = pxMin / oldPxMin;
            const newAnchorX = (oldGridX - LABEL_W) * ratio + LABEL_W;
            grid.scrollLeft = Math.max(0, newAnchorX - screenInGridX);
        }

        updateNow();
    }

    function persistZoom() {
        try {
            localStorage.setItem(ZOOM_STORAGE_KEY, String(zoom));
        } catch {
            // ignore
        }
    }

    const pinchDistance = (t1, t2) => {
        const dx = t2.clientX - t1.clientX;
        const dy = t2.clientY - t1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    let pinchStartZoom = null;
    let pinchStartDistance = 0;
    let pinchAnchorScreenX = 0;

    // ── Long-press + tap (favorite / modal) ────────────────────────────────
    let pressTimer = null;
    let pressTarget = null;
    let startX = 0;
    let startY = 0;

    function clearPress() {
        if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
        }
        pressTarget = null;
    }

    // ── Modal s detailem přednášky ─────────────────────────────────────────
    const modal = document.getElementById('talkModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalFav = document.getElementById('modalFav');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalName = document.getElementById('modalName');
    const modalCompany = document.getElementById('modalCompany');
    const modalLinks = document.getElementById('modalLinks');
    const modalTitle = document.getElementById('modalTitle');
    const modalTime = document.getElementById('modalTime');
    const modalDesc = document.getElementById('modalDesc');
    const modalPurpose = document.getElementById('modalPurpose');
    const modalPurposeLabel = document.getElementById('modalPurposeLabel');
    let currentModalCard = null;

    function renderModalLinks(links) {
        modalLinks.innerHTML = '';
        if (!links) return;
        for (const items of Object.values(links)) {
            if (!Array.isArray(items)) continue;
            for (const item of items) {
                if (!item || !item.url) continue;
                const a = document.createElement('a');
                a.href = item.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = item.name || item.url;
                modalLinks.appendChild(a);
            }
        }
    }

    function updateModalFavIcon(id) {
        const isFav = favorites.has(String(id));
        modalFav.classList.toggle('active', isFav);
        modalFav.setAttribute('aria-label', isFav ? 'Odebrat z oblíbených' : 'Přidat do oblíbených');
    }

    function openModal(card) {
        if (!modal) return;
        const slot = slotsById[card.dataset.id];
        if (!slot || slot.type !== 'talk') return;
        currentModalCard = card;

        if (slot.speakerPic) {
            modalPhoto.src = slot.speakerPic;
            modalPhoto.style.display = '';
        } else {
            modalPhoto.removeAttribute('src');
            modalPhoto.style.display = 'none';
        }
        modalName.textContent = slot.speaker || '';
        modalCompany.textContent = slot.company || '';
        modalTitle.textContent = slot.title || '';
        modalTime.textContent = `${slot.timeRange} • ${slot.room}`;
        modalDesc.textContent = slot.description || '';
        modalPurpose.textContent = slot.purpose || '';
        modalPurposeLabel.classList.toggle('hidden', !slot.purpose);
        renderModalLinks(slot.links);
        updateModalFavIcon(card.dataset.id);

        document.body.style.overflow = 'hidden';
        modal.classList.add('open');
        modal.querySelector('.modal-content').scrollTop = 0;
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
        currentModalCard = null;
    }

    // ── Event listenery ────────────────────────────────────────────────────
    if (reloadBtn) {
        reloadBtn.addEventListener('click', () => location.reload());
    }

    if (nowLabel) {
        nowLabel.addEventListener('click', () => {
            if (nowLabel.classList.contains('jump')) scrollNowToCenter();
        });
    }

    if (modal) {
        modalBackdrop.addEventListener('click', closeModal);
        modalClose.addEventListener('click', closeModal);
        modalFav.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentModalCard) {
                toggleFavorite(currentModalCard);
                updateModalFavIcon(currentModalCard.dataset.id);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
        });
    }

    document.addEventListener('pointerdown', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        pressTarget = card;
        startX = e.clientX;
        startY = e.clientY;
        pressTimer = setTimeout(() => {
            if (pressTarget) {
                toggleFavorite(pressTarget);
                if (navigator.vibrate) navigator.vibrate(40);
            }
            clearPress();
        }, LONG_PRESS_MS);
    }, { passive: true });

    document.addEventListener('pointermove', (e) => {
        if (!pressTimer) return;
        if (Math.abs(e.clientX - startX) > MOVE_THRESHOLD || Math.abs(e.clientY - startY) > MOVE_THRESHOLD) {
            clearPress();
        }
    }, { passive: true });

    document.addEventListener('pointerup', () => {
        // pressTimer ještě běží = krátký tap → otevřít modal.
        if (pressTimer && pressTarget?.classList?.contains('card')) {
            clearTimeout(pressTimer);
            pressTimer = null;
            const tapTarget = pressTarget;
            pressTarget = null;
            openModal(tapTarget);
            return;
        }
        clearPress();
    }, { passive: true });

    document.addEventListener('pointercancel', clearPress, { passive: true });

    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.card')) e.preventDefault();
    });

    grid.addEventListener('scroll', () => {
        updateScrolledClass();
        updateNowJumpVisibility();
    }, { passive: true });

    grid.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            clearPress();
            pinchStartZoom = zoom;
            pinchStartDistance = pinchDistance(e.touches[0], e.touches[1]);
            pinchAnchorScreenX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        }
    }, { passive: true });

    grid.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && pinchStartDistance > 0) {
            const newDist = pinchDistance(e.touches[0], e.touches[1]);
            const ratio = newDist / pinchStartDistance;
            const screenX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            applyZoom(pinchStartZoom * ratio, screenX);
            e.preventDefault();
        }
    }, { passive: false });

    grid.addEventListener('touchend', (e) => {
        if (pinchStartDistance > 0 && e.touches.length < 2) {
            pinchStartDistance = 0;
            pinchStartZoom = null;
            persistZoom();
        }
    }, { passive: true });

    if (nowOverride === null) {
        setInterval(updateNow, 5 * 1000);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') refreshNowAndScrollIfDrifted();
        });
        window.addEventListener('pageshow', refreshNowAndScrollIfDrifted);
    }

    // ── Init ───────────────────────────────────────────────────────────────
    applyFavorites();

    // Restore persistovaný zoom (přepíše PHP-renderované styly)
    if (Math.abs(zoom - 1) > 0.001) applyZoom(zoom);

    // Layout nemusí být dopočítaný v okamžiku běhu — rAF zajistí, že updateNow
    // a autoScrollToNow běží až po prvním layout/paint cyklu.
    requestAnimationFrame(() => {
        updateNow();
        autoScrollToNow();
        updateScrolledClass();
    });
}
