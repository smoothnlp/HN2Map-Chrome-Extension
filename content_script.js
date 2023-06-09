function addCTAButton() {
    const hnPostId = window.location.href.split('id=')[1];
    const superusappURL = `https://www.superusapp.com/share/hn2map?card_index=0&id=${hnPostId}`;

    const commentButton = document.querySelector("form input:last-child");

    if (commentButton) {
        const ctaButton = document.createElement('button');
        ctaButton.textContent = 'map view';
        // ctaButton.style.position = 'fixed';
        // ctaButton.style.bottom = '20px';
        // ctaButton.style.right = '20px';
        ctaButton.style.marginLeft = '8px';
        ctaButton.style.zIndex = '1000';
        ctaButton.onclick = (event) => {
            // window.open(superusappURL, '_blank');
            const iframeWrapper = createIFrame(superusappURL);
            iframeWrapper.id = 'hn-visualizer';
            document.body.appendChild(iframeWrapper);
            document.body.style.width = '50vw';
            document.body.style.overflowX = 'hidden';
            event.stopPropagation()
            event.preventDefault()
        };
        commentButton.insertAdjacentElement('afterend', ctaButton);
    }
  
    // document.body.appendChild(ctaButton)
  }
  

  function addVisualizeButton(commentLink) {
    const hnPostId = commentLink.href.split('id=')[1];

    if (!hnPostId){
        return 
    }

    const superusappURL = `https://www.superusapp.com/share/hn2map?card_index=0&id=${hnPostId}`;
  
    const visualizeLink = document.createElement('a');
    visualizeLink.href = superusappURL;
    visualizeLink.target = '_blank';
    visualizeLink.textContent = 'map view';
  
    commentLink.insertAdjacentElement('afterend', visualizeLink);
    commentLink.insertAdjacentText('afterend', ' | ');
    
  }


