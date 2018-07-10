import React, { Component } from 'react';
import {  View, Text, StyleSheet} from 'react-native';
import api from './utilities/api';

export default class RNFetch extends Component {
    constructor(props){
        super(props);
        this.state = {
            rovers : [],
            roverName : '',
        }
    }

    componentWillMount() {
        api.getRovers().then((res) => {
            this.setState({
                rovers: res.rovers,
                roverName: res.rovers[1].name,
            })
        });
    }

    render() {
    return (
      <View style = {styles.container} >
        <Text style = {styles.welcome}> Rover! </Text>
        <Text style = {styles.instructions}>
            Name of a Rover in the NASA API: {this.state.roverName}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    welcome: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        textAlign: 'center',
    },

    instructions: {
        justifyContent: 'center',
        textAlign: 'center',
    },
});