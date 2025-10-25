      let currentLanguage = 'en';

        function toggleLanguage() {
            const body = document.body;
            const langText = document.getElementById('lang-text');

            //
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentLanguage === 'en') {
                // Switch to Arabic
                body.classList.remove('ltr');
                body.classList.add('rtl');
                currentLanguage = 'ar';
                langText.textContent = 'English';
                
                // Hide English text, show Arabic text
                document.querySelectorAll('.lang-en').forEach(el => {
                    el.classList.add('hidden');
                });
                document.querySelectorAll('.lang-ar').forEach(el => {
                    el.classList.remove('hidden');
                });
            } else {
                // Switch to English
                body.classList.remove('rtl');
                body.classList.add('ltr');
                currentLanguage = 'en';
                langText.textContent = 'العربية';
                
                // Hide Arabic text, show English text
                document.querySelectorAll('.lang-ar').forEach(el => {
                    el.classList.add('hidden');
                });
                document.querySelectorAll('.lang-en').forEach(el => {
                    el.classList.remove('hidden');
                });
            }
            
            // Scroll to the same position after the language change
            window.scrollTo(0, scrollPosition);

            // Update charts for the new language
            updateCharts();
            
            // Update captions in both cards
            updateCaptions();
            
            // تحديث اتجاه السهم
            updateArrowDirection();

            // ✅ استدعاء الدالة (لكل الصور داخل الأقسام)
            initLightbox(".wishImage img");

            // initTabsAccordion(); // ✅ استدعاء الدالة

            // إعادة تهيئة المكونات بعد تغيير اللغة
            setTimeout(() => {
                const activeAccordion = document.querySelector('.accordion-item.active');
                if (activeAccordion) {
                    const content = activeAccordion.querySelector('.accordion-content');
                    initializeAccordionContent(content);
                }
            }, 100);
            

            
        }



        function updateArrowDirection() {
            const arrows = document.querySelectorAll('.arrow');
            if (!arrows.length) return;
            
            const isRTL = currentLanguage === 'ar';
            const isMobile = window.innerWidth <= 1200;

            arrows.forEach(arrow => {
                if (isMobile) {
                    // الموبايل: سهم لأسفل
                    arrow.innerHTML = '&#8595;';
                    arrow.style.transform = 'rotate(0deg)';
                } else {
                    // الديسكتوب
                    if (isRTL) {
                        arrow.innerHTML = '&#8592;'; // يسار
                    } else {
                        arrow.innerHTML = '&#8594;'; // يمين
                    }
                    arrow.style.transform = 'rotate(0deg)';
                }

                // ستايل إضافي
                arrow.style.display = 'inline-block';
                arrow.style.transition = 'transform 0.5s ease';
            });
        }

        function openTab(evt, tabName) {
            const tabcontent = document.getElementsByClassName("tab-content");
            for (let i = 0; i < tabcontent.length; i++) {
                tabcontent[i].classList.remove("active");
            }
            
            const tablinks = document.getElementsByClassName("tab");
            for (let i = 0; i < tablinks.length; i++) {
                tablinks[i].classList.remove("active");
            }
            
            document.getElementById(tabName).classList.add("active");
            evt.currentTarget.classList.add("active");
        }

        let performanceChart, comparisonChart;

        function updateCharts() {
            // Destroy existing charts if they exist
            if (performanceChart) {
                performanceChart.destroy();
            }
            if (comparisonChart) {
                comparisonChart.destroy();
            }
            
            // Performance Metrics Chart
            const performanceCtx = document.getElementById('performanceChart')?.getContext('2d');
            if (performanceCtx) {
                performanceChart = new Chart(performanceCtx, {
                    type: 'bar',
                    data: {
                        labels: currentLanguage === 'en' ? 
                            ['Largest Contentful Paint', 'First Contentful Paint', 'Total Blocking Time', 'Cumulative Layout Shift'] : 
                            ['وقت ظهور أكبر محتوى', 'وقت ظهور أول محتوى', 'إجمالي وقت عدم الاستجابة', 'إجمالي تحرك العناصر'],
                        datasets: [{
                            label: currentLanguage === 'en' ? 'Desktop' : 'سطح المكتب',
                            data: [1.2, 0.7, 1.2, 0.01],
                            backgroundColor: '#3498db',
                            borderColor: '#2980b9',
                            borderWidth: 1
                        }, {
                            label: currentLanguage === 'en' ? 'Mobile' : 'الجوال',
                            data: [2.7, 2.9, 5.8, 0.00],
                            backgroundColor: '#e74c3c',
                            borderColor: '#c0392b',
                            borderWidth: 1
                        }, {
                            label: currentLanguage === 'en' ? 'Target' : 'الهدف',
                            data: [2.5, 1.8, 0.2, 0.1],
                            backgroundColor: '#27ae60',
                            borderColor: '#2ecc71',
                            borderWidth: 1,
                            type: 'line',
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: currentLanguage === 'en' ? 'Seconds (s)' : 'ثواني (ث)'
                                }
                            }
                        }
                    }
                });
            }

            // Comparison Chart
            const comparisonCtx = document.getElementById('comparisonChart')?.getContext('2d');
            if (comparisonCtx) {
                comparisonChart = new Chart(comparisonCtx, {
                    type: 'radar',
                    data: {
                        labels: currentLanguage === 'en' ? 
                            ['Performance', 'Accessibility', 'Best Practices', 'SEO', 'Speed', 'Optimization'] :
                            ['الأداء', 'إمكانية الوصول', 'أفضل الممارسات', 'تحسين محركات البحث', 'السرعة', 'التحسين'],
                        datasets: [{
                            label: currentLanguage === 'en' ? 'Desktop' : 'سطح المكتب',
                            data: [58, 91, 96, 100, 65, 70],
                            backgroundColor: 'rgba(52, 152, 219, 0.2)',
                            borderColor: '#3498db',
                            pointBackgroundColor: '#3498db'
                        }, {
                            label: currentLanguage === 'en' ? 'Mobile' : 'الجوال',
                            data: [51, 94, 93, 100, 45, 60],
                            backgroundColor: 'rgba(231, 76, 60, 0.2)',
                            borderColor: '#e74c3c',
                            pointBackgroundColor: '#e74c3c'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                angleLines: {
                                    display: true
                                },
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }
                    }
                });
            }
        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Handle window resize for arrow direction
        window.addEventListener('resize', updateArrowDirection);
/////////////////////////////////////////////////////////////////////////////////////////////////////
        // ===== نظام كروت المنتج المتعددة (آمن) =====

// 1. وظيفة لتحديث النصوص في الكابشن (محدثة بشكل آمن)
function updateCaptions() {
    const isArabic = document.body.classList.contains('rtl');
    
    // تحديث الكروت الصغيرة (بدعم التكرار)
    const compactCards = document.querySelectorAll('.compact-card');
    compactCards.forEach(card => {
        const compactCaption = card.querySelector('#compactCaption') || card.querySelector('.caption-text-small');
        const compactActiveThumb = card.querySelector('.smallImg.active img');
        if (compactCaption && compactActiveThumb) {
            compactCaption.textContent = isArabic ? 
                (compactActiveThumb.dataset.altAr || compactActiveThumb.alt) : 
                (compactActiveThumb.alt || '');
        }
    });
    
    // تحديث الكروت الكبيرة (بدعم التكرار)
    const mainCards = document.querySelectorAll('.wrapperCardMain');
    mainCards.forEach(card => {
        const mainCaption = card.querySelector('#mainCaption') || card.querySelector('.caption-text');
        const mainActiveThumb = card.querySelector('.thumbs-row .smallImg.active img');
        if (mainCaption && mainActiveThumb) {
            mainCaption.textContent = isArabic ? 
                (mainActiveThumb.dataset.altAr || mainActiveThumb.alt) : 
                (mainActiveThumb.alt || '');
        }
    });
}

// 2. Compact Card Functionality (محدث بشكل آمن)
function initCompactCard() {
    const compactCards = document.querySelectorAll('.compact-card');
    
    compactCards.forEach((compactCard, cardIndex) => {
        // إذا كان الكارت قد تم تهيئته مسبقاً، تخطيه
        if (compactCard.dataset.initialized === 'true') return;
        
        // استخدام العناصر بالترتيب: ID أولاً، ثم class
        const moreBtn = compactCard.querySelector('.more-btn');
        const hiddenThumbs = compactCard.querySelectorAll('.smallImg.hidden');
        const mainImage = compactCard.querySelector('#compactMainImage') || compactCard.querySelector('.bigImg img');
        const caption = compactCard.querySelector('#compactCaption') || compactCard.querySelector('.caption-text-small');
        const allThumbs = compactCard.querySelectorAll('.smallImg');
        const row = compactCard.querySelector('#compactRow') || compactCard.querySelector('.row');
        
        let isExpanded = false;

        // تهيئة زر المزيد (إذا وجد)
        if (moreBtn && hiddenThumbs.length > 0) {
            moreBtn.addEventListener('click', function() {
                if (!isExpanded) {
                    hiddenThumbs.forEach(thumb => {
                        thumb.classList.remove('hidden');
                    });
                    moreBtn.textContent = '17';
                    isExpanded = true;
                    if (row) row.style.minHeight = '180px';
                } else {
                    hiddenThumbs.forEach(thumb => {
                        thumb.classList.add('hidden');
                    });
                    moreBtn.textContent = '+13';
                    isExpanded = false;
                    if (row) row.style.minHeight = '150px';
                }
            });
        }

        // تهيئة النقر على الصور الصغيرة
        allThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img && mainImage) {
                    mainImage.src = img.src;
                    allThumbs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // تحديث النص مباشرة عند النقر
                    updateCaptions();
                }
            });
        });

        // وضع علامة أن الكارت تم تهيئته
        compactCard.dataset.initialized = 'true';
    });
}

