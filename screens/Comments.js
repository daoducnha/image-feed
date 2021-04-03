import React from 'react';
import { SafeAreaView } from 'react-native';

import CommentInputs from '../components/CommentInputs';
import CommentList from '../components/CommentList';
import NavigationBar from '../components/NavigationBar';

export default function Comments({
    style,
    comments,
    onClose,
    onSubmitComment
}) {
    return (
        <SafeAreaView style={style}>
            <NavigationBar
                title='Comments'
                leftText="Close"
                onPressLeftText={onClose}
            />

            <CommentInputs
                placeholder="Leave a comment"
                onSubmit={onSubmitComment}
            />

            <CommentList items={comments} />
        </SafeAreaView>
    )
}

Comments.defaultProps = {
    style: null
}