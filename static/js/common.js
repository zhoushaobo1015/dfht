var onClickModule = function(id, type){
    if(type){
        $("#"+id).modal("show");
    }else{
        $("#"+id).modal("hide");
    }
}

$(function() {

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    var csrftoken = getCookie('csrftoken');
    
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    if ($('.page_datepicker').length > 0) {
        $('.page_datepicker').datepicker({
            format: 'yyyy-mm-dd',
            todayBtn: "linked",
            clearBtn: true,
            language: "zh-CN"
        });
    }

    // 选择框
    $('.selector').select2({
        matcher: matchStart
    });
    $('.selectors').select2({
        matcher: matchStart
    });
    function matchStart(params, data) {
        if ($.trim(params.term) === '') {
            return data;
        }
        if (typeof data.text === 'undefined') {
            return null;
        }
        let id = $(data.element).data('id')
        let pinyin = $(data.element).data('pinyin')
        if (typeof id === 'undefined' || typeof pinyin === 'undefined') {
            return null
        }
        pinyin = String(pinyin)
        if (data.text.indexOf(params.term) > -1 || pinyin.indexOf(params.term) > -1 || id.indexOf(params.term) > -1) {
            var modifiedData = $.extend({}, data, true);
            return modifiedData;
        }
        return null;
    }


    // 已选择的板块或成分股点击事件
    $('.center_wrap >div ul').on('dblclick', 'li', function() {
        $(this).remove();
    })

    // main4
	$('.pages .switch').click(function(){
		var $this = $(this);
        var $parent = $(this).parent();
        var $brother = $parent.siblings();
		$this.toggleClass('check');
		$parent.toggleClass("all");
        // $parent.animate();
		if($this.attr('class').indexOf('check')>-1){
            $brother.css('display','none');
			$this.html('<i class="fas fa-compress-arrows-alt"></i>')
        }else{
            $brother.css('display','flex');
			$this.html('<i class="fas fa-expand-arrows-alt"></i>')
		}
        
    })

    $('.page3_time_span_input').val(1);

    search1BtnClick('page1');
    search1BtnClick('page2');
    search1BtnClick('page3');

    // 点击查询按钮1
    function search1BtnClick(page) {
        $(`.${page} .search1_btn`).click(function() {
            $("#search1Popup").attr('data-page', page)
            $("#search1Popup").modal('toggle');
            getSearch1Data()
        })
    }

    search2BtnClick('page1');
    search2BtnClick('page2');
    search2BtnClick('page3');

    // 点击查询按钮2
    function search2BtnClick(page) {
        $(`.${page} .search2_btn`).click(function() {
            $("#search2Popup").attr('data-page', page)
            $("#search2Popup").modal('toggle');
            getSearch2Data()
        })
    }

    // 添加周期数目选项
    for (let i = 0; i < 20; i++) {
        $('.cycle_num_wrap .dropdown-menu').append(`<li class="dropdown-item">${i + 1}</li>`)
    }

    // 全屏展示下左page2
    $('.page2 .switch').click(function() {
        let display = 'flex'
        // if (!$('.page2').hasClass('all')) {
        //     display = 'none'
        // }
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

    // 全屏展示下右page3
    $('.page3 .switch').click(function() {
        let display = 'flex'
        // if (!$('.page3').hasClass('all')) {
        //     display = 'none'
        // }
        $('.page3 .left_search_wrap, .page3 .right_result_wrap').css('display', display)
    })

    // 查询弹框中的列表项点击事件
    $('.selected_list_wrap ul').on('dblclick', 'li', function() {
        $(this).remove()
    })

    // 查询弹框1中单标的选择和全部成分选择
    selectData('selector1')
    selectData('selector2')

    // 查询弹框2中指标选择
    selectData('target_selector')

    // 查询弹框中选择事件
    function selectData(className) {
        $(`.${className}`).on('select2:select', function(){
            // 判断标的选择查询1
            if(className === 'target_selector'){
                let mytargets = $('.page1_search1_data').val() || $('.page2_search1_data').val();
                mytargets = mytargets ? JSON.parse(mytargets) : [];
                if(mytargets.length > 1){
                    $(".target_selector").attr('disabled',true);
                }
            }

            if(className === "selector1" || className === "selector2"){
                let search2Data = $('.page1_search2_data').val() || $('.page2_search2_data').val() ;
                search2Data = search2Data ? JSON.parse(search2Data) : {myfeatures: [], outliers: '', standardize: ''};
                let { myfeatures, outliers, standardize } = search2Data;
                if(myfeatures.length>1){
                    $(".selector1").attr('disabled',true);
                    $(".selector2").attr('disabled',true);
                }
            }

            let checkedItem = $(this).find('option:checked')
            let id = checkedItem.data('id')
            let pinyin = checkedItem.data('pinyin')
            let text = checkedItem.text()
            if('selector2'!==className) {
                let canAdd = true
                let selector1Length = $('.selector1_wrap .list-group').children().length
                let selector2Length = $('.selector2_wrap .list-group').children().length
                if (className === 'selector1') {
                    // 如果selector2已经选了多个，并且selector1已经选了1个，不可继续添加
                    if (selector2Length > 1 && selector1Length === 1) {
                        canAdd = false
                    }
                } else if (className === 'selector2') {
                    // 如果selector1已经选了多个，并且selector2已经选了1个，不可继续添加
                    if (selector1Length > 1 && selector2Length === 1) {
                        canAdd = false
                    }
                }
    
                if (canAdd && !itemIsExist(id, className) && text !== '请选择：') {
                    $(`.${className}_wrap .list-group`).append(`<li class="list-group-item" data-id=${id} data-pinyin=${pinyin}>${text}</li>`)
                }
            }else{
                // let url = "/dfht/ajax_get_target/?id="+id+"&detail=0"; //上线解开这个即可
                let url = './static/json/sample_组.json'; //上线需要删除
                $.get(url,function(res){
                    // let result = JSON.parse(res);  //上线解开
                    let result = res;   //上线需要删除
                    if(result.memberlist.length>0){
                        let li = ""
                        for(let i=0;i<result.memberlist.length;i++){
                            li += `<li class="list-group-item" data-id=${result.memberlist[i]["id"]} data-pinyin=${result.memberlist[i]["pinyin"]}>${result.memberlist[i]["text"]}</li>`
                        }
                        $(`.${className}_wrap .list-group`).append(li);
                    }
                });
            }
        })
    }

    // 判断选择的选项是否已在列表中
    function itemIsExist(id, className) {
        let exist = false
        $(`.${className}_wrap .list-group`).children().each(function(i, item) {
            if (id === $(item).data('id')) {
                exist = true
            }
        })
        return exist
    }

    // 查询弹框1的加入按钮点击事件
    addBtnClick('selector1', 'search1Popup')
    addBtnClick('selector2', 'search1Popup')

    // 查询弹框2的加入按钮点击事件
    addBtnClick('target_selector', 'search2Popup')

    // 查询弹框的加入按钮点击事件
    function addBtnClick(className, targetId) {
        $(`.${className}_wrap .add_btn`).click(function() {
            let listGroup = $(`.${className}_wrap .selected_item_wrap .list-group`)
            let items = listGroup.children()
            Array.prototype.slice.call(items).map(item => {
                let id = $(item).data('id')
                let pinyin = $(item).data('pinyin')
                let text = $(item).text()
                if (!itemIsSelected(id, targetId)) {
                    $(`#${targetId} .selected_list_wrap .list-group`).append(`<li data-id=${id} data-pinyin=${pinyin} class="list-group-item">${text}</li>`)
                }
            })
            listGroup.empty()
        })
    }

    // 选择的选项是否已在左侧已选中的列表中
    function itemIsSelected(id, targetId) {
        let selected = false
        $(`#${targetId} .selected_list_wrap .list-group`).children().each(function(i, item) {
            if (id === $(item).data('id')) {
                selected = true
            }
        })
        return selected
    }

    // 请求查询弹框1需要的数据
    function getSearch1Data() {
        var sessionS = sessionStorage.getItem('myoptions');
        let { group, macro, sector, ticket } = JSON.parse( sessionS )
        // 查询1单标的选择数据
        let select1Data = [ ...macro, ...sector, ...ticket, ...group]
        // 查询1全部成分数据
        let select2Data = [...sector, ...group]
        appendData(select1Data, 'selector1');
        appendData(select2Data, 'selector2');
        
        function appendData(selectData, className) {
            var frag = document.createDocumentFragment();
            if (selectData.length > 0) {
                frag.append($('<option>请选择：</option>')[0])
            }
            selectData.map(data => {
                frag.append($(`<option data-id=${data.id} value=${data.pinyin} data-pinyin=${data.pinyin}>${data.text}</option>`)[0])
            })
            $(`.${className}_wrap .${className}`).html(frag)
        }
    }

    // 请求查询弹框2需要的数据
    function getSearch2Data() {
        var sessionS = sessionStorage.getItem('myoptions');
        let { features } = JSON.parse( sessionS );
        var frag = document.createDocumentFragment();
        if (selectData.length > 0) {
            frag.append($('<option>请选择：</option>')[0])
        }
        features.map(data => {
            frag.append($(`<option data-id=${data.id} val=${data.pinyin} data-pinyin=${data.pinyin}>${data.text}</option>`)[0])
        })
        $(`.target_selector_wrap .target_selector`).html(frag)
    }
});