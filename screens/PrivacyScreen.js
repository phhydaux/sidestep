import * as React from 'react';
import { Button, View, Text, StyleSheet, } from 'react-native';





export default function PrivacyScreen({ navigation }) {
    return (
    <View style={styles.container}>
      <View style={styles.textcontainer}>
      <Text style={styles.bodytext}>
        This is a lot of text that reassures users that their information will not be used without their consent, 
        whilst actually allowing their information to be used without their consent.  
        This is typical legal jargon that really should be outlawed.
        It is probably very bad indeed.  Consequently:
      </Text>
      <Text style={styles.bodytext}>
        1. This is a line of text that starts on a new line to convince us that it is being Done
        thoughtfully and thougrollly, and with no reference to conventional spelling.
      </Text>
      <Text style={styles.bodytext}>
        2. This is also a new paragraph. And it needs to be said, frequently and loudly, that in no way does this preclude
        or defend the absolute right, of any Englishman, or indeed, Welshman or Scotsman, to disagree with the Government, at any time,
        or in any place, where the true spirit of Britishness is being defended.
      </Text>
      </View>
      <View style = {styles.button}>
      <Button onPress={() => navigation.goBack()} title="Done" />
      </View>
        
      </View>
    );
  };

  const styles = new StyleSheet.create({

button: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
flexDirection: 'row',
padding: 10,
paddingRight: 50,

width: "100%",
},
bodytext: {
padding: 15,

},
container: {
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 

},
textcontainer: {
    flex: 0, 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 

},




  })