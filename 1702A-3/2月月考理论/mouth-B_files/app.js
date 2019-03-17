﻿/**
 * 扩展ajaxAnywhere 的loading信息
 */
var loadingImage="<image alt='loading...' src='"+$rs+"ajaxAnywhere/loader.gif'/>";
AjaxAnywhere.prototype.showLoadingMessage = function(){
      	var div = document.getElementById("AA_" + this.id + "_loading_div");
      	if (!div) {
      	    div = document.createElement("DIV");
      	    document.body.appendChild(div);
      	    div.id = "AA_" + this.id + "_loading_div";
      	    div.style.position = "absolute";
      	    div.style.width  = "124px";
      	    div.style.heigth = "124px";
      	    div.innerHTML=loadingImage;
      	}
      	div.style.top     = '40%';
      	div.style.left    = '50%';
      	div.style.display = "";
}

var loading={
	id  :"_loading_div"	,
	show: function (){
		var div = document.getElementById(loading.id);
      	if (!div) {
      	    div = document.createElement("DIV");
      	    document.body.appendChild(div);
      	    div.id = loading.id;
      	    div.style.position = "absolute";
      	    div.style.width  = "124px";
      	    div.style.heigth = "124px";
      	    div.innerHTML=loadingImage;
      	}
      	div.style.top     = '40%';
      	div.style.left    = '50%';
      	div.style.display = "";
	},
	hide:function(){
		var div = document.getElementById(loading.id);
		if (div) {
			div.style.display = "none";
		}
	}
}

/**
 * form 序列化为json
*/
$.fn.formToJson=function(){  
          var serializeObj={};  
          $(this.serializeArray()).each(function(){
        	  if(serializeObj[this.name]){
        		  if(serializeObj[this.name]  instanceof Array){
        			  serializeObj[this.name].push($.trim(this.value));
        		  }else{
        			  var a=[];
        			  a.push(serializeObj[this.name]);
        			  a.push($.trim(this.value));
        			  serializeObj[this.name]=a;
        		  }
        	  }else{
        		  serializeObj[this.name]=$.trim(this.value);
        	  }
                
          });  
          return serializeObj;  
};

//把任何一个元素中的内容转化为json
//例如　var vo= $('#div111').noFormToJson()
$.fn.noFormToJson=function(){
	//样例查看 jqueryDemo.jsp
	/**
	   input:hidden     所有input type=hidden
	   input:text       所有input type=text
	   input:password   所有input type=password
	   :checked         所有被选中的  input type=checkbox 或 input type=radio 
	   :selected        所有select
	   textarea         所有textarea
	   多元素选择用逗号分隔
	  */
	 var elements= this.find("input:hidden,input:password,input:text,input:checked,textarea,select");
	 var vo={};
	 elements.each(function (){
		  if(this.name){
			  if(vo[this.name]){
        		  if(vo[this.name]  instanceof Array){
        			  vo[this.name].push($.trim($(this).val()));
        		  }else{
        			  var a=[];
        			  a.push(vo[this.name]);
        			  a.push($.trim($(this).val()));
        			  vo[this.name]=a;
        		  }
        	  }else{
        		  vo[this.name]=$.trim($(this).val());
        	  }
		  }
	 });
	 //console.log(vo);
	 return vo;
}

/*获取替换内容
例子:
var a=replaceWithData("<h1>{{title}}</h1><div>{{greeting}}</div>",{"title":"titleAA","greeting":"hello word"});
alert(a);
*/
function replaceWithData (T,data){
	var template = Handlebars.compile(T);
	var content  = template(data);
	//alert(content);
	return content;
} 

/** 扩展jquery,添加模板渲染功能
*  templateId 模板id
*  data       渲染的数据
*/
$.fn.extend({
	   //从字符串渲染
	   htmlS  :function (source,data){
			  $(this).html(replaceWithData(source,data));
	   },
	   //从模板id内容渲染
	   htmlT  :function (templateId,data){
		      var source   = $("#"+templateId).html();
			  $(this).html(replaceWithData(source,data));
	   },
	   /**
	    ajax访问数据 并渲染
	    url: 访问地址
	    data:参数
	    before: 替换html之前 回调 
	    after:  替换html之后 回调
	    options {"url":"访问地址","data":{},before:function}
	   */
	   ajaxtHtmlT :function (templateId,options){
		   var who=$(this);
		   $.ajax({
				url  : options.url,
				data : options.data,
				type : 'POST',
				success : function(result) {
					 if(options.before){//替换html之前
						 options.before(result);
					 }
					 who.htmlT(templateId,result);
					 if(options.after){//替换html之后
						 options.after();
					 }
				}
		   });
	   }
});

//处理ajax权限不足的函数
$.ajaxSetup({
    complete: function (request, status) {
        if (typeof (request) != 'undefined') {
            var responseText = request.getResponseHeader("X-Responded-JSON");
            if (responseText != null) {
                window.tipError('系统提示', '登录超时，请重新登录', null, null, function () {
                    window.location.href = window.location.href;
                });
            }
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        var status = 0;
        switch (jqXHR.status) {
            case (500):
                // 服务器系统内部错误
                status = 500;
                break;
            case (401):
                // 未登录
                status = 401;
                break;
            case (403):
                // 无权限执行此操作
                status = 403;
            	$(document.body).html('<h1>' + jqXHR.responseText + '</h1>');
            	return;
            case (408):
                // 请求超时
                status = 408;
                break;
            case (200):
            	// 返回整个页面时,jqXHR对象不为空,判定其是否为200
            	status = 200;
            	break;
            case (0):
                // cancel
                break;
            default:
                status = 1;
                // 未知错误
        }
        if (status > 0 && parseInt(status) != 200) {
        	alert("未知错误,请联系软件事业部!");
        }
    }
});

// 处理vue权限不足的函数
Vue.http.error = function(response) {
	if ('403' == response.status) {
		console.log(response);
		alert("vue");
		// $(document.body).html('<h1>'+response.Text+'</h1>');
		return;
	}
};


