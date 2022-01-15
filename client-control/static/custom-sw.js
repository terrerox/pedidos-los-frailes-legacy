self.addEventListener('push', (e) => {
  const data = JSON.parse(e.data.text())

  const title = data.title
  const options = {
    body: data.body,
    badge: 'icon.ico',
    icon: 'app-icon.png',
    vibrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600],
    openUrl: data.openUrl,
    data: {
      url: data.openUrl
    }
  }

  e.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (e) => {
  const notification = e.notification

  // eslint-disable-next-line no-undef
  const response = clients.matchAll()
    .then((c) => {
      const client = c.find((c) => {
        return c.visibilityState === 'visible'
      })

      if (client !== undefined) {
        client.navigate(notification.data.url)
        client.focus()
      } else {
        // eslint-disable-next-line no-undef
        clients.openWindow(notification.data.url)
      }

      return notification.close()
    })

  e.waitUntil(response)
})
