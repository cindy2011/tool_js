 var vm = new Vue({
     el: "#main",
     data: { 
         layout: {
             layoutbg: false
         
         }
     },
     mounted: function() {
         axios.get('/ymxxy/getinfo')
             .then(function(response) {
                 if (response.data.status) {
                  
                 }
             })
             .catch(function(error) {
                 console.log(error);
             });
     },
     methods: {
         closeLayout: function() {
             for (var x in vm.layout) {
                 vm.layout[x] = false;
             }
         },
         showLayout: function(name) {
             vm.closeLayout();
             vm.layout.layoutbg = true;
             vm.layout[name] = true;
         },       
         phoneCode: function(sPhone) {
             if (!(/^1[2-9][0-9]{9}$/.test(sPhone))) {
                 return false;
             } else {
                 return true;
             }
         },         
         versions: function() {
             var u = navigator.userAgent,
                 app = navigator.appVersion;
             return {
                 ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                 android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                 weixin: u.indexOf('MicroMessenger') > -1
             };
         }

     }
 });
