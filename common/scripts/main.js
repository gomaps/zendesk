function initZDApp() {
  // Initialise Apps framework client. See also:
  // https://developer.zendesk.com/apps/docs/developer-guide/getting_started
  var client = ZAFClient.init();
  
  window.addEventListener('message', event => {
    // IMPORTANT: check the origin of the data! 
    if (event.origin.startsWith('http://localhost:3000')) {
      // The data was sent from your site.
      console.log("Query:\n" + JSON.stringify(event.data, null, 4));
      if (event.data.type == 'height') {
        client.invoke('resize', { width: '100%', height: event.data.height + 'px' });
      } else if (event.data.type == 'context') {
        client.context().then(function(obj) {
          const iframe = document.querySelector("iframe");
          iframe.contentWindow.postMessage({'type': event.data.type, 'obj': obj}, "http://localhost:3000")          
        });
      } else {
        client.get(event.data.type).then(function(obj) {
          const iframe = document.querySelector("iframe");
          iframe.contentWindow.postMessage({'type': event.data.type, 'obj': obj}, "http://localhost:3000")          
        });
      }
    } else {
      // The data was NOT sent from your site! 
      console.log("Claims commander container unknown origin - " + event.origin)
      return;
    }
  });
  
  // Init the iframe
  document.getElementById("mainContent").src = remoteURL + remotePath
}