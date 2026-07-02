// 手机端sidebar切换功能
$(function() {
    // 点击sidebar-toggle切换sidebar
    $('.sidebar-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if ($(window).width() < 768) {
            // 手机端
            $('body').toggleClass('sidebar-open');
            $('.main-sidebar').toggleClass('sidebar-open');
        } else {
            // 桌面端
            $('body').toggleClass('sidebar-collapse');
        }
    });
    
    // 点击内容区域关闭sidebar
    $('.content-wrapper').on('click', function() {
        if ($(window).width() < 768 && $('body').hasClass('sidebar-open')) {
            $('body').removeClass('sidebar-open');
            $('.main-sidebar').removeClass('sidebar-open');
        }
    });
    
    // 窗口大小改变时重置状态
    $(window).on('resize', function() {
        if ($(window).width() >= 768) {
            $('body').removeClass('sidebar-open');
            $('.main-sidebar').removeClass('sidebar-open');
        }
    });
});
