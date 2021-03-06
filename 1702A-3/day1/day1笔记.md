--------------------------------------------------------------------------
1. scss 
css预编译器

 编辑器插件 easy Sass      
        rem   响应式游戏


---------------------------------------------------------------------------
.scss后缀名文件

1. 变量  
2. 嵌套 
3. 函数 
4. 循环 @for
for循环有两种形式，分别为：@for $var from through 和@for $var from to 。$i表示变量，start表示起始值，end表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数。先来个简单的：
@for $i from 1 through 3 { .item-#{$i} { width: 2em * $i; } }

// class span1-$gridColumns // span的class循环输出，通过变量$gridSpanSwitch来控制是否输出 //----------------------------------------------------- 
$gridColumns: 12 !default; $gridcolumnWidth: 60px !default; $gridGutter: 20px !default; %span-base{ float:left; margin-left:$gridGutter / 2; margin-right:$gridGutter / 2; } @for $i from 1 through $gridColumns { .span#{$i} { @extend %span-base; width:($gridcolumnWidth + $gridGutter) * $i - $gridGutter; } }



6. 引入 @import './'
----------------------------------------------------------------------------
2. <meta name="viewport" content="width=device-width, initial-scale=1.0">
----------------------------------------------------------------------------
3. 媒体查询
语法：
@media 媒体类型 and （媒体特性）{你的样式}

注意：使用Media Queries必须要使用“@media”开头，然后指定媒体类型（也可以称为设备类型），随后是指定媒体特性（也可以称之为设备特性）。媒体特性的书写方式和样式的书写方式非常相似，主要分为两个部分，第一个部分指的是媒体特性，第二部分为媒体特性所指定的值，而且这两个部分之间使用冒号分隔。例如：

(max-width: 480px)
从前面表中可以得知，主要有十种媒体类型和13种媒体特性，将其组合就类似于不同的CSS集合。
但与CSS属性不同的是，媒体特性是通过min/max来表示大于等于或小于做为逻辑判断，
而不是使用小于（<）和大于（>）这样的符号来判断。接下来一起来看看Media Queries在实际项目中常用的方式。
1. 最大宽度max-width

“max-width”是媒体特性中最常用的一个特性，其意思是指媒体类型小于或等于指定的宽度时，样式生效。
@media screen and (max-width:480px){
 .ads {
   display:none;
  }
}
上面表示的是：当屏幕小于或等于480px时,页面中的广告区块（.ads）都将被隐藏。

2. 最小宽度min-width
“min-width”与“max-width”相反，指的是媒体类型大于或等于指定宽度时，样式生效。

@media screen and (min-width:900px){
.wrapper{width: 980px;}
}
上面表示的是：当屏幕大于或等于900px时，容器“.wrapper”的宽度为980px。


3. 多个媒体特性使用
Media Queries可以使用关键词"and"将多个媒体特性结合在一起。也就是说，一个Media Query中可以包含0到多个表达式，表达式又可以包含0到多个关键字，以及一种媒体类型。

当屏幕在600px~900px之间时，body的背景色渲染为“#f5f5f5”，如下所示。

@media screen and (min-width:600px) and (max-width:900px){
  body {background-color:#f5f5f5;}
}

4. 设备屏幕的输出宽度Device Width
在智能设备上，例如iPhone、iPad等，还可以根据屏幕设备的尺寸来设置相应的样式（或者调用相应的样式文件）。同样的，对于屏幕设备同样可以使用“min/max”对应参数，如“min-device-width”或者“max-device-width”。

<link rel="stylesheet" media="screen and (max-device-width:480px)" href="iphone.css" />
上面的代码指的是“iphone.css”样式适用于最大设备宽度为480px，比如说iPhone上的显示，这里的“max-device-width”所指的是设备的实际分辨率，也就是指可视面积分辨率。

5. not关键词
使用关键词“not”是用来排除某种制定的媒体类型，也就是用来排除符合表达式的设备。换句话说，not关键词表示对后面的表达式执行取反操作，如：

@media not print and (max-width: 1200px){样式代码}
上面代码表示的是：样式代码将被使用在除打印设备和设备宽度小于1200px下所有设备中。

6. only关键词
only用来指定某种特定的媒体类型，可以用来排除不支持媒体查询的浏览器。其实only很多时候是用来对那些不支持Media Query但却支持Media Type的设备隐藏样式表的。其主要有：支持媒体特性的设备，正常调用样式，此时就当only不存在；表示不支持媒体特性但又支持媒体类型的设备，这样就会不读样式，因为其先会读取only而不是screen；另外不支持Media Queries的浏览器，不论是否支持only，样式都不会被采用。如

<linkrel="stylesheet" media="only screen and (max-device-width:240px)" href="android240.css" />
在Media Query中如果没有明确指定Media Type，那么其默认为all，如：

<linkrel="stylesheet" media="(min-width:701px) and (max-width:900px)" href="mediu.css" />
另外在样式中，还可以使用多条语句来将同一个样式应用于不同的媒体类型和媒体特性中，指定方式如下所示。

<linkrel="stylesheet" type="text/css" href="style.css" media="handheld and (max-width:480px), screen and (min-width:960px)" />
上面代码中style.css样式被用在宽度小于或等于480px的手持设备上，或者被用于屏幕宽度大于或等于960px的设备上。

到目前为止，CSS3 Media Queries得到了众多浏览器支持，除了IE6-8浏览器不支持之外，在所有现代浏览器中都可以完美支持。还有一个与众不同的是，Media Queries在其他浏览器中不要像其他CSS3属性一样在不同的浏览器中添加前缀。







