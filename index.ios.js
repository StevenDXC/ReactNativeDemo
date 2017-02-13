'use strict';

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  StyleSheet,
  AppRegistry
  } from 'react-native';

var RepoList = require('./app/pages/RepoList');
var About = require('./app/pages/AboutMe');
var RepoDetail = require('./app/pages/RepoDetail');

export default class NavigatorExample extends React.Component {

 static defaultProps = {
    value: 0,
  };

  state = {
    value: this.props.value,
    trueSwitchIsOn: true,
    falseSwitchIsOn: false,
  };

  constructor(props){
     super(props);
     this.state = {animating:true};
  }

  rightBtnPressed() {
    this.refs.nav.push({
       title: "About",
       component:About,
       barTintColor:'gold',
       tintColor:"black",
       shadowHidden:true,
    });
  }

  render() {
     return (
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitleText} leftButtonIconStyle={styles.barButtonIconStyle} rightButtonTextStyle={styles.barButtonTextStyle}>
            <Scene key="root">
               <Scene key="RepoList" component={RepoList} title="RepoList" initial={true}  rightTitle='About' 
               onRight={()=>{
                 Actions.About();
               }}/>
               <Scene key="About" component={About} title="About" direction="vertical" hideNavBar={true} />
               <Scene key="RepoDetail" component={RepoDetail} title="Detail"/>
            </Scene>
        </Router>);    
  }
}

const styles = StyleSheet.create({

  navBar: {
    backgroundColor: 'red',
  },
  navBarText: {
    fontSize: 16,
  },
  navBarTitleText: {
    color: '#000000',
    fontWeight:"bold",
    fontSize:17,
  },
  barButtonTextStyle: {
    color: '#000000',
  },
  barButtonIconStyle: {
    tintColor: '#000000',
  },
  progressView: {
    marginTop: 20,
  }
});

AppRegistry.registerComponent('ReactNativeDemo', () => NavigatorExample);
