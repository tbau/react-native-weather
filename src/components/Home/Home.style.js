const Platform = require('react-native').Platform;

module.exports = {
    weatherHeader: {
        fontSize: 22
    },
    locationContainer: {
        ...Platform.select({
            ios: {},
            android: {},
            default: {
                // other platforms, web for example
                paddingBottom: 10
            },
        })
    },
    locationHeader: {
        fontSize: 16
    },
    displayLeft: {
        width: 300
    },
    noPadding: {},
    dropdown: {
        width: 300
    },
    selectedTextStyle: {
        paddingTop: 16
    },
    placeholderStyle: {
        paddingTop: 16
    },
    textItem: {
        paddingVertical: 6,
        paddingHorizontal: 4
    }
}