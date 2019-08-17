var requestData = function(url,type,data){
    console.log( url,type,data )
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
}

// 查询1
var onShowSelect1Get = function() {
    $.get("/static/json/myoptions.json",function(result){
        let { group, macro, sector, ticket } = result
        // 查询1单标的选择数据
        let select1Data = [...group, ...macro, ...sector, ...ticket]
        // 查询1全部成分数据
        let select2Data = [...ticket, ...group]
        appendData(select1Data, 'selector1')
        appendData(select2Data, 'selector2')
    });
    
    function appendData(selectData, className) {
        var frag = document.createDocumentFragment();
        if (selectData.length > 0) {
            frag.append($('<option>请选择：</option>')[0])
        }
        selectData.map(data => {
            frag.append($(`<option data-id=${data.id} value=${data.pinyin} data-pinyin=${data.pinyin}>${data.text}</option>`)[0])
        })
        $(`.${className}_wrap .${className}`).append(frag)
    }
}


// 查询2
var onShowSelect2Get = function() {
    $.get("/static/json/myoptions.json",function(result){
        let features = result.features
        var frag = document.createDocumentFragment();

        let selectData = $(".target_selector").on('select2:select', function(){
            let checkedItem = $(this).find('option:checked')
            let id = checkedItem.data('id')
            let pinyin = checkedItem.data('pinyin')
            let text = checkedItem.text()

            let canAdd = true
            let selector1Length = $('.selector1_wrap .list-group').children().length
            let selector2Length = $('.selector2_wrap .list-group').children().length
            if ('target_selector' === 'selector1') {
                // 如果selector2已经选了多个，并且selector1已经选了1个，不可继续添加
                if (selector2Length > 1 && selector1Length === 1) {
                    canAdd = false
                }
            } else if ('target_selector' === 'selector2') {
                // 如果selector1已经选了多个，并且selector2已经选了1个，不可继续添加
                if (selector1Length > 1 && selector2Length === 1) {
                    canAdd = false
                }
            }

            let exist = false
            $(`.target_selector_wrap .list-group`).children().each(function(i, item) {
                if (id === $(item).data('id')) {
                    exist = true
                }
            })

            if (canAdd && !exist && text !== '请选择：') {
                $(`.target_selector_wrap .list-group`).append(`<li class="list-group-item" data-id=${id} data-pinyin=${pinyin}>${text}</li>`)
            }
        })

        if (selectData.length > 0) {
            frag.append($('<option>请选择：</option>')[0])
        }
        features.map(data => {
            frag.append($(`<option data-id=${data.id} val=${data.pinyin} data-pinyin=${data.pinyin}>${data.text}</option>`)[0])
        })
        $(`.target_selector_wrap .target_selector`).append(frag)
    });
}


// main3 btn1
var onClickMain3Btn1Fn = function(){
    // 展示沙漏
    $("#Hourglass").modal('toggle');
    $("#Hourglass .modal-body").html('<i class="fa fa-hourglass-start fa-spin fa-3x fa-fw margin-bottom"></i>');

    requestData("url","type","data");
}

var onClickMain3Btn3Fn = function(){
    $("#Hourglass").modal('toggle');
    $("#Hourglass .modal-body").html('<i class="fa fa-hourglass-start fa-spin fa-3x fa-fw margin-bottom"></i>');

    requestData("url","type","data");
}

var onClickMain3Btn2Fn = function(id){
    $form_control_value = $(".form_date .page3_startdate").val();
    if($form_control_value === '请选择时间' || !$form_control_value){
        return false;
    }
    $("#"+id).modal('hide');
    $("#Hourglass").modal('toggle');
    $("#Hourglass .modal-body").html('<i class="fa fa-hourglass-start fa-spin fa-3x fa-fw margin-bottom"></i>');

    requestData("url","type","data");

}


// main3 btn4
var onClickMain3Btn4Fn = function(){
    // $("#search1Popup").attr('data-page', page)
    $("#search1Popup").modal('toggle');
    onShowSelect1Get();
    $('#search1Popup .selector1').val("").trigger("change")
}

