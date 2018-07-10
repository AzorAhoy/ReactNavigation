import React, { Component } from 'react';
import {View, Text, 
		StyleSheet, FlatList,
		TouchableOpacity, ScrollView,
		Image,
} from 'react-native';

export default class FlatListDemo extends Component {
	state = {
		data : []
	};
	
	componentWillMount() {
		this.fetchData();
	}

	fetchData = async() => {
		const response = await fetch("https://randomuser.me/api?results=10");
		const json = await response.json();
		this.setState({data: json.results});
	};

	render() {
    	return (
      		<View style = {styles.container} >
        		<TouchableOpacity
					onPress = {() => this.props.navigation.push('FlatList')}
				>
					<Text>REFRESH</Text>
				</TouchableOpacity>
				<FlatList
					data = {this.state.data}
					keyExtractor = {(x, i) => i}
					renderItem = {({item}) => 
						<TouchableOpacity
							onPress = {() => this.props.navigation.navigate('Info')}
						>
							<Image 
								source = {{uri : item.picture.thumbnail}}
								style = {{
									width: 100,
									height: 100
								}}
							/>
							<Text style = {{fontSize: 20}}>
								{`${item.name.first} ${item.name.last} ${item.dob.date} \n`}
							</Text>
						</TouchableOpacity>

					}
				/>
      		</View>
    	);
  	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
});
