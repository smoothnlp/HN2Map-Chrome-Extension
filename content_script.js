function addCTAButton() {
    const hnPostId = window.location.href.split('id=')[1];
    const superusappURL = `https://www.superusapp.com/share/hn2map?sr=true&id=${hnPostId}`;

    const commentButton = document.querySelector("form input:last-child");

    if (commentButton) {
        const ctaButton = document.createElement('button');
        ctaButton.textContent = 'visualize';
        // ctaButton.style.position = 'fixed';
        // ctaButton.style.bottom = '20px';
        // ctaButton.style.right = '20px';
        ctaButton.style.marginLeft = '8px';
        ctaButton.style.zIndex = '1000';
        ctaButton.onclick = () => {
            window.open(superusappURL, '_blank');
        };
        commentButton.insertAdjacentElement('afterend', ctaButton);
    }
  
    // document.body.appendChild(ctaButton)
  }
  
  if (window.location.href.includes('https://news.ycombinator.com/item?id=')) {
    addCTAButton();
  }

  function addVisualizeButton(commentLink) {
    const hnPostId = commentLink.href.split('id=')[1];

    if (!hnPostId){
        return 
    }

    const superusappURL = `https://www.superusapp.com/share/hn2map?sr=true&id=${hnPostId}`;
  
    const visualizeLink = document.createElement('a');
    visualizeLink.href = superusappURL;
    visualizeLink.target = '_blank';
    visualizeLink.textContent = 'visualize';
  
    commentLink.insertAdjacentElement('afterend', visualizeLink);
    commentLink.insertAdjacentText('afterend', ' | ');
    
  }


function createIFrame(url) {
    const iframeWrapper = document.createElement('div');
    iframeWrapper.style.position = 'fixed';
    iframeWrapper.style.right = '0';
    iframeWrapper.style.top = '0';
    iframeWrapper.style.width = '70vw';
    iframeWrapper.style.height = '100%';
    iframeWrapper.style.zIndex = '1000';
    iframeWrapper.style.background = '#000000';
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '5px';
    closeButton.style.top = '5px';
    closeButton.style.zIndex = '1001';
    closeButton.onclick = () => {
      document.body.removeChild(iframeWrapper);
      document.body.style.width = '100vw';
      document.body.style.overflowX = 'auto';
    };
  
    const toggleFullScreenButton = document.createElement('button');
    toggleFullScreenButton.textContent = 'Full Screen';
    toggleFullScreenButton.style.position = 'absolute';
    toggleFullScreenButton.style.left = '60px';
    toggleFullScreenButton.style.top = '5px';
    toggleFullScreenButton.style.zIndex = '1001';
    toggleFullScreenButton.onclick = () => {
      if (iframeWrapper.style.width === '100%') {
        iframeWrapper.style.width = '70vw';
        toggleFullScreenButton.textContent = 'Full Screen';
      } else {
        iframeWrapper.style.width = '100%';
        toggleFullScreenButton.textContent = 'Half Screen';
      }
    };
  
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
  
    iframeWrapper.appendChild(closeButton);
    iframeWrapper.appendChild(toggleFullScreenButton);
    iframeWrapper.appendChild(iframe);
  
    return iframeWrapper;
  }
  
  // ... (rest of the content_script.js code remains the same)
  
  

  function addSideScreenButton(commentLink) {
    const hnPostId = commentLink.href.split('id=')[1];
    const superusappURL = `https://www.superusapp.com/share/hn2map?id=${hnPostId}`;
  
    const visualizeLink = document.createElement('a');
    visualizeLink.href = '#';
    visualizeLink.textContent = 'visualize on side screen';
    visualizeLink.onclick = (event) => {
        event.preventDefault();
    
        const existingIFrameWrapper = document.getElementById('hn-visualizer');
        if (existingIFrameWrapper) {
          const oldIFrame = existingIFrameWrapper.querySelector('iframe');
          if (oldIFrame) {
            existingIFrameWrapper.removeChild(oldIFrame);
          }
    
          const newIFrame = document.createElement('iframe');
          newIFrame.src = superusappURL;
          newIFrame.style.width = '100%';
          newIFrame.style.height = '100%';
          newIFrame.style.border = 'none';
          existingIFrameWrapper.appendChild(newIFrame);
        } else {
          const iframeWrapper = createIFrame(superusappURL);
          iframeWrapper.id = 'hn-visualizer';
          document.body.appendChild(iframeWrapper);
          document.body.style.width = '30vw';
          document.body.style.overflowX = 'hidden';
        }
      };
    // visualizeLink.onclick = (event) => {
    //   event.preventDefault();
    //   const existingIFrame = document.getElementById('hn-visualizer');
    //   if (existingIFrame) {
    //     existingIFrame.src = superusappURL;
    //   } else {
    //     const iframe = createIFrame(superusappURL);
    //     iframe.id = 'hn-visualizer';
    //     document.body.appendChild(iframe);
    //     document.body.style.width = '30vw';
    //     document.body.style.overflowX = 'hidden';
    //   }
    // };
    commentLink.insertAdjacentElement('afterend', visualizeLink);
    commentLink.insertAdjacentText('afterend', ' | ');
  }
  
  
  function addVisualizeButtons() {
    const commentLinks = document.querySelectorAll('td.subtext a[href*="item?id="]:last-of-type');
    commentLinks.forEach((commentLink) => {
        if (commentLink.innerHTML.includes("comments") || commentLink.innerHTML.includes("discuss")){
            // addVisualizeButton(commentLink);
            addSideScreenButton(commentLink)
        }
    });
  }
  
  if (window.location.href.includes('https://news.ycombinator.com/')) {
    addVisualizeButtons();
  }

  function preventTwoFingerSwipe(event) {
    // Check if deltaX is significant enough (e.g., greater than 100) to be considered a swipe action
    if (Math.abs(event.deltaX) > 500) {
      event.preventDefault();
    }
  }
  
  document.addEventListener('wheel', preventTwoFingerSwipe, { passive: false });