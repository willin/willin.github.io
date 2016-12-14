jQuery(document).ready(function($){
  // responsive off-canvas menu handling
  $('#menu-toggle').on('touchstart click', function(e) {
     $('#page-wrapper').toggleClass('toggled');
    //  $('#sstt').removeClass('is-visible').addClass('is-hidden');
     return false;
  });
  // close the menu when link or page overlay is clicked
  $('.top-menu li:not(.has-child-menu) > a, #page-content-overlay').on('click', function(e) {
     //e.preventDefault();
     $('#page-wrapper').removeClass('toggled');
  });
  // smooth in-page anchor scrolling
   $('#section-intro .btn-cta, .top-menu li > a').smoothScroll({
       offset: -20,
       speed: 800
   });

  var animationDuration = 1200;
  // circle skills function
   function circleInit(element) {
       var getPercent = $(element).data('progress-percent');
       $(element).circleProgress({
           value: getPercent / 100,
           size: 126,
           startAngle: Math.PI * 1.5,
           animation: {
               duration: animationDuration,
           },
           fill: {
               color: '#f44336'
           }
       }).on('circle-animation-progress', function(event, progress) {
           $(this).find('strong').html(parseInt(getPercent * progress) + '<i>%</i>');
       });
   };

   // progressbars function
   function moveProgressBar(element) {
       var elemPure = element;
       var elem = element + ' .skillbar-wrapper .skillbar-container';
       var getPercent = ($(elem).data('progress-percent') / 100);
       var getProgressWrapWidth = $(elem).width();
       var progressTotal = getPercent * getProgressWrapWidth;
       // on page load, animate percentage bar to data percentage length
       // .stop() used to prevent animation queueing
       $(elem + ' .bar-skill').stop().animate({
           left: progressTotal,
           percent: getPercent * 100
       }, {
           duration: animationDuration,
           progress: function(now, fx) {

               $(elemPure + ' .skillbar-exp').html(parseInt(this.percent) + '<i>%</i>');
           },
           complete: function() {
               //do not forget to reset percent at the end of the animaton
               //so on the next animation it can be calculated from starting value of 0 again
               this.percent = 0;
           }
       });
   };
   // waypoints triggering for bars
   $('.block-skillbars').waypoint(function() {
       $('.skillbar-block').each(function(i,d){
         moveProgressBar('#'+$(d).attr('id'))
       })
      //  moveProgressBar('#skillbar1');
      //  moveProgressBar('#skillbar2');
       this.destroy();
   }, {
       offset: '90%',
       triggerOnce: true
   });

   // waypoints triggering for circle bars
   $('.block-circles-skills').waypoint(function() {
       $('.circle-skill').each(function(i,d){
         circleInit('#'+$(d).attr('id'))
       })
      //  circleInit('#circle1');
      //  circleInit('#circle2');
      //  circleInit('#circle3');
       this.destroy();
   }, {
       offset: '90%',
       triggerOnce: true
   });
   // scroll to top plugin init
   scrollToTop({
       linkName: '#sstt',
       hiddenDistance: '700'
   });

   var blogs = {
     jscool: location.protocol + '//js.cool/feed.jsonp',
     w2b: location.protocol + '//blog.willin.wang/feed.jsonp',
     willog: location.protocol + '//now.willin.wang/feed.jsonp'
   }
   function ajax(target) {
     if(localStorage.getItem(target+'-date')!==null){
      var pastTime = new Date()/1000 - parseInt(localStorage.getItem(target+'-date'));
      var count = localStorage.getItem(target+'-count');
      var content = localStorage.getItem(target+'-content');
      if(pastTime <43200 && count!==null && content!==null){
        $('#'+target+'-count').text(count);
        $('#'+target+'-content').html(content);
        return false;
      }
      localStorage.setItem(target+'-date',null);
     }
     (function(newTarget){
       $.ajax({
          cache: false,
          url: blogs[newTarget],
          type: "GET",
          dataType: 'jsonp',
          jsonpCallback: newTarget,
          success: function(data){
          	var posts = data.posts;
            $('#'+newTarget+'-count').text(posts.length);
            localStorage.setItem(newTarget+'-count',posts.length);
          	posts = posts.slice(0,3);
            var html = '';
            for(var i=0; i<posts.length;i++){
              var className= i===0&&newTarget==='willog' ? "list-group-item active":"list-group-item";
              var date = newTarget==='willog'?posts[i].date.split(' ')[0]:posts[i].date;
              html += '<div class="list-group"><a href="'+posts[i].url+'" class="'+className+'" target="_blank"> <h4 class="list-group-item-heading">'+posts[i].title+'</h4> <p class="list-group-item-text">'+date+'</p></a></div>'
            }
            $('#'+newTarget+'-content').html(html);
            localStorage.setItem(newTarget+'-content',html);
            localStorage.setItem(newTarget+'-date',new Date()/1000);
          },
          error:function(){
          	// ajax(newTarget);
          }
       });
     })(target);
   }
   Object.keys(blogs).forEach(function(target,index){
     (function(target,index){setTimeout(function(){ajax(target);},index*10+10);})(target,index);
   });
});

var duoshuoQuery = {short_name:"willin"};
 (function() {
   var ds = document.createElement('script');
   ds.type = 'text/javascript';ds.async = true;
   ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
   ds.charset = 'UTF-8';
   (document.getElementsByTagName('head')[0]
    || document.getElementsByTagName('body')[0]).appendChild(ds);
 })();
