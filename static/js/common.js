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
    
    // $.get('./static/json/myoptions.json',function(res){
    //     myoptions_data = res;
    //     $("#main1-select1").select2({ 
    //         data: res.features,
    //         // matcher: matchCustom,
    //     });
    // });

    
    

});
