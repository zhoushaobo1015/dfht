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
	$('.pages .switch').click(function(){
		var $this = $(this);
		var $parent = $(this).parent();
		$this.toggleClass('check');
		$parent.toggleClass("all");
		$parent.animate()
		if($this.attr('class').indexOf('check')>-1){
			$this.html('<i class="fas fa-compress-arrows-alt"></i>')
        }else{
			$this.html('<i class="fas fa-expand-arrows-alt"></i>')
		}
    })
    
    // page3 tags 切换
    $(".page3-table ol li").on("click",function(){
        let $ol_this = $(this);
        $ol_this.addClass("selected");
        $ol_this.siblings().removeClass("selected");

        var data = {"columns":["现值","百分位","平均","最低","1/4位","中位数","3/4位","最高","标准差"],"index":["上证成份","上证50","沪深300","中证1000","中证500","中证全指","全指能源","全指材料","全指工业","全指可选","赣粤高速","航天信息","开开实业","嘉化能源","恒瑞医药","亿利洁能","东方创业","重庆港九","中央商场","太化股份"],"data":[[12.69,"23.90%",14.24,10.55,12.76,14.81,15.66,17.12,1.7],[9.82,"33.43%",10.23,8.52,9.59,10.13,10.76,13.05,0.82],[12.24,"28.45%",12.88,9.98,12.09,13.03,13.88,15.76,1.2],[37.34,"49.45%",42.86,19.4,30.68,37.43,46.94,79.35,18.15],[23.24,"38.67%",31.22,14.8,21.86,26.63,34.5,58.3,13.77],[16.02,"27.35%",18.01,12.31,15.76,18.7,20.03,23.16,2.83],[13.83,"4.01%",29.87,12.68,16.29,21.47,25.42,82.25,20.99],[16.43,"28.87%",114.22,11.46,16.16,26.4,39.06,1358.9,199.91],[21.12,"27.35%",26.81,16.01,20.77,26.16,32.35,41.1,7.1],[26.19,"73.07%",23.65,14.64,22.16,24.67,26.36,29.74,3.95],[6.95,"7.37%",10.78,6.12,9.5,10.51,12.51,14.73,2.07],[21.01,"3.76%",29.76,20.05,23.63,30.17,35.21,44.44,6.3],[69.79,"44.85%",127.09,35.56,51.73,93.55,161.89,340.74,91.17],[13.61,"34.35%",14.67,10.39,12.38,15.34,16.4,22.14,2.24],[68.71,"74.83%",59.98,41.33,48.89,60.69,68.75,90.47,12.09],[14.73,"0.70%",46.24,14.33,22.23,50.57,69.96,112.33,24.66],[32.64,"31.85%",44.02,21.15,30.15,42.07,53.25,93.33,16.14],[23.17,"34.91%",35.05,5.25,8.21,31.82,59.96,80.9,24.57],[-10.18,"15.02%",122.81,-19.64,30.68,39.61,94.7,586.21,172.48],[-21.57,"9.04%",143.04,-26.78,-13.71,138.98,186.39,743.52,175.57]]}
        var thead = "<tr>"
        for(var i=0;i<=data.columns.length;i++){
            thead += "<th>"+data.columns[i]+"</th>"
        }
        thead += "</tr>"
        

        $(".page3-table-content thead").html(thead)

    })
    

});
