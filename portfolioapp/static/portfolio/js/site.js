var initPhotoSwipeFromDOM = function(gallerySelector) {

  // Parse slide data from DOM elements
  var parseThumbnailElements = function(el) {
    var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

    for (var i=0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure>

      // Include only element nodes
      if (figureEl.nodeType != 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a>

      size = linkEl.getAttribute('data-size').split('x');

      // slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };

      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
        item.msrc = linkEl.children[0].getAttribute('src');
      }

      item.el = figureEl;
      items.push(item);
    }

    return items;
  }

  // Find nearest parent element
  var closest = function closest(el, fn) {
    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };
  
  // Trigger when thumbnail is clicked on
  var onThumbnailsClick = function(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // Find root element of slide
    var clickedListItem = closest(eTarget, function(el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if(!clickedListItem) {
      return;
    }

    // Find the index of the clicked item by looping through all
    // the child nodes
    var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }

    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  }

  // Open PhotoSwipe
  var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;

    items = parseThumbnailElements(galleryElement);

    options = {
      getThumbBoundsFn: function(index) {
        var thumbnail = items[index].el.getElementsByTagName('img')[0],
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      },
      shareEl: false,
      bgOpacity: 0.9
    };

    options.index = parseInt(index, 10);
    if(isNaN(options.index)) {
      return;
    }

    if(disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Initialize PhotoSwipe
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // Loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i=0; i < galleryElements.length; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i+1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
};

initPhotoSwipeFromDOM('.image-gallery');
