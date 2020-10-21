export default {
  SET_CHANNEL(state, channel) {
    state.channel = channel;
  },
  PUSH_CONVERSATION(state, conversation) {
    state.conversations.push(conversation);
  },
  CLEAR_CONVERSATIONS(state) {
    state.conversations = [];
  }
};
