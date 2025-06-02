// 全域變數來儲存解析後的歌曲資料
let performancesData = {};

// --- 內嵌的歌單內容 ---
// 請將您的 song_list.txt 檔案的完整內容，貼到下方三引號之間
// 範例：
// const EMBEDDED_SONG_LIST_CONTENT = `
// 2023-01-01 現場表演 https://www.youtube.com/watch?v=YOUR_VIDEO_ID`。2
// 00:05 歌曲A
// 01:30 歌曲B
// 02:45 歌曲C
//
// 2023-01-15 補錄 https://www.youtube.com/watch?v=YOUR_VIDEO_ID`。3
// 00:10 歌曲D
// 01:00 歌曲A
// # 這是註解
// 03:00 歌曲E
// `;
// 請確保您的 YouTube 連結是真實有效的！
const EMBEDDED_SONG_LIST_CONTENT = `
第1次 https://youtu.be/y_nuffqSh3c
0:00 心牆
2:05 下一個天亮
4:09 含淚跳恰恰
5:52 秋雨彼一暝
8:37 心狠手辣
10:34 夢中的情話

第2次 https://youtu.be/ZL9VtkxKBuI
00:01 愛情的騙子我問你
4:02 愛情限時批
5:28 我不要
9:38 DNA
13:35 365天
14:51 1/2
19:15 月牙灣
24:27 傻呆呆
25:46 有沒有
27:11 沒理由
28:30 星火
30:48 lydia
35:06 特務J
38:26 不曾回來過
40:15 是我不夠好
43:40 秋雨彼一暝
45:18 合唱超好的部分
48:58 塵埃
53:51 含淚跳恰恰
57:19 王見王
59:16 倒數
1:00:51 不應該勇敢
1:04:29 精彩part
身旁黏著甩不開的悲哀
1:05:47 幸福就好
1:07:38 過得去
1:09:47 不哭
1:13:40 靚仔
1:16:30 下雨天
1:20:53 卡路里
1:24:40 夠愛
1:29:40 chillaxing
1:30:58 分手說愛你
1:35:49 心狠手辣
1:40:30 勢在必行
1:44:52 心裡的孩子
1:47:52 心牆
1:52:28 下一個天亮
1:57:08 你眼中的我
2:01:35 在樹上唱歌
2:05:55 傷心酒店
2:10:13 夠不著的你
2:12:05 返來阮身邊
2:13:59 粉筆和塗鴉
2:16:25 曖昧
2:17:28 雨愛
2:19:15 前面路口停
2:23:23 我不離開
2:27:28 是他不配
2:31:31 手掌心
2:32:57 不過失去了一點點
2:34:57 你說她
2:37:17 說實話
2:38:23 手心的薔薇
2:42:43 雨蝶
2:44:03 風中的承諾
2:46:19 夢中的情話
2:50:37 分手後不要做朋友
2:55:00 年輪說
2:57:00 怎麼還不愛
3:01:19 半醉半清醒

第3次 https://youtu.be/d9--rBcJVtE
00:00 DNA
3:36 追追追
8:38 雨蝶
12:25 從未到過的地方
16:20 過得去
21:26 雙面妲己
25:30 卡路里
29:47 特務J
32:40 雨愛
37:47 不應該勇敢  
41:38 身旁黏著甩不開的悲哀  
42:47 不曾回來過  
47:26 月牙灣
52:48 1/2  
56:58 塵埃  
1:01:43 我不要  
1:05:35 有沒有  
1:09:47 lydia  
1:13:53 365天  
1:17:57 夠不著的你  
1:22:20 趕快愛  
1:26:34 愛情騙子我問你  
1:31:06 星火  
1:36:10 阿潘：下雨天  
1:40:33 下雨天  
1:45:18 沒理由  
1:49:06 不哭  
1:53:50 辣妹駕到  
1:56:52 心狠手辣  
2:01:46 是我不夠好  
2:05:29 返來阮身邊  
2:09:25 分手說愛你  
2:13:59 靚仔  
2:18:06 睫毛彎彎  
2:21:24 怎麼還不愛  
2:26:23 夠愛  
2:31:26 我不離開  
2:35:41 心牆  
2:40:04 在樹上唱歌  
2:44:33 下一個天亮  
2:49:12 你眼中的我  
2:54:04 練習愛情  
2:58:35 心裡的孩子  
3:01:45 粉筆和塗鴉  
3:06:29 秋雨彼一暝  
3:11:50 含淚跳恰恰  
3:15:03 傷心酒店  
3:19:15 半醉半清醒  
3:23:18 雨季  
3:24:48 我才沒有那樣呢  
3:29:28 多年後  
3:34:02 幸福就好  
3:37:56 說實話  
3:43:56 失憶的金魚  
3:45:48 心花開  
3:49:00 年輪說  
3:52:53 往事隨風
3:54:24 心電心  
3:55:51 不解釋親吻  
3:57:38 女孩站出來  
3:59:18 手心的薔薇  
4:04:13 等待愛  
4:05:42 分手後不要做朋友  
4:10:13 李白  
4:12:32 模特  
4:14:36 夢中的情話

第3次 補錄 https://youtu.be/9iv4yWvFYD0
0:00 半夢半清醒
1:52 雨季

第4次 https://youtu.be/23HGs7q399E
0:00 start
5:39 DNA
9:19 是我不夠好
13:08 心裡的孩子
16:28 從未到過的地方
20:13 分手後不要做朋友
24:46 卡路里
29:06 月牙灣
34:02 雨蝶
37:47 lydia
41:57 雨愛
46:25 星火
51:35 往事隨風
53:48 chillaxing
57:56 夠不著的你
1:02:03 我不要
1:06:11 前面路口停
1:11:02 睫毛彎彎
1:14:35 怎麼還不愛
1:19:47 雙面妲己
1:23:43 有沒有
1:28:01 雨季
1:32:55 不應該勇敢
1:34:11 甩不開的悲哀
1:36:07 甩不開的悲哀(你喜歡的)
1:36:31 甩不開的悲哀(高音)
1:37:43 不解釋親吻
1:41:45 下雨天
1:46:29 沒理由
1:50:15 匿名的好友
1:54:38 我不離開
1:58:49 曖昧
1:59:27 夠愛
2:04:36 過得去
2:09:43 年輪說
2:14:17 愛情騙子我問你
2:18:53 心狠手辣
2:23:38 秋雨彼一暝
2:28:53 雲中月圓
2:33:19 傷心酒店
2:37:38 含淚跳恰恰
2:40:58 半醉半清醒
2:45:25 沒有你的明天
2:47:16 辣妹駕到
2:48:43 不哭
2:53:05 靚仔
2:56:59 特務J
3:00:03 心牆
3:04:15 你眼中的我
3:09:02 下一個天亮
3:13:53 在樹上唱歌
3:17:48 粉筆和塗鴉

第4次-2 https://youtu.be/TXyMLCc83jQ
3:13 練習愛情
8:17 亞特蘭提斯
11:47 1/2
15:53 幸福就好
19:19 是他不配
23:35 即溶愛人
27:01 365天
30:45 手掌心
32:45 那不是雪中紅
34:05 愛存在
38:18 hey boy
39:03 愛不需要裝乖
42:50 追追追
44:53 心電心
46:20 再出發
47:47 baby boy
49:10 返來我身邊
53:20 手心的薔薇
58:15 失憶的金魚
1:00:02 不該
1:02:20 分手說愛你
1:04:08 ？
1:05:01 魔鬼中的天使
1:06:37 失戀無罪
1:08:25 夢中的情話

第5次 https://youtu.be/BJB5rPzZhck
4:45 臉盲症
8:07 雙面妲己
14:28 沒有你的明天
16:35 往事隨風
16:56 從未到過的地方
20:58 心裡的孩子
24:13 是我不夠好
27:59 卡路里
31:55 lydia
36:01 亞特蘭提斯
39:55 月牙灣
45:13 特務J
48:48 星火
53:58 靚仔
57:28 過得去
1:02:44 怎麼還不愛
1:03:27 阿伯現身


第6次(SHE) https://youtu.be/kePfepN6zoA
0:13 super star
4:08 眉飛色舞
5:25 卡路里
9:18 不醉不會
13:15 多遠都要在一起
16:58 不解釋親吻
21:25 只對你有感覺
25:29 靚仔
28:57 DNA
32:43 心裡的孩子
35:55 手掌心
37:39 心狠手辣
42:26 輕輕
46:22 倒數
50:31 怎麼還不愛
55:45 是我不夠好
59:15 I'm Not Yours
1:03:52 雨蝶
1:07:03 愛不需要裝乖
1:11:48 年輪說
1:16:11 月牙灣
1:21:00 雨季
1:26:22 大藝術家
1:29:50 lydia
1:33:46 魔鬼中的天使
1:37:45 愛存在
1:42:07 有一種悲傷
1:46:12 秋雨彼一暝
1:51:06 手心的薔薇
1:56:19 夢中的情話
2:01:06 星火
2:03:11 光年之外
2:07:06 下雨天

第7次 https://youtu.be/yNzpqqKSPDM
0:07 DNA
3:46 愛情的騙子我問你
8:19 我不要
12:27 月牙灣
17:20 lydia
21:49 星火
26:55 1/2
30:58 追追追
33:01 怎麼還不愛
37:15 從未到過的地方
41:12 心牆
45:27 失憶的金魚
50:38 下一個天亮
55:32 年輪說
57:33 雨季
1:02:19 你眼中的我
1:06:26 在樹上唱歌
1:10:02 愛存在
1:14:14 雲中月圓
1:18:33 傷心酒店
1:22:36 下雨天
1:26:26 雨蝶
1:27:53 我不離開
1:32:08 夠愛
1:36:53 夢中的情話

第8次 https://youtu.be/6F64q6443XI
2:14 Mr.Q
3:16 秋雨彼一暝 
8:18 傷心酒店
11:15 怎麼辦
13:23 星火
18:31 雨季
23:15 我不離開
27:31 愛存在
32:02 下雨天
33:40 夠愛
38:28 是他不配
42:37 夢中的情話
47:02 粉筆和塗鴉

第9次 https://youtu.be/_pUO5yR2J5w
0:00 標準美
2:59 來追我男友吧
4:13 Fairy Temple
5:35 粉紅炸彈
8:47 Boom Cha Cha La Ka
10:16 女皇
13:33 You're Out
14:56 別再欺騙我的愛
18:33 告訴你一個秘密
20:04 馬可波羅
21:25 SUPER
22:21 雨傘還你
22:39 開口說你愛我
24:20 珍珠美人魚1
26:13 珍珠美人魚2
26:46 珍珠美人魚3
28:29 珍珠美人魚4
30:13 珍珠美人魚5
30:24 珍珠美人魚6
32:15 珍珠美人魚7
33:42 黑暗的巴洛克
38:14 不哭
42:24 心裡的孩子
43:57 心花開
45:30 從未到過的地方
47:03 1/2
50:59 DNA
54:43 月牙灣
59:59 lydia
1:03:21 星火
1:08:24 怎麼還不愛
1:12:36 彩虹的約定
1:13:58 聽見下雨的聲音
1:18:54 我會在你身邊
1:21:05 不解釋親吻
1:25:08 雨愛
1:27:18 亞特蘭提斯
1:31:04 年輪說
1:34:52 夠不著的你
1:36:57 雨蝶
1:38:26 愛存在
1:42:58 雨季
1:47:24 我不離開
1:51:27 心牆
1:55:06 下一個天亮
1:59:55 你眼中的我
2:04:16 在樹上唱歌
2:08:39 不應該勇敢
2:12:56 下雨天
2:15:00 懂愛的人
2:17:46 失戀無罪
2:20:35 分手後不要做朋友
2:24:54 心電心 完整版
2:28:41 卡路里
2:32:31 特務J
2:36:10 女孩站出來
2:37:44 雲中月圓
2:42:06 含淚跳恰恰
2:45:49 靚仔
2:46:32 秋雨惦一暝
2:47:04 台灣的心跳聲
2:50:12 叩叩
2:51:52 夠愛
2:56:47 把愛收好
3:01:01 夢中的情話

第10次 https://youtu.be/_R7rMMX-DSA
0:03 DNA
3:52 途中
8:11 有沒有
11:39 夠不著的你
20:55 沒理由
20:57 雨季
25:44 傻呆呆
32:35 月牙灣
32:39 lydia
36:40 星火
41:48 愛存在
46:20 亞特蘭提斯
50:19 是他不配
53:16 下雨天
57:07 前面路口停
58:47 怎麼還不愛
1:00:42 雨愛
1:02:42 心牆
1:06:31 不解釋親吻
1:07:59 卡路里
1:11:48 女孩站出來
1:13:39 我不離開
1:17:47 靚仔
1:24:01 夠愛
1:25:58 雲中月圓
1:26:03 秋雨彼一暝
1:28:05 含淚跳恰恰
1:29:54 傷心酒店
1:31:47 夢中的情話

第11次 https://youtu.be/mmD6beUk_44
0:03 DNA
3:55 心裡的孩子
7:19 月牙灣
12:37 lydia
16:23 lydia 第二次
20:15 星火
25:20 夠不著的你
30:15 亞特蘭提斯
34:16 心牆
38:11 下一個天亮
43:27 幸福就好
47:00 在樹上唱歌
51:03 愛上現在的我
53:22 滴答滴
57:19 你眼中的我
1:01:32 雨愛
1:06:20 無人熟識
1:11:00 愛存在
1:15:26 雨季
1:20:14 怎麼還不愛
1:24:19 雨蝶
1:28:10 我不要
1:32:39 過得去
1:37:23 失憶的金魚
1:42:09 年輪說
1:46:41 神魂電到
1:50:23 女孩站出來
1:51:03 聽見下雨的聲音
1:54:05 不應該勇敢
1:58:47 是他不配
2:01:45 下雨天
2:06:21 夠愛
2:11:25 我們的愛
2:14:23 lin極限
2:15:59 大大的擁抱
2:17:22 失戀無罪
2:18:48 好朋友的祝福
2:20:49 幸福了然後呢
2:22:41 給我一個理由忘記
2:27:17 粉筆與塗鴉
2:32:02 我不離開
2:36:16 分手說愛你
2:40:34 星火 第二次
2:45:40 亞特蘭提斯 第二次
2:52:16 把愛收好
2:57:45 放過自己
2:59:33 光年之外
3:03:49 雲中月圓
3:07:56 煎熬
3:12:21 大火
3:15:48 像天堂的懸崖
3:20:40 我是一隻小小鳥
3:21:10 呼呼
3:22:32 有沒有
3:23:43 沒理由
3:25:12 不解釋親吻
3:26:42 追追追
3:27:40 心電心
3:29:04 chillaxing
3:32:50 365天
3:34:20 秋雨彼一暝

第11次-2 https://youtu.be/zeKSxaozeeQ
0:00 傷心酒店
3:28 夢中的情話

第12次 https://youtu.be/Y6UD02X5FqA
00:00 DNA
3:12 分手後不要做朋友
7:36 好朋友只是朋友
11:45 微加幸福
16:32 小姐請你給我愛
18:00 愛存在
22:20 雨季
27:03 明明愛你
32:41 踮起腳尖愛
37:27 心裡的孩子
39:03 從未到過的地方
43:08 月牙灣
47:55 lydia
51:43 星火
57:15 夠不著的你
1:00:07 煎熬
1:04:46 亞特蘭提斯 
1:08:26 夢中的情話

第13次 https://youtu.be/SpjdeTcc50A
0:00 lin極限
13:37 DNA
17:24 卡路里
21:13 粉筆與塗鴉
25:55 星火
31:02 lydia
35:02 月牙灣
40:19 1/2
44:20 夠愛
49:19 你敢不敢
53:29 是他不配
57:36 怎麼還不愛
1:01:43 你眼中的我
1:05:58 在樹上唱歌
1:10:00 下一個天亮
1:15:07 心牆
1:19:02 不哭
1:23:31 雨季
1:28:14 愛存在
1:32:44 踮起腳尖愛
1:38:03 煎熬
1:44:02 明明愛你
1:50:12 夠不著的你
1:54:44 微加幸福
1:56:47 好朋友只是朋友
1:58:54 這樣愛你好可怕
2:01:02 亞特蘭提斯
2:02:32 不解釋親吻
2:04:03 小姐請你給我愛
2:07:17 雲中月圓
2:09:11 秋雨彼一暝
2:11:15 我不離開
2:13:27 半醉半清醒
2:15:29 返來我身邊
2:17:28 傷心酒店
2:19:27 夢中的情話

第14次 https://youtu.be/wTLML2vm-84
0:00 DNA
3:44 月牙灣
8:58 lydia
12:26 星火
17:30 光年之外
21:25 雨蝶
24:55 輕輕
28:42 大大的擁抱
32:46 大藝術家
36:02 少一點天分
40:31 雨季
44:57 倒數
49:02 I'm Not Yours
53:45 分手說愛你
57:45 煎熬
1:01:58 多遠多要在一起
1:05:41 別人的
1:10:28 夠不著的你
1:14:57 有一種悲傷
1:18:54 愛存在
1:22:57 只對你有感覺
1:27:01 半醉半清醒
1:31:14 幸福呢然後呢
1:35:43 刻在我心底的名字
1:38:29 愛你
1:42:00 手心的薔薇
1:46:50 你敢不敢
1:50:26 紅色高跟鞋
1:51:19 家家酒
1:55:32 紅色高跟鞋
1:55:49 踮起腳尖愛
1:56:20 下雨天
2:00:40 Mr.Q
2:04:05 是他不配
2:05:44 飄向北方
2:09:28 心牆
2:13:19 靚仔
2:16:35 命運
2:20:13 我不離開
2:24:31 女孩站出來
2:27:53 粉筆與塗鴉
2:32:38 怪美的
2:37:46 不應該勇敢
2:41:56 chillaxing
2:45:48 明明愛你
2:50:45 365天
2:54:30 路過人間
2:58:22 天堂中的魔鬼
3:02:44 雨愛
3:07:20 等一個人
3:09:26 聽見下雨的聲音
3:13:49 我愛你
3:18:05 日不落
3:22:08 愛你
3:25:36 夢中的情話
`; // <-- 請在這裡貼上您的 song_list.txt 內容！