// 3. Main Gallery Functionality (محدث بشكل آمن)
function initMainGallery() {
    const wrappers = document.querySelectorAll('.wrapperCardMain');
    
    wrappers.forEach((wrapper, wrapperIndex) => {
        // إذا كان الكارت قد تم تهيئته مسبقاً، تخطيه
        if (wrapper.dataset.initialized === 'true') return;
        
        const bigImgDivs = wrapper.querySelectorAll('.bigImg');
        const thumbs = wrapper.querySelectorAll('.thumbs-row .smallImg');
        const caption = wrapper.querySelector('#mainCaption') || wrapper.querySelector('.caption-text');
        const btnNext = wrapper.querySelector('.btn-next');
        const btnPrev = wrapper.querySelector('.btn-prev');
        const thumbsRow = wrapper.querySelector('#thumbsRow') || wrapper.querySelector('.thumbs-row');
        const thumbsContainer = wrapper.querySelector('.thumbs-container');
        
        if (!bigImgDivs.length || !thumbs.length) return;
        
        let currentIndex = 0;

        function showSlide(index) {
            if (index < 0) index = 0;
            if (index >= bigImgDivs.length) index = bigImgDivs.length - 1;
            
            bigImgDivs.forEach(div => {div.classList.remove('active');});
            thumbs.forEach(t => t.classList.remove('active'));
            
            currentIndex = index;
            
            if (bigImgDivs[currentIndex]) {
                bigImgDivs[currentIndex].classList.add('active');
            }
            
            updateCaption();
            updateButtons();
            updateActiveThumb();
            syncThumbsPosition();
        }

        function updateCaption() {
            if (caption && thumbs[currentIndex]) {
                const thumb = thumbs[currentIndex].querySelector('img');
                const isArabic = document.body.classList.contains('rtl');
                caption.textContent = isArabic ? 
                    (thumb.dataset.altAr || thumb.alt) : 
                    (thumb.alt || '');
            }
        }

        function updateButtons() {
            if (btnPrev) {
                btnPrev.classList.toggle('disabled', currentIndex === 0);
            }
            if (btnNext) {
                btnNext.classList.toggle('disabled', currentIndex === bigImgDivs.length - 1);
            }
        }

        function updateActiveThumb() {
            thumbs.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentIndex);
            });
        }

        function syncThumbsPosition() {
            const activeThumb = thumbs[currentIndex];
            if (!activeThumb || !thumbsContainer) return;

            const containerCenter = thumbsContainer.offsetWidth / 2;
            const thumbOffset = activeThumb.offsetLeft + (activeThumb.offsetWidth / 2);
            const scrollPos = thumbOffset - containerCenter;

            if (thumbsContainer.scrollTo) {
                thumbsContainer.scrollTo({
                    left: scrollPos,
                    behavior: 'smooth'
                });
            } else {
                thumbsContainer.scrollLeft = scrollPos;
            }
        }

        function initHoverEffects() {
            bigImgDivs.forEach(div => {
                const img = div.querySelector('img');
                if (img && img.dataset.hover) {
                    const originalSrc = img.src;
                    const hoverSrc = img.dataset.hover;

                    img.addEventListener('mouseenter', () => {
                        if (div.classList.contains('active')) {
                            img.classList.add('fade-out');
                            setTimeout(() => {
                                img.src = hoverSrc;
                                img.classList.remove('fade-out');
                            }, 600);
                        }
                    });

                    img.addEventListener('mouseleave', () => {
                        if (div.classList.contains('active')) {
                            img.classList.add('fade-out');
                            setTimeout(() => {
                                img.src = originalSrc;
                                img.classList.remove('fade-out');
                            }, 300);
                        }
                    });
                }
            });
        }

        // تهيئة النقر على الثمبنيلز
        thumbs.forEach((thumb, i) => {
            thumb.addEventListener('click', () => showSlide(i));
        });

        // تهيئة أزرار التنقل
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                if (currentIndex < bigImgDivs.length - 1) {
                    showSlide(currentIndex + 1);
                }
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (currentIndex > 0) {
                    showSlide(currentIndex - 1);
                }
            });
        }

        showSlide(0);
        initHoverEffects();
        
        // تخزين المرجع لهذا الكارت المحدد
        wrapper.mainGallery = {
            syncThumbsPosition: syncThumbsPosition,
            showSlide: showSlide,
            currentIndex: currentIndex
        };
        
        // وضع علامة أن الكارت تم تهيئته
        wrapper.dataset.initialized = 'true';
    });
}

