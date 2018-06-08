/**
 * 封装的基础对象
 * 
 */
var util = (function($) {
    var util = {
        //下面是微信接口的初始化
        config: function(appId, timestamp, nonceStr, signature, title, desc, linkUrl, imgUrl, successFun) {

            /*
             * 注意：
             * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入"公众号设置"的"功能设置"里填写"JS接口安全域名"。
             * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
             * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
             *
             * 开发中遇到问题详见文档"附录5-常见错误及解决办法"解决，如仍未能解决可通过以下渠道反馈：
             * 邮箱地址：weixin-open@qq.com
             * 邮件主题：【微信JS-SDK反馈】具体问题
             * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
             */
            // alert(signature);
            wx.config({

                debug: false,

                appId: appId,

                timestamp: timestamp,

                nonceStr: nonceStr,

                signature: signature,

                jsApiList: [

                    // 所有要调用的 API 都要加到这个列表中

                    'onMenuShareTimeline',

                    'onMenuShareAppMessage',

                    'onMenuShareQQ',

                    'onMenuShareWeibo',

                ]

            });

            wx.ready(function() {

                // 在这里调用 API

                wx.onMenuShareTimeline({

                    title: title, // 分享标题

                    desc: desc, // 分享描述

                    link: linkUrl, // 分享链接

                    imgUrl: imgUrl, // 分享图标

                    success: function() {

                        // 用户确认分享后执行的回调函数
                        successFun();

                    },

                    cancel: function() {

                        // 用户取消分享后执行的回调函数

                    }

                });

                wx.onMenuShareAppMessage({

                    title: title, // 分享标题

                    desc: desc, // 分享描述

                    link: linkUrl, // 分享链接

                    imgUrl: imgUrl, // 分享图标

                    type: 'link', // 分享类型,music、video或link，不填默认为link

                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

                    success: function() {

                        // 用户确认分享后执行的回调函数
                        successFun();
                    },

                    cancel: function() {

                        // 用户取消分享后执行的回调函数
                    }
                });

                // 分享到QQ

                wx.onMenuShareQQ({

                    title: title, // 分享标题

                    desc: desc, // 分享描述

                    link: linkUrl, // 分享链接

                    imgUrl: imgUrl, // 分享图标

                    success: function() {

                        // 用户确认分享后执行的回调函数
                        successFun();
                    },

                    cancel: function() {

                        // 用户取消分享后执行的回调函数

                    }

                });
                // 分享到腾讯微博

                wx.onMenuShareWeibo({

                    title: title, // 分享标题

                    desc: desc, // 分享描述

                    link: linkUrl, // 分享链接

                    imgUrl: imgUrl, // 分享图标

                    success: function() {

                        // 用户确认分享后执行的回调函数
                        successFun();

                    },
                    cancel: function() {

                        // 用户取消分享后执行的回调函数
                    }
                });
            });
            wx.error(function(res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        },
        //微信分享
        share: function(opts) {
            var ua = window.navigator.userAgent.toLowerCase();
            var appId = document.getElementById("appId").value;
            var timestamp = document.getElementById("timestamp").value;
            var nonceStr = document.getElementById("nonceStr").value;
            var signature = document.getElementById("signature").value;
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.config(appId, timestamp, nonceStr, signature, opts.title, opts.contents, opts.link, opts.icon, function() {
                    //分享成功回调函数
                });
            };

        },

        /**
         * 判断手机横竖屏并给出提示
         * opts.fn1是横屏下的执行函数
         * opts.fn2是竖屏下的执行函数
         */
        orient: function(opts) {
            if (window.orientation == 90 || window.orientation == -90) {
                //横屏
                opts.fn1();
                return false;
            } else if (window.orientation == 0 || window.orientation == 180) {
                //竖屏
                opts.fn2();
                return false;
            }
        },

        //versions
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                weixin: u.indexOf('MicroMessenger') > -1
            };
        },

        /**
         * 根据手机型号跳转下载地址
         * opts.weixinUrl是微信下的跳转地址
         * opts.androidUrl是安卓下的跳转地址
         * opts.iosUrl是IOS下的跳转地址
         * opts.weixinFn是微信下执行的遮罩等行为
         */
        downloadUrl: function(opts) {
            var versionsRes = this.versions();
            if (versionsRes.weixin) {
                //  微信下 跳转 提示页面
                if (opts.weixinUrl) {
                    window.location.href = window.location.host + "down/wap_down_linger1.html";
                } else if (opts.weixinFn) {
                    opts.weixinFn();
                } else {
                    return false;
                }

            } else {
                if (versionsRes.android) {
                    //  android
                    window.location.href = opts.androidUrl;
                } else if (versionsRes.ios) {
                    window.location.href = opts.iosUrl;
                    // ios
                }

            }
        },
        //placeHolder模拟
        textHolder: function(obj, text) {
            obj.on("focus", function() {
                if ($(this).val() == text) {
                    $(this).attr("data-value", $(this).val());
                    $(this).val("");
                }
            }).on("blur", function() {
                if ($.trim($(this).val()) == "") {
                    $(this).val($(this).attr("data-value"));
                }
            });
        },
        //验证手机号码
        phoneCode: function(sPhone) {
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(sPhone))) {
                return false;
            } else {
                return true;
            }
        }
    };
    return util;
})(jQuery);
$(function() {
    //分享
    var icon = "http://bmt.shengli.com/" + $("#sharePic").val();
    var link = "http://bmt.shengli.com/pengbei";
    var title = "礼未尽，杯莫停，疯狂碰杯赢好礼！";
    var contents = "礼未尽，杯莫停，疯狂碰杯赢正版周边";
    util.share({ title: title, contents: contents, link: link, icon: icon });
})