// --- 輔助函式 ---

/**
 * 將時間字串轉換為秒數。
 * @param {string} timeStr - 時間字串，格式為 'MM:SS' 或 'HH:MM:SS'。
 * @returns {number} - 轉換後的總秒數。
 */
function timeToSeconds(timeStr) {
    if (!timeStr || timeStr.indexOf(':') === -1) {
        return 0;
    }

    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}

/**
 * 顯示狀態訊息並設定樣式
 * @param {HTMLElement} element - 狀態訊息的 DOM 元素
 * @param {string} message - 要顯示的訊息
 * @param {string} type - 訊息類型 ('loading', 'success', 'warning', 'error')
 */
function showStatusMessage(element, message, type) {
    if (!element) {
        console.error("showStatusMessage: 錯誤：目標元素不存在！");
        return;
    }
    element.textContent = ''; // 先清空文本內容，再插入圖示和文字
    if (type === 'loading') {
        const spinner = document.createElement('i');
        spinner.className = 'bi bi-arrow-clockwise loading-spinner';
        element.appendChild(spinner);
    }
    element.appendChild(document.createTextNode(message)); // 再添加文字
    element.className = `status-message ${type}`; // 移除舊的 class，加上新的
    element.style.display = 'block';
    element.style.opacity = '1';
    element.style.height = 'auto'; // 確保高度自適應
    element.style.padding = '12px';
    element.style.margin = '0 0 20px 0';
    element.style.overflow = 'visible';
    console.log(`Status Message: ${message} (Type: ${type})`);
}

