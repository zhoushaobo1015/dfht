// main3 
var onClickMain3Btn1Fn = function(){
    $.ajax({
        url: "",
        type: "",
        data: "",
        success: function(res){
            if(res.status===200){
                $("#Hourglass .modal-body").html('<div class="wrappers"><div><i class="fa fa-check" aria-hidden="true" style="margin-right:10px;"></i>强制更新成功</div></div>')
            }else{
                $("#Hourglass .modal-body").html('<div class="wrappers"><div><i class="fa fa-times" aria-hidden="true" style="margin-right:10px;"></i>更新失败</div></div>')
            }
        },
        error: function(err){
            $("#Hourglass .modal-body").html('<div class="wrappers"><div><i class="fa fa-times" aria-hidden="true" style="margin-right:10px;"></i>更新失败</div></div>')
        }
    })
    // 展示沙漏
    $("#Hourglass").modal('toggle');
    $("#Hourglass .modal-body").html('<i class="fa fa-hourglass-start fa-spin fa-3x fa-fw margin-bottom"></i>')
}

var onClickMain3Btn2Fn = function(){
    $("#date-list").modal('toggle');
}

var onClickMain3Btn3Fn = function(){
    $.ajax({
        url: "",
        type: "",
        data: "",
        success: function(res){
            
        },
        error: function(err){

        }
    })
    $("#Hourglass").modal('toggle');
    $("#Hourglass .modal-body").html('<i class="fa fa-hourglass-start fa-spin fa-3x fa-fw margin-bottom"></i>')
}

$(function(){
    var myoptions_data = null
	$('.pages .switch').click(function(){
		var $this = $(this);
		var $parent = $(this).parent();
		$this.toggleClass('check');
		$parent.toggleClass("all");
		$parent.animate()
		if($this.attr('class').indexOf('check')>-1){
			$this.html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>')
		}else{
			$this.html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>')
        }
        
    })
    
    // 添加周期数目选项
    for (let i = 0; i < 20; i++) {
        $('.cycle_num_wrap .dropdown-menu').append(`<li class="dropdown-item">${i + 1}</li>`)
    }
    // 全屏展示下左page2
    $('.page2 .switch').click(function() {
        let display = 'flex'
        if (!$('.page2').hasClass('all')) {
            display = 'none'
        }
        $('.page2 .left_search_wrap, .page2 .right_result_wrap').css('display', display)
    })
    
    // 选择时间跨度
    $('.page2 .time_span_wrap .dropdown-menu').on('click', 'li', function() {
        $('.page2 .selected_time_span').text($(this).text())
    })

    // 选择周期数目
    $('.page2 .cycle_num_wrap .dropdown-menu').on('click', 'li', function() {
        $('.page2 .selected_cycle_num').text($(this).text())
    })
    
    // $.get('./static/json/myoptions.json',function(res){
    //     myoptions_data = res;
    //     $("#main1-select1").select2({ 
    //         data: res.features,
    //         // matcher: matchCustom,
    //     });
    // });

    // main4 page1 切换tab
    $('.page1 .right_result_wrap .tab_wrap').on('click', 'span', function() {
        changeTabClass($(this))
    })

    // main4 page2 切换tab
    $('.page2 .right_result_wrap .tab_wrap').on('click', 'span', function() {
        changeTabClass($(this))
    })
    
    // 改变tab样式
    function changeTabClass(el) {
        el.addClass('active')
        el.siblings().removeClass('active')
    }
});

