$(function(){
  initialize();
  
  $('a[href="/"]').on('click', function(e){
    closeOpenWindows();
    e.stopPropagation();
    e.preventDefault();
  });
  
  $('nav.main a[href$=".html"], .sub-content-top a, .sub-content-middle a, .sub-content-bottom a').on('click', function(e){
      var href = $(this).attr('href');
    
    if(href === '#'){
      e.stopPropagation();
      e.preventDefault();
      closeOpenWindows();
      return false;
    }
    
    $('.image-expanded').fadeOut('slow');
    $('.content').fadeOut('slow');
    $('.content[data-href="' + href + '"]').fadeIn('slow');
    
    e.stopPropagation();
    e.preventDefault();
  });
  
  $('body').on('click', '.content[data-href="portfolio.html"] img, .main-content a, .content-list a', function(e){
    var $this = $(this),
         src = function(){
           var videoSrc = $this.parent().data('video');
           
           if(videoSrc){
             return videoSrc;
           }else{
             return $this.attr('src') || $this.attr('href');
           }
         };
    
    if($this.parent().is('[data-video]')){
      $('.video-expanded iframe').attr('src', src());
      $('.video-expanded').fadeIn('slow');
    }else{
       $('.image-expanded img').attr('src', src());
       $('.image-expanded').fadeIn('slow');
    }
    
    e.stopPropagation();
    e.preventDefault();
  });
  
  $('body').on('click', '.content .close', function(e){
    closeOpenWindows();
    e.stopPropagation();
  });
  
  $('body').on('click', '.image-expanded .close', function(e){
    $('.image-expanded').fadeOut('slow');
    $('.image-expanded img').attr('src', '');
    e.stopPropagation();
  });
  
  $('body').on('click', '.video-expanded .close', function(e){
    $('.video-expanded').fadeOut('slow');
    $('.video-expanded iframe').attr('src', '');
    e.stopPropagation();
  });
  
  function initialize(){
    var hrefs = [
      'portfolio.html',
      'resume.html',
      'about.html',
      'contact.html'
    ];
    
    $.each(hrefs, function(i, val){
      $.ajax({
        url: '/views/' + val,
        type: 'get'
      }).done(function(html){
        $('body').append(html);
        $('.content[data-href="' + val + '"]').prepend('<span class="close" title="Close window">&#10007;</span>').hide();
      });
    });
    
    $('body').append('<div class="image-expanded"><span class="close" title="Close window">&#10007;</span><img src="" alt=""/></div>');
    $('body').append('<div class="video-expanded"><span class="close" title="Close window">&#10007;</span><iframe src="" style="height: 100%; width: 56%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>');
    $('.image-expanded, .video-expanded').hide();
  }
  
  function closeOpenWindows(){
    $('.image-expanded').fadeOut('slow');
    $('.content').fadeOut('slow');
    $('.left, .right').fadeIn('slow');
  }
});