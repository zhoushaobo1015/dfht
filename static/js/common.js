
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
    $('.page_datepicker').datepicker();

    // 选择框
    $('.selector').select2({
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

    // 转换时间格式，format / 或者 -
    function formatDate(date, format) {
        var d=new Date(date);
        var year=d.getFullYear();
        var month=change(d.getMonth()+1);
        var day=change(d.getDate());
        function change(t) {
            if (t<10){
                return "0"+t;
            }else{
                return t;
            }
        }
        if (date.indexOf('-') > 0) {
            return `${month}/${day}/${year}`
        }
        return `${year}-${month}-${day}`
    }

    // main2
    // 选择股票选项
    $('.selector').on('select2:select', function(){
        let checkedItem = $(this).find('option:checked')
        let id = checkedItem.data('id')
        let pinyin = checkedItem.data('pinyin')
        let text = checkedItem.text()
        console.log(id, pinyin, text)
        $.get("/static/json/sample_股票.json", function(result) {
            console.log('result', result)
            $('.ticket_detail_wrap').removeClass('hide')
            $('.add_segments_wrap').addClass('hide')

            $('.code_input').val(result.tcode)
            $('.ticket_detail_wrap .name_input').val(result.shortname)
            let isstIndex = result.is_st === 0 ? 1 : 0
            $('input:radio[name="isstOption"]').eq(isstIndex).attr('checked', 'checked')
            let iszzIndex = result.is_zz === 0 ? 1 : 0
            $('input:radio[name="iszzOption"]').eq(iszzIndex).attr('checked', 'checked')

            $('.main2_startdate').val(result.end_date)
        });
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
            $('.pages').css('position', 'inherit');
            $('.all').css('position', 'inherit');
            $brother.css('display','none');
			$this.html('<i class="fas fa-compress-arrows-alt"></i>')
        }else{
            $('.pages').css('position', 'absolute');
            $('.all').css('position', 'absolute');
            $brother.css('display','flex');
			$this.html('<i class="fas fa-expand-arrows-alt"></i>')
		}
        
    })

    $('.page3_time_span_input').val(new Date().getFullYear())

    // page1-确定按钮点击事件
    $('.page1_confirm_btn').click(function() {
        let startDate = $('.page1_startdate').val()
        let endDate = $('.page1_enddate').val()
        let mytargets = $('.page1_search1_data').val()
        mytargets = mytargets ? JSON.parse(mytargets) : []
        let search2Data = $('.page1_search2_data').val()
        search2Data = search2Data ? JSON.parse(search2Data) : {myfeatures: [], outliers: '', standardize: ''}
        let { myfeatures, outliers, standardize } = search2Data
        let charttype = $('.page1 .tab_wrap .active').text()
        let data = {
            charttype, 
            startdate: startDate,
            enddate: endDate,
            mytargets,
            myfeatures,
            outliers,
            standardize
        }
        console.log('data', data, JSON.stringify(data))
    })

    // page2-确定按钮点击事件
    $('.page2_confirm_btn').click(function() {
        let timespan = $('.selected_time_span').text()
        let cycles = Number($('.selected_cycle_num').text())
        let enddate = $('.page2_enddate').val()
        let targets = $('.page2_search1_data').val()
        targets = targets ? JSON.parse(targets) : []
        let search2Data = $('.page2_search2_data').val()
        search2Data = search2Data ? JSON.parse(search2Data) : {myfeatures: [], outliers: '', standardize: ''}
        let { myfeatures, outliers, standardize } = search2Data
        let charttype = $('.page2 .tab_wrap .active').text()
        let data = {
            timespan,
            cycles,
            enddate,
            targets,
            features: myfeatures,
            outliers,
            standardize,
            charttype
        }
        console.log('data', data, JSON.stringify(data))
    })

    // page3-确定按钮点击事件
    $('.page3_confirm_btn').click(function() {
        let targets = $('.page3_search1_data').val()
        targets = targets ? JSON.parse(targets) : []
        let enddate = $('.page3_enddate').val()
        let timespan = $('.page3_time_span_input').val()
        let tabletype = $('.page3-table li.selected').text()
        let data = {
            timespan,
            enddate,
            targets,
            tabletype
        }
        console.log('data', data, JSON.stringify(data))
    })

    search1BtnClick('page1');
    search1BtnClick('page2');
    search1BtnClick('page3');

    // 点击查询按钮1
    function search1BtnClick(page) {
        $(`.${page} .search1_btn`).click(function() {
            $("#search1Popup").attr('data-page', page)
            $("#search1Popup").modal('toggle');
            getSearch1Data()
            $('#search1Popup .selector1').val("").trigger("change")
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

    // 全屏展示下右page3
    $('.page3 .switch').click(function() {
        let display = 'flex'
        if (!$('.page3').hasClass('all')) {
            display = 'none'
        }
        $('.page3 .left_search_wrap, .page3 .right_result_wrap').css('display', display)
    })
    
    // page3 tags 切换
    $(".page3-table ol li").on("click",function(){
        let $ol_this = $(this);
        $ol_this.addClass("selected");
        $ol_this.siblings().removeClass("selected");

        var data = {"columns":["现值","百分位","平均","最低","1/4位","中位数","3/4位","最高","标准差"],"index":["上证成份","上证50","沪深300","中证1000","中证500","中证全指","全指能源","全指材料","全指工业","全指可选","赣粤高速","航天信息","开开实业","嘉化能源","恒瑞医药","亿利洁能","东方创业","重庆港九","中央商场","太化股份"],"data":[[12.69,"23.90%",14.24,10.55,12.76,14.81,15.66,17.12,1.7],[9.82,"33.43%",10.23,8.52,9.59,10.13,10.76,13.05,0.82],[12.24,"28.45%",12.88,9.98,12.09,13.03,13.88,15.76,1.2],[37.34,"49.45%",42.86,19.4,30.68,37.43,46.94,79.35,18.15],[23.24,"38.67%",31.22,14.8,21.86,26.63,34.5,58.3,13.77],[16.02,"27.35%",18.01,12.31,15.76,18.7,20.03,23.16,2.83],[13.83,"4.01%",29.87,12.68,16.29,21.47,25.42,82.25,20.99],[16.43,"28.87%",114.22,11.46,16.16,26.4,39.06,1358.9,199.91],[21.12,"27.35%",26.81,16.01,20.77,26.16,32.35,41.1,7.1],[26.19,"73.07%",23.65,14.64,22.16,24.67,26.36,29.74,3.95],[6.95,"7.37%",10.78,6.12,9.5,10.51,12.51,14.73,2.07],[21.01,"3.76%",29.76,20.05,23.63,30.17,35.21,44.44,6.3],[69.79,"44.85%",127.09,35.56,51.73,93.55,161.89,340.74,91.17],[13.61,"34.35%",14.67,10.39,12.38,15.34,16.4,22.14,2.24],[68.71,"74.83%",59.98,41.33,48.89,60.69,68.75,90.47,12.09],[14.73,"0.70%",46.24,14.33,22.23,50.57,69.96,112.33,24.66],[32.64,"31.85%",44.02,21.15,30.15,42.07,53.25,93.33,16.14],[23.17,"34.91%",35.05,5.25,8.21,31.82,59.96,80.9,24.57],[-10.18,"15.02%",122.81,-19.64,30.68,39.61,94.7,586.21,172.48],[-21.57,"9.04%",143.04,-26.78,-13.71,138.98,186.39,743.52,175.57]]}
        var thead = "<tr><th>&nbsp;</th>"
        var tbody = "<tr>"
        for(var i=0;i<=data.columns.length;i++){
            if(data.columns[i]){
                thead += "<th>"+data.columns[i]+"</th>"
            }
        }
        thead += "</tr>"

        for(var x=0;x<data.index.length;x++){
            tbody += "<tr><td>"+data.index[x]+"</td>"
            for(var y=0;y<data.data[x].length;y++){
                if(y===1){
                    if(Number(data.data[x][y].split('%')[0]<25)){
                        tbody += "<td class='red'>"+data.data[x][y]+"</td>"
                    }else if(Number(data.data[x][y].split('%')[0]>75)){
                        tbody += "<td class='blue'>"+data.data[x][y]+"</td>"
                    }else {
                        tbody += "<td>"+data.data[x][y]+"</td>"
                    }
                }else{
                    tbody += "<td>"+data.data[x][y]+"</td>"
                }
            }
        }
        tbody += "</tr>"
        $(".page3-table-content thead").html(thead)
        $(".page3-table-content tbody").html(tbody)


    })
    
    // main4 page1 切换tab
    $('.page1 .right_result_wrap .tab_wrap').on('click', 'span', function() {
        changeTabClass($(this))
    })

    // main4 page2 切换tab
    $('.page2 .right_result_wrap .tab_wrap').on('click', 'span', function() {
        changeTabClass($(this))
    })

    // main4 page3 切换tab
    $('.page3 .right_result_wrap .tab_wrap').on('click', 'span', function() {
        changeTabClass($(this))
    })
    
    // 改变tab样式
    function changeTabClass(el) {
        el.addClass('active')
        el.siblings().removeClass('active')
    }

    // $('#search1Popup .selector2').select2({
    //     matcher: matchStart
    // });
    
    // 查询2-选择框
    // $('#search2Popup .target_selector').select2({
    //     matcher: matchStart
    // });

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
        console.log(id, className)
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

    getTicketData()
    // 请求股票数据
    function getTicketData() {
        if ($(`.ticket_select_wrap .selector`).length === 0) {
            return
        }
        $.get("/static/json/myoptions.json",function(result){
            let ticket = result.ticket
            var frag = document.createDocumentFragment();
            if (selectData.length > 0) {
                frag.append($('<option>请选择：</option>')[0])
            }
            ticket.map(data => {
                frag.append($(`<option data-id=${data.id} val=${data.pinyin} data-pinyin=${data.pinyin}>${data.text}</option>`)[0])
            })
            $(`.ticket_select_wrap .selector`).append(frag)
        });
    }
});

