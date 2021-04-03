import React from 'react';
import { FlatList, View } from 'react-native';
import { getImageFromId } from '../utils/api';
import Card from './Card';

const keyExtractor = ({ id }) => id.toString();

export default class CardList extends React.Component {

    renderItem = ({ item: { id, author } }) => {
        return <Card
            fullname={author}
            image={{ uri: getImageFromId(id) }}
        />
    }

    render() {
        const { items } = this.props;
        return (
            <FlatList
                data={items}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
            />

        )
    }

}