// ===== التكامل الآمن مع النظام الحالي =====

// 4. نظام منع التهيئة المزدوجة
const ProductCardManager = {
    initializedCards: new Set(),
    
    initAllProductCards() {
        // تهيئة الكروت الصغيرة
        const compactCards = document.querySelectorAll('.compact-card');
        compactCards.forEach(card => {
            if (!this.initializedCards.has(card)) {
                // الكود الأصلي سيتم تنفيذه في initCompactCard
                this.initializedCards.add(card);
            }
        });
        
        // تهيئة الكروت الكبيرة
        const mainCards = document.querySelectorAll('.wrapperCardMain');
        mainCards.forEach(card => {
            if (!this.initializedCards.has(card)) {
                // الكود الأصلي سيتم تنفيذه في initMainGallery
                this.initializedCards.add(card);
            }
        });
    },
    
    reinitCard(cardElement) {
        // إعادة تهيئة كارت محدد
        cardElement.dataset.initialized = 'false';
        this.initializedCards.delete(cardElement);
        
        if (cardElement.classList.contains('compact-card')) {
            initCompactCard();
        } else if (cardElement.classList.contains('wrapperCardMain')) {
            initMainGallery();
        }
    }
};

// 5. التهيئة الآمنة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== بدء التهيئة الآمنة للصفحة ===');
    
    // الحفاظ على جميع الأكواد الأصلية العاملة
    initLightbox();
    initAccordionSystem();
    initializeLangMenu();
    initializeCurMenu();
    
    // تهيئة كروت المنتج (ستعمل مع التكرار)
    initCompactCard();
    initMainGallery();
    
    // تهيئة القوائم المنسدلة الرئيسية
    const mainLangMenus = document.querySelectorAll('.menuLangJam:not(.accordion-content .menuLangJam)');
    const mainCurMenus = document.querySelectorAll('.menuCurJam:not(.accordion-content .menuCurJam)');
    
    mainLangMenus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLangJam(menu);
        });
    });
    
    mainCurMenus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLCurJam(menu);
        });
    });
    
    console.log('=== اكتملت التهيئة الآمنة ===');
});

