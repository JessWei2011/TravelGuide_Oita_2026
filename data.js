// ==========================================
// 📢 Google 試算表多人協作設定
// 填入您的 Google 試算表 ID 即可啟用即時連線同步
// 例如：https://docs.google.com/spreadsheets/d/1ABC123xyz.../edit
// 則 ID 為 "1ABC123xyz..."
// 留空時自動使用下方內建的預設行程資料
// ==========================================
const GOOGLE_SHEET_ID = "";

const NAV_ITEMS = [
    { target: "cover", icon: "🏠", label: "首頁" },
    { target: "map-section", icon: "🗺️", label: "地圖" },
    { target: "itinerary", icon: "📅", label: "行程" },
    { target: "flights", icon: "✈️", label: "航班" },
    { target: "transport", icon: "🚗", label: "交通" },
    { target: "hotels", icon: "🏨", label: "飯店" },
    { target: "food", icon: "🍴", label: "美食" },
    { target: "expenses", icon: "💰", label: "記帳" },
    { target: "tips", icon: "💡", label: "須知" }
];

const TRIP_DATA = {
    cover: {
        emoji: "♨️ 🍁 🚗 🍜",
        title: "日本大分・別府溫泉秋日漫遊手冊",
        dateRange: "2026.10.31 – 2026.11.04",
        subtitle: "Beppu • Hita • Yufuin • Oita Travel Guide",
        route: "桃園 ➔ 大分 ➔ 別府溫泉 ➔ 日田豆田町 ➔ 由布院 ➔ 大分市",
        stamp: "✦ OITA · BEPPU AUTUMN 2026 ✦"
    },

    // 航班與集合接駁資訊
    flights: [
        {
            title: "去程航班｜10/31 (星期六)",
            from: "(TPE) 桃園國際機場 T1",
            to: "(OIT) 大分機場",
            depart: "12:00",
            arrive: "15:00",
            flightNo: "台灣虎航 Tigerair (IT)",
            terminal: "第一航廈",
            note: "✈️ 10:00 於桃園機場第一航廈櫃台集合辦理報到手續"
        },
        {
            title: "回程航班｜11/04 (星期三)",
            from: "(OIT) 大分機場",
            to: "(TPE) 桃園國際機場 T1",
            depart: "16:30",
            arrive: "18:10",
            flightNo: "台灣虎航 Tigerair (IT)",
            terminal: "第一航廈抵達",
            note: "✈️ 14:30 前抵達大分機場（提醒：國際線無免稅店，伴手禮須在國內線 2F 買齊）"
        }
    ],

    airportTransit: {
        title: "去程機場捷運接駁安排 (10/31)",
        schedule: "機捷普通車：泰山站 09:22 出發 ➔ 第一航廈站 09:56 抵達",
        note: "出站後步行至第一航廈出境大廳，10:00 準時全員集合辦理登機與行李托運。"
    },

    // 租車與接駁交通詳細資訊
    transport: {
        rentalCar: {
            title: "TOYOTA 租車（別府站前店）",
            statusBadge: "9/6 已預訂完成",
            pickupTime: "11/01 (日) 09:30 取車（別府車站東口步行約 10 分鐘）",
            returnTime: "11/02 (一) 18:00 還車（別府車站還車）",
            totalCost: "31,570 日圓 (取車當天現場以日幣現金或信用卡支付)",
            shopName: "トヨタレンタカー 別府駅前店 (TOYOTA Rent a Car)",
            address: "大分縣別府市駅前町12-14",
            phone: "+81-977-22-0100",
            mapQuery: "Toyota Rent a Car Beppu Ekimae",
            tips: "取車時請備妥台灣駕照正本、日文譯本與主駕駛護照；自駕期間行經由布岳、安心院或日田請依限速行駛。"
        },
        airportBuses: [
            {
                direction: "去程：大分機場 ➔ 別府北濱站 (10/31)",
                time: "15:50 出發 ➔ 16:37 抵達（車程約 47-50 分鐘）",
                busType: "大分空港特急バス エアライナー (Airliner)",
                fare: "單程 1,600 日幣（可直接刷 Suica / 西瓜卡等交通 IC 卡上下車感應）",
                dropLocation: "別府北濱站（下車點在 Royal Host 樂雅樂餐廳旁，正對面就是 Aile 飯店，過馬路即達）",
                link: "https://hero789456.pixnet.net/blog/posts/14223135213"
            },
            {
                direction: "回程：JR 大分站 ➔ 大分機場 (11/04)",
                time: "建議搭乘 13:17 大分站發車 ➔ 14:17 抵達機場（或更早一班）",
                busType: "大分空港特急バス エアライナー (Airliner)",
                fare: "單程約 1,600 日幣（自動售票機購票或感應 IC 卡）",
                boardingLocation: "JR 大分站「府內中央口（北口）」過馬路至 1 號月台，站牌旁設有自動售票機",
                link: "https://yukigo.tw/oita-hello-kitty-airport/",
                note: "14:30 前務必抵達大分機場，先逛國內線 2F 買名產、泡免費足湯再出境。"
            }
        ],
        trainTransits: [
            {
                title: "11/02 (一) 傍晚 市區移動",
                route: "JR 別府站 ➔ JR 大分站",
                duration: "約 10-12 分鐘（搭乘 JR 日豐本線電車）",
                note: "18:00 TOYOTA 還車後，步行至別府車站搭車前往大分站，出站即可入住 Blossom 飯店。"
            },
            {
                title: "11/03 (二) 由布院童話小鎮一日遊",
                route: "去程：09:22 大分站 ➔ 10:29 由布院站（車程 1 小時 07 分，搭乘 JR 久大本線）",
                returnRoute: "回程首選：16:01 由布院站 ➔ 17:01 大分站（JR 久大本線，中央口出站）",
                backupRoute: "回程備案：若錯過電車，可至「由布院站前巴士中心」搭乘龜之井巴士至別府，再轉電車回大分。"
            }
        ]
    },

    // 住宿飯店詳細資訊
    hotels: [
        {
            name: "別府溫泉飯店 Aile飯店 (Hotel Aile Beppu / ホテルエール)",
            tag: "海景頂樓露天溫泉",
            dates: "10/31 (六) – 11/02 (一) ｜ 共 2 晚",
            checkIn: "10/31 17:00",
            checkOut: "11/02 08:00",
            breakfast: "周邊自理（11/1 樂雅樂、11/2 超商）",
            billing: "小杰刷卡：NT$ 8,625 + 國外手續費 $129 = 合計 NT$ 8,754",
            address: "大分県別府市北浜2-14-35",
            phone: "+81-977-21-7272",
            mapQuery: "Hotel Aile Beppu",
            blogLink: "https://gogojp.tw/hotel-aile-beppu/",
            highlights: [
                "頂樓 10 樓設有露天風呂與 11 樓眺望別府灣的大浴場",
                "地理位置極佳：大分機場巴士『別府北濱站』下車正對面",
                "步行 2 分鐘到天丼名店とよ常、步行 5 分鐘到 youme Town 購物中心"
            ]
        },
        {
            name: "大分 JR 九州 Blossom 飯店 (JR Kyushu Hotel Blossom Oita)",
            tag: "JR 車站共構・天空頂樓溫泉",
            dates: "11/02 (一) – 11/04 (三) ｜ 共 2 晚",
            checkIn: "11/02 18:30 (大廳 Lobby 位於 8 樓)",
            checkOut: "11/04 11:00",
            breakfast: "現場加購飯店早餐（大分在地產和洋自助餐）",
            billing: "Jolin 刷卡：NT$ 7,979 + 國外手續費 $120 = 合計 NT$ 8,099 (7/1 已扣款)",
            address: "大分県大分市要町1-14 (JR OITA CITY 大樓)",
            phone: "+81-97-578-8719",
            mapQuery: "JR Kyushu Hotel Blossom Oita",
            blogLink: "https://yukigo.tw/jr-kyushu-hotel-blossom-oita/",
            accessGuide: "https://www.jrk-hotels.co.jp/tw/Oita/access/",
            highlights: [
                "位在 JR 大分車站府內中央口（北口）出站右手邊 JR OITA CITY 內，搭電梯上 8 樓大廳",
                "直通 AMU PLAZA 百貨公司，餐廳、伴手禮、超市一應俱全",
                "19F 設有乾桑拿、冷感 SPA 與岩盤浴（費用約 500 日圓）"
            ],
            // 極度關鍵的泡湯特別說明
            onsenAlert: {
                title: "♨️ 頂樓 21F「CITY SPA てんくう」泡湯必讀指引（請務必遵守）：",
                steps: [
                    "從房間穿著客房提供的專屬浴袍搭電梯前往 20 樓更衣室，於更衣室內脫掉浴袍。",
                    "20 樓為室內大浴場，此區為一般裸湯泡湯。",
                    "【關鍵重點】想要前往 21 樓露天大浴場：在 20 樓通往 21 樓的樓梯旁有放置「專用浴巾衣」，請先在 20 樓穿上浴巾衣後再走樓梯前往 21 樓，並且『直接穿著浴巾衣』入池泡湯！",
                    "⚠️ 千萬別在 21 樓脫掉全裸：因 21 樓露天視角開闊，若全裸可能會被附近市區高樓看光！",
                    "21 樓露天泡完湯後，走樓梯回到 20 樓，在更衣室指定回收區脫掉浴巾衣即可。"
                ]
            }
        }
    ],

    // 每日詳細行程規劃
    itinerary: {
        note: "💡 提示：點擊任何景點的「Google 地圖」即可直接開啟導航；自駕路段請注意山區行車速限與夜間照明。",
        days: [
            {
                date: "Day 1 ｜ 10/31 (星期六) ：啟程大分・別府灣海風初體驗",
                stops: [
                    {
                        time: "09:22 – 09:56",
                        label: "搭乘機場捷運前往第一航廈",
                        tag: "交通",
                        detail: "泰山站搭乘機捷普通車（09:22 發車），於 09:56 準時抵達第一航廈站。",
                        mapQuery: "桃園機場第一航廈"
                    },
                    {
                        time: "10:00 – 12:00",
                        label: "桃園機場一航集合・登機手續",
                        tag: "集合登機",
                        detail: "10:00 在第一航廈虎航櫃台集合，辦理報到、托運行李並通過安檢出境。",
                        mapQuery: "桃園國際機場第一航廈出境大廳"
                    },
                    {
                        time: "12:00 – 15:00",
                        label: "台灣虎航飛往日本大分 (IT)",
                        tag: "飛行",
                        detail: "航程約 2 小時，預計下午 15:00 順利降落大分機場（OIT）。大分機場出關小巧迅速。",
                        mapQuery: "大分空港"
                    },
                    {
                        time: "15:00 – 15:45",
                        label: "大分機場入境探索",
                        tag: "景點",
                        detail: "機場一樓有 7-11、按摩店與足湯（足湯留待回程再泡）。領取行李並準備搭乘巴士。",
                        mapQuery: "大分空港"
                    },
                    {
                        time: "15:50 – 16:37",
                        label: "搭乘大分機場巴士 Airliner 前往別府",
                        tag: "交通接駁",
                        detail: "大分機場 ➔ 別府北濱站（50 分鐘，票價 1,600 日幣），可直接刷西瓜卡 Suica。下車點在 Royal Host 旁，正對面就是今晚住宿飯店。",
                        mapUrl: "https://hero789456.pixnet.net/blog/posts/14223135213",
                        mapQuery: "別府北浜バス停"
                    },
                    {
                        time: "17:00",
                        label: "入住別府溫泉飯店 Aile 飯店 Check-in",
                        tag: "飯店住宿",
                        detail: "辦理入住、放置行李休息。小杰已刷卡付清（$8,754）。頂樓有絕美海景露天風呂。",
                        mapUrl: "https://gogojp.tw/hotel-aile-beppu/",
                        mapQuery: "Hotel Aile Beppu"
                    },
                    {
                        time: "17:15 – 18:30",
                        label: "晚餐：天丼 とよ常 本店",
                        tag: "必吃排隊美食",
                        food: "招牌特上炸蝦天丼（酥脆麵衣＋特調甘甜醬汁）、地獄天丼、生魚片",
                        detail: "距離飯店步行僅 2-3 分鐘。大分別府享負盛名天丼老店，營業至 21:00 (L.O. 20:00)。",
                        mapUrl: "https://www.bigfang.tw/blog/post/toyotsune-beppu",
                        mapQuery: "天丼 とよ常 本店"
                    },
                    {
                        time: "19:00 – 21:00",
                        label: "youme Town 別府店 逛街購物",
                        tag: "購物血拼",
                        detail: "步行約 5 分鐘。1F：超市、OWNDAYS（可現場驗光配眼鏡，營業至 21:00）；2F：大創 DAISO、GU；3F：UNIQLO、美食街。",
                        mapQuery: "youme Town Beppu"
                    },
                    {
                        time: "21:30",
                        label: "返回 Aile 飯店頂樓泡湯放鬆",
                        tag: "溫泉享受",
                        detail: "體驗 10F/11F 展望風呂與露天溫泉，洗去飛行疲憊，欣賞別府灣夜景好好充電。",
                        mapQuery: "Hotel Aile Beppu"
                    }
                ]
            },
            {
                date: "Day 2 ｜ 11/01 (星期日) ：租車自駕・日田小京都＆別府地獄巡禮",
                stops: [
                    {
                        time: "08:00 – 09:00",
                        label: "早餐：樂雅樂 Royal Host 別府北濱店",
                        tag: "美食早餐",
                        food: "日式烤魚早餐定食、經典洋風鬆餅漢堡排早餐套餐",
                        detail: "就在飯店正對面巴士站旁。邊吃早餐邊欣賞海景，補足滿滿體力。",
                        mapUrl: "https://ffuyue.pixnet.net/blog/posts/841303199735420936",
                        mapQuery: "Royal Host Beppu Kitahama"
                    },
                    {
                        time: "09:30",
                        label: "TOYOTA 租車（別府站前店）取車出發",
                        tag: "租車自駕",
                        detail: "從飯店步行約 10 分鐘至別府站前店取車。費用 31,570 日圓現場支付，檢查車況設定導航。",
                        mapQuery: "Toyota Rent a Car Beppu Ekimae"
                    },
                    {
                        time: "10:30 – 13:00",
                        label: "日田豆田町復古老街漫遊（九州小京都）",
                        tag: "老街散策",
                        food: "日田羊羹、老街醬油冰淇淋、炸仙貝",
                        detail: "自駕約 1 小時抵達。江戶時代天領古街、傳統白壁土藏建築群與杉木工藝品。車輛停放於「豆田港町駐車場」。",
                        mapUrl: "https://journey.tw/go-hita/",
                        mapQuery: "豆田港町駐車場"
                    },
                    {
                        time: "13:00 – 14:00",
                        label: "午餐：想夫戀 總店（日田炒麵創始老店）",
                        tag: "必吃招牌",
                        food: "日田鐵板炒麵（特製焦脆生麵＋豆芽菜肉絲特調醬汁）、生蛋黃日田炒麵、日式煎餃",
                        detail: "大分県日田市若宮町416-1，電話：+81-973-24-3188。麵條外酥內彈的日田靈魂料理！",
                        mapUrl: "https://www.bigfang.tw/blog/post/sofuren-main-oita",
                        mapQuery: "焼そばの想夫恋 総本店"
                    },
                    {
                        time: "15:00 – 16:30",
                        label: "別府地獄巡禮：灶地獄 (かまど地獄) ＆ 海地獄",
                        tag: "經典地獄溫泉",
                        detail: "從日田車程約 1 小時回別府。參觀 1~6 丁目不同泉質煙霧翻騰的灶地獄，以及湛藍如海、氣勢滂沱的海地獄。",
                        mapUrl: "https://mikago.tw/kamadojigoku/",
                        mapQuery: "かまど地獄"
                    },
                    {
                        time: "16:30 – 17:30",
                        label: "岡本屋売店：必吃地獄蒸布丁與溫泉小點",
                        tag: "人氣甜點",
                        food: "地獄蒸布丁（濃厚苦甜焦糖）、地獄蒸雞蛋三明治、溫泉蛋烏龍麵、炸雞天婦羅",
                        detail: "營業時間：08:30-18:30，Mapcode：46 519 707*71。大分最負盛名的地獄蒸名物！",
                        mapQuery: "岡本屋売店"
                    },
                    {
                        time: "18:00 – 19:00",
                        label: "別府車站伴手禮採購 ＆ 車站前一丁目商店街",
                        tag: "購物伴手禮",
                        detail: "車停 TIMES 停車場別府站東口。逛別府站前一丁目商店街（Ekimachi），採買香菇餅乾、柚子胡椒等特色伴手禮。",
                        mapUrl: "https://yusuke.com.tw/blog/post/ekimachi",
                        mapQuery: "別府駅前一丁目商店街"
                    },
                    {
                        time: "19:00 – 21:00",
                        label: "晚餐：大衆焼肉 もっちゃん (Mocchan)",
                        tag: "在地的地燒肉",
                        food: "和牛牛五花、厚切牛舌、極品橫膈膜、內臟拼盤、大分冷麵",
                        detail: "別府超人氣高 CP 值大眾燒肉店，肉質鮮嫩炭火香氣四溢。",
                        mapQuery: "大衆焼肉 もっちゃん 別府"
                    },
                    {
                        time: "21:00 – 22:00",
                        label: "唐吉訶德 別府店 (Don Quijote) 採購",
                        tag: "深夜購物",
                        detail: "附設專用停車場，營業至深夜 02:00。添購防寒長袖襯衫、零食藥妝與旅遊備品。",
                        mapUrl: "https://yusuke.com.tw/blog/post/beppu-donki",
                        mapQuery: "MEGAドン・キホーテ 別府店"
                    },
                    {
                        time: "22:30",
                        label: "返回 Aile 飯店泡湯休息",
                        tag: "住宿休養",
                        detail: "回飯店頂樓露天風呂泡湯，整理今日戰利品，準備明日精彩行程。",
                        mapQuery: "Hotel Aile Beppu"
                    }
                ]
            },
            {
                date: "Day 3 ｜ 11/02 (星期一) ：自然野生動物園 ➔ 別府灣 ➔ 大分市區入住",
                stops: [
                    {
                        time: "08:00",
                        label: "退房出發・行李放上車",
                        tag: "退房出發",
                        detail: "Aile 飯店辦理退房，行李直接上車。早餐可於便利超商（Lawson / 7-11）採購飯糰咖啡隨車吃。",
                        mapQuery: "Hotel Aile Beppu"
                    },
                    {
                        time: "08:40 – 12:00",
                        label: "九州自然動物公園 (African Safari)",
                        tag: "人氣野生動物園",
                        detail: "自駕約 40 分鐘。搶搭 10:00 叢林巴士（Jungle Bus 一圈約 50 分鐘，近距離餵食獅子、大象）；**注意：若排隊人潮過多則果斷自駕開車入園（一圈約 30 分鐘，體驗同樣超震撼）**。",
                        mapQuery: "九州自然動物公園 アフリカンサファリ"
                    },
                    {
                        time: "12:00 – 13:30",
                        label: "午餐與看海：別府灣海景休息區 道の駅 たのうらら",
                        tag: "海景休息站",
                        food: "大分鄉土雞肉天婦羅定食、別府灣海鮮丼、在地特產蜜柑冰淇淋",
                        detail: "大分市神崎梶原1228-9。大分新落成海景休息站，設有美食廣場（11:00~21:00）與農產超市（9:00~16:00）。",
                        mapUrl: "https://www.walkerland.com.tw/subject/view/403993",
                        mapQuery: "道の駅 たのうらら"
                    },
                    {
                        time: "13:30 – 15:00",
                        label: "明礬湯之里溫泉 (Myoban Yunosato)",
                        tag: "國家無形文化遺產",
                        detail: "探訪國家指定無形民俗文化財「湯之花」茅草製造小屋，蒸氣瀰漫古意盎然，可順道體驗乳白色天然硫磺泉大露天風呂。",
                        mapUrl: "https://fupo.tw/blog/post/yunohana",
                        mapQuery: "明礬 湯の里"
                    },
                    {
                        time: "15:00 – 17:00",
                        label: "Workman Plus 別府店 採購機能衣物",
                        tag: "生活防寒購物",
                        detail: "日本高 CP 值機能戶外休閒服飾名店，在此採買防風外套、保暖長袖襯衫與戶外防寒用品。",
                        mapQuery: "ワークマンプラス 別府店"
                    },
                    {
                        time: "18:00",
                        label: "TOYOTA 租車（別府站前店）還車",
                        tag: "順利還車",
                        detail: "別府車站前店還車。還車前請記得在車站附近加油站加滿油。",
                        mapQuery: "Toyota Rent a Car Beppu Ekimae"
                    },
                    {
                        time: "18:15 – 18:35",
                        label: "搭乘電車移動至 JR 大分站",
                        tag: "電車交通",
                        detail: "從別府站搭乘 JR 日豐本線電車，約 10-12 分鐘即可直達大分站。",
                        mapQuery: "JR 別府駅"
                    },
                    {
                        time: "18:45",
                        label: "入住 大分 JR 九州 Blossom 飯店 Check-in",
                        tag: "頂級飯店入住",
                        detail: "JR 大分車站府內中央口（北口）出站右手邊 JR OITA CITY，搭電梯至 8 樓大廳辦理入住手續。Jolin 刷卡已付清（$8,099）。",
                        mapUrl: "https://yukigo.tw/jr-kyushu-hotel-blossom-oita/",
                        mapQuery: "JR Kyushu Hotel Blossom Oita"
                    },
                    {
                        time: "19:30 – 21:00",
                        label: "JR OITA CITY 百貨美食街晚餐",
                        tag: "晚餐美食",
                        detail: "與飯店共構的 AMU PLAZA 美食街，可品嚐大分拉麵、烏龍麵或黑毛和牛料理。",
                        mapQuery: "AMU PLAZA OITA"
                    },
                    {
                        time: "21:30",
                        label: "Blossom 頂樓 21F 天空之湯享受（必穿浴巾衣！）",
                        tag: "必備體驗",
                        detail: "⚠️ 提醒：客房穿浴袍至 20F 更衣室 ➔ 在樓梯口換穿專用「浴巾衣」前往 21F 露天風呂 ➔ 直接穿著浴巾衣入浴（防高樓透視） ➔ 回 20F 指定地點脫掉。",
                        mapQuery: "CITY SPA てんくう"
                    }
                ]
            },
            {
                date: "Day 4 ｜ 11/03 (星期二) ：夢幻仙境・由布院溫泉童話散策",
                stops: [
                    {
                        time: "08:30",
                        label: "出門・購買車站麵包",
                        tag: "出發早餐",
                        detail: "大分車站內麵包店採買熱騰騰現烤麵包與咖啡，準備帶上車悠閒享用。",
                        mapQuery: "JR 大分駅"
                    },
                    {
                        time: "09:22 – 10:29",
                        label: "搭乘 JR 久大本線前往由布院",
                        tag: "鐵道風光",
                        detail: "大分站出發 ➔ 由布院站（車程 1 小時 07 分），沿途窗外欣賞大分鄉村與秀麗山巒景致。",
                        mapQuery: "JR 久大本線 由布院駅"
                    },
                    {
                        time: "11:00 – 16:00",
                        label: "由布院溫泉小鎮全日散策：金鱗湖＆湯之坪街道",
                        tag: "精華散步",
                        food: "由布まぶし 心（豐後牛釜飯一鍋三吃）、拉麵 侍 (Samurai)、金賞可樂餅、B-Speak 蛋糕捲",
                        detail: "漫遊童話感十足的 Yufuin Floral Village、金鱗湖湖畔倒影、品嚐由布院代表性特色美食。回程搭車前可至由布院車站足湯稍作歇息。",
                        mapQuery: "由布院 金鱗湖"
                    },
                    {
                        time: "16:01 – 17:01",
                        label: "搭乘 JR 電車返回大分車站",
                        tag: "返程交通",
                        detail: "由布院 16:01 出發 ➔ 17:01 抵達大分站（府內中央口出站）。備案：若錯過電車，可至由布院站前巴士中心搭乘龜之井巴士往別府轉電車。",
                        mapQuery: "JR 由布院駅"
                    },
                    {
                        time: "17:30 – 19:00",
                        label: "居酒屋晚餐：魚処 ちどり丸 大分 (Chidorimaru)",
                        tag: "必吃在地海鮮",
                        food: "大分名物琉球生魚片漬（りゅうきゅう）、豐後水道特產關鯖魚／關竹莢魚、炸雞天婦羅（とり天）",
                        detail: "大分県大分市府内町1-1-15 府内センタービル 1F（JR 大分站步行 3 分鐘）。電話：097-534-6711。營業時間：17:30～23:00 (L.O. 22:30)。",
                        mapQuery: "魚処 ちどり丸 大分"
                    },
                    {
                        time: "19:00 – 20:30",
                        label: "AMU PLAZA OITA 百貨 ＆ 確認明日機場巴士",
                        tag: "逛街踏勘",
                        detail: "逛 AMU PLAZA 百貨（平日營業至 20:30）。**關鍵踏勘：過馬路到大分站府內中央口「1 號月台」實地查看明日往機場巴士班次時刻表與自動售票機位置**。",
                        mapUrl: "https://yukigo.tw/oita-hello-kitty-airport/",
                        mapQuery: "大分駅前 バスのりば 1番"
                    },
                    {
                        time: "21:00",
                        label: "享受 Blossom 頂樓 21F 天空露天風呂 ＆ 19F 桑拿岩盤浴",
                        tag: "頂級放鬆",
                        detail: "體驗 19 樓乾桑拿、冷感 SPA 與岩盤浴（約 500 日圓），再穿著浴巾衣上 21 樓俯瞰大分繁華夜景入浴。",
                        mapQuery: "CITY SPA てんくう"
                    }
                ]
            },
            {
                date: "Day 5 ｜ 11/04 (星期三) ：大分市漫步 ➔ 機場最後衝刺 ➔ 溫暖的家",
                stops: [
                    {
                        time: "08:30 – 10:00",
                        label: "享用 Blossom 飯店和洋百匯早餐",
                        tag: "星級早餐",
                        food: "大分在地鮮蔬沙拉、豐後牛咖哩、現做蛋料理、特色日式小菜",
                        detail: "於飯店餐廳加購享用精緻早餐，採光通透明亮、俯瞰大分街景。",
                        mapQuery: "JR Kyushu Hotel Blossom Oita"
                    },
                    {
                        time: "11:00",
                        label: "退房辦理 Check-out",
                        tag: "退房寄存",
                        detail: "退房並將行李寄放在飯店櫃台，輕裝前往車站與百貨商場逛街。",
                        mapQuery: "JR Kyushu Hotel Blossom Oita"
                    },
                    {
                        time: "11:30 – 13:00",
                        label: "JR OITA CITY / AMU PLAZA 最後採買與午餐",
                        tag: "市區午餐",
                        detail: "享用大分在地美食午餐，做最後市區購物採買。",
                        mapQuery: "AMU PLAZA OITA"
                    },
                    {
                        time: "13:17 – 14:17",
                        label: "搭乘機場巴士直達大分機場",
                        tag: "機場接駁",
                        detail: "從大分站 1 號月台搭乘機場特急巴士（車程約 1 小時），預計 14:17 抵達大分機場（最遲須於 14:30 前抵達）。",
                        mapQuery: "大分駅前 バスのりば 1番"
                    },
                    {
                        time: "14:30 – 16:00",
                        label: "大分機場漫遊：國內線 2F 買名產 ＆ 免費足湯體驗",
                        tag: "重要購物叮嚀",
                        food: "大分銘菓「ざびえる」(Xavier) 奶油夾心餅、蜜柑點心、香菇脆片、大分燒酎",
                        detail: "【重要提醒】**大分機場國際線候機室內沒有免稅店！所有伴手禮與伴手禮點心必須在出境前的「國內線 2 樓」全部買好！** 機場外還有免費天然溫泉足湯、3 樓景觀展望台與飛行模擬機。",
                        mapQuery: "大分空港 國內線"
                    },
                    {
                        time: "16:30 – 18:10",
                        label: "台灣虎航起飛返台 (IT)",
                        tag: "平安歸賦",
                        detail: "大分 16:30 起飛 ➔ 預計 18:10 平安抵達桃園國際機場第一航廈，結束滿載美好回憶的大分溫泉五日之旅！",
                        mapQuery: "桃園國際機場第一航廈"
                    }
                ]
            }
        ]
    },

    // 特色美食推薦
    food: {
        categories: [
            {
                title: "別府人氣排隊必吃",
                icon: "🍤",
                items: [
                    {
                        name: "天丼 とよ常 本店 (Toyotsune)",
                        tag: "排隊名店",
                        specialty: "特上炸蝦天丼（四尾酥脆大蝦配上傳承半世紀的甘醇醬汁）、地獄天丼、大分鄉土生魚片",
                        note: "距離 Aile 飯店僅 2 分鐘步程。營業時間 11:00~21:00 (L.O. 20:00，週二、三公休)。",
                        address: "大分県別府市北浜2-12-24",
                        mapUrl: "https://www.bigfang.tw/blog/post/toyotsune-beppu",
                        mapQuery: "天丼 とよ常 本店"
                    },
                    {
                        name: "岡本屋売店 (Okamotoya)",
                        tag: "百年地獄蒸",
                        specialty: "元祖地獄蒸布丁（焦糖苦甘香濃）、溫泉蛋烏龍麵、地獄蒸雞蛋三明治、酥炸雞肉天婦羅",
                        note: "營業時間 08:30-18:30，別府明礬溫泉人氣第一的甜點名店，Mapcode：46 519 707*71。",
                        address: "大分県別府市明礬3組",
                        mapQuery: "岡本屋売店"
                    },
                    {
                        name: "大衆焼肉 もっちゃん (Mocchan)",
                        tag: "高CP值燒肉",
                        specialty: "黑毛和牛五花肉、極上厚切牛舌、多汁橫膈膜、大分冷麵",
                        note: "別府在地人私藏的大眾炭火燒肉，肉質超值豐厚，氣氛熱鬧。",
                        address: "大分県別府市元町6-15",
                        mapQuery: "大衆焼肉 もっちゃん 別府"
                    },
                    {
                        name: "樂雅樂 Royal Host 別府北濱店",
                        tag: "海景晨光早餐",
                        specialty: "日式烤鮭魚晨間套餐、經典洋風牛肉漢堡排厚鬆餅拼盤、現煮研磨咖啡",
                        note: "位於別府北濱巴士站旁，面對蔚藍別府灣，採光舒適寬敞。",
                        address: "大分県別府市北浜2-9-1",
                        mapUrl: "https://ffuyue.pixnet.net/blog/posts/841303199735420936",
                        mapQuery: "Royal Host Beppu Kitahama"
                    }
                ]
            },
            {
                title: "日田名物＆海景休息站",
                icon: "🥢",
                items: [
                    {
                        name: "燒そば 想夫恋 總店 (Sofuren)",
                        tag: "日田炒麵創始",
                        specialty: "正宗日田鐵板焦脆炒麵（將生麵煎至金黃焦香，再佐以清脆豆芽與豬肉條，口感外脆內軟香氣逼人）",
                        note: "大分県日田市若宮町416-1，電話：+81-973-24-3188，營業時間 11:00-21:30。",
                        address: "大分県日田市若宮町416-1",
                        mapUrl: "https://www.bigfang.tw/blog/post/sofuren-main-oita",
                        mapQuery: "焼そばの想夫恋 総本店"
                    },
                    {
                        name: "道の駅 たのうらら (Tanourara)",
                        tag: "別府灣海景休息站",
                        specialty: "大分名產とり天（雞肉天婦羅）、海景美食廣場特製海鮮麵、大分縣產蜜柑霜淇淋",
                        note: "地址：大分市大字神崎字梶原1228-9，電話：097-529-7301。美食廣場 11:00~21:00、超市 09:00~16:00。",
                        address: "大分市大字神崎字梶原1228-9",
                        mapUrl: "https://www.walkerland.com.tw/subject/view/403993",
                        mapQuery: "道の駅 たのうらら"
                    }
                ]
            },
            {
                title: "大分市區居酒屋＆由布院美食",
                icon: "🍶",
                items: [
                    {
                        name: "魚処 ちどり丸 大分 (Chidorimaru)",
                        tag: "地魚居酒屋",
                        specialty: "琉球醃生魚片（りゅうきゅう）、豐後水道關竹莢魚／關鯖魚刺身、炭烤大分地雞",
                        note: "JR 大分站步行 3 分鐘，大分市府內町1-1-15。電話：097-534-6711。營業時間 17:30～23:00 (L.O. 22:30)。",
                        address: "大分県大分市府内町1-1-15 府内センタービル 1F",
                        mapQuery: "魚処 ちどり丸 大分"
                    },
                    {
                        name: "由布まぶし 心 (Yufumabushi Shin)",
                        tag: "由布院招牌",
                        specialty: "豐後牛地雞鰻魚釜飯三吃（原味品嚐 ➔ 搭配漬物柚子胡椒 ➔ 注入特製高湯做成茶泡飯）",
                        note: "由布院站前店與金鱗湖本店皆有店面，由布院人氣首選。",
                        address: "大分県由布市湯布院町川北5-3",
                        mapQuery: "由布まぶし 心 駅前店"
                    },
                    {
                        name: "拉麵 侍 (Ramen Samurai Yufuin)",
                        tag: "濃郁拉麵",
                        specialty: "豚骨黑麻油拉麵、侍特製叉燒拉麵、特製一口煎餃",
                        note: "湯頭濃醇回甘，逛由布院街區時補充熱量的好去處。",
                        address: "大分県由布市湯布院町川上3056-2",
                        mapQuery: "ラーメン 侍 由布院"
                    }
                ]
            }
        ]
    },

    // 費用分攤與記帳整理
    expenses: [
        {
            item: "別府溫泉飯店 Aile飯店 (2晚)",
            payer: "小杰 刷卡",
            amountTWD: 8754,
            detail: "NT$ 8,625 + 國外刷卡手續費 $129",
            status: "已扣款完成"
        },
        {
            item: "大分 JR 九州 Blossom 飯店 (2晚)",
            payer: "Jolin 刷卡",
            amountTWD: 8099,
            detail: "NT$ 7,979 + 國外刷卡手續費 $120",
            status: "7/1 已完成扣款"
        },
        {
            item: "TOYOTA 租車（別府站前店）",
            payer: "當天現場付",
            amountJPY: 31570,
            detail: "預約日期 9/6，11/1 09:30 取車至 11/2 18:00 還車",
            status: "取車當日付清 (約 NT$ 6,945)"
        },
        {
            item: "大分機場巴士 Airliner（去程）",
            payer: "個人感應 Suica",
            amountJPY: 1600,
            detail: "大分機場 ➔ 別府北濱站 (每人 1,600 日圓)",
            status: "現場西瓜卡感應"
        },
        {
            item: "JR 久大本線（大分 ➔ 由布院往返）",
            payer: "現場購票/IC",
            amountJPY: 1900,
            detail: "單程約 950 日圓 / 來回約 1,900 日圓",
            status: "現場刷卡或購票"
        },
        {
            item: "大分機場特急巴士（回程）",
            payer: "現場自動售票機",
            amountJPY: 1600,
            detail: "JR 大分站 1 號月台 ➔ 大分機場 (每人 1,600 日圓)",
            status: "現場自動售票機"
        }
    ],

    // 旅行重要提示與行前須知
    tips: [
        {
            icon: "✈️",
            title: "大分機場伴手禮關鍵提醒",
            desc: "【超級重要】大分機場的「國際線出境候機室」內沒有免稅商店！任何大分銘菓（如ざびえる Xavier 餅乾、蜜柑點心、香菇餅乾、伴手禮拉麵等）請務必在通關前於「國內線 2 樓」商場一次購齊！"
        },
        {
            icon: "♨️",
            title: "大分 Blossom 21F 天空之湯穿衣規定",
            desc: "前往 21 樓露天大浴場前，請務必在 20 樓樓梯旁換穿專用「浴巾衣」，並『直接穿著浴巾衣』入池！切勿在 21 樓裸身泡湯，以免被附近高樓看見。20 樓室內湯則為正常裸湯。"
        },
        {
            icon: "🚌",
            title: "機場巴士 Airliner 乘車訣竅",
            desc: "去程（機場至別府北濱）上下車均可感應 Suica 西瓜卡或 iPhone Apple Pay 交通卡；回程在大分站出發請提前在大分站 1 號月台旁自動售票機購票。"
        },
        {
            icon: "🦁",
            title: "九州野生動物園 (African Safari) 攻略",
            desc: "首選搭乘 10:00 的叢林巴士（Jungle Bus）親手餵食獅子與大象；若人潮太多排隊過長，請果斷改由自駕開車入園（一圈約 30 分鐘，一樣能超近距離看動物）。"
        },
        {
            icon: "🚗",
            title: "自駕取還車注意",
            desc: "別府站前 TOYOTA 租車取車時間為 11/1 09:30，還車時間為 11/2 18:00。取車請帶台灣駕照＋日文譯本＋護照。還車前請於別府車站周邊加滿油。"
        },
        {
            icon: "👓",
            title: "youme Town 別府店配眼鏡",
            desc: "1 樓有 OWNDAYS，營業至 21:00，一般鏡片約 20-30 分鐘可取件，適合第一天抵達後先驗光配鏡，順便逛 2F/3F 的 GU 與 UNIQLO。"
        }
    ],

    // 互動地圖地標點位 (精確經緯度)
    mapData: {
        center: [33.2794, 131.5036], // 別府/大分交界中心
        zoom: 11,
        hotelName: "別府溫泉飯店 Aile飯店",
        places: [
            // 飯店
            {
                name: "別府溫泉飯店 Aile飯店 (Hotel Aile Beppu)",
                category: "hotel",
                categoryLabel: "10/31-11/02 住宿",
                icon: "🏨",
                lat: 33.2803,
                lng: 131.5056,
                specialty: "頂樓別府灣海景露天溫泉風呂、出門即是北濱巴士站",
                note: "小杰已刷卡（$8,754）。步行至天丼とよ常2分鐘、youme Town 5分鐘。",
                address: "大分県別府市北浜2-14-35",
                mapQuery: "Hotel Aile Beppu"
            },
            {
                name: "大分 JR 九州 Blossom 飯店",
                category: "hotel",
                categoryLabel: "11/02-11/04 住宿",
                icon: "🏨",
                lat: 33.2327,
                lng: 131.6067,
                specialty: "頂樓 21F 天空之湯露天大浴場（須穿浴巾衣入浴）、直通 AMU PLAZA",
                note: "Jolin 7/1 已刷卡（$8,099）。大廳位於 8 樓，JR 大分站北口出站右手邊即達。",
                address: "大分県大分市要町1-14",
                mapQuery: "JR Kyushu Hotel Blossom Oita"
            },
            // 機場與交通節點
            {
                name: "大分機場 (OIT)",
                category: "transport",
                categoryLabel: "交通門戶",
                icon: "✈️",
                lat: 33.6823,
                lng: 131.7375,
                specialty: "免費足湯、1F 按摩、3F 展望台與飛行模擬機",
                note: "重要提醒：國際線無免稅店，伴手禮須在出境前於國內線 2F 買齊！",
                address: "大分県国東市安岐町下原13",
                mapQuery: "大分空港"
            },
            {
                name: "別府北濱巴士站 (Beppu Kitahama)",
                category: "transport",
                categoryLabel: "機場巴士站",
                icon: "🚌",
                lat: 33.2801,
                lng: 131.5048,
                specialty: "大分機場特急巴士 Airliner 下車處",
                note: "位於 Royal Host 餐廳旁，正對面就是 Aile 飯店，可刷 Suica。",
                address: "大分県別府市北浜2丁目",
                mapQuery: "別府北浜バス停"
            },
            {
                name: "TOYOTA 租車 別府站前店",
                category: "transport",
                categoryLabel: "租車取還",
                icon: "🚗",
                lat: 33.2796,
                lng: 131.5015,
                specialty: "11/1 09:30 取車，11/2 18:00 還車",
                note: "費用 31,570 日圓現場付。別府車站東口步行約 10 分鐘。",
                address: "大分県別府市駅前町12-14",
                mapQuery: "Toyota Rent a Car Beppu Ekimae"
            },
            {
                name: "JR 大分站 1號機場巴士月台",
                category: "transport",
                categoryLabel: "回程搭車",
                icon: "🚏",
                lat: 33.2333,
                lng: 131.6062,
                specialty: "直達大分機場的機場巴士發車站",
                note: "位於府內中央口（北口）過馬路 1 號月台，站牌旁有自動售票機。",
                address: "大分県大分市要町1",
                mapQuery: "大分駅前 バス1番のりば"
            },
            {
                name: "JR 由布院站",
                category: "transport",
                categoryLabel: "鐵道車站",
                icon: "🚉",
                lat: 33.2624,
                lng: 131.3553,
                specialty: "由布院溫泉門戶、站前巴士中心、車站足湯",
                note: "JR 久大本線終停站，出站即為由布院熱鬧街區。",
                address: "大分県由布市湯布院町川北8-2",
                mapQuery: "由布院駅"
            },
            // 美食名店
            {
                name: "天丼 とよ常 本店",
                category: "restaurant",
                categoryLabel: "排隊名店",
                icon: "🍤",
                lat: 33.2818,
                lng: 131.5046,
                specialty: "特上海老天丼、地獄天丼、大分新鮮刺身",
                note: "營業時間 11:00~21:00 (L.O. 20:00，週二三公休)。步行至 Aile 飯店 2 分鐘。",
                address: "大分県別府市北浜2-12-24",
                mapQuery: "天丼 とよ常 本店"
            },
            {
                name: "燒そば 想夫恋 總店",
                category: "restaurant",
                categoryLabel: "日田名物",
                icon: "🥢",
                lat: 33.3138,
                lng: 130.9419,
                specialty: "正宗日田焦脆炒麵創始店，麵條酥脆內軟多汁",
                note: "營業時間 11:00-21:30。電話：+81-973-24-3188。",
                address: "大分県日田市若宮町416-1",
                mapQuery: "焼そばの想夫恋 総本店"
            },
            {
                name: "岡本屋売店 (地獄蒸布丁)",
                category: "restaurant",
                categoryLabel: "人氣甜點",
                icon: "🍮",
                lat: 33.3142,
                lng: 131.4580,
                specialty: "元祖地獄蒸布丁、地獄蒸蛋三明治、溫泉蛋烏龍麵",
                note: "營業時間 08:30-18:30，Mapcode：46 519 707*71。",
                address: "大分県別府市明礬3組",
                mapQuery: "岡本屋売店"
            },
            {
                name: "大衆焼肉 もっちゃん",
                category: "restaurant",
                categoryLabel: "在地燒肉",
                icon: "🥩",
                lat: 33.2783,
                lng: 131.5035,
                specialty: "黑毛和牛五花、厚切牛舌、極上橫膈膜、冷麵",
                note: "別府高人氣平價美味大眾燒肉，肉質極佳。",
                address: "大分県別府市元町6-15",
                mapQuery: "大衆焼肉 もっちゃん 別府"
            },
            {
                name: "樂雅樂 Royal Host 別府北濱店",
                category: "restaurant",
                categoryLabel: "晨光早餐",
                icon: "🍳",
                lat: 33.2805,
                lng: 131.5053,
                specialty: "日式烤鮭魚定食、洋風鬆餅漢堡排早餐",
                note: "北濱巴士站旁，Aile 飯店正對面，窗外享海景。",
                address: "大分県別府市北浜2-9-1",
                mapQuery: "Royal Host Beppu Kitahama"
            },
            {
                name: "魚処 ちどり丸 大分",
                category: "restaurant",
                categoryLabel: "海鮮居酒屋",
                icon: "🐟",
                lat: 33.2343,
                lng: 131.6095,
                specialty: "琉球醃生魚片、關鯖魚、關竹莢魚、大分地雞とり天",
                note: "JR 大分站步行 3 分鐘。營業時間 17:30～23:00 (L.O. 22:30)。",
                address: "大分県大分市府内町1-1-15 府内センタービル 1F",
                mapQuery: "魚処 ちどり丸 大分"
            },
            {
                name: "由布まぶし 心 (駅前店)",
                category: "restaurant",
                categoryLabel: "由布院名物",
                icon: "🍚",
                lat: 33.2635,
                lng: 131.3562,
                specialty: "豐後牛地雞鰻魚釜飯三吃",
                note: "由布院車站步行 1 分鐘，超人氣排隊名店。",
                address: "大分県由布市湯布院町川北5-3",
                mapQuery: "由布まぶし 心 駅前店"
            },
            // 景點與溫泉
            {
                name: "灶地獄 (かまど地獄)",
                category: "spot",
                categoryLabel: "地獄溫泉",
                icon: "♨️",
                lat: 33.3155,
                lng: 131.4746,
                specialty: "1~6 丁目不同泉質奇景、地獄蒸足湯、飲泉體驗",
                note: "營業時間 08:00–17:00。別府地獄代表景點之一。",
                address: "大分県別府市鉄輪621",
                mapQuery: "かまど地獄"
            },
            {
                name: "海地獄 (Umi Jigoku)",
                category: "spot",
                categoryLabel: "國家指定名勝",
                icon: "🌊",
                lat: 33.3158,
                lng: 131.4697,
                specialty: "鈷藍色如海般的滾燙溫泉、大鬼蓮溫泉池、地獄蒸布丁",
                note: "別府地獄規模最大、景致最震撼的國指定名勝。",
                address: "大分県別府市鉄輪559-1",
                mapQuery: "海地獄"
            },
            {
                name: "日田豆田町復古老街",
                category: "spot",
                categoryLabel: "九州小京都",
                icon: "🏮",
                lat: 33.3259,
                lng: 130.9388,
                specialty: "江戶時代白壁土藏街屋、杉木木屐、醬油釀造老店",
                note: "自駕停車建議停放於「豆田港町駐車場」。",
                address: "大分県日田市豆田町",
                mapQuery: "豆田町商店街"
            },
            {
                name: "九州自然動物公園 (African Safari)",
                category: "spot",
                categoryLabel: "野生動物園",
                icon: "🦁",
                lat: 33.3444,
                lng: 131.3968,
                specialty: "叢林巴士餵食獅子大象（約50分鐘）、自駕開車巡遊園區",
                note: "推薦搶搭 10:00 叢林巴士；若人多排隊太長可直接自駕開車入園。",
                address: "大分県宇佐市安心院町南畑2-1755-1",
                mapQuery: "九州自然動物公園 アフリカンサファリ"
            },
            {
                name: "道の駅 たのうらら (海景休息區)",
                category: "spot",
                categoryLabel: "海景休憩",
                icon: "🌅",
                lat: 33.2562,
                lng: 131.5543,
                specialty: "臨別府灣新穎休息站、在地農特產超市與海景美食廣場",
                note: "超市 09:00~16:00，美食街 11:00~21:00。停車空間大。",
                address: "大分県大分市神崎梶原1228-9",
                mapQuery: "道の駅 たのうらら"
            },
            {
                name: "明礬 湯之里 (Myoban Yunosato)",
                category: "spot",
                categoryLabel: "湯之花茅草屋",
                icon: "🌾",
                lat: 33.3154,
                lng: 131.4556,
                specialty: "國家無形民俗文化財「湯之花」茅草屋技術、乳白硫磺溫泉",
                note: "免費參觀製造小屋，亦可購買純天然藥用湯之花入浴劑。",
                address: "大分県別府市明礬温泉6組",
                mapQuery: "明礬 湯の里"
            },
            {
                name: "由布院 金鱗湖 (Lake Kinrin)",
                category: "spot",
                categoryLabel: "湖畔仙境",
                icon: "🦆",
                lat: 33.2662,
                lng: 131.3687,
                specialty: "清水與溫泉匯聚的夢幻湖泊、水上鳥居與晨霧絕景",
                note: "周邊有森林步道、特色咖啡館與天祖神社。",
                address: "大分県由布市湯布院町川上1561-1",
                mapQuery: "由布院 金鱗湖"
            },
            // 購物點位
            {
                name: "youme Town 別府店",
                category: "market",
                categoryLabel: "大型商場",
                icon: "🛍️",
                lat: 33.2737,
                lng: 131.5074,
                specialty: "1F OWNDAYS配眼鏡、超市；2F 大創、GU；3F UNIQLO",
                note: "營業時間 09:30-21:00。距 Aile 飯店步行僅 5 分鐘。",
                address: "大分県別府市楠町382-7",
                mapQuery: "youme Town Beppu"
            },
            {
                name: "別府站前一丁目商店街",
                category: "market",
                categoryLabel: "車站商圈",
                icon: "🏪",
                lat: 33.2796,
                lng: 131.5002,
                specialty: "別府車站伴手禮街、在地柚子胡椒、香菇製品",
                note: "車輛可停 TIMES 停車場別府站東口。",
                address: "大分県別府市駅前町",
                mapQuery: "別府駅前一丁目商店街"
            },
            {
                name: "MEGA 唐吉訶德 別府店",
                category: "market",
                categoryLabel: "深夜藥妝雜貨",
                icon: "🐧",
                lat: 33.2982,
                lng: 131.5011,
                specialty: "營業至深夜 02:00，長袖襯衫、藥妝零食生活雜貨",
                note: "設有大型專用停車場，適合自駕採購。",
                address: "大分県別府市汐見町7-24",
                mapQuery: "MEGAドン・キホーテ 別府店"
            },
            {
                name: "Workman Plus 別府店",
                category: "market",
                categoryLabel: "戶外機能服飾",
                icon: "🧥",
                lat: 33.3129,
                lng: 131.4988,
                specialty: "高 CP 值防風保暖長袖外套、戶外休閒衣物",
                note: "自駕停車方便，添購防寒好物首選。",
                address: "大分県別府市石垣東10-1-31",
                mapQuery: "ワークマンプラス 別府店"
            },
            {
                name: "AMU PLAZA OITA 百貨公司",
                category: "market",
                categoryLabel: "車站共構百貨",
                icon: "🏬",
                lat: 33.2327,
                lng: 131.6067,
                specialty: "與 JR 大分站及 Blossom 飯店共構，美食街、超市、時裝",
                note: "營業時間：一至四 10:00~20:30，五至日及祝日 10:00~21:00。",
                address: "大分県大分市要町1-14",
                mapQuery: "AMU PLAZA OITA"
            }
        ]
    }
};
