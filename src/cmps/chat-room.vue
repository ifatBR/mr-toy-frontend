<template>
  <section class="chat-room flex column space-between">
    <h2 @click="toggleShowChat">{{ isUserTyping }}</h2>
    <ul v-if="isChatShowing" class="chat-container clean-list">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span> {{ msg.txt }}
      </li>
    </ul>
    <form v-if="isChatShowing" @submit.prevent="sendMsg" class="flex">
      <input type="text" v-model="msg.txt" @input="onTyping" />
      <button>Send</button>
    </form>
  </section>
</template>

<script>
import { socketService } from "../services/socket.service.js";
import { utilService } from "../services/util.service.js";
export default {
  data() {
    return {
      isChatShowing: false,
      msgs: [],
      msg: { from: "Me", txt: "" },
      topic: null,
      isUserTyping: "What's on your mind?",
      bounce: null,
    };
  },
  created() {
    this.topic = this.$route.params.toyId;
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("chat isTyping", this.isTyping);
    this.bounce = utilService.debounce(this.clearTyping, 1000);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
  methods: {
    toggleShowChat() {
      this.isChatShowing = !this.isChatShowing;
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      this.msgs.push({ ...this.msg });
      this.msg.from = this.$store.getters.username;
      socketService.emit("chat newMsg", {
        msg: this.msg,
        toyId: this.$route.params.toyId,
      });
      this.msg = { from: "Me", txt: "" };
      //   this.$store.dispatch('saveMessage', {msg:this.msg, toyId:this.toyId})
    },
    changeTopic() {
      socketService.emit("change topic", this.topic);
    },
    onTyping() {
      console.log("onTyping:");
      this.setIsTyping();
      this.bounce();
      //   utilService.debounce(this.setIsTyping, 1000, false);
    },
    setIsTyping() {
      socketService.emit("chat userTyping", this.$store.getters.username);
      //   setTimeout(() => {
      //     socketService.emit("chat userTyping", false);
      //   }, 500);
    },
    isTyping(username) {
      // this.isUserTyping = username
      if (username) return (this.isUserTyping = `${username} is typing...`);
      this.isUserTyping = "What's on your mind?";
    },
    clearTyping() {
      socketService.emit("chat userTyping", null);
    },
  },
};
</script>