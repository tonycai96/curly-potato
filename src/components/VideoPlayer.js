import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';

const FORWARD_DURATION = 7;
class VideoPlayer extends Component {

    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = { paused: false };
    }

    onVideoEnd() {
        this.videoPlayer.seek(0);
        this.setState({ key: new Date(), currentTime: 0, paused: true });
    }

    onVideoLoad(e) {
        this.setState({ currentTime: e.currentTime, duration: e.duration });
    }

    onProgress(e) {
        this.setState({ currentTime: e.currentTime });
    }

    playOrPauseVideo(paused) {
        this.setState({ paused: !paused });
    }

    onBackward(currentTime) {
        const newTime = Math.max(currentTime - FORWARD_DURATION, 0);
        this.videoPlayer.seek(newTime);
        this.setState({ currentTime: newTime });
    }

    onForward(currentTime, duration) {
        if (currentTime + FORWARD_DURATION > duration) {
            this.onVideoEnd();
        } else {
            const newTime = currentTime + FORWARD_DURATION;
            this.videoPlayer.seek(newTime);
            this.setState({ currentTime: newTime });
        }
    }

    getCurrentTimePercentage(currentTime, duration) {
        if (currentTime > 0) {
            return parseFloat(currentTime) / parseFloat(duration);
        } 
            return 0;
    }

    onProgressChanged(newPercent, paused) {
        const { duration } = this.state;
        const newTime = newPercent * duration / 100;
        this.setState({ currentTime: newTime, paused });
        this.videoPlayer.seek(newTime);
    }

    render() {
        const { onClosePressed, video, volume } = this.props;
        const { currentTime, duration, paused } = this.state;
        const completedPercentage = this.getCurrentTimePercentage(currentTime, duration) * 100;
        return (<View style={styles.fullScreen} key={this.state.key}>
            <View style={[styles.cancelButton]}>
                <TouchableOpacity onPress={onClosePressed} style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../../assets/images/close.png')} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
style={styles.videoView}
                         onPress={this.playOrPauseVideo.bind(this, paused)}
            >
                <Video
ref={videoPlayer => this.videoPlayer = videoPlayer}
                       onEnd={this.onVideoEnd.bind(this)}
                       onLoad={this.onVideoLoad.bind(this)}
                       onProgress={this.onProgress.bind(this)}
                       source={{ uri: 'https://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear1/fileSequence0.ts' }}
                       paused={paused}
                       volume={Math.max(Math.min(1, volume), 0)}
                       resizeMode="contain"
                       style={styles.videoContainer} 
                />
                {paused &&
                <Image
style={styles.videoIcon}
                       source={require('../../assets/images/play-icon.png')} 
                />}
            </TouchableOpacity>
        </View>);
    }
}

let styles = StyleSheet.create({
    fullScreen: { flex: 1, backgroundColor: 'black' },
    controller: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controllerButton: { height: 20, width: 20 },
    videoView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBar: {
        alignSelf: 'stretch',
        margin: 20
    },
    videoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    videoIcon: {
        position: 'relative',
        alignSelf: 'center',
        width: 79,
        height: 78,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    }
});

VideoPlayer.propTypes = {
    video: PropTypes.object.isRequired,
    volume: PropTypes.number,
    onClosePressed: PropTypes.func.isRequired
};

export default VideoPlayer;
