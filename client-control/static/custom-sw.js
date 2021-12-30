self.addEventListener('push', (e) => {
  const data = JSON.parse(e.data.text())

  const title = data.title
  const options = {
    body: data.body,
    badge: 'icon.ico',
    image: 'app-icon.png',
    vibrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600],
    openUrl: '/',
    data: {
      url: '/'
    }
  }

  e.waitUntil(self.registration.showNotification(title, options))
})
