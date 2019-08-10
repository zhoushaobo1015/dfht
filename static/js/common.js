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

        }
    })
    // 展示沙漏
    $("#Hourglass").modal('toggle');
    $("#Hourglass .modal-body").html('<div class="wrapper"><div class="loader"><div class="timerWrap"><svg version="1.1" viewBox="131.623 175.5 120 160" preserveAspectRatio="xMinYMin meet" class="timer"><path fill="#FFFFFF" d="M212.922,255.45l36.855-64.492c1.742-3.069,1.742-6.836-0.037-9.896c-1.783-3.06-5.037-4.938-8.581-4.938h-99.158c-3.524,0-6.797,1.878-8.569,4.938c-1.773,3.06-1.792,6.827-0.03,9.896l36.846,64.491l-36.845,64.492c-1.762,3.068-1.743,6.836,0.03,9.896c1.772,3.061,5.044,4.938,8.569,4.938h99.158c3.544,0,6.798-1.878,8.581-4.938c1.779-3.06,1.779-6.827,0.037-9.896L212.922,255.45z M142.001,324.86l39.664-69.41l-39.664-69.41h99.158l-39.663,69.41l39.663,69.41H142.001z"/></svg></div></div></div>')
    
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
    $("#Hourglass .modal-body").html(`<div class="wrapper"><div class="loader"><div class="timerWrap"><svg version="1.1" viewBox="131.623 175.5 120 160" preserveAspectRatio="xMinYMin meet" class="timer"><path fill="#FFFFFF" d="M212.922,255.45l36.855-64.492c1.742-3.069,1.742-6.836-0.037-9.896c-1.783-3.06-5.037-4.938-8.581-4.938
            h-99.158c-3.524,0-6.797,1.878-8.569,4.938c-1.773,3.06-1.792,6.827-0.03,9.896l36.846,64.491l-36.845,64.492
            c-1.762,3.068-1.743,6.836,0.03,9.896c1.772,3.061,5.044,4.938,8.569,4.938h99.158c3.544,0,6.798-1.878,8.581-4.938
            c1.779-3.06,1.779-6.827,0.037-9.896L212.922,255.45z M142.001,324.86l39.664-69.41l-39.664-69.41h99.158l-39.663,69.41
            l39.663,69.41H142.001z"/></svg></div></div></div>`)
}

$(function(){
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
});