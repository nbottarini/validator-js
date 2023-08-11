expect.extend({
    forceFailWithMessage(received, message) {
        return {
            message: () => message,
            pass: false,
        }
    },
})
