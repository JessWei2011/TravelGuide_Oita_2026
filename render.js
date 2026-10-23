// ==========================================
// 核心頁面渲染腳本 (render.js)
// ==========================================

function renderNav(navItems) {
    const el = document.getElementById("nav");
    if (!el) return;

    el.innerHTML = navItems.map((item, i) => `
        <a href="#${item.target}" class="nav-item${i === 0 ? " active" : ""}" data-target="${item.target}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
        </a>
    `).join("");
}

function initScrollSpy(navItems) {
    const navLinks = document.querySelectorAll(".nav-item");
    const sections = navItems
        .map(item => document.getElementById(item.target))
        .filter(Boolean);

    const setActive = (target) => {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.dataset.target === target);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, { rootMargin: "-35% 0px -45% 0px", threshold: 0 });

    sections.forEach(section => observer.observe(section));
}

function renderCover(cover) {
    const el = document.getElementById("cover");
    if (!el || !cover) return;

    el.innerHTML = `
        <div class="cover-box">
            <div class="illustration">${cover.emoji}</div>
            <h1>${cover.title}</h1>
            <h2>${cover.dateRange}</h2>
            <p>
                ${cover.subtitle}
                <br>
                <b>${cover.route}</b>
            </p>
            <div class="stamp">${cover.stamp}</div>
        </div>
    `;
}

function infoItem(label, value) {
    return `
        <div class="info-item">
            <span class="info-label">${label}</span>
            <span class="info-value">${value}</span>
        </div>
    `;
}

function routeLine(from, to) {
    return `
        <div class="route-line">
            <span>${from}</span>
            <span class="arrow">➔</span>
            <span>${to}</span>
        </div>
    `;
}

