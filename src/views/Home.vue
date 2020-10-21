<template>
  <div class="home">
    <v-card id="chat-card">
      <!-- Join Channel Dialog -->
      <join-channel-dialog
        v-if="joinChannelDialog"
        :channel="channel"
        :persistent="channel === null"
        @close="joinChannelDialog = false"
        @join="joinChannel($event)"
      ></join-channel-dialog>

      <!-- Card Title -->
      <v-card-title>
        <!-- The Header -->
        <conversation-header
          :channel="channel"
          @clear="resetConversations()"
          @change-channel="joinChannelDialog = true"
        ></conversation-header>
      </v-card-title>

      <!-- Card Content -->
      <v-card-text id="chat-card-content" class="px-0">
        <div class="conversations-container">
          <!-- The Conversations -->
          <conversations
            class="px-5"
            :auth="auth"
            :conversations="conversations"
          ></conversations>
        </div>

        <!-- The Input -->
        <conversation-input
          class="px-5 mt-5"
          :auth="auth"
          :channel="channel"
        ></conversation-input>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Conversations from "@/components/Conversation/Conversations";
import ConversationHeader from "@/components/Conversation/Header";
import ConversationInput from "@/components/Conversation/Input";
import JoinChannelDialog from "@/components/Channel/JoinChannelDialog";

export default {
  name: "Home",

  components: {
    Conversations,
    ConversationHeader,
    ConversationInput,
    JoinChannelDialog
  },

  data() {
    return {
      joinChannelDialog: false
    };
  },

  computed: {
    ...mapState("auth", {
      auth: state => state.user
    }),
    ...mapState("conversations", {
      channel: state => state.channel,
      conversations: state => state.conversations
    }),
    currentChannel() {
      return `chat.${this.channel}`;
    }
  },

  mounted() {
    if (this.channel) {
      this.listenNewMessage();
    } else {
      this.joinChannelDialog = true;
    }
  },

  methods: {
    ...mapMutations("conversations", {
      setChannel: "SET_CHANNEL",
      pushConversation: "PUSH_CONVERSATION",
      clearConversations: "CLEAR_CONVERSATIONS"
    }),
    listenNewMessage() {
      window.Echo.private(this.currentChannel).listen(".new-message", event => {
        this.pushConversation(event);
      });
    },
    joinChannel(newChannel) {
      this.leaveChannel();
      this.$nextTick(() => {
        this.pushConversation({
          message: `You have joined channel #${newChannel}`,
          alert: true
        });

        this.setChannel(parseInt(newChannel));
        this.listenNewMessage();
        this.joinChannelDialog = false;
      });
    },
    leaveChannel() {
      window.Echo.leave(this.currentChannel);
    },
    resetConversations() {
      const lastAlert = this.conversations.filter(
        conversation => conversation.alert
      );

      this.clearConversations();
      this.pushConversation(lastAlert[lastAlert.length - 1]);
    }
  }
};
</script>

<style lang="scss" scoped>
#chat-card-content {
  background-color: #2e2e2e !important;
  padding-top: 1px;
}

.conversations-container {
  min-height: 150px;
  max-height: 70vh;
  overflow-y: auto;
}
</style>
