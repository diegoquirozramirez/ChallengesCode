const responses = {
    EXECUTE_OK_SENDER: (to: String) => {
        return `Hello ${to} your message will be send`;
    },
    EXECUTE_ERROR_SENDER: `ERROR`
}

export default responses;