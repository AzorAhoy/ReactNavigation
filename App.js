/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image, YellowBox
} from 'react-native';

import {createStackNavigator,
		createBottomTabNavigator,
} from 'react-navigation';

import FlatListDemo from './FlatListDemo';
import RNFetch from './RNFetch';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

class LogoTitle extends Component {
	render() {
		return (
			<Image 
				source = {require('./spiro.png')}
				style = {{
					width: 30,
					height: 30
				}}
			/>
		);
	}
}

class HomeScreen extends Component {
	static navigationOptions = ({navigation}) =>
	{
		const params = navigation.state.params|| {};
		return {
			headerLeft: (
				<Button
					onPress = { () => navigation.navigate('MyModal')}
					title = 'Info'
					color = '#fff'
				/>
			),
			headerTitle: <LogoTitle/>,
			headerRight: (
				<Button
					onPress = {navigation.getParam('increaseCount')}
					title = '+1'
					color= '#fff'
				/>
			),			
		};
	};
	
	componentDidMount() {
		this.props.navigation.setParams({increaseCount: this._increaseCount});
	}

	state = {
		count: 0,
	};

	_increaseCount = () => {
		this.setState({
			count: this.state.count + 1
		});
	};

	render() {
    	return (
      		<View style = {{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
      		}} >
				<Text>Home screen</Text>
				<Button
					title = "Go to Details"
					onPress = {() => {
						this.props.navigation.navigate('Details', {
							itemID: 86,
							otherParam: 'ffdffv',
						});
					}}
				/>
				<Text> {this.state.count} </Text>
			</View>
    	);
  	}
}

class ModalScreen extends Component {
	render() {
		return (
			<View
				style = {{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text style = {{fontSize: 30}}>
					This is a modal!
				</Text>
				<Button
					title = 'Dismiss'
					onPress = {() => this.props.navigation.goBack()}
				/>
			</View>
		);
	}
}

class DetailsScreen extends Component {
	static navigationOptions = ({navigation, navigationOptions}) => {
		const {params} = navigation.state;
		return {
			title: params ? params.otherParam: 'A nested Details Screen',
			headerStyle: {
				backgroundColor: navigationOptions.headerTintColor,
			},
			headerTintColor: navigationOptions.headerStyle.backgroundColor,
		};
	};
	
	render() {
		const {navigation} = this.props;
		const itemID = navigation.getParam('itemID', 'no ID');
		const otherParam = navigation.getParam('otherParam','default');
		return(
			<View
				style = {{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text>Detail Screen</Text>
				<Text> itemID: {JSON.stringify(itemID)} </Text>
				<Text> otherParam: {JSON.stringify(otherParam)} </Text>
				<Button
					title = 'Update the title'
					onPress = {() => this.props.navigation.setParams({otherParam: 'Updated!'})}
				/>
				<Button
					title = "Go to Details again"
					onPress = {() => 
						this.props.navigation.push('Details', {
							itemID: Math.floor(Math.random() * 100),
						})}
				/>
				<Button
					title = 'Go to FlatList'
					onPress = {() => this.props.navigation.navigate('FlatList')}
				/>
				<Button
					title = 'More'
					onPress = {() => this.props.navigation.navigate('Details2')}
				/>
				<Button
					title = "Go to Home"
					onPress = {() => this.props.navigation.push('Home')}
				/>				

			</View>
		);
	}
}

class DetailsScreen2 extends Component {
	static navigationOptions = ({navigation, navigationOptions}) => {
		const {params} = navigation.state;
		return {
			title: params ? params.otherParam: 'A nested Details Screen',
			headerStyle: {
				backgroundColor: navigationOptions.headerTintColor,
			},
			headerTintColor: navigationOptions.headerStyle.backgroundColor,
		};
	};
	
	render() {
		return(
			<View
				style = {{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button
					title = 'Update the title'
					onPress = {() => this.props.navigation.setParams({otherParam: 'Updated!'})}
				/>
				<Button
					title = "Go to Details again"
					onPress = {() => this.props.navigation.push('Details')}
				/>
				<Button
					title = 'Go to RNFetch'
					onPress = {() => this.props.navigation.navigate('RNFetch')}
				/>
				<Button
					title = "Go to Home"
					onPress = {() => this.props.navigation.push('Home')}
				/>				

			</View>
		);
	}
}

const MainStack = createStackNavigator(
{
	Home: HomeScreen,
	Details: DetailsScreen,
	Details2: DetailsScreen2,
	FlatList: FlatListDemo,
	RNFetch: RNFetch,
	Info: Info,
},
{
	initialRouteName: 'Home',
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#f4511e',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	},
	headerMode: 'screen',
}
);

const RootStack = createStackNavigator(
	{
		Main: MainStack,
		MyModal: ModalScreen,
	},
	{
		mode: 'modal',
		headerMode: 'none',
	}
);
const Tabs = createBottomTabNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
});
export default class App extends Component{
	render(){
		return <RootStack/>;
	}
};

const styles = StyleSheet.create({

});
