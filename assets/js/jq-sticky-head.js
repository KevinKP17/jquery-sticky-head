(function (window, $, document, undefined) {

    var pluginName = "stickyHeader";

    /**
     * @TODO separate the CSS
     * @TODO add option to anchor on different section of body
     * */
    $.fn[pluginName] = function (opts) {
        return this.each(function () {
            console.log(opts)
            if(typeof opts == 'object' || typeof opts == 'undefined'){
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName,
                        new stickyHeader(this, opts));
                }
            }else if(typeof opts == 'string' && $.data(this, 'plugin_' + pluginName)){
                var sticky = $.data(this, 'plugin_' + pluginName);

                switch(opts){
                    case "destroy" :  sticky.destroy(this);
                }
            }
        });
    };

    $.fn[pluginName].destroy = function(){
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                console.log("haha");
            }
        });
    };

    var stickyHeader = function (el, opts) {
        var
            that = this,
            $opts = $.extend(stickyHeader.OPTS, opts),
            $wrap = $('<div class="jsh-wrapper"></div>'),
            $el = $(el),
            $win = $(window),
            elHeight = $el.outerHeight(),
            offset = $opts.offset,
            scrollDown = true,
            scrollUp = true;

        that.isInit = true;
        that.addCss();

        $el.wrap($wrap);
        $wrap.css('height', elHeight);

        $win.scroll(function () {
            if(that.isInit){
                if ($win.scrollTop() > offset) {
                    //if down
                    if(scrollDown)
                        that.applySticky($el, $opts.onSticky);
                    scrollDown = false;
                    scrollUp = true;
                } else {
                    //if up
                    if(scrollUp)
                        that.releaseSticky($el, $opts.onSticked);
                    scrollUp = false;
                    scrollDown = true;
                }
            }
        });
    };

    stickyHeader.OPTS = {
        offset: 0,
        onSticky: function () {
        },
        onSticked: function () {
        }
    };

    stickyHeader.prototype.addCss = function () {
        var styles =
            "<style>" +
            ".jsh-wrapper{" +
            "   position: relative;" +
            "}" +
            ".jsh-wrapper .is-sticky{" +
            "   position:fixed;" +
            "   left: 50%;" +
            "   transform: translateX(-50%);" +
            "   z-index: 99;" +
            "}" +
            "</style>";
        $('head').append(styles);
    };

    stickyHeader.prototype.applySticky = function ($el, callback) {
        $el.addClass('is-sticky');
        callback();
    };

    stickyHeader.prototype.releaseSticky = function ($el, callback) {
        $el.removeClass('is-sticky');
        callback();
    };

    stickyHeader.prototype.destroy = function(el, callback){
        var $el = $(el);
        var cfn = typeof callback == 'function'? callback : function(){};
        var target = $el.parent();

        if(target.is('.jsh-wrapper')){
            $el.unwrap();
            this.isInit = false;
            cfn();
        }else{
            console.log("nothing to destroy");
        }
    }


}(window, jQuery, document, undefined));