/**
 * 隱藏狀態訊息
 * @param {HTMLElement} element - 狀態訊息的 DOM 元素
 */
function hideStatusMessage(element) {
    if (!element) return;
    element.style.opacity = '0';
    element.style.height = '0';
    element.style.padding = '0';
    element.style.margin = '0';
    element.style.overflow = 'hidden';
    // 在過渡結束後完全隱藏
    element.addEventListener('transitionend', function handler() {
        if (element.style.opacity === '0') {
            element.style.display = 'none';
            element.removeEventListener('transitionend', handler); // 移除事件監聽器，避免重複觸發
        }
    }, { once: true });
    console.log("Status Message: 已設定為隱藏。");
}


/**
 * 解析內嵌歌單內容，建立歌曲表演資料物件。
 * @param {string} fileContent - 歌單的完整文字內容。
 * @returns {Object} - 解析後的歌曲表演資料。
 */
function parsePerformances(fileContent) {
    console.log("parsePerformances: 開始解析檔案內容...");
    if (typeof fileContent !== 'string') {
        console.error("parsePerformances: 錯誤：檔案內容不是字串類型！", fileContent);
        return {};
    }
    console.log("parsePerformances: 檔案內容長度:", fileContent.length);

    const performances = {};
    let currentSession = "";
    let currentUrl = "";

    const lines = fileContent.split('\n');
    console.log("parsePerformances: 總行數:", lines.length);

    for (const line of lines) {
        const trimmedLine = line.trim();

        // 判斷是否為包含有效 URL 的行 (以 http:// 或 https:// 開頭或包含)
        if (trimmedLine.startsWith("http://") || trimmedLine.startsWith("https://") || 
            trimmedLine.includes("http://") || trimmedLine.includes("https://")) {
            
            // 從包含 URL 的行中提取 Session 名稱和 URL
            const parts = trimmedLine.split(/\s+/); // 使用空白字符分割

            // 確保 parts 至少包含一個 session 名稱和一個 URL
            if (parts.length < 2) {
                console.warn("parsePerformances: 忽略無效的 URL 行 (格式不正確):", trimmedLine);
                continue;
            }

            // session 名稱可能是第一個詞，或者包含多個詞
            // 我們假設 URL 是最後一個部分
            currentUrl = parts[parts.length - 1]; 
            const sessionParts = parts.slice(0, parts.length - 1);
            currentSession = sessionParts.join(' '); // 重新組合 session 名稱

            // 特殊處理「補錄」字樣，確保其在 session 名稱中
            if (currentSession.includes("補錄") && !sessionParts.some(part => part === "補錄")) {
                 // 如果原始行包含補錄，但組合後的 session 不包含，可能表示「補錄」是獨立的詞
                 // 但我們之前的邏輯假設它是 session 名稱的一部分，所以這裡讓它保持一致
            }

            console.log(`parsePerformances: 偵測到新場次: ${currentSession}, URL: ${currentUrl}`);
        } 
        // 檢查是否為歌曲時間戳記行 (非空且包含 ":" 且不以 "#" 開頭)
        else if (trimmedLine && trimmedLine.includes(":") && !trimmedLine.startsWith("#")) {
            try {
                const firstSpaceIndex = trimmedLine.indexOf(' ');
                if (firstSpaceIndex === -1) {
                    console.warn("parsePerformances: 忽略無效歌曲行 (無空格):", trimmedLine);
                    continue; 
                }

                const timestamp = trimmedLine.substring(0, firstSpaceIndex);
                const song = trimmedLine.substring(firstSpaceIndex + 1);

                // 檢查是否已經有 currentSession 和 currentUrl，否則這條歌曲無法歸類
                if (!currentSession || !currentUrl) {
                    console.warn(`parsePerformances: 忽略歌曲 '${song}'，因為沒有找到相關的場次和 URL。行內容: ${trimmedLine}`);
                    continue;
                }

                if (!performances[song]) {
                    performances[song] = [];
                }
                performances[song].push({
                    session: currentSession,
                    url: currentUrl,
                    timestamp: timestamp
                });
            } catch (e) {
                console.error("parsePerformances: 解析歌曲行時發生錯誤:", e, "行內容:", trimmedLine, "錯誤:", e);
                continue;
            }
        }
    }
    console.log("parsePerformances: 解析完成，總共找到歌曲數量:", Object.keys(performances).length);
    return performances;
}


