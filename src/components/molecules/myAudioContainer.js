import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import IconII from "react-native-vector-icons/Ionicons";


/*
import Swipeable from 'react-native-swipeable-row';
const rightButtons = [
    <TouchableOpacity><Text>Button 1</Text></TouchableOpacity>,
    <TouchableOpacity><Text>Button 2</Text></TouchableOpacity>
];

        <Swipeable rightButtons={rightButtons}>
        </Swipeable>

*/

class myItemList extends Component {
    render() {
        return (
            <ListItem   
                bottomDivider
            >   
                <ListItem.Content>
                    <ListItem.Title>{this.props.item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{marginTop: 10}}>{this.props.item.creation_time}</ListItem.Subtitle>
                </ListItem.Content>
                <IconII name={"chevron-forward"} size={30} color='rgb(255,70,70)'/>
            </ListItem>
        )
    }
}


export default myItemList;