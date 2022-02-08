function initZDApp() {
  // Initialise Apps framework client. See also:
  // https://developer.zendesk.com/apps/docs/developer-guide/getting_started
  var client = ZAFClient.init()
  var dealID = ""
  client.get("deal").then(function(obj) {
    console.log("Deal: \n" + JSON.stringify(obj, null, 4))
    dealID = obj.deal.id
  });
  
  window.addEventListener('message', event => {
    // IMPORTANT: check the origin of the data! 
    if (event.origin.startsWith(remoteURL)) {
      // The data was sent from your site.
      console.log("Query:\n" + JSON.stringify(event.data, null, 4));
      if (event.data.type === 'height') {
        client.invoke('resize', { width: '100%', height: event.data.height + 'px' });
      } else if (event.data.type === 'context') {
        client.context().then(function(obj) {
          const iframe = document.querySelector("iframe");
          iframe.contentWindow.postMessage({'type': event.data.type, 'obj': obj}, remoteURL)          
        });
      } else if (event.data.type === 'post') {
        client.request({
            url: '/v2/notes',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
              "data": {
                "resource_type": "deal",
                "resource_id": dealID,
                "content": event.data.note,
                "is_important": false,
                "tags": event.data.tags,
                "type": "regular"
              },
              "meta": {
                "type": "note"
              }
            })
          }).then(function(data) {
            const iframe = document.querySelector("iframe")
            iframe.contentWindow.postMessage({'type': 'posted', 'obj': data}, remoteURL)
          }).catch(function(error) {
            console.log("Notes error: " + error.toString()); // "APIUnavailable: "nonExistentPath" Could not find handler for: "nonExistentPath"
          })
      } else {
        client.get(event.data.type).then(function(obj) {
          const iframe = document.querySelector("iframe");
          iframe.contentWindow.postMessage({'type': event.data.type, 'obj': obj}, remoteURL)          
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