/**
 * 根據歌名搜尋歌曲並顯示結果。
 * @param {string} songName - 要搜尋的歌名。
 */
function searchSong(songName) {
    const resultsDiv = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');
    const songNameInput = document.getElementById('songNameInput');

    // 清空結果區塊
    if (resultsDiv) {
        console.log("searchSong: 獲取到的 resultsDiv 元素:", resultsDiv);
        resultsDiv.innerHTML = '';
        console.log("searchSong: 清空 resultsDiv 內容。");
    } else {
        console.error("錯誤：searchSong 函式中找不到 ID 為 'searchResults' 的元素！");
        // 即使沒有 resultsDiv，也要恢復按鈕狀態
        if (searchButton) { searchButton.innerHTML = '<i class="bi bi-search"></i> 搜尋'; searchButton.disabled = false; }
        if (songNameInput) { songNameInput.disabled = false; }
        return; // 無法顯示結果，直接返回
    }
    
    // 隱藏載入狀態訊息
    const loadingStatusDiv = document.getElementById('loadingStatus');
    hideStatusMessage(loadingStatusDiv);

    // 搜尋中狀態
    if (searchButton) {
        searchButton.innerHTML = '<i class="bi bi-arrow-clockwise loading-spinner"></i> 搜尋中...';
        searchButton.disabled = true;
    }
    if (songNameInput) {
        songNameInput.disabled = true;
    }

    // 模擬網路延遲（可移除），讓使用者看到「搜尋中...」
    setTimeout(() => {
        if (!performancesData || Object.keys(performancesData).length === 0) {
            resultsDiv.innerHTML = '<p class="status-message error"><i class="bi bi-exclamation-circle"></i> 錯誤：歌曲資料尚未載入或歌單為空。</p>';
            console.log("searchSong: 歌曲資料為空或未載入。");
            // 恢復搜尋按鈕和輸入框狀態
            if (searchButton) { searchButton.innerHTML = '<i class="bi bi-search"></i> 搜尋'; searchButton.disabled = false; }
            if (songNameInput) { songNameInput.disabled = false; }
            return;
        }

        const foundPerformances = performancesData[songName];
        console.log(`searchSong: 搜尋 '${songName}'，找到結果:`, foundPerformances);

        if (foundPerformances && foundPerformances.length > 0) {
            const ul = document.createElement('ul');
            resultsDiv.innerHTML = `<h3>找到 '${songName}' 的演唱記錄：</h3>`;

            foundPerformances.forEach(perf => {
                const li = document.createElement('li');
                const seconds = timeToSeconds(perf.timestamp);
                const youtubeUrl = `${perf.url}?t=${seconds}`;

                // 修改為「點此觀看」按鈕
                li.innerHTML = `
                    <strong>${perf.session}</strong><br>
                `;
                const watchButton = document.createElement('button');
                watchButton.className = 'watch-button'; // 新增一個 class 用於樣式
                watchButton.innerHTML = '<i class="bi bi-youtube"></i> 點此觀看';
                watchButton.onclick = () => window.open(youtubeUrl, '_blank'); // 點擊按鈕在新視窗打開連結
                li.appendChild(watchButton); // 將按鈕添加到 li 中

                ul.appendChild(li);
            });
            resultsDiv.appendChild(ul);
            console.log("searchSong: ul 元素加入 resultsDiv。最終 resultsDiv.innerHTML:", resultsDiv.innerHTML);
        } else {
            resultsDiv.innerHTML = `<p class="status-message info"><i class="bi bi-info-circle"></i> 找不到 '${songName}' 的演唱記錄。請確認歌名是否正確。</p>`;
            console.log("searchSong: 顯示找不到歌曲的訊息。");
        }

        // 恢復搜尋按鈕和輸入框狀態
        if (searchButton) {
            searchButton.innerHTML = '<i class="bi bi-search"></i> 搜尋';
            searchButton.disabled = false;
        }
        if (songNameInput) {
            songNameInput.disabled = false;
        }
        songNameInput.focus(); // 搜尋後將焦點放回輸入框
    }, 300); // 模擬搜尋延遲，讓使用者看到「搜尋中...」
}