function buildMapLinks(target) {
    if (!target) return "";

    let url = "";
    if (typeof target === "object") {
        if (target.mapUrl) {
            url = target.mapUrl;
        } else {
            const q = target.mapQuery || target.name || target.address;
            url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
        }
    } else if (typeof target === "string") {
        if (target.startsWith("http")) {
            url = target;
        } else {
            url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(target)}`;
        }
    }

    return `
        <div class="map-links" style="margin-top: 8px;">
            <a class="map-btn" href="${url}" target="_blank" rel="noopener">🗺️ Google 地圖導航</a>
        </div>
    `;
}

// 渲染航班資訊
function renderFlights(flights, transit) {
    const el = document.getElementById("flights");
    if (!el || !flights) return;

    const legsHtml = flights.map((leg, i) => `
        ${i > 0 ? "<hr>" : ""}
        <div class="flight-leg">
            <h3>${leg.title}</h3>
            ${routeLine(leg.from, leg.to)}
            <div class="info-grid">
                ${infoItem("出發時間", leg.depart)}
                ${infoItem("抵達時間", leg.arrive)}
                ${infoItem("航班編號", leg.flightNo)}
                ${infoItem("航廈櫃台", leg.terminal)}
            </div>
            ${leg.note ? `<div class="flight-transit-box">${leg.note}</div>` : ""}
        </div>
    `).join("");

    const transitHtml = transit ? `
        <div class="flight-transit-box" style="margin-top:16px; background:#F4F9F9; border-left-color: var(--onsen-blue); color: var(--onsen-dark);">
            <b>🚄 ${transit.title}</b><br>
            ${transit.schedule}<br>
            <span style="font-size:12px; color:var(--text-secondary);">${transit.note}</span>
        </div>
    ` : "";

    el.innerHTML = `
        <h2 class="section-title">✈️ 航班與集合資訊 <span class="sub-tag">虎航直飛大分</span></h2>
        <div class="card flight">
            ${legsHtml}
            ${transitHtml}
        </div>
    `;
}

// 渲染租車與交通資訊
function renderTransport(transport) {
    const el = document.getElementById("transport");
    if (!el || !transport) return;

    const car = transport.rentalCar;
    const carHtml = car ? `
        <div class="card transport-card">
            <h3>🚗 租車自駕資訊 <span class="step-badge badge-car">${car.statusBadge}</span></h3>
            <div class="info-grid">
                ${infoItem("租車門市", car.shopName)}
                ${infoItem("預約合計費用", `<span style="color:var(--autumn-red); font-size:15px;">${car.totalCost}</span>`)}
                ${infoItem("取車時間", car.pickupTime)}
                ${infoItem("還車時間", car.returnTime)}
                ${infoItem("聯絡電話", car.phone)}
                ${infoItem("門市地址", car.address)}
            </div>
            ${car.tips ? `<div class="special-notice-box">💡 <b>自駕須知</b>：${car.tips}</div>` : ""}
            ${buildMapLinks(car)}
        </div>
    ` : "";

    const busesHtml = (transport.airportBuses || []).map(b => `
        <div class="transport-leg">
            <div class="transport-label">🚌 ${b.direction}</div>
            <div class="info-grid">
                ${infoItem("班次時間", b.time)}
                ${infoItem("搭乘巴士", b.busType)}
                ${infoItem("單程車資", b.fare)}
                ${infoItem("搭乘地點", b.dropLocation || b.boardingLocation)}
            </div>
            ${b.note ? `<div class="flight-transit-box">${b.note}</div>` : ""}
            ${b.link ? `<div style="margin-top:6px;"><a class="blog-link" href="${b.link}" target="_blank" rel="noopener">📖 機場巴士搭乘圖文攻略</a></div>` : ""}
        </div>
    `).join("");

    const trainsHtml = (transport.trainTransits || []).map(t => `
        <div class="transport-leg">
            <div class="transport-label">🚆 ${t.title}</div>
            <div style="font-size:13.5px; margin: 4px 0;"><b>路線</b>：${t.route}</div>
            ${t.duration ? `<div style="font-size:12.5px; color:var(--text-secondary);">⏱️ 所需時間：${t.duration}</div>` : ""}
            ${t.returnRoute ? `<div style="font-size:13px; color:var(--autumn-red); margin-top:2px;"><b>回程安排</b>：${t.returnRoute}</div>` : ""}
            ${t.backupRoute ? `<div style="font-size:12px; color:var(--text-muted); margin-top:2px;"><b>備案路線</b>：${t.backupRoute}</div>` : ""}
            ${t.note ? `<div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">💡 ${t.note}</div>` : ""}
        </div>
    `).join("");

    el.innerHTML = `
        <h2 class="section-title">🚗 租車自駕與機場公共交通</h2>
        ${carHtml}
        <div class="card">
            <h3>🚌 機場特急巴士 (Airliner)</h3>
            ${busesHtml}
        </div>
        <div class="card">
            <h3>🚆 JR 鐵道與由布院接駁</h3>
            ${trainsHtml}
        </div>
    `;
}

// 渲染住宿飯店資訊
function renderHotels(hotels) {
    const el = document.getElementById("hotels");
    if (!el || !hotels) return;

    const cardsHtml = hotels.map((h, i) => {
        const highlightsHtml = (h.highlights || []).map(hl => `<li>${hl}</li>`).join("");

        let onsenBoxHtml = "";
        if (h.onsenAlert) {
            const stepsHtml = (h.onsenAlert.steps || []).map(s => `<li>${s}</li>`).join("");
            onsenBoxHtml = `
                <div class="special-alert-box">
                    <div class="alert-title">${h.onsenAlert.title}</div>
                    <ul style="margin:6px 0 0; padding-left:18px;">
                        ${stepsHtml}
                    </ul>
                </div>
            `;
        }

        return `
            <div class="card hotel-card scroll-target" id="hotel-${i}">
                <span class="hotel-tag-badge">${h.tag}</span>
                <h3>${h.name}</h3>
                <div class="hotel-bill-badge">💳 付款紀錄：${h.billing}</div>
                
                <div class="info-grid">
                    ${infoItem("住宿日期", h.dates)}
                    ${infoItem("入住時間", h.checkIn)}
                    ${infoItem("退房時間", h.checkOut)}
                    ${infoItem("早餐安排", h.breakfast)}
                    ${infoItem("聯絡電話", h.phone)}
                    ${infoItem("飯店地址", h.address)}
                </div>

                ${h.highlights ? `
                    <div style="margin: 10px 0 6px;">
                        <span style="font-size:12.5px; font-weight:700; color:var(--onsen-dark);">🌟 飯店特色：</span>
                        <ul style="font-size:13px; color:var(--text-secondary); margin:4px 0; padding-left:20px; line-height:1.6;">
                            ${highlightsHtml}
                        </ul>
                    </div>
                ` : ""}

                ${onsenBoxHtml}

                <div class="step-links-row" style="margin-top:12px;">
                    ${h.blogLink ? `<a class="blog-link" href="${h.blogLink}" target="_blank" rel="noopener">📖 飯店開箱介紹文章</a>` : ""}
                    ${h.accessGuide ? `<a class="blog-link" href="${h.accessGuide}" target="_blank" rel="noopener">🚶 JR大分站出站步行指引</a>` : ""}
                    <a class="map-btn" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapQuery || h.name)}" target="_blank" rel="noopener">🗺️ Google 地圖</a>
                </div>
            </div>
        `;
    }).join("");

    el.innerHTML = `
        <h2 class="section-title">🏨 溫泉飯店與泡湯須知 <span class="sub-tag">別府・大分共4晚</span></h2>
        ${cardsHtml}
    `;
}

// 渲染時間軸步驟
function renderTimelineStep(stop) {
    let badgeHtml = "";
    if (stop.tag) {
        let badgeClass = "badge-spot";
        if (stop.tag.includes("美食") || stop.tag.includes("甜點") || stop.tag.includes("燒肉") || stop.tag.includes("必吃")) {
            badgeClass = "badge-food";
        } else if (stop.tag.includes("自駕") || stop.tag.includes("交通") || stop.tag.includes("飛行") || stop.tag.includes("電車")) {
            badgeClass = "badge-car";
        } else if (stop.tag.includes("購物") || stop.tag.includes("伴手禮") || stop.tag.includes("叮嚀")) {
            badgeClass = "badge-shop";
        } else if (stop.tag.includes("米其林") || stop.tag.includes("排隊")) {
            badgeClass = "badge-star";
        }
        badgeHtml = `<span class="step-badge ${badgeClass}">${stop.tag}</span>`;
    }

    const timeHtml = stop.time ? `<div class="step-time">⏰ ${stop.time}</div>` : "";
    const foodHtml = stop.food ? `<div class="step-food">🥢 <b>必嚐名物</b>：${stop.food}</div>` : "";
    const detailHtml = stop.detail ? `<div class="step-detail">${stop.detail}</div>` : "";

    let mapTarget = stop.mapUrl || stop.mapQuery || stop.address || stop.label;
    let mapHref = "";
    if (mapTarget) {
        mapHref = mapTarget.startsWith("http")
            ? mapTarget
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapTarget)}`;
    }

    const mapHtml = mapHref ? `<a class="step-map" href="${mapHref}" target="_blank" rel="noopener">🗺️ Google 地圖</a>` : "";

    return `
        <div class="step">
            <div class="step-marker">
                <span class="step-dot"></span>
                <span class="step-line"></span>
            </div>
            <div class="step-body">
                <div class="step-label">
                    <span>${stop.label}</span>
                    ${badgeHtml}
                </div>
                ${timeHtml}
                ${detailHtml}
                ${foodHtml}
                <div class="step-links-row">
                    ${mapHtml}
                </div>
            </div>
        </div>
    `;
}

