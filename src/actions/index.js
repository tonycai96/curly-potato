export const updateVideoTime = (currentTime) => {
    return {
        type: 'UPDATE_VIDEO_TIME',
        payload: currentTime
    };
};

export const resetSeek = () => {
    return {
        type: 'RESET_SEEK',
    };
};

export const togglePlayHighlightMode = () => {
    return {
        type: 'TOGGLE_PLAY_HIGHLIGHT_MODE',
    };
};

export const pauseOrPlayVideo = () => {
    return {
        type: 'PAUSE_OR_PLAY_VIDEO',
    };
};
