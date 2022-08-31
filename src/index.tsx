import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import {
	ActionPerformed,
	PushNotificationSchema,
	PushNotifications,
	Token,
} from '@capacitor/push-notifications'
import { Capacitor } from '@capacitor/core'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

// for push notifications
const isPushNotificationsAvailable =
	Capacitor.isPluginAvailable('PushNotifications')

if (isPushNotificationsAvailable) {
	// Request permission to use push notifications
	// iOS will prompt user and return if they granted permission or not
	// Android will just grant without prompting
	PushNotifications.requestPermissions().then((result) => {
		if (result.receive === 'granted') {
			// Register with Apple / Google to receive push via APNS/FCM
			PushNotifications.register()
		} else {
			// Show some error
			console.log('error al pedir permiso de notificaciones')
		}
	})

	PushNotifications.addListener('registration', (token: Token) => {
		alert('Push registration success, token: ' + token.value)
	})

	PushNotifications.addListener('registrationError', (error: any) => {
		alert('Error on registration: ' + JSON.stringify(error))
	})

	PushNotifications.addListener(
		'pushNotificationReceived',
		(notification: PushNotificationSchema) => {
			alert('Push received: ' + JSON.stringify(notification))
		}
	)

	PushNotifications.addListener(
		'pushNotificationActionPerformed',
		(notification: ActionPerformed) => {
			alert('Push action performed: ' + JSON.stringify(notification))
		}
	)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

// Call the element loader after the app has been rendered the first time
defineCustomElements(window)
