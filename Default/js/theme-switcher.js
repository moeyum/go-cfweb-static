// 主题切换功能
(function() {
    'use strict';

    // 获取保存的主题或使用系统偏好
    function getSavedTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;

        // 检测系统偏好
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // 应用主题
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

        // 更新按钮图标
        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
            }
        }
    }

    // 切换主题
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
    }

    // 立即应用主题（防止闪烁）
    const theme = getSavedTheme();
    applyTheme(theme);

    // DOM加载完成后绑定事件
    function init() {
        // 绑定按钮事件
        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }

        // 监听系统主题变化
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
