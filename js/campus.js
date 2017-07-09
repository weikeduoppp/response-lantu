/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-05-05 18:06:35
 * @version $Id$
 */

// part1  控制高度
(function(){
    // 页面高-content高
    var $part = $("#part1");
    var $content = $("#content");  //marginTop
    $(window).resize(setHeight);
    setHeight();
    function setHeight(){
        var height = $(window).height()-parseFloat($content.css("marginTop"));
        $part.css("height",height);
    }
})();

// part3 图像排列,切换
(function(){
    var $imgLi = $("#part3 .wrap .center ul li"),
        $tabLi = $("#part3 .wrap .third li"),
        length = $imgLi.length,
        index = 0,
        timer = null;
    $imgLi.each(function(i){
        $(this).css({
            "background-position": "0 "+(-i*100)+"%",   //百分比拼接.
        });
    });
    $tabLi.click(function(){
        clearInterval(timer);
        $(this).addClass("active").siblings().removeClass("active");
        index = $(this).index();
        $imgLi.eq(index).addClass("active").siblings().removeClass("active");
        auto();
    });
    // 轮播
    auto();
    function auto(){
        timer = setInterval(function(){
            index++;
            index %= length;
            $tabLi.eq(index).addClass("active").siblings().removeClass("active");
            $imgLi.eq(index).addClass("active").siblings().removeClass("active");
        },3000);
    }
})();

// part 点击跳转
(function(){
    $btn = $("#content .part .btn"),
    $part = $("#content .part"),
    length = $btn.length;
    $btn.click(function(){
        // 如果不给 .index() 方法传递参数，那么返回值就是这个jQuery对象集合中第一个元素相对于其同辈元素的位置。
        // 限制住index()
        var index = $(this).parents(".part").index(".part")+1;
        // 居中
        // scrollTop等于下一个part的offset.top- 上边距-header.height()
        scrollTop = $part.eq(index).offset().top - ($(window).height()-$part.eq(index).height()-71)/2-71;
        // 兼容谷歌.火狐
        $("body,html").animate({
            "scrollTop":scrollTop
        },800);
    })
})();