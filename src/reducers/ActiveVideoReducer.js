const INITIAL_STATE = {
    highlightSegments: [
        {
            start: 1,
            end: 2,
        },
        {
            start: 4,
            end: 6,
        },
    ],
    playHighlightOnly: false,
    currentSegment: 0,
    seekAmount: undefined,
    paused: false,
    initialized: false,
};

export default (state = INITIAL_STATE, action) => {
    const { highlightSegments, currentSegment } = state;
    switch (action.type) {
        case 'PAUSE_OR_PLAY_VIDEO': {
            return { ...state, paused: !state.paused };
        }
        case 'RESET_SEEK': {
            return { ...state, seekAmount: undefined };
        }
        case 'TOGGLE_PLAY_HIGHLIGHT_MODE': {
            if (state.playHighlightOnly) {
                return { ...state, playHighlightOnly: false };
            }
            return { ...state, playHighlightOnly: true, seekAmount: highlightSegments[0].start, currentSegment: 0, paused: false };
        }
        case 'UPDATE_VIDEO_TIME': {
            if (!state.playHighlightOnly) {
                return state;
            }
            if (!state.initialized) {
                return { ...state, initialized: true, seekAmount: highlightSegments[0].start, currentSegment: 0, paused: false };
            }
            const videoTime = action.payload;
            if (videoTime >= highlightSegments[currentSegment].end) {
                if (currentSegment >= highlightSegments.length - 1) {
                    return { ...state, seekAmount: -1, currentSegment: 0, paused: true, playHighlightOnly: false };
                }
                return { ...state, seekAmount: highlightSegments[currentSegment + 1].start, currentSegment: currentSegment + 1 };
            }
            return state;
        }
        default:
            return state;
    }
};

