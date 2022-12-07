import React, { useEffect } from 'react';
import { View,Text } from 'react-native';
import {requestUserPermission,NotificaitonListner} from './src/pushNotificaiton.js'

const App=()=> {
  useEffect(()=>{
    requestUserPermission();
    NotificaitonListner();
  },[])

return(
    <View>

      <Text style={{textAlign:'center',fontSize:30}}>Push Notificaiton</Text>
    </View>
)
}
export default App;