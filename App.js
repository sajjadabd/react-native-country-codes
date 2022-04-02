import React , { useState } from 'react';

import { 
  View, 
  Text , 
  StyleSheet ,
  FlatList ,
  Image ,
  TextInput ,
  Switch ,
} from 'react-native';

import { Codes } from './components/CountryCodes';


const App = () => {

  const [codes , setCodes] = React.useState(Codes);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  return (
    <View style={styles.body}>
    <View style={styles.header}>
      <TextInput 
        style={styles.searchInput}
        placeholder={ isEnabled ? "Search Country" : "Search Country Code"}
        onChangeText={(text) => {
          setCodes( Codes.filter( code => {
            if ( isEnabled == false ) {
              return code.dial_code.toLowerCase().includes(text.toLowerCase());
            } else {
              return code.name.toLowerCase().includes(text.toLowerCase());
            }
          } ) );
        }}
        autoCapitalize="none"
        keyboardType={ isEnabled ? "web-search" : "phone-pad"}
      />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={ isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
    { codes.length > 0 ? (  
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={codes}
      renderItem={ ({ item }) => {
        const flag = `https://countryflagsapi.com/png/${item.code}`;
          return (
            <View style={styles.wrapper}>
              <View style={styles.item}>
                <Image style={styles.image} source={{uri: flag}} />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <View style={styles.dial}>
                <Text style={styles.itemText}>{item.dial_code}</Text>
              </View>
            </View>
          )
        }
      }
    />
    ) : ( 
      <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>No Results Found!</Text>
    </View>
    )}

    </View>
  );
}

const styles = StyleSheet.create({
  body : {
    flex: 1,
    backgroundColor: '#001219',
  },
  header : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {
    paddingVertical : 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  searchInput : {
    borderColor : '#ccc',
    borderWidth : 1,
    padding : 10,
    marginHorizontal : 10,
    marginVertical : 30,
    borderRadius : 5,
    fontSize : 20,
    flex : 1,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  item : {
    flex : 1,
    padding : 10,
    margin : 10,
    flexDirection : 'row',
  },
  itemText : {
    fontSize : 20,
  },
  dial : {
    padding : 10,
    margin : 10,
  },
  image : {
    width : 50,
    height : 30,
    marginRight : 10,
  }
});

export default App;