// 渲染每日行程卡片
function renderItineraryDay(day) {
    return `
        <div class="card itinerary-day">
            <div class="day-header">
                <h3>${day.date}</h3>
            </div>
            <div class="stepper">
                ${day.stops.map(renderTimelineStep).join("")}
            </div>
        </div>
    `;
}

function renderItinerary(itinerary) {
    const el = document.getElementById("itinerary");
    if (!el || !itinerary) return;

    const days = itinerary.days || [];
    const daysHtml = days.length
        ? days.map(renderItineraryDay).join("")
        : `<div class="card"><p>行程資料準備中...</p></div>`;

    const noteHtml = itinerary.note
        ? `<div class="card" style="background:#FFFDF9; border-left:4px solid var(--autumn-amber); font-size:13px; color:var(--text-secondary);">${itinerary.note}</div>`
        : "";

    const liveBadge = itinerary.isLiveSync
        ? `<div class="sync-status live">☁️ 即時連線 Google 試算表（已同步最新多人協作內容）</div>`
        : "";

    el.innerHTML = `
        <h2 class="section-title">📅 每日行程表 <span class="sub-tag">5天4夜溫泉之旅</span></h2>
        ${liveBadge}
        ${daysHtml}
        ${noteHtml}
    `;
}

// 渲染特色美食指南
function renderFood(food) {
    const el = document.getElementById("food");
    if (!el || !food || !food.categories) return;

    const categoriesHtml = food.categories.map(cat => {
        const itemsHtml = cat.items.map(item => {
            const tagHtml = item.tag ? `<span class="food-tag">${item.tag}</span>` : "";
            let mapTarget = item.mapUrl || item.mapQuery || item.name || item.address;
            let mapHref = mapTarget
                ? (mapTarget.startsWith("http") ? mapTarget : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapTarget)}`)
                : "";

            return `
                <div class="food-item-card">
                    <div class="food-header">
                        <span class="food-name">${item.name}</span>
                        ${tagHtml}
                    </div>
                    <div class="food-specialty">🍴 <b>必吃特色</b>：${item.specialty}</div>
                    ${item.note ? `<div class="food-note">💡 ${item.note}</div>` : ""}
                    ${item.address ? `<div class="food-note" style="color:var(--text-muted);">📍 ${item.address}</div>` : ""}
                    ${mapHref ? `
                        <div class="food-footer">
                            <a class="map-btn" href="${mapHref}" target="_blank" rel="noopener">🗺️ 地圖導航</a>
                        </div>
                    ` : ""}
                </div>
            `;
        }).join("");

        return `
            <div class="food-category-block">
                <div class="food-category-title">${cat.icon || "🍴"} ${cat.title}</div>
                <div class="food-grid">${itemsHtml}</div>
            </div>
        `;
    }).join("");

    el.innerHTML = `
        <h2 class="section-title">🍴 在地特色美食與餐廳推薦</h2>
        <div class="card">
            ${categoriesHtml}
        </div>
    `;
}

// 渲染費用與記帳
function renderExpenses(expenses) {
    const el = document.getElementById("expenses");
    if (!el || !expenses) return;

    const rowsHtml = expenses.map(exp => {
        let costDisplay = "";
        if (exp.amountTWD) {
            costDisplay = `NT$ ${exp.amountTWD.toLocaleString()}`;
        } else if (exp.amountJPY) {
            costDisplay = `¥ ${exp.amountJPY.toLocaleString()}`;
        }

        return `
            <tr>
                <td style="font-weight:600;">${exp.item}</td>
                <td><span class="step-badge badge-spot">${exp.payer}</span></td>
                <td style="font-weight:700; color:var(--autumn-red);">${costDisplay}</td>
                <td style="font-size:12.5px; color:var(--text-secondary);">${exp.detail || ""}</td>
                <td style="font-size:12px; color:var(--matcha-green);">${exp.status || "待確認"}</td>
            </tr>
        `;
    }).join("");

    el.innerHTML = `
        <h2 class="section-title">💰 旅程費用明細與記帳</h2>
        <div class="card" style="overflow-x:auto;">
            <table class="expense-table">
                <thead>
                    <tr>
                        <th>支出項目</th>
                        <th>付款人 / 方式</th>
                        <th>金額</th>
                        <th>備註說明</th>
                        <th>狀態</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            <div style="font-size:12px; color:var(--text-muted); margin-top:8px;">
                💡 試算參考：日幣換算台幣以約 0.22 概估，租車 31,570 円約折合 NT$ 6,945。
            </div>
        </div>
    `;
}

// 渲染行前須知與備忘
function renderTips(tips) {
    const el = document.getElementById("tips");
    if (!el || !tips) return;

    const tipsHtml = tips.map(t => `
        <div class="check-item" style="background:var(--cream-bg); padding:12px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-soft);">
            <span class="icon">${t.icon || "📌"}</span>
            <div>
                <div style="font-weight:700; color:var(--onsen-dark); margin-bottom:4px;">${t.title}</div>
                <div style="font-size:12.5px; color:var(--text-secondary); line-height:1.5;">${t.desc}</div>
            </div>
        </div>
    `).join("");

    el.innerHTML = `
        <h2 class="section-title">💡 行前須知與重點提醒</h2>
        <div class="card">
            <div class="checklist-grid">
                ${tipsHtml}
            </div>
        </div>
    `;
}

// ==========================================
// 互動地圖 (Leaflet)
// ==========================================

let leafletMapInstance = null;
let markerLayerGroup = null;
let allMapMarkers = [];

function renderMapSection(mapData) {
    const el = document.getElementById("map-section");
    if (!el || !mapData) return;

    const hotelCount = mapData.places.filter(p => p.category === "hotel").length;
    const restCount = mapData.places.filter(p => p.category === "restaurant").length;
    const spotCount = mapData.places.filter(p => p.category === "spot").length;
    const marketCount = mapData.places.filter(p => p.category === "market").length;
    const transCount = mapData.places.filter(p => p.category === "transport").length;
    const totalCount = mapData.places.length;

    el.innerHTML = `
        <h2 class="section-title">🗺️ 大分・別府互動探索地圖</h2>
        <div class="card map-section-card">
            <div class="map-layout">
                <div class="map-sidebar">
                    <span class="map-filter-title">🔍 地標篩選：</span>
                    <button type="button" class="filter-btn active" data-filter="all">🌐 全部 (${totalCount})</button>
                    <button type="button" class="filter-btn" data-filter="hotel">🏨 飯店 (${hotelCount})</button>
                    <button type="button" class="filter-btn" data-filter="spot">♨️ 景點 (${spotCount})</button>
                    <button type="button" class="filter-btn" data-filter="restaurant">🍜 美食 (${restCount})</button>
                    <button type="button" class="filter-btn" data-filter="market">🛍️ 購物 (${marketCount})</button>
                    <button type="button" class="filter-btn" data-filter="transport">🚗 交通 (${transCount})</button>
                    <button type="button" class="recenter-btn" id="btn-recenter-beppu">🎯 別府中心</button>
                    <button type="button" class="recenter-btn" id="btn-recenter-oita" style="border-color:var(--onsen-blue); color:var(--onsen-blue); background:#F0F7FB;">🎯 大分車站</button>
                </div>
                <div id="oita-map"></div>
            </div>
        </div>
    `;

    setTimeout(() => {
        initLeafletMap(mapData);
    }, 150);
}

function initLeafletMap(mapData) {
    const mapEl = document.getElementById("oita-map");
    if (!mapEl || typeof L === "undefined") return;

    if (leafletMapInstance) {
        leafletMapInstance.remove();
    }

    const defaultCenter = mapData.center || [33.2794, 131.5036];
    const map = L.map('oita-map', {
        center: defaultCenter,
        zoom: mapData.zoom || 11,
        scrollWheelZoom: true
    });

    leafletMapInstance = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    allMapMarkers = [];
    markerLayerGroup = L.layerGroup().addTo(map);

    mapData.places.forEach(place => {
        let pinClass = "pin-other";
        if (place.category === "hotel") pinClass = "pin-hotel";
        else if (place.category === "restaurant") pinClass = "pin-restaurant";
        else if (place.category === "spot") pinClass = "pin-spot";
        else if (place.category === "market") pinClass = "pin-market";
        else if (place.category === "transport") pinClass = "pin-transport";

        const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="custom-pin ${pinClass}">${place.icon || "📍"}</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        const marker = L.marker([place.lat, place.lng], { icon: customIcon });
        const mapQueryParam = place.mapQuery || place.name;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQueryParam)}`;

        const popupHtml = `
            <div class="popup-card">
                <div class="popup-title">${place.icon || ""} ${place.name}</div>
                <span class="popup-badge cat-${place.category}">${place.categoryLabel || place.category}</span>
                ${place.specialty ? `<div class="popup-specialty">✨ ${place.specialty}</div>` : ""}
                ${place.note ? `<div class="popup-note">💡 ${place.note}</div>` : ""}
                <div style="margin-top:6px;">
                    <a class="popup-btn" href="${googleMapsUrl}" target="_blank" rel="noopener">🗺️ Google 地圖導航</a>
                </div>
            </div>
        `;

        marker.bindPopup(popupHtml);
        marker.category = place.category;
        allMapMarkers.push(marker);
        markerLayerGroup.addLayer(marker);
    });

    // 篩選按鈕事件
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            markerLayerGroup.clearLayers();

            allMapMarkers.forEach(m => {
                if (filter === "all" || m.category === filter || m.category === "hotel") {
                    markerLayerGroup.addLayer(m);
                }
            });
        });
    });

    // 重設中心快捷鍵
    const recenterBeppuBtn = document.getElementById("btn-recenter-beppu");
    if (recenterBeppuBtn) {
        recenterBeppuBtn.addEventListener("click", () => {
            map.flyTo([33.2803, 131.5056], 15, { duration: 1.0 });
            const aileMarker = allMapMarkers.find(m => m.getLatLng().lat === 33.2803);
            if (aileMarker) aileMarker.openPopup();
        });
    }

    const recenterOitaBtn = document.getElementById("btn-recenter-oita");
    if (recenterOitaBtn) {
        recenterOitaBtn.addEventListener("click", () => {
            map.flyTo([33.2327, 131.6067], 15, { duration: 1.0 });
            const blossomMarker = allMapMarkers.find(m => m.getLatLng().lat === 33.2327);
            if (blossomMarker) blossomMarker.openPopup();
        });
    }
}