// ===== نظام الأكورديون الأساسي =====
function initAccordionSystem() {
    console.log('🚀 جاري تهيئة نظام الأكورديون...');
    
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length === 0) {
        console.log('⚠️ لم يتم العثور على أي عناصر أكورديون');
        return;
    }
    
    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (!header || !content) {
            console.log('⚠️ عنصر أكورديون ناقص:', item);
            return;
        }
        
        header.addEventListener('click', function() {
            console.log('🎯 تم النقر على أكورديون:', index);
            
            // إغلاق جميع العناصر الأخرى
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    console.log('🔒 تم إغلاق أكورديون آخر');
                }
            });
            
            // تبديل الحالة الحالية
            const isOpening = !item.classList.contains('active');
            item.classList.toggle('active');
            
            console.log(isOpening ? '📖 تم فتح الأكورديون' : '📕 تم إغلاق الأكورديون');
            
            // إذا كان يتم فتح الأكورديون، قم بتهيئة المكونات داخله
            if (isOpening) {
                setTimeout(() => {
                    console.log('🔄 جاري تهيئة محتوى الأكورديون...');
                    initializeAccordionContent(content);
                }, 100);
            }
        });
    });
    
    console.log('✅ تم تهيئة نظام الأكورديون بنجاح');
}

// 6. تهيئة محتوى الأكورديون (محدثة بشكل آمن)
function initializeAccordionContent(accordionContent) {
    if (!accordionContent) return;
    
    console.log('جاري تهيئة محتوى الأكورديون بشكل آمن');
    
    // تهيئة كروت المنتج داخل الأكورديون
    const compactCards = accordionContent.querySelectorAll('.compact-card');
    const mainCards = accordionContent.querySelectorAll('.wrapperCardMain');
    
    if (compactCards.length > 0 || mainCards.length > 0) {
        // استخدام setTimeout لضمان اكتمال تحريك الأكورديون
        setTimeout(() => {
            initCompactCard();
            initMainGallery();
        }, 100);
    }
    
// 2. تهيئة القوائم المنسدلة (بدون ComponentManager)
    const languageSelectors = accordionContent.querySelectorAll('.dropDownJam');

        // تهيئة القوائم المنسدلة
    if (languageSelectors.length > 0) {
        console.log('🌐 جاري تهيئة', languageSelectors.length, 'قائمة منسدلة');
        // سيتم تهيئتها تلقائياً عبر النظام الجديد

    }
    
    // 3. تهيئة الصور للـ lightbox (بدون ComponentManager)
    const images = accordionContent.querySelectorAll('.wishImage img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.querySelector('.lightbox-overlay');
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightbox.classList.add('show');
            }
        });
    });
}




/////////////////////////////////////////////////////////////////////////////////////////////////////
        // ===== نظام القوائم المنسدلة المتعددة =====

