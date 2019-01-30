var stuInfo = null;

// 不让手机软键盘影响布局
$(document).ready(function () {
　　$('body').height($('body')[0].clientHeight);
});

// 登录
$('#loginBtn').click(function(){
    var stuName = document.getElementById('stuName').value;
    var stuNO = document.getElementById('stuNO').value;
    $.ajax({
        type: 'GET',
        url: `http://localhost:3001/download/image`,
        dataType: 'xml',
        success: function(docxml) {
            var isRight = false;
            $(docxml).find('lx').each(function(){
                var studentName = $(this).attr('studentName');
                var studentCode = $(this).find("studentCode").text(); 
                if (stuName == studentName && stuNO == studentCode) {
                    $('.login-page').remove();
                    $('.page1').css({'z-index': '3'});
                    $('#XDFLogo').css({'display': 'inline'});
                    $('#zouhua').css({'visibility': 'visible'});
                    isRight = true;
                    stuInfo = $.xml2json(this);
                    
                    initPage();
                }
            })

            if (!isRight) {
                $('.error-msg').css({'visibility':'visible'})
            }
        }
    })
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
            $('#zouhua').css({'visibility': 'hidden'});
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
	   $('.lspypage').css({'opacity':'1','z-index':'2'})
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
   
   $('#fxpage_close').click(() => {
       $('.fxpage').css({'opacity':'0','z-index':'-1'});
   })

   $('.sec2>img').click(()=>{
	   console.log(1)
	   
   })
})

// 页面渲染
function initPage() {
    this.initPage1();
    this.initPage2();
    this.initPage3();
    this.initPage4();
    this.initPage5();
    this.initPage6();
    this.initPage7();
}

function initPage1() {
    $('.studentCode').text(stuInfo.studentCode);
    $('.studentName').text(stuInfo['@studentName']);
}

// 新光
function initPage2() {
    $('#suitang').text(mapGradeByScore(stuInfo.classRoomScore));
    $('#starShineComment').text(stuInfo.starShineComment);
}

// 专属
function initPage3() {
    $('#classroomDiscipline').html(mapStarNumByScore(stuInfo.classroomDiscipline));
    $('#comprehensionAbility').html(mapStarNumByScore(stuInfo.comprehensionAbility));
    $('#applicationAbility').html(mapStarNumByScore(stuInfo.applicationAbility));
    $('#initiative').html(mapStarNumByScore(stuInfo.initiative));
    $('#Attention').html(mapStarNumByScore(stuInfo.Attention));
    $('#exclusiveComment').text(stuInfo.exclusiveComment);
}

// 精彩瞬间
function initPage4() {
    $('#jingcaiImages').html(organizateImgInnerHTML());
}

// 分享页
function initPage5() {
    $('#sharePageImage').attr('src', stuInfo.shareURL);
}

// 独特的我
function initPage6() {
    $('#uniquekeyword').text(stuInfo.uniquekeyword);
}

// 学习历程
function initPage7() {
    $("#studentProcess").html(origanizateStudyProcessInnerHTML());
}

// 新光闪耀-课堂等级
function mapGradeByScore(score) {
    const Grades = ['优秀','良好','中等','及格','不及格']

    let sCore = score / 10;
    let gradeIndex = 0;
    switch(sCore) {
        case 10:
        case 9:
            gradeIndex = 0;
            break;
        case 8:
            gradeIndex = 1;
            break;
        case 7:
            gradeIndex = 2;
            break;
        case 6:
            gradeIndex = 3;
            break;
        default:
            gradeIndex = 4;
        break;           
    }

    return Grades[gradeIndex];
}

// 专属能量-能力评级
function mapStarNumByScore(score) {
    const starString = '&#9733;';
    let totalStars = ''
    let sCore = parseInt(score);

    for(let i = 0; i < sCore; i++){
        totalStars += starString;
    }

    return totalStars;
}

// 固定10张图片
function organizateImgInnerHTML() {
    const tagNamePrefix = 'wonderfulMomentURL';
    let innerHTMLString = '';

    for(let i = 1 ; i <= 10 ; i++) {
        const newTag = tagNamePrefix + i;

        if (i < 10) {
            innerHTMLString += "<div style='margin-top:2%'>" +
            "<img style='width: 100%;height:170px' src='" + stuInfo[newTag] + "' alt=''>" + "</div>"
        } else {
            innerHTMLString += "<div style='margin-top:2%; padding-bottom: 4%'>" +
            "<img style='width: 100%;height:170px' src='" + stuInfo[newTag] + "' alt=''>" + "</div>"
        }
    }

    return innerHTMLString;
}

//学习历程-课程-'三年级致高英语班,三年级致高语文班'
function origanizateStudyProcessInnerHTML() {
    const classStr = stuInfo.learningProcess;
    let classes = classStr.split(',');
    let innerHTMLString = "<p><span style='display: flex;align-items:center'><img src='./imgs/add.png' alt='' style='height:25px;width:25px;margin-right:20px'><span>2019年度</span></span>" +
                            "</p>" + "<p style='padding-left: 25%'>寒假</p>";
    for (let i = 0; i < classes.length; i++){
        innerHTMLString += "<p style='padding-left: 35%'>" + classes[i] +"</p>"
    }

    return innerHTMLString;
}
