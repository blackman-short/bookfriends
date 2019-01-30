var flag = 1;
var objectid = "xmaseyXaCfTQEUdone";
var user_no = "32050620120810015x";
$('#fxpage_close').click(() => {
    $('.fxpage').css({'opacity':'0','z-index':'-1'});
})

$('#fenxiang').click(function(){
    if(flag == 1){
        flag = 0;
        var url = "/campus/APP/szbgs_xw/index.php?s=/Home/Index/picture"+'/objectid/'+objectid+'/user_no/'+user_no; 
        $.get(url,function(data){
            var data = JSON.parse(data);
            if(data.code == 0){
                var html = '<img src="'+data.src+'" style="height:100%;">';
                $('.fxpage .fatzContainer2').html(html);
            }
            flag = 1;
        })				
    }
})
    
    $('#loginBtn').click(function(){
      var stuName = document.getElementById('stuName').value;
      var stuNO = document.getElementById('stuNO').value;

      if (stuName === 'tom' && stuNO == 123){
        $('.login-page').remove();
		$('.page1').css({'z-index': '3'});
		$('#XDFLogo').css({'display': 'inline'});
      } else {
        $('.error-msg').css({'visibility':'visible'})
      }
    })

    function inputText(){
      $('.error-msg').css({'visibility':'hidden'})
	}
	
	$(()=>{
   
   var tp=0;
   setInterval(()=>{
	   tp+=0.1;
	   $('#zouhua').css("opacity",tp);
	   if(tp>1){
		   tp=0;
	   }
   },100)
   
   $('.page1').on("touchstart", function(e) {
	   e.preventDefault();
	   startX = e.originalEvent.changedTouches[0].pageX;
   });
   $('.page1').on('touchmove',function(e){
		e.preventDefault();
		
	   moveEndX = e.originalEvent.changedTouches[0].pageX;
	   X = moveEndX - startX;
	   if(X<0){
		   $('.page1').css({'left':'-100%', 'background-color': '#fff'});
		   $('.page2').css('display','block');
	   }
   })
   //鐐瑰嚮鎴愮哗寮瑰嚭椤甸潰
   $('#chengji').click(function(){
	   $('.cjdpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮濂栨儵鎯呭喌寮瑰嚭椤甸潰
   $('#jiangcheng').click(function(){
	   $('.jczkpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮韬綋鎯呭喌寮瑰嚭椤甸潰
   $('#shenti').click(function(){
	   $('.stqkpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮鑰佸笀璇勮寮瑰嚭椤甸潰
   $('#pingyu').click(function(){
	   $('.lspypage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮瀛︾敓鍝佹牸寮瑰嚭椤甸潰
   $('#pinge').click(function(){
	   $('.xspgpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮瀹堕暱鍥炴墽寮瑰嚭椤甸潰
   $('#huizhi').click(function(){
	   $('.jzhzpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮绀惧洟鎴愮哗寮瑰嚭椤甸潰
   $('#shetuan').click(function(){
	   $('.stpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮鍏抽敭璇嶅脊鍑洪〉闈�
   $('#guanjianci').click(function(){
	   $('.gjcpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮鏀惧亣閫氱煡寮瑰嚭椤甸潰
   $('#tongzhi').click(function(){
	   $('.fjtzpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮鍋囨湡浣滀笟寮瑰嚭椤甸潰
   $('#zuoye').click(function(){
	   $('.jqzypage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮鍒嗕韩寮瑰嚭椤甸潰
   $('#fenxiang').click(function(){
	   $('.fxpage').css({'opacity':'1','z-index':'2'})
   })
   //鐐瑰嚮鐝骇鍦堝脊鍑洪〉闈�
   $('#banjiquan').click(function(){
	   $('.bjqpage').css({'opacity':'1','z-index':'2'})
   })
   
   
   //鐐瑰嚮脳閫€鍑�
   $('.section>span').click(()=>{
	   $('.cjdpage').css({'opacity':'0','z-index':'-1'});
	   $('.jczkpage').css({'opacity':'0','z-index':'-1'});
	   $('.lspypage').css({'opacity':'0','z-index':'-1'});
	   $('.stqkpage').css({'opacity':'0','z-index':'-1'});
	   $('.xspgpage').css({'opacity':'0','z-index':'-1'});
	   $('.jzhzpage').css({'opacity':'0','z-index':'-1'});
	   $('.stpage').css({'opacity':'0','z-index':'-1'});
	   $('.gjcpage').css({'opacity':'0','z-index':'-1'});
	   $('.fjtzpage').css({'opacity':'0','z-index':'-1'});
	   $('.jqzypage').css({'opacity':'0','z-index':'-1'});
	   $('.fxpage').css({'opacity':'0','z-index':'-1'});
	   $('.bjqpage').css({'opacity':'0','z-index':'-1'});
   })
   
   $('.sec2>img').click(()=>{
	   console.log(1)
	   
   })
})