// 1. Toggle dropdown menu for LangJam (لجميع العناصر)
function toggleLangJam(element) {
    const menuElement = element || document.activeElement;
    
    const dropDownList = menuElement.nextElementSibling || 
                        menuElement.closest('.langSub')?.querySelector('.dropDownLangJam');
    
    if (dropDownList) {
        dropDownList.classList.toggle('show');
    }
}

// 2. Toggle dropdown menu for CurJam (لجميع العناصر)
function toggleLCurJam(element) {
    const menuElement = element || document.activeElement;
    
    const dropDownList = menuElement.nextElementSibling || 
                        menuElement.closest('.curSub')?.querySelector('.dropDownCurJam');
    
    if (dropDownList) {
        dropDownList.classList.toggle('show');
    }
}

// 3. إغلاق جميع القوائم المنسدلة عند النقر خارجها
document.addEventListener('click', function(event) {
    // إغلاق قوائم LangJam
    const langDropDowns = document.querySelectorAll('.dropDownLangJam');
    langDropDowns.forEach(dropDown => {
        if (!event.target.matches('.menuLangJam') && 
            !event.target.closest('.menuLangJam') &&
            !dropDown.contains(event.target)) {
            dropDown.classList.remove('show');
        }
    });
    
    // إغلاق قوائم CurJam
    const curDropDowns = document.querySelectorAll('.dropDownCurJam');
    curDropDowns.forEach(dropDown => {
        if (!event.target.matches('.menuCurJam') && 
            !event.target.closest('.menuCurJam') &&
            !dropDown.contains(event.target)) {
            dropDown.classList.remove('show');
        }
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////

// 4. Initialize DropDown LangCur (لجميع العناصر)
function initializeLangMenu() {
    const selects = document.querySelectorAll("[data-select]");
    
    selects.forEach(select => {
        const optionsList = select.nextElementSibling || 
                          select.closest('.dropDownlangCur')?.querySelector('.dropDownList');
        const options = optionsList ? optionsList.querySelectorAll(".option") : [];

        if (!select || !optionsList) return;

        // إزالة أي event listeners سابقة
        const newSelect = select.cloneNode(true);
        select.parentNode.replaceChild(newSelect, select);

        // إعادة الحصول على العنصر بعد الاستبدال
        //show & hide options list
        newSelect.addEventListener("click", (e) => {
            e.stopPropagation();
            const icon = newSelect.querySelector("i.fa-solid");
            optionsList.classList.toggle("active");
            if (icon) {
                icon.classList.toggle("fa-angle-down");
                icon.classList.toggle("fa-angle-up");
            }
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', function() {
                const selectedText = this.querySelector('span:last-child').textContent;
                const selectText = newSelect.querySelector('.lang-en, .lang-ar');
                if (selectText) {
                    selectText.textContent = selectedText;
                }
                optionsList.classList.remove("active");
                const icon = newSelect.querySelector("i.fa-solid");
                if (icon) {
                    icon.classList.add("fa-angle-down");
                    icon.classList.remove("fa-angle-up");
                }
            });
        });
    });
}

// 5. Initialize Cur Menu (لجميع العناصر)
function initializeCurMenu() {
    const selects = document.querySelectorAll("[data-cur]");
    
    selects.forEach(select => {
        const optionsList = select.nextElementSibling || 
                          select.closest('.dropDownlangCur')?.querySelector('.dropDownCur');
        const options = optionsList ? optionsList.querySelectorAll(".optionCur") : [];

        if (!select || !optionsList) return;

        // إزالة أي event listeners سابقة
        const newSelect = select.cloneNode(true);
        select.parentNode.replaceChild(newSelect, select);

        // إعادة الحصول على العنصر بعد الاستبدال

        //show & hide options list
        newSelect.addEventListener("click", (e) => {
            e.stopPropagation();
            const icon = newSelect.querySelector("i.fa-solid");
            optionsList.classList.toggle("active");
            if (icon) {
                icon.classList.toggle("fa-angle-down");
                icon.classList.toggle("fa-angle-up");
            }
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', function() {
                const selectedText = this.querySelector('span:last-child').textContent;
                const selectText = newSelect.querySelector('.lang-en, .lang-ar');
                if (selectText) {
                    selectText.textContent = selectedText;
                }
                optionsList.classList.remove("active");
                const icon = newSelect.querySelector("i.fa-solid");
                if (icon) {
                    icon.classList.add("fa-angle-down");
                    icon.classList.remove("fa-angle-up");
                }
            });
        });
    });
}

