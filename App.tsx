import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import AppContainer from './src/components/app-container';
import MainScreen from './src/screens/main';
import { useEffect, useState } from "react";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import DataTable from 'react-data-table-component';

const LocInfo = ({ id, dist }) => (
  <View style={styles.item}>
    <Text style={[
      (this.locColor(id)==1) ? styles.bad : styles.good,
      styles.id]}>{id}</Text>
    <Text style={styles.id}>{dist}</Text>
  </View>
);

export default function App() {
  const [data, setData] = useState([]);
  

  const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
  ];

  const data_table = [
      {
          id: 1,
          title: 'Beetlejuice',
          year: '1988',
      },
      {
          id: 2,
          title: 'Ghostbusters',
          year: '1984',
      },
  ]


  const getPosts = () => {
    fetch("http://386a-159-196-170-76.ngrok.io/table?loc_x=151.734&loc_y=-32.923")
    .then((res) => res.json())
    .then(resJson => {
      console.log(resJson)
      setData(resJson);
    }).catch(e => {console.log(e)})
  };

  const fetchData = () => {
    const axios = require('axios');
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

    // Make a request for a user with a given ID
    axios.get('http://127.0.0.1:5000/')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        console.log(error.response.data);  
        console.log(error.response.status);  
        console.log(error.response.headers); 
      })
      .then(function () {
        // always executed
      });

    };
  
  const locColor = (indicator) => {
    if(indicator < 2) {
      return 0
    } else {
      return 1
    }
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <AppContainer>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{width: '100%'}}
          data={data}
          renderItem={({item}) => (
            
            <View style={styles.item}>
              <Text style={[
                (locColor(item.id)==1) ? styles.bad : styles.good,
                styles.id]}>{item.id}</Text>
              <Text style={styles.id}>{item.dist}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      <MainScreen />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  good: {color: 'green'},
  bad: {color: 'red'},
  container: {
    justifyContent:'center',
    alignItems: 'center',

    flex: 1,
  },
  item: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row'

  },
  id: {
    fontSize: 20,
  },
});

