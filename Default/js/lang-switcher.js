// 语言切换功能
(function() {
    'use strict';

    // DOM元素
    const langToggleBtn = document.getElementById('langToggleBtn');
    const langDropdown = document.getElementById('langDropdown');

    if (!langToggleBtn || !langDropdown) return;

    // 切换下拉菜单显示
    langToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!langToggleBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('show');
        }
    });

    // 语言选项点击事件
    const langOptions = langDropdown.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // 切换语言
    async function switchLanguage(lang) {
        try {
            const response = await fetch('/api/lang/switch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ lang: lang })
            });

            const result = await response.json();

            if (result.code === 0) {
                // 刷新页面以应用新语言
                window.location.reload();
            } else {
                alert('切换语言失败: ' + result.msg);
            }
        } catch (error) {
            console.error('切换语言失败:', error);
            alert('切换语言失败，请稍后重试');
        }
    }
})();