// 6. إغلاق القوائم المنسدلة للـ data-select و data-cur
document.addEventListener('click', function(event) {
    // إغلاق قوائم data-select
    const selectDropDowns = document.querySelectorAll('.dropDownList');
    selectDropDowns.forEach(dropDown => {
        const select = dropDown.previousElementSibling || 
                      dropDown.closest('.dropDownlangCur')?.querySelector('[data-select]');
        
        if (select && !select.contains(event.target) && !dropDown.contains(event.target)) {
            dropDown.classList.remove("active");
            const icon = select.querySelector("i.fa-solid");
            if (icon) {
                icon.classList.add("fa-angle-down");
                icon.classList.remove("fa-angle-up");
            }
        }
    });
    
    // إغلاق قوائم data-cur
    const curDropDowns = document.querySelectorAll('.dropDownCur');
    curDropDowns.forEach(dropDown => {
        const select = dropDown.previousElementSibling || 
                      dropDown.closest('.dropDownlangCur')?.querySelector('[data-cur]');
        
        if (select && !select.contains(event.target) && !dropDown.contains(event.target)) {
            dropDown.classList.remove("active");
            const icon = select.querySelector("i.fa-solid");
            if (icon) {
                icon.classList.add("fa-angle-down");
                icon.classList.remove("fa-angle-up");
            }
        }
    });
});



        /////////////////////////////////////////////////////////////////////////////////////////////////////
      

        /////////////////////////////////////////////////////////////////////////////////////////////////////
        // دالة تحديث نصوص التابس والأكورديون
        function updateTabsAccordionTexts(lang) {
            // تحديث نصوص التابس
            const tabLabels = document.querySelectorAll('.popup label');
            tabLabels.forEach(label => {
                const textElement = label.querySelector(`.lang-${lang}`);
                if (textElement) {
                    label.querySelector('.lang-en').classList.toggle('hidden', lang !== 'en');
                    label.querySelector('.lang-ar').classList.toggle('hidden', lang !== 'ar');
                }
            });
            
            // تحديث نصوص محتوى التابس
            const tabContents = document.querySelectorAll('.tab-content-section');
            tabContents.forEach(element => {
                const enContent = element.querySelector('.lang-en');
                const arContent = element.querySelector('.lang-ar');
                if (enContent && arContent) {
                    enContent.classList.toggle('hidden', lang !== 'en');
                    arContent.classList.toggle('hidden', lang !== 'ar');
                }
            });
            
            // تحديث نصوص الأكورديون
            const accordionHeaders = document.querySelectorAll('.accordion-header .accordion-text');
            accordionHeaders.forEach(header => {
                const enText = header.querySelector('.lang-en');
                const arText = header.querySelector('.lang-ar');
                if (enText && arText) {
                    enText.classList.toggle('hidden', lang !== 'en');
                    arText.classList.toggle('hidden', lang !== 'ar');
                }
            });
            
            const accordionContents = document.querySelectorAll('.accordion-content');
            accordionContents.forEach(element => {
                const enContent = element.querySelector('.lang-en');
                const arContent = element.querySelector('.lang-ar');
                if (enContent && arContent) {
                    enContent.classList.toggle('hidden', lang !== 'en');
                    arContent.classList.toggle('hidden', lang !== 'ar');
                }
            });
        }

        // إضافة وظائف التابس والأكورديون إلى دالة التهيئة
        function initTabsAccordion() {

            console.log('🔧 بدء تهيئة التابس والأكورديون...');

            // إدارة الأكورديون
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            accordionHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    console.log('🎯 نقرة على الأكورديون:', this.textContent);
                    const accordionItem = this.parentElement;
                    const isActive = accordionItem.classList.contains('active');

                    document.querySelectorAll('.accordion-item').forEach(item => {
                        if (item !== accordionItem) {
                            item.classList.remove('active');
                        }
                    });
                    
                    document.querySelectorAll('.accordion-header').forEach(h => {
                        if (h !== this) {
                            h.classList.remove('accordion-header-active');
                        }
                    });
                    

                    if (isActive) {
                        accordionItem.classList.remove('active');
                        this.classList.remove('accordion-header-active');
                    } else {
                        accordionItem.classList.add('active');
                        this.classList.add('accordion-header-active');
                    }

                });
            });
            
            console.log('🎉 تم تهيئة التابس والأكورديون بنجاح');

        }
        //////////////////////////////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        const tabs = document.querySelectorAll('.popup input[type="radio"]');
            const marker = document.querySelector('.marker');
            const labels = document.querySelectorAll('.popup label');
            const tabContents = document.querySelectorAll('.tab-content-section');
            
            console.log('🔧 بدء تهيئة التابس...');
            console.log('🔍 عدد التبويبات:', tabs.length);
            console.log('🔍 الماركر:', marker);
            
            function updateMarker(tabId) {
                const activeLabel = document.querySelector(`label[for="${tabId}"]`);
                if (activeLabel && marker) {
                    const labelRect = activeLabel.getBoundingClientRect();
                    const containerRect = activeLabel.closest('.tabs-container').getBoundingClientRect();
                    
                    const topPosition = labelRect.top - containerRect.top;
                    const height = labelRect.height;
                    
                    marker.style.top = topPosition + 'px';
                    marker.style.height = height + 'px';
                    
                    console.log('🎯 تحديث الماركر:', {
                        tabId: tabId,
                        top: topPosition + 'px',
                        height: height + 'px'
                    });
                }
            }
            
            function showTabContent(tabId) {
                // إخفاء جميع المحتويات
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // إظهار المحتوى المرتبط
                const contentId = 'content' + tabId.replace('tab', '');
                const activeContent = document.getElementById(contentId);
                
                if (activeContent) {
                    activeContent.classList.add('active');
                    console.log('📁 تفعيل المحتوى:', contentId);
                }
            }
            
            tabs.forEach(tab => {
                tab.addEventListener('change', function() {
                    console.log('🔄 تغيير التابس إلى:', this.id);
                    
                    updateMarker(this.id);
                    showTabContent(this.id);
                    
                    // تحديث الـ label النشط
                    labels.forEach(label => label.classList.remove('label-active'));
                    const activeLabel = document.querySelector(`label[for="${this.id}"]`);
                    if (activeLabel) {
                        activeLabel.classList.add('label-active');
                    }
                });
            });
            
            // التهيئة الأولى
            if (tabs[0]) {
                tabs[0].checked = true;
                updateMarker(tabs[0].id);
                showTabContent(tabs[0].id);
                labels[0].classList.add('label-active');
                
                console.log('✅ تم تهيئة التبويب الأول');
            }
            //////////////////////////////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////
        // استدعاء الدالة عند تغيير التبويب
        document.querySelectorAll('.popup input[type="radio"]').forEach(input => {
            input.addEventListener('change', function() {
                updateMarker(this.id);
            });
        });
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        // دالة تهيئة التكبير والتصغير  
        function initLightbox() {
        const overlay = document.querySelector(".lightbox-overlay");
        const imgDisplay = document.querySelector(".lightbox-img");
        const closeBtn = document.querySelector(".lightbox-close");
        let scrollY = 0;
        let restoreTimeout;

        // ✅ فتح اللايت بوكس عند الضغط على الصورة
        document.querySelectorAll(".wishImage img").forEach(img => {
            img.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();

            // حفظ موضع التمرير
            scrollY = window.scrollY;

            // تعطيل تمرير الصفحة مؤقتًا
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";

            // عرض الصورة داخل اللايت بوكس
            imgDisplay.src = img.src;
            overlay.classList.add("show");

            // 🛡️ حماية إضافية من القفز للأعلى (كما في GitHub issue #620)
            clearTimeout(restoreTimeout);
            restoreTimeout = setTimeout(() => {
                window.scrollTo(0, scrollY);
            }, 50);
            });
        });

        // ✅ إغلاق اللايت بوكس
        function closeLightbox() {
            overlay.classList.remove("show");

            // إعادة خصائص الجسم لطبيعتها
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";

            // استعادة موضع التمرير الأصلي بعد تأخير بسيط لضمان الثبات
            clearTimeout(restoreTimeout);
            restoreTimeout = setTimeout(() => {
            window.scrollTo(0, scrollY);
            }, 30);
        }

        // أزرار الإغلاق
        closeBtn?.addEventListener("click", closeLightbox);
        overlay?.addEventListener("click", e => {
            if (e.target === overlay) closeLightbox();
        });

        // حماية إضافية من أي حدث خارجي يسبب قفز مفاجئ
        window.addEventListener("hashchange", e => {
            e.preventDefault();
            history.replaceState(null, "", window.location.pathname);
        });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////

        // إعادة تهيئة اللايت بوكس عند تغيير اللغة
        function reinitLightboxAfterLangToggle() {
        const observer = new MutationObserver(() => {
            initLightbox(".wishImage img");
        });
        observer.observe(document.body, { childList: true, subtree: true });
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////

        // Initialize everything with error handling
        document.addEventListener('DOMContentLoaded', function() {

                //////////////////////////////////////////////////////////////////////////////////////////////////// 
                    // Lightbox functionality:
            const lightboxOverlay = document.querySelector('.lightbox-overlay');
            const lightboxImg = document.querySelector('.lightbox-img');
            const lightboxClose = document.querySelector('.lightbox-close');
            const wishImages = document.querySelectorAll('.wishImage img');

            // فتح الـ Lightbox للصور في wishImage
            wishImages.forEach(img => {
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    lightboxImg.src = this.src;
                    lightboxImg.alt = this.alt;
                    lightboxOverlay.classList.add('show');
                    document.body.classList.add('lightbox-open');
                    
                    lightboxImg.classList.remove('zoomed');
                    lightboxImg.style.transform = 'scale(1)';
                });
            });

            // إغلاق الـ Lightbox
            lightboxClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeLightbox();
            });

            // إغلاق الـ Lightbox عند النقر خارج الصورة
            lightboxOverlay.addEventListener('click', function(e) {
                if (e.target === lightboxOverlay) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeLightbox();
                }
            });

            // تكبير وتصغير الصورة في الـ Lightbox
            lightboxImg.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.classList.contains('zoomed')) {
                    this.classList.remove('zoomed');
                    this.style.transform = 'scale(1)';
                } else {
                    this.classList.add('zoomed');
                    this.style.transform = 'scale(1.5)';
                }
            });

            function closeLightbox() {
                lightboxOverlay.classList.remove('show');
                document.body.classList.remove('lightbox-open');
                
                setTimeout(() => {
                    lightboxImg.classList.remove('zoomed');
                    lightboxImg.style.transform = 'scale(1)';
                }, 300);
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////// 

            console.log('🚀 بدء تحميل الصفحة...');
            
            try {
                // تهيئة الأساسيات أولاً
                updateCharts();
                updateArrowDirection();
                updateCaptions();
                updateTabsAccordionTexts(currentLanguage);

                // تهيئة المكونات بعد تأكيد وجودها
                setTimeout(() => {
                    try {
                        initCompactCard();
                        initMainGallery();
                        initLightbox(".wishImage img");

                        console.log('✅ تم تهيئة جميع المكونات بنجاح');
                        
                        // تفعيل التبويب الأول
                        const firstTab = document.getElementById('tab1');
                        if (firstTab) {
                            firstTab.checked = true;
                            updateMarker('tab1');
                        }

                        // تأثيرات شريط التقدم
                        const progressBars = document.querySelectorAll('.progress-fill');
                        progressBars.forEach(bar => {
                            const width = bar.style.width || bar.getAttribute('data-width') || '0%';
                            bar.style.width = '0%';
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 500);
                        });

                    } catch (error) {
                        console.error('❌ خطأ في تهيئة المكونات:', error);
                    }
                }, 100);

            } catch (error) {
                console.error('❌ خطأ رئيسي في التهيئة:', error);
            }

            // ✅ استدعاء الدالة (لكل الصور داخل الأقسام)
            initLightbox(".wishImage img");
            reinitLightboxAfterLangToggle();
        });


        /////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////

            document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href="#"], a[href=""], a:not([href])');
            if (link) {
                e.preventDefault();
                e.stopPropagation();
            }
            }, true);


            /////////////////////////////////////////////////////////////////////////////////////////////////////

            // ===== نظام إدارة المكونات =====
