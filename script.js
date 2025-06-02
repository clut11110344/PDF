document.addEventListener('DOMContentLoaded', () => {
    console.log('[DEBUG] DOMContentLoaded 事件已觸發。腳本開始執行...');

    // --- 1. DOM 元素選取與驗證 ---
    let textInput, fontSizeSlider, fontSizeValue, previewText, generatePdfBtn;
    try {
        textInput = document.getElementById('textInput');
        fontSizeSlider = document.getElementById('fontSizeSlider');
        fontSizeValue = document.getElementById('fontSizeValue');
        previewText = document.getElementById('previewText');
        generatePdfBtn = document.getElementById('generatePdfBtn');

        console.log('[DEBUG] textInput:', textInput ? '找到' : '未找到');
        console.log('[DEBUG] fontSizeSlider:', fontSizeSlider ? '找到' : '未找到');
        console.log('[DEBUG] fontSizeValue:', fontSizeValue ? '找到' : '未找到');
        console.log('[DEBUG] previewText:', previewText ? '找到' : '未找到');
        console.log('[DEBUG] generatePdfBtn:', generatePdfBtn ? '找到' : '未找到');

        if (!textInput || !fontSizeSlider || !fontSizeValue || !previewText || !generatePdfBtn) {
            console.error('[DEBUG] 錯誤：一個或多個必要的 HTML 元素未找到。請仔細檢查 HTML 中的 ID 是否與 JavaScript 中的完全一致 (大小寫敏感)。');
            alert('頁面初始化錯誤：找不到必要的 HTML 元素。預覽和按鈕功能可能無法使用。請檢查 Console 中的詳細錯誤。');
            return;
        }
        console.log('[DEBUG] 所有主要 HTML 元素已成功選取。');
    } catch (e) {
        console.error('[DEBUG] 嘗試選取 DOM 元素時發生嚴重錯誤:', e);
        alert('頁面初始化時發生嚴重錯誤，無法選取 HTML 元素。');
        return;
    }

    // --- 2. 初始設定 ---
    const DEFAULT_FONT_SIZE_PX = 16;
    try {
        fontSizeSlider.value = DEFAULT_FONT_SIZE_PX;
        fontSizeValue.textContent = DEFAULT_FONT_SIZE_PX;
        updatePreview();
        console.log('[DEBUG] 字體大小和預覽已初始化。');
    } catch (e) {
        console.error('[DEBUG] 初始化字體大小或預覽時發生錯誤:', e);
    }

    // --- 3. updatePreview 函數定義 ---
    function updatePreview() {
        if (!textInput || !previewText || !fontSizeSlider) {
            console.warn('[DEBUG] updatePreview: textInput, previewText, 或 fontSizeSlider 在函數執行時缺失。');
            return;
        }
        try {
            const text = textInput.value;
            const fontSize = fontSizeSlider.value + 'px';

            previewText.style.fontSize = fontSize;
            previewText.textContent = text;
        } catch (e) {
            console.error('[DEBUG] updatePreview 函數內部執行時發生錯誤:', e);
        }
    }

    // --- 4. 預覽相關的事件監聽器 ---
    try {
        textInput.addEventListener('input', () => {
            updatePreview();
        });
        fontSizeSlider.addEventListener('input', () => {
            if (fontSizeValue) {
                fontSizeValue.textContent = fontSizeSlider.value;
            }
            updatePreview();
        });
        console.log('[DEBUG] 預覽相關的事件監聽器已成功附加。');
    } catch (e) {
        console.error('[DEBUG] 附加預覽相關的事件監聽器時發生錯誤:', e);
        alert('附加預覽更新事件監聽器時出錯。');
    }

    // --- 5. setupExternalFont 函數定義 ---
    async function setupExternalFont(doc, fontURL, fontVFSRegisterName, fontNameToUseInPDF) {
        console.log(`[DEBUG] setupExternalFont 開始執行，參數: fontURL=${fontURL}, fontVFSRegisterName=${fontVFSRegisterName}, fontNameToUseInPDF=${fontNameToUseInPDF}`);
        
        try {
            // 檢查字體是否已經載入
            const existingFonts = doc.getFontList();
            console.log('[DEBUG] 現有字體列表:', existingFonts);
            
            if (existingFonts[fontNameToUseInPDF]) {
                console.log(`[DEBUG] 字體 ${fontNameToUseInPDF} 已存在，直接使用`);
                doc.setFont(fontNameToUseInPDF);
                return;
            }

            console.log(`[DEBUG] 開始從 ${fontURL} 載入字體...`);
            
            // 使用 fetch 載入字體檔案
            const response = await fetch(fontURL);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            console.log('[DEBUG] 字體檔案 fetch 成功，開始轉換為 ArrayBuffer...');
            const fontArrayBuffer = await response.arrayBuffer();
            console.log(`[DEBUG] 字體檔案載入完成，大小: ${fontArrayBuffer.byteLength} bytes`);

            // 將 ArrayBuffer 轉換為 base64
            const fontUint8Array = new Uint8Array(fontArrayBuffer);
            const fontBase64 = btoa(String.fromCharCode.apply(null, fontUint8Array));
            console.log('[DEBUG] 字體檔案已轉換為 base64 格式');

            // 註冊字體到 jsPDF 的虛擬檔案系統
            doc.addFileToVFS(fontVFSRegisterName, fontBase64);
            console.log(`[DEBUG] 字體已添加到 VFS，名稱: ${fontVFSRegisterName}`);

            // 添加字體到 jsPDF
            doc.addFont(fontVFSRegisterName, fontNameToUseInPDF, 'normal');
            console.log(`[DEBUG] 字體已註冊到 jsPDF，字體名稱: ${fontNameToUseInPDF}`);

            // 設定使用該字體
            doc.setFont(fontNameToUseInPDF);
            console.log(`[DEBUG] 已切換到字體: ${fontNameToUseInPDF}`);

        } catch (error) {
            console.error(`[DEBUG] 載入字體 ${fontNameToUseInPDF} 時發生錯誤:`, error);
            console.warn('[DEBUG] 將使用預設字體 Helvetica 作為備用');
            
            // 使用備用字體
            if (doc && typeof doc.setFont === 'function') {
                try {
                    doc.setFont('Helvetica');
                    console.log('[DEBUG] 已切換到備用字體 Helvetica');
                } catch (fallbackError) {
                    console.error('[DEBUG] 設定備用字體時也發生錯誤:', fallbackError);
                }
            }
            
            // 顯示用戶友好的錯誤訊息
            const errorMsg = `無法載入字體 ${fontNameToUseInPDF}。\n錯誤詳情: ${error.message}\n\n將使用預設字體繼續生成 PDF。`;
            alert(errorMsg);
        }
    }

    // --- 6. PDF 生成按鈕事件監聽器 ---
    try {
        generatePdfBtn.addEventListener('click', async () => {
            console.log('[DEBUG] 「生成 PDF」按鈕被點擊。');

            let doc;
            try {
                // 檢查 jsPDF 是否已定義
                if (typeof jsPDF === 'undefined') {
                    console.error('[DEBUG] 錯誤: jsPDF 未定義。請確保 jsPDF 函式庫已在 HTML 中正確載入 (在 script.js 之前)。');
                    alert('錯誤: PDF 生成工具 (jsPDF) 未載入，無法生成 PDF。');
                    return;
                }
                doc = new jsPDF();
                console.log('[DEBUG] jsPDF 實例已創建。');
            } catch (e) {
                console.error('[DEBUG] 創建 jsPDF 實例時發生錯誤:', e);
                alert('創建 PDF 處理器時發生嚴重錯誤，無法繼續。請檢查 jsPDF 庫是否正確載入。');
                return;
            }

            const text = textInput.value;
            const currentFontSizePx = parseFloat(fontSizeSlider.value);

            // 字體設定
            const fontURL = './fonts/NotoSansTC-Light.ttf';
            const fontVFSRegisterName = 'NotoSansTC-Light.ttf';
            const fontNameToUseInPDF = 'NotoSansTC-Light';

            console.log('[DEBUG] 準備呼叫 setupExternalFont...');
            await setupExternalFont(doc, fontURL, fontVFSRegisterName, fontNameToUseInPDF);
            console.log('[DEBUG] setupExternalFont 函數呼叫完成。');

            // --- PDF 內容生成邏輯 ---
            try {
                const fontSizeForPdf = currentFontSizePx * (72 / 96); // px to pt 轉換
                doc.setFontSize(fontSizeForPdf);
                console.log(`[DEBUG] PDF 字體大小設定為: ${fontSizeForPdf}pt`);

                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();
                const margin = 10;
                const maxTextWidth = pageWidth - (2 * margin);
                let y = margin;
                const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor * 1.15;

                console.log(`[DEBUG] 頁面設定 - 寬度: ${pageWidth}, 高度: ${pageHeight}, 邊距: ${margin}, 行高: ${lineHeight}`);

                if (!text || text.trim().length === 0) {
                    console.log('[DEBUG] 沒有輸入內容，添加預設訊息');
                    doc.text("沒有輸入內容。", margin, y);
                } else {
                    console.log('[DEBUG] 正在處理文字內容...');
                    const lines = text.split('\n');
                    
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        console.log(`[DEBUG] 處理第 ${i + 1} 行: "${line.substring(0, 50)}${line.length > 50 ? '...' : ''}"`);
                        
                        if (line.trim().length === 0) {
                            // 空行也需要佔用空間
                            if (y + lineHeight > pageHeight - margin) {
                                doc.addPage();
                                y = margin;
                                console.log('[DEBUG] 添加新頁面 (空行)');
                            }
                            y += lineHeight;
                            continue;
                        }

                        const splitText = doc.splitTextToSize(line, maxTextWidth);
                        for (let j = 0; j < splitText.length; j++) {
                            const segment = splitText[j];
                            if (y + lineHeight > pageHeight - margin) {
                                doc.addPage();
                                y = margin;
                                console.log('[DEBUG] 添加新頁面');
                            }
                            doc.text(segment, margin, y);
                            y += lineHeight;
                        }
                    }
                }

                console.log('[DEBUG] 準備儲存 PDF...');
                const fileName = 'generated_pdf_' + new Date().toISOString().slice(0, 19).replace(/[:\-]/g, '') + '.pdf';
                doc.save(fileName);
                console.log(`[DEBUG] PDF 已儲存為: ${fileName}`);
                
                // 顯示成功訊息
                alert(`PDF 生成成功！\n檔案名稱: ${fileName}`);

            } catch (e) {
                console.error('[DEBUG] 生成 PDF 內容或儲存時發生錯誤:', e);
                alert(`生成 PDF 內容或儲存時出錯: ${e.message}`);
            }
        });
        console.log('[DEBUG] 「生成 PDF」按鈕的事件監聽器已成功附加。');
    } catch (e) {
        console.error('[DEBUG] 附加「生成 PDF」按鈕事件監聽器時發生錯誤:', e);
        alert('附加「生成 PDF」按鈕事件監聽器時出錯。');
    }

    console.log('[DEBUG] script.js 的 DOMContentLoaded 處理函數執行完畢。');
});