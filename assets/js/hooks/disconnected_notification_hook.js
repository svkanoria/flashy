// We will wait for `timeout` ms before showing the disconnected notification
const timeout = 300

const DisconnectedNotificationHook = {
    mounted() {
        this.timer = null
    },

    destroyed() {
        clearTimeout(this.timer)

        this.timer = null
    },

    disconnected() {
        console.log("Flashy says: Disconnected")

        if (!this.timer) {
            this.timer = setTimeout(() => {
                this.liveSocket.execJS(this.el, this.el.getAttribute("data-show"))
            }, timeout)
        }
    },

    reconnected() {
        console.log("Flashy says: Reconnected")

        clearTimeout(this.timer)

        this.timer = null

        this.liveSocket.execJS(this.el, this.el.getAttribute("data-hide"))
    }
}

export default DisconnectedNotificationHook
