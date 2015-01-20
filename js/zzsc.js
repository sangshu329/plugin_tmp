$(function () {

    // 官网首页banner轮播焦点按钮居中处理
    var lilen = $(".banner-nav").find("li").size();
    var ulwidth = lilen * 16 + (lilen - 1) * 8;
    var winwidth = $(window).width();
    if (winwidth < 1180) {
        winwidth = 1180;
    }
    var leftpos = parseFloat((winwidth - ulwidth) * 50 / winwidth);
    $(".banner-nav").css("left", leftpos + "%");
});

//轮播组件
(function (win) {
    win.timerFID = '';
    win.slider = {
        currentFocusI: 0,
        changeingFocus: false, /*    判断是否处于动画过程中 */
        navflag: false, /*    判断是否处于nav点击动画过程中 */
        speed: 800,
        init: function (o) {
            var that = this;
            that.o = o;
            /*banner-bg*/
            that.list = o.find('div.banner');
            that.bannerBg = o.find('.banner-bg');

            /*banner-nav*/
            that.nav = o.find('.banner-nav li');

            /*banner-bar-bg*/
            that.bar = o.find('.banner-bar');
            that.initlist();
            /*为nav li 赋值*/
            that.bindNav();
            that.starFocustAm();
            that.bindIEClick();
            /* 兼容性 */
        },
        bindNav: function () {
            var that = this;
            that.nav.bind('click', function (e) {
                var cur = $(e.currentTarget), i = 0;
                that.bar.stop();
                that.bar.css({'width': '0'});
                if (that.navflag)return false;
                if (!cur.hasClass('active')) {
                    that.navflag = true;
                    //计算当前active 值
                    that.animateOut(that.o.find('.banner-nav li.active').attr('i'));
                    if (cur.attr('i') == '0') {
                        i = that.nav.length - 1;
                    } else {
                        i = parseInt(cur.attr('i')) - 1;
                    }
                    that.animateIn(i);
                }
            });
        },
        initlist: function () {
            var that = this;
            //计算当前active 值
            for (var i = 0; i < that.nav.length; i++) {
                that.nav.eq(i).attr('i', i);
            }
        },
        barAnimate: function (callback) {
            var that = this;
            that.bar.animate({'width': '100%'}, 55500, 'linear', callback);
        },
        animateIn: function (i) {  /*  i指切换前的num   */
            var that = this, o, bg, ci;
            that.stopFocusAm();
            if (i == that.list.length - 1) {
                o = that.list.eq(0);
                ci = 0;
            } else {
                o = that.list.eq(i + 1);
                ci = i + 1;
            }
            bg = o.attr('data-bg');
            that.changeBg(bg, function () {
                that.nav.removeClass('active');
                that.nav.eq(ci).addClass('active');

                o.find('.banner-img').eq(0).animate({'left': '0'}, that.speed, 'easeOutCubic');
                o.find('.banner-img').eq(1).animate({'left': '0'}, that.speed + 200, 'easeOutCubic');
                o.find('.banner-img').eq(2).animate({'left': '0'}, that.speed + 400, 'easeOutCubic', function () {
                    that.currentFocusI = ci;
                    that.changeingFocus = false;
                    that.navflag = false;
                    that.starFocustAm();
                });
            });
        },
        animateInNext: function (i) {
            var that = this, o, bg, ci;
            that.stopFocusAm();
            if (i == that.list.length - 1) {
                o = that.list.eq(0);
                ci = 0;
            } else {
                o = that.list.eq(that.currentFocusI + 1);
                ci = that.currentFocusI + 1;
            }
            bg = o.attr('data-bg');
            that.changeBg(bg, function () {
                that.nav.removeClass('active');
                that.nav.eq(ci).addClass('active');

                o.find('.banner-img').eq(0).animate({'left': '0'}, that.speed, 'easeOutCubic');
                o.find('.banner-img').eq(1).animate({'left': '0'}, that.speed + 200, 'easeOutCubic');
                o.find('.banner-img').eq(2).animate({'left': '0'}, that.speed + 400, 'easeOutCubic', function () {
                    that.currentFocusI = ci;
                    that.changeingFocus = false;
                    that.navflag = false;
                    that.starFocustAm();
                });
            });
        },
        /**
         * 当前slider 退出动画
         * @param i
         */
        animateOut: function (i, callback) {

            var that = this, o = that.list.eq(i);
            o.find('.banner-img').eq(0).animate({'left': '150%'}, that.speed + 200, 'easeOutCubic', function () {
                o.find('.banner-img').eq(0).css({'left': '-150%'});
                callback && callback();
            });
            o.find('.banner-img').eq(1).animate({'left': '150%'}, that.speed, 'easeOutCubic', function () {
                o.find('.banner-img').eq(1).css({'left': '-150%'});
            });
            o.find('.banner-img').eq(2).animate({'left': '150%'}, that.speed + 400, 'easeOutCubic', function () {
                o.find('.banner-img').eq(2).css({'left': '-150%'});
            });
        },
        nextSlider: function () {
            var that = this, _slider, i;
            if (that.changeingFocus) return;
            that.changeingFocus = true;
            //判断是否是最后一个
            if (that.currentFocusI == that.list.length - 1) {
                _slider = that.list.eq(0);
                i = 0;
            } else {
                _slider = that.list.eq(that.currentFocusI + 1);
                i = that.currentFocusI + 1;
            }

            //初始化下个slider img的位置

            _slider.find('.banner-img').stop(false, true);
            _slider.find('.banner-img').css({'left': '-150%'});

            //初始化进度条
            that.barAnimate(function () {
                that.bar.stop();
                that.bar.css({'width': '0'});

                var ci = that.currentFocusI;
                that.animateOut(ci, function () {
                    that.animateInNext(ci);
                });
            });

        },
        changeBg: function (color, callback) {
            var that = this;
            that.bannerBg.fadeOut(500, function () {
                $(this).css('background-image', 'url(' + color + ')').delay(50).fadeIn(500, callback);
            });
        },
        starFocustAm: function () {
            var that = this;
            win.timerFID = setInterval(function () {
                that.nextSlider();
            }, 100);
        },
        stopFocusAm: function () {
            clearInterval(win.timerFID);
        },
        bindIEClick: function () {
            var that = this;
            /*解决IE6，7链接点击失效问题*/
            if ($.browser.msie && ( $.browser.version == '6.0' || $.browser.version == '7.0' )) {
                that.list.bind("click", function () {
                    window.location.href = $(this).attr("href");
                    return false;
                });
            }
        }
    };
})(window);
//初始化轮播组件
window.slider.init($('.slide-banner'));