/**
 * 清空搜尋框和結果區塊。
 */
function clearSearch() {
    const songNameInput = document.getElementById('songNameInput');
    const resultsDiv = document.getElementById('searchResults');
    const loadingStatusDiv = document.getElementById('loadingStatus'); // 確保獲取 loadingStatusDiv
    const searchButton = document.getElementById('searchButton'); // 獲取搜尋按鈕

    if (songNameInput) {
        songNameInput.value = ''; // 清空輸入框
        songNameInput.focus(); // 清空後聚焦輸入框
    }
    if (resultsDiv) {
        // 恢復到初始的提示訊息
        resultsDiv.innerHTML = '<p class="initial-info">請輸入歌名進行搜尋。</p>';
    }
    // 隱藏載入/狀態訊息，或者讓它在下次操作時出現
    if (loadingStatusDiv) {
        hideStatusMessage(loadingStatusDiv);
    }
    // 恢復搜尋按鈕狀態，以防在搜尋中被點擊清除
    if (searchButton) {
        searchButton.innerHTML = '<i class="bi bi-search"></i> 搜尋';
        searchButton.disabled = false;
    }
    if (songNameInput) {
        songNameInput.disabled = false;
    }
    console.log("搜尋框和結果已清除。");
}


// --- 頁面載入時的初始化邏輯 ---
document.addEventListener('DOMContentLoaded', () => {
    // 獲取 DOM 元素，並進行空值檢查
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const songNameInput = document.getElementById('songNameInput');
    const resultsDiv = document.getElementById('searchResults');
    const loadingStatusDiv = document.getElementById('loadingStatus');

    // **偵錯訊息：確認元素是否被正確獲取**
    console.log("DOMContentLoaded 已觸發！");
    console.log("searchButton 元素:", searchButton);
    console.log("clearButton 元素:", clearButton);
    console.log("songNameInput 元素:", songNameInput);
    console.log("loadingStatusDiv 元素:", loadingStatusDiv);
    console.log("searchResults 元素:", resultsDiv);


    // 處理載入狀態訊息顯示
    if (loadingStatusDiv) {
        showStatusMessage(loadingStatusDiv, '初始化歌曲資料中...', 'loading');
    } else {
        console.error("錯誤：找不到 ID 為 'loadingStatus' 的元素，無法顯示載入狀態！請檢查 index.html。");
    }

    try {
        performancesData = parsePerformances(EMBEDDED_SONG_LIST_CONTENT);
        console.log("直接解析內嵌歌單完成。performancesData:", performancesData);
        
        if (loadingStatusDiv) {
            if (Object.keys(performancesData).length > 0) {
                showStatusMessage(loadingStatusDiv, '歌曲資料已載入，請輸入歌名搜尋。', 'success');
            } else {
                showStatusMessage(loadingStatusDiv, '歌曲資料已載入，但內嵌歌單未解析到任何歌曲。請檢查 EMBEDDED_SONG_LIST_CONTENT 內容。', 'warning');
            }
        }
    } catch (error) {
        if (loadingStatusDiv) {
            showStatusMessage(loadingStatusDiv, `處理內嵌歌單失敗: ${error.message}`, 'error');
        }
        console.error('解析內嵌歌單時發生錯誤:', error);
    } finally {
        // 設定定時器，在 5 秒後隱藏載入狀態訊息
        if (loadingStatusDiv) {
            setTimeout(() => {
                hideStatusMessage(loadingStatusDiv);
            }, 5000); 
        }
    }

    // 處理搜尋按鈕點擊
    if (searchButton && songNameInput && resultsDiv) { // 確保所有相關元素都存在才綁定事件
        searchButton.addEventListener('click', () => {
            console.log("搜尋按鈕被點擊！");
            const songName = songNameInput.value.trim();
            if (songName) {
                searchSong(songName);
            } else {
                if (resultsDiv) {
                    resultsDiv.innerHTML = '<p class="status-message info"><i class="bi bi-info-circle"></i> 請輸入要搜尋的歌名。</p>';
                    console.log("未輸入歌名，顯示提示訊息。");
                }
                // 如果沒有輸入歌名，也恢復按鈕狀態
                if (searchButton) { searchButton.innerHTML = '<i class="bi bi-search"></i> 搜尋'; searchButton.disabled = false; }
                if (songNameInput) { songNameInput.disabled = false; }
            }
        });
    } else {
        console.error("錯誤：無法綁定搜尋事件！檢查 ID 為 'searchButton' 或 'songNameInput' 或 'searchResults' 的元素是否存在。");
    }

    // 處理清空按鈕點擊
    if (clearButton) {
        clearButton.addEventListener('click', clearSearch);
        console.log("清空按鈕事件已綁定。");
    } else {
        console.error("錯誤：找不到 ID 為 'clearButton' 的元素，無法綁定清空事件！請檢查 index.html。");
    }

    // 允許按 Enter 鍵搜尋
    if (songNameInput && searchButton) {
        songNameInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                console.log("輸入框按下 Enter 鍵！");
                searchButton.click(); // 模擬點擊搜尋按鈕
            }
        });
    } else {
        console.error("錯誤：無法綁定 Enter 鍵事件！檢查 ID 為 'songNameInput' 或 'searchButton' 的元素是否存在。");
    }

    // 頁面載入後自動聚焦到搜尋輸入框 (HTML autofocus 屬性通常更優先)
    if (songNameInput) {
        songNameInput.focus();
    }
});