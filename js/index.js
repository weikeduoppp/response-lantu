/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-05-01 14:26:02
 * @version $Id$
 */

/* #header  start */

(function(){
    var $more = $("#header .more");
    $more.click(function(){
        $(this).find(".more-hide").fadeToggle();
    })
})();

/* header   end */

/* banner start */

(function(){
    var $banner = $("#banner"),
        $part = $("#banner .b-part .part"),
        $tab = $("#banner .b-tab li"),
        length = $part.length,
        index = 0,
        timer = null;
    $part.eq(0).show();
    $tab.eq(0).addClass("active");
    $tab.click(function(){
        var i = $(this).index();
        if(i !== index){ //不是自己.
            change(function(i){
                index = i;
            }.bind(this,i))
        }
    });
    $banner.hover(function(){
        clearInterval(timer);
    },auto);
    auto();
    function auto(){
        timer = setInterval(function(){
            change(function(){
                index++;
                index %= length;
            })
        },2000);
    }
    function change(fn){
        $part.eq(index).fadeOut(300);
        $tab.eq(index).removeClass("active");
        fn&&fn();
        $part.eq(index).fadeIn(300);
        $tab.eq(index).addClass("active");
    }
})();

/* banner end */

/* classic start */
(function(){
    var $ul = $("#classic .c-main ul"),
         $li = $ul.children(),
         $btn = $("#classic .btn div"),
         $tab = $("#classic .tab li"),
         length = $li.length,
         midIndex = Math.floor(length/2);
         width = $li.width(),
         sumWidth = 0,
         clickTime = 0,
         timer = null;
    changeClassName();
    //等 transition .3s.
    setTimeout(function(){
        $li.each(function(){
            sumWidth += $(this).width();
        });
        // 通过绝对定位 同时获取 li的总宽
        $ul.css("marginLeft",-sumWidth/2+"px").css("opacity",1);
    },300)
    // 页面宽度变化  响应
    $(window).resize(function(){
        // 等页面变化了
        clearTimeout(timer);
        // li宽度改变了  sumWidth重新赋值.
        timer = setTimeout(function(){
            // 重新获取
            width = $ul.children().first().width();
            sumWidth = 0;
            $li.each(function(){
                sumWidth += $(this).width();
            });
            // 通过绝对定位 同时获取 li的总宽
            $ul.animate({"marginLeft":-sumWidth/2+"px"},300);
        },300);
    })
    // 左右点击
    $btn.click(function(){
        // 控制点击时间
        if( (new Date() - clickTime) > 350 ){
            if($(this).index()){
                midIndex++;
                midIndex %= length;
                // 同时ul要向左偏移一个li的距离
                $ul.stop().animate({"marginLeft":(-sumWidth/2-width)+"px"},300,function(){
                    // 让第一个li去最后.还原ulmarginLeft  ,li动态变化.需重新获取$(this).children().first()
                    $(this).append($(this).children().first()).css("marginLeft",-sumWidth/2+"px");
                })
            }else{
                midIndex--;
                if(midIndex<0)midIndex=length-1;
                // 同时ul要向右偏移一个li的距离
                $ul.stop().animate({"marginLeft":(-sumWidth/2+width)+"px"},300,function(){
                    // 让最后一个li到最前.
                    $(this).prepend($(this).children().last()).css("marginLeft",-sumWidth/2+"px");
                })
            }
            changeClassName();
            clickTime = new Date();
        }
    })
    // 替换类名
    function changeClassName(){
        var a = midIndex,b = a-1,c = a+1;
        if(b<0)b=length-1;
        if(c>=length)c=0;
        $li.removeClass("mid slide");
        $tab.removeClass("mid slide");
        $li.eq(a).addClass("mid");
        $li.eq(b).addClass("slide");
        $li.eq(c).addClass("slide");
        $tab.eq(a).addClass("mid");
        $tab.eq(b).addClass("slide");
        $tab.eq(c).addClass("slide");
    };


})();


/* classic end */