const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  // eslint-disable-next-line no-useless-escape
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  var rawData = window.atob(base64)
  var outputArray = new Uint8Array(rawData.length)

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function sendSubscription(subscription) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/notifications/subscribe`, {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function subscribeUser() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (registration) {
            if (!registration.pushManager) {
                console.log('Push manager unavailable.')
                return
            }

            registration.pushManager.getSubscription().then(function (existedSubscription) {
                if (existedSubscription === null) {
                    console.log('No subscription detected, make a request.')
                    registration.pushManager.subscribe({
                        applicationServerKey: convertedVapidKey,
                        userVisibleOnly: true,
                    }).then(function (newSubscription) {
                        console.log('New subscription added.')
                        sendSubscription(newSubscription)
                    }).catch(function (e) {
                        if (Notification.permission !== 'granted') {
                            console.log('Permission was not granted.')
                        } else {
                            console.error('An error ocurred during the subscription process.', e)
                        }
                    })
                } else {
                    console.log('Existed subscription detected.')
                    sendSubscription(existedSubscription)
                }
            })
        })
            .catch(function (e) {
                console.error('An error ocurred during Service Worker registration.', e)
            })
    }
}