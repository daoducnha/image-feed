import React, { Component } from 'react'
import {
    Image,
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import AuthorRow from './AuthorRow';

export default class Card extends Component {

    static defaultProps = {
        linkText: '',
        onPressLinkText: () => { },
    }

    state = {
        loading: true,
    };

    handleLoad = () => {
        this.setState({ loading: false });
    }

    shouldComponentUpdate(nextProps) {
        return this.props.linkText !== nextProps.linkText
    }

    render() {
        const { fullname, image, linkText, onPressLinkText } = this.props;
        const { loading } = this.state;
        return (
            <View>
                <AuthorRow
                    fullname={fullname}
                    linkText={linkText}
                    onPressLinkText={onPressLinkText}
                />

                <View state={styles.image}>
                    {
                        loading && (
                            <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
                        )
                    }
                    <Image
                        style={styles.image}
                        source={image}
                        onLoad={this.handleLoad}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)'

    }
})
