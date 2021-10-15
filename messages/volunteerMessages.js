import notifee, { AndroidImportance } from '@notifee/react-native'
let c
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
    const {msg_type, timestamp} = message.data
    
    switch (msg_type) {
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
                title: 'some info',
                body: message.data.txt, 
                android: {
                    channelId: c['Neutral']
                }
            })
            break;
    }
}