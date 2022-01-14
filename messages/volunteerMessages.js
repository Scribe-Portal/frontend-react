import notifee, { AndroidImportance } from '@notifee/react-native'
let c = {}
export const channels = {
    Greet: {
        id: "Greet",
        name: "Greets you at first sign-in",
        vibration: true,
        lights: false,
        importance: AndroidImportance.DEFAULT
    },
    Neutral: {
        id: "Neutral",
        name: "Conveys Information",
        vibration: true,
        lights: false,
        importance: AndroidImportance.DEFAULT
    }
}
export async function initialise_channels () {
    for (let [channel, channel_props] of Object.entries(channels)) {
        
        c[channel] = await notifee.createChannel(channel_props)
    }
}
export default async function CommonMessages (message){
    const {type,notif} = message.data
    console.log("received a message", message)
    switch (type) {
        case 'Greet':
            
            notifee.displayNotification({
                title: 'Hi', 
                body: 'Welcome to our App! We are pleased to receive you.',
                android: {
                    channelId: c['Greet']
                }
            })
            break;
        case 'Neutral':
            notifee.displayNotification({
                title: message.notification.title,
                body: message.notification.body, 
                android: {
                    channelId: c['Neutral']
                }
            })
            break;
        case 'OTP': 
            notifee.displayNotification({
                title: 'OTP has been sent', 
                body: notif,
                android: {
                    channelId: c['Neutral']
                }
            })
            break;
        case 'AcceptS': 
            notifee.displayNotification({
                title: 'Request accepted', 
                body: 'Your Scribe Request has been accepted please check the app',
                android: {
                    channelId: c['Neutral']
                }
            })
            break;
        case 'Accept': 
            notifee.displayNotification({
                title: 'New Request', 
                body: 'You have a new scribe request',
                android: {
                    channelId: c['Neutral']
                }
            })
            break;
        default: 
            notifee.displayNotification({
                title: type+" unregistered",
                body: notif, 
                android: {
                    channelId: c['Neutral']
                }
            })
            break;

    }
}