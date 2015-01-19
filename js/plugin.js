/**
 * Created by sien on 2015/1/19 0019.
 */
;(function($){
    $.fn.myPlugin=function(){
        this.fadeIn('normal',function(){

        });
    };
})(jQuery);

;(function($){
    $.fn.maxHeight=function(){
        var max=0;
        this.each(function(){
            max=Math.max(max,$(this).height());
        });

        return max;
    }
})(jQuery);

;(function($){
    var methods={
        init:function(option){
            return this.each(function(){
                var $this=$(this),
                    data=$this.data('tooltip'),
                    tooltip=$('<div />',{
                        text:$this.attr('title')
                    });

                if(!data){
                    $(this).data('tooltip',{
                        target:$this,
                        tooltip:tooltip
                    });
                }
            });
        },
        destroy:function(){
            return this.each(function(){
                var $this=$(this),
                    data=$this.data('tooltip');

                $(window).unbind('.tooltip');
                data.tooltip.remove();
                $this.removeData('tooltip');
            })
        },

        show:function(){},
        hide:function(){},
        update:function(){}
    };

    $.fn.tooltip=function(method){
        if(methods[method]){
            return methods[method].apply();
        }else if(typeof method=='object'||!method){

        }else{

        }
    };
})(jQuery);