// 錨點平滑滾動跳轉
function initJumpLinks() {
    document.addEventListener("click", (e) => {
        const link = e.target.closest("[data-jump]");
        if (!link) return;

        const target = document.getElementById(link.dataset.jump);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

// Google 試算表即時連線解析
function parseGoogleSheetTable(table) {
    if (!table || !table.rows || !table.rows.length) return null;

    const colMap = {};
    const cols = table.cols || [];
    cols.forEach((col, idx) => {
        const label = (col.label || "").trim().toLowerCase();
        if (label.includes("日") || label.includes("date")) colMap.date = idx;
        else if (label.includes("時") || label.includes("time")) colMap.time = idx;
        else if (label.includes("標題") || label.includes("地點") || label.includes("title")) colMap.label = idx;
        else if (label.includes("標籤") || label.includes("tag")) colMap.tag = idx;
        else if (label.includes("食") || label.includes("food")) colMap.food = idx;
        else if (label.includes("備註") || label.includes("細節") || label.includes("detail") || label.includes("note")) colMap.detail = idx;
        else if (label.includes("地圖") || label.includes("map") || label.includes("address")) colMap.mapQuery = idx;
    });

    if (colMap.date === undefined) colMap.date = 0;
    if (colMap.time === undefined) colMap.time = 1;
    if (colMap.label === undefined) colMap.label = 2;
    if (colMap.tag === undefined) colMap.tag = 3;
    if (colMap.food === undefined) colMap.food = 4;
    if (colMap.detail === undefined) colMap.detail = 5;
    if (colMap.mapQuery === undefined) colMap.mapQuery = 6;

    const daysMap = new Map();
    let currentDayTitle = "";

    table.rows.forEach(row => {
        if (!row || !row.c) return;
        const getVal = (idx) => {
            const cell = row.c[idx];
            if (!cell || cell.v === null || cell.v === undefined) return "";
            return String(cell.f !== undefined && cell.f !== null ? cell.f : cell.v).trim();
        };

        const dateVal = getVal(colMap.date);
        const timeVal = getVal(colMap.time);
        const labelVal = getVal(colMap.label);
        const tagVal = getVal(colMap.tag);
        const foodVal = getVal(colMap.food);
        const detailVal = getVal(colMap.detail);
        const mapQueryVal = getVal(colMap.mapQuery);

        if (dateVal === "日期" && labelVal.includes("標題")) return;

        if (dateVal) {
            currentDayTitle = dateVal;
        }

        if (!currentDayTitle || (!labelVal && !timeVal && !detailVal)) {
            return;
        }

        if (!daysMap.has(currentDayTitle)) {
            daysMap.set(currentDayTitle, []);
        }

        const stop = {
            time: timeVal,
            label: labelVal || "行程活動",
            tag: tagVal,
            food: foodVal,
            detail: detailVal,
            mapQuery: mapQueryVal
        };

        daysMap.get(currentDayTitle).push(stop);
    });

    if (daysMap.size === 0) return null;

    const days = [];
    daysMap.forEach((stops, date) => {
        days.push({ date, stops });
    });

    return days;
}

async function loadGoogleSheetItinerary(sheetId) {
    const itineraryEl = document.getElementById("itinerary");
    if (!itineraryEl) return;

    try {
        const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:json&headers=1`;
        const res = await fetch(url);
        if (!res.ok) {
            console.warn(`[Google Sheets] 連線失敗 (${res.status})，保持使用預設行程資料`);
            return;
        }

        const text = await res.text();
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/);
        if (!match || !match[1]) return;

        const json = JSON.parse(match[1]);
        if (json.status !== "ok" || !json.table) return;

        const days = parseGoogleSheetTable(json.table);
        if (days && days.length > 0) {
            console.log(`[Google Sheets] 成功同步 ${days.length} 天試算表行程！`);
            renderItinerary({
                days,
                note: TRIP_DATA.itinerary ? TRIP_DATA.itinerary.note : "",
                isLiveSync: true
            });
        }
    } catch (err) {
        console.warn("[Google Sheets] 抓取試算表時發生錯誤:", err);
    }
}

// 頁面初次載入
document.addEventListener("DOMContentLoaded", () => {
    if (TRIP_DATA.cover && TRIP_DATA.cover.title) {
        document.title = `${TRIP_DATA.cover.title}｜2026`;
    }

    renderNav(NAV_ITEMS);
    renderCover(TRIP_DATA.cover);

    if (TRIP_DATA.mapData) {
        renderMapSection(TRIP_DATA.mapData);
    }

    renderItinerary(TRIP_DATA.itinerary);
    renderFlights(TRIP_DATA.flights, TRIP_DATA.airportTransit);
    renderTransport(TRIP_DATA.transport);
    renderHotels(TRIP_DATA.hotels);

    if (TRIP_DATA.food) {
        renderFood(TRIP_DATA.food);
    }

    if (TRIP_DATA.expenses) {
        renderExpenses(TRIP_DATA.expenses);
    }

    if (TRIP_DATA.tips) {
        renderTips(TRIP_DATA.tips);
    }

    initScrollSpy(NAV_ITEMS);
    initJumpLinks();

    if (typeof GOOGLE_SHEET_ID !== "undefined" && GOOGLE_SHEET_ID && GOOGLE_SHEET_ID.trim() !== "") {
        loadGoogleSheetItinerary(GOOGLE_SHEET_ID.trim());
    }
});
