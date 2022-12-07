import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'

 export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMtoke();
  }
}

async function GetFCMtoke(){
    let fcmtoken = await AsyncStorage.getItem("fcmtoken")
    console.log(fcmtoken,"old token")
    if(!fcmtoken){

    try{
        const fcmtoken = await messaging().getToken();
        if(fcmtoken)
        {
            console.log(fcmtoken,"new token")
           await AsyncStorage.setItem("fcmtoken",fcmtoken);
        }else{

        }
    }catch (error)
    {
        console.log(error,"error in fcmtoken")
    }
}
}



export const NotificaitonListner=()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
      messaging().onMessage(async remoteMessage=>{
        console.log("notification on sate....",remoteMessage);
      })

}