// main3 btn5
var onClickMain3Btn5Fn = function(){
    $("#search1Popup").modal('toggle');
    onShowSelect1Get();
    $('#search1Popup .selector1').val("").trigger("change");

    // $("#search2Popup").modal('toggle');
    // onShowSelect2Get();
    // $('#search2Popup .selector').val("").trigger("change");

}

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
            format: 'yyyy-mm-dd'
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
        if (typeof id === 'undefined') {
            return null
        }
        if (data.text.indexOf(params.term) > -1 || data.id.indexOf(params.term) > -1 || id.indexOf(params.term) > -1) {
            var modifiedData = $.extend({}, data, true);
            return modifiedData;
        }
        return null;
    }

    // 添加板块事件
    $('.ticket_detail_wrap .right_wrap .add_wrap').click(function() {
        let checkedOption = $('.right_wrap .segments_selector_wrap .selectors').find('option:checked');
        let id = checkedOption.data('id')
        let text = checkedOption.text()
        if (!id || itemIsExist(id, 'selected_segments')) {
            return
        }
        $('.selected_segments_wrap ul').append(`<li data-id=${id} class="list-group-item">${text}</li>`)
    })

    

    // main2-输入股票代码后取消按钮点击事件
    $('.segments_selector_wrap .cancel_btn').click(function() {
        $('.ticket_detail_wrap').addClass('hide')
    })

    // 添加股票事件
    $('.add_segments_wrap .right_wrap .add_wrap').click(function() {
        let checkedOption = $('.right_wrap .ticket_selector_wrap .selectors').find('option:checked');
        let id = checkedOption.data('id')
        let text = checkedOption.text()
        if (!id || itemIsExist(id, 'selected_cfg')) {
            return
        }
        $('.selected_cfg_wrap ul').append(`<li data-id=${id} class="list-group-item">${text}</li>`)
    })

    // main2-输入板块代码后取消按钮点击事件
    $('.add_segments_wrap .cancel_btn').click(function() {
        $('.add_segments_wrap').addClass('hide');
        $('.add_segments_wrap .ticket_selector_wrap .confirm_btn').removeAttr('data-type')
    })

    // 已选择的板块或成分股点击事件
    $('.center_wrap >div ul').on('dblclick', 'li', function() {
        $(this).remove();
    })

    // 添加板块按钮点击事件
    $('.container .top_wrap .add_btn').click(function() {
        $('.add_segments_wrap').removeClass('hide')
        $('.ticket_detail_wrap').addClass('hide')
        // 清空数据
        $('.add_segments_wrap .notes').val('')
        $('.add_segments_wrap .code_input').val('')
        $('.add_segments_wrap .grouping_selector_wrap .selector').val('').select2()
        $('.add_segments_wrap .name_input').val('')
        $('.add_segments_wrap .main2_startdate').val('');   
        $('.add_segments_wrap .type_selector_wrap .selector').val('').select2();
        // $(".right_wrap .ticket_selector_wrap .selectors").html('').select2();
        $('.selected_cfg_wrap ul').empty();
        var sessionS = sessionStorage.getItem('myoptions');
        let {ticket} = JSON.parse( sessionS );

        var frag = document.createDocumentFragment();
        if (ticket.length > 0) {
            frag.append($('<option>请选择~：</option>')[0])
        }
        ticket.map(data => {
            frag.append($(`<option data-id=${data.id} val=${data.pinyin} data-pinyin=${data.pinyin}>${data.text}</option>`)[0])
        })
        $(".right_wrap .ticket_selector_wrap .selectors").append(frag);

        // 加上data-type="add"，表示这是添加板块
        $('.add_segments_wrap .ticket_selector_wrap .confirm_btn').attr('data-type', 'add')
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
            let checkedItem = $(this).find('option:checked')
            let id = checkedItem.data('id')
            let pinyin = checkedItem.data('pinyin')
            let text = checkedItem.text()

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

    // 查询1弹框选定按钮点击事件
    $('.search1_confirm_btn').click(function() {
        let selectedListGroup = $('#search1Popup .selected_list_wrap .list-group')
        let dataArr = getSelectedListData(selectedListGroup)
        // 获取到所有选中的数据
        console.log('dataArr', dataArr)
        // 获得弹框时从哪个page点击弹出的
        let page = $('#search1Popup').data('page')
        $(`.${page}_search1_data`).val(JSON.stringify(dataArr))
        // 清空数据
        selectedListGroup.empty()
        $('#search1Popup .selector1_wrap .selected_item_wrap ul').empty()
        $('#search1Popup .selector2_wrap .selected_item_wrap ul').empty()
        // 关闭弹框
        $("#search1Popup").modal('toggle');
        $('#search1Popup').removeAttr('data-page');
        
        if( $(".main3").length > 0 ){
            $("#search2Popup").modal('toggle');
            onShowSelect2Get();
            $('#search2Popup .selector').val("").trigger("change");
        }
    })

    // 获取选择的列表数据
    function getSelectedListData(selectedListGroup) {
        let selectedItems = selectedListGroup.children()
        let dataArr = []
        Array.prototype.slice.call(selectedItems).map(item => {
            let id = $(item).data('id')
            let pinyin = $(item).data('pinyin')
            let text = $(item).text()
            dataArr.push({
                id,
                pinyin,
                text
            })
        })
        return dataArr
    }

    // 查询2弹框选定按钮点击事件
    $('.search2_confirm_btn').click(function() {
        let selectedListGroup = $('#search2Popup .selected_list_wrap .list-group')
        let dataArr = getSelectedListData(selectedListGroup)
        console.log('dataArr', dataArr)

        // 获取数据预处理和标准化处理选中的值
        let checkedRadio = $('#search2Popup .data_preprocessing_radio_wrap .radio input:checked')
        let outliers = Number(checkedRadio.val())
        let checkedRadio2 = $('#search2Popup .standard_preprocessing_radio_wrap .radio input:checked')
        let standardize = Number(checkedRadio2.val())
        console.log('outliers', outliers)
        console.log('standardize', standardize)

        // 获取到所有选中的数据，存入隐藏的input中
        let data = {
            myfeatures: dataArr,
            outliers,
            standardize
        }
        // 获得弹框时从哪个page点击弹出的
        let page = $('#search2Popup').data('page')
        $(`.${page}_search2_data`).val(JSON.stringify(data))

        // 清空数据
        selectedListGroup.empty()
        $('#search2Popup .target_selector_wrap .selected_item_wrap ul').empty()
        initRadio()
        // 关闭弹框
        $("#search2Popup").modal('toggle');
        $('#search2Popup').removeAttr('data-page')
    })
    
    // 初始化单选按钮
    function initRadio() {
        $('.data_preprocessing_radio_wrap .radio:first input').attr('checked', 'checked')
        $('.standard_preprocessing_radio_wrap .radio:first input').attr('checked', 'checked')
    }

    // 请求查询弹框1需要的数据
    function getSearch1Data() {
        $.get("/static/json/myoptions.json",function(result){
            let { group, macro, sector, ticket } = result
            // 查询1单标的选择数据
            let select1Data = [...group, ...macro, ...sector, ...ticket]
            // 查询1全部成分数据
            let select2Data = [...ticket, ...group]
            appendData(select1Data, 'selector1')
            appendData(select2Data, 'selector2')
        });
        
        function appendData(selectData, className) {
            var frag = document.createDocumentFragment();
            if (selectData.length > 0) {
                frag.append($('<option>请选择：</option>')[0])
            }
            selectData.map(data => {
                frag.append($(`<option data-id=${data.id} value=${data.pinyin} data-pinyin=${data.pinyin}>${data.text}</option>`)[0])
            })
            $(`.${className}_wrap .${className}`).append(frag)
        }
    }

    // 请求查询弹框2需要的数据
    function getSearch2Data() {
        $.get("/static/json/myoptions.json",function(result){
            let features = result.features
            var frag = document.createDocumentFragment();
            if (selectData.length > 0) {
                frag.append($('<option>请选择：</option>')[0])
            }
            features.map(data => {
                frag.append($(`<option data-id=${data.id} val=${data.pinyin} data-pinyin=${data.pinyin}>${data.text}</option>`)[0])
            })
            $(`.target_selector_wrap .target_selector`).append(frag)
        });
    }
});