function createIFrame(url) {
    const iframeWrapper = document.createElement('div');
    iframeWrapper.style.position = 'fixed';
    iframeWrapper.style.right = '0';
    iframeWrapper.style.top = '0';
    iframeWrapper.style.width = '0vw';
    iframeWrapper.style.height = '100%';
    iframeWrapper.style.zIndex = '1000';
    iframeWrapper.style.background = '#000000';
    iframeWrapper.style.transition = 'width 0.3s ease-in-out'; // Add a CSS transition for the width
    document.body.style.transition = 'width 0.3s ease-in-out';

    setTimeout(()=>{
        iframeWrapper.style.transition = ''; // Add a CSS transition for the width
        document.body.style.transition = '';
    },1000)


    // add copy link 
    const shareButton = document.createElement('button');
    shareButton.innerHTML = 'Share';
    shareButton.style.position = 'absolute';
    shareButton.style.top = '5px';
    shareButton.style.right = '5px';
    shareButton.style.zIndex = '1000';

    // share notification 
    function showNotification(message) {
      const notification = document.createElement('div');
      notification.innerText = message;
      notification.style.position = 'absolute';
      notification.style.top = '40px';
      notification.style.right = '5px';
      notification.style.zIndex = '1001';
      notification.style.padding = '10px';
      notification.style.borderRadius = '3px';
      notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      notification.style.color = '#ffffff';
      notification.style.fontSize = '14px';
      notification.style.fontFamily = 'Arial, sans-serif';
      notification.style.fontWeight = 'bold';
    
      iframeWrapper.appendChild(notification);
    
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }

    shareButton.onclick = async function () {
      try {
        await navigator.clipboard.writeText(iframe.src);
        showNotification('URL copied to clipboard');
      } catch (err) {
        console.error('Failed to copy URL', err);
        showNotification('Failed to copy URL');
      }
    };
    
  
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
        iframeWrapper.style.transition = 'width 0.3s ease-in-out'; // Add a CSS transition for the width
        document.body.style.transition = 'width 0.3s ease-in-out';

        setTimeout(()=>{
            iframeWrapper.style.transition = ''; // Add a CSS transition for the width
            document.body.style.transition = '';
        },1000)
      
      if (iframeWrapper.style.width === '100%') {
        iframeWrapper.style.width = '50vw';
        toggleFullScreenButton.textContent = 'Full Screen';
      } else {
        iframeWrapper.style.width = '100%';
        toggleFullScreenButton.textContent = 'Half Screen';
      }
    };
  
    const iframe = document.createElement('iframe');

    // Add load event listener to the iframe
    iframe.addEventListener('load', () => {
        iframe.contentWindow.addEventListener('wheel', (event) => {
        event.stopPropagation();
        });
    });

    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
  
    iframeWrapper.appendChild(closeButton);
    iframeWrapper.appendChild(toggleFullScreenButton);
    iframeWrapper.appendChild(iframe);
    iframeWrapper.appendChild(shareButton);

    addResizeHandle(iframeWrapper); // Add this line

    setTimeout(() => {
        iframeWrapper.style.width = '50vw'; // Animate the width after a short delay
      }, 100);
  
    return iframeWrapper;
  }


  function updateIFrame(url) {
    const existingIFrameWrapper = document.getElementById('hn-visualizer');
    if (existingIFrameWrapper) {
      const oldIFrame = existingIFrameWrapper.querySelector('iframe');
      if (oldIFrame) {
        existingIFrameWrapper.removeChild(oldIFrame);
      }
  
      const newIFrame = document.createElement('iframe');
      newIFrame.src = url;
      newIFrame.style.width = '100%';
      newIFrame.style.height = '100%';
      newIFrame.style.border = 'none';
      existingIFrameWrapper.appendChild(newIFrame);
    } else {
      const iframeWrapper = createIFrame(url);
      iframeWrapper.id = 'hn-visualizer';
      document.body.appendChild(iframeWrapper);
      document.body.style.width = '50vw';
      document.body.style.overflowX = 'hidden';
    }
  }
  
  // ... (rest of the content_script.js code remains the same)
  
  

  function addSideScreenButton(commentLink) {
    const hnPostId = commentLink.href.split('id=')[1];
    const superusappURL = `https://www.superusapp.com/share/hn2map?card_index=0&id=${hnPostId}`;

    const sideScreenLink = document.createElement('a');
    sideScreenLink.href = '#';
    sideScreenLink.textContent = 'side view';
    sideScreenLink.onclick = (event) => {
        updateIFrame(commentLink.href);
        const existingIFrameWrapper = document.getElementById('hn-visualizer');
        existingIFrameWrapper.style.background="#FFFFFF"
    }
  
    const visualizeLink = document.createElement('a');
    visualizeLink.href = '#';
    visualizeLink.textContent = 'side map';
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
          document.body.style.width = '50vw';
          document.body.style.overflowX = 'hidden';
        }
      };

    commentLink.insertAdjacentElement('afterend', visualizeLink);
    commentLink.insertAdjacentText('afterend', ' | ');
    commentLink.insertAdjacentElement('afterend', sideScreenLink);
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

  function addResizeHandle(iframeWrapper, iframe) {
    const resizeHandle = document.createElement('div');
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.top = '0';
    resizeHandle.style.left = '-5px';
    resizeHandle.style.width = '10px';
    resizeHandle.style.height = '100%';
    resizeHandle.style.cursor = 'col-resize';
    resizeHandle.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    resizeHandle.style.zIndex = '100';
  
    const resizeMask = document.createElement('div');
    resizeMask.style.position = 'absolute';
    resizeMask.style.top = '0';
    resizeMask.style.left = '0';
    resizeMask.style.width = '100%';
    resizeMask.style.height = '100%';
    resizeMask.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
    resizeMask.style.zIndex = '50';
    resizeMask.style.display = 'none';
  
    let isResizing = false;
  
    resizeHandle.addEventListener('mousedown', (event) => {
      isResizing = true;
      resizeMask.style.display = 'block';
      event.preventDefault();
    });
  
    document.addEventListener('mousemove', (event) => {
      if (isResizing) {
        const newWidth = window.innerWidth - event.clientX;
        iframeWrapper.style.width = newWidth + 'px';
        document.body.style.width = (window.innerWidth - newWidth) + 'px';
      }
    });
  
    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        resizeMask.style.display = 'none';
      }
    });
  
    iframeWrapper.appendChild(resizeHandle);
    iframeWrapper.appendChild(resizeMask); // Add the transparent mask to the iframeWrapper
  }

  if (window.location.href.includes('https://news.ycombinator.com/')) {
    addVisualizeButtons();
  }

  if (window.location.href.includes('https://news.ycombinator.com/item?id=')) {
    addCTAButton();
  }

  function preventTwoFingerSwipe(event) {
    // Check if deltaX is significant enough (e.g., greater than 100) to be considered a swipe action
    if (Math.abs(event.deltaX) > 500) {
      event.preventDefault();
    }
  }
  
  document.addEventListener('wheel', preventTwoFingerSwipe, { passive: false });