const ComponentManager = {
    initializedComponents: new Set(),

    // تهيئة selector اللغة
    initLanguageSelector(selectorElement) {
        if (!selectorElement || this.initializedComponents.has(selectorElement)) return;
        
        console.log('🌐 جاري تهيئة selector اللغة:', selectorElement);
        
        // تهيئة قوائم LangJam
        const menuLangElements = selectorElement.querySelectorAll('.menuLangJam');
        menuLangElements.forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleLangJam(menu);
            });
        });

        // تهيئة قوائم CurJam
        const menuCurElements = selectorElement.querySelectorAll('.menuCurJam');
        menuCurElements.forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleLCurJam(menu);
            });
        });

        this.initializedComponents.add(selectorElement);
    },

    // تهيئة اللايت بوكس للصورة
    initLightboxForImage(imgElement) {
        if (!imgElement || this.initializedComponents.has(imgElement)) return;
        
        imgElement.addEventListener('click', function() {
            const lightbox = document.querySelector('.lightbox-overlay');
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightbox.classList.add('show');
            }
        });

        this.initializedComponents.add(imgElement);
    },

    // تهيئة كارت المنتج (للتوافق)
    initProductCard(cardElement) {
        if (!cardElement || this.initializedComponents.has(cardElement)) return;
        
        console.log('🎴 جاري تهيئة كارت المنتج:', cardElement);
        this.initializedComponents.add(cardElement);
    }


};

////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    document.addEventListener('keydown', e => {
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            showSecurityAlert('❌ F12 غير مسموح');
            return false;
        }
        
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            showSecurityAlert('❌ Ctrl+Shift+I غير مسموح');
            return false;
        }
        
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            showSecurityAlert('❌ Ctrl+Shift+J غير مسموح');
            return false;
        }
        
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            showSecurityAlert('❌ Ctrl+Shift+C غير مسموح');
            return false;
        }
        
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showSecurityAlert('❌ عرض المصدر غير مسموح');
            return false;
        }
    });
    
    document.addEventListener('copy', e => e.preventDefault());
    
    console.log('%c⛔ توقف!', 'color: red; font-size: 30px; font-weight: bold;');
    console.log('%cهذه المنطقة مخصصة للمطورين فقط.', 'color: orange; font-size: 16px;');
});

if (window !== window.top) {
    window.top.location = window.location;
}

function showSecurityAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-size: 14px;
    `;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 2000);
}

