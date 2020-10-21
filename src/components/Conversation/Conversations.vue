<template>
  <div>
    <div
      class="conversation my-5"
      v-for="(conversation, i) in conversations"
      :key="i"
    >
      <!-- Alert -->
      <div v-if="conversation.alert" class="alert">
        <v-icon class="mr-1">mdi mdi-information</v-icon>
        <span>{{ conversation.message }}</span>
      </div>

      <template v-else>
        <div
          class="d-flex align-center"
          style="gap:13px;"
          :class="{
            'justify-end': isAuthor(conversation)
          }"
        >
          <!-- Avatar -->
          <img
            v-if="!isAuthor(conversation)"
            class="avatar"
            :src="conversation.sender.avatar"
          />

          <!-- User & Message -->
          <div class="content">
            <span
              class="sender"
              :class="{
                'd-flex justify-end align-center': isAuthor(conversation)
              }"
            >
              <span class="username">
                <span v-if="!isAuthor(conversation)">{{
                  conversation.sender.username
                }}</span>
                <span v-else>You</span>
              </span>
              <span class="divider"></span>
              <span class="created-at">{{ conversation.createdAt }}</span>
            </span>

            <!-- Message -->
            <span class="message">{{ conversation.message }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conversations: {
      type: Array,
      required: true
    },
    auth: {
      type: Object,
      required: true
    }
  },

  methods: {
    isAuthor(conversation) {
      return this.auth && conversation.sender.username === this.auth.username;
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation {
  width: 100%;
  position: relative;

  .alert {
    text-align: center;
    font-weight: 700;
    width: 95%;
    margin: 0 auto;
    padding: 6px 0;
    background-color: #ff5722;
    border-radius: 25px;
  }

  @media screen and (min-width: 950px) {
    .alert {
      width: 50%;
    }
  }

  .avatar {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  .content {
    background-color: #4e4e4e;
    padding: 10px 15px;
    border-radius: 8px;
  }

  .sender {
    display: block;

    .username {
      font-weight: 500;
      color: #f5f5f5;
    }

    .divider {
      display: inline-block;
      margin: 0 8px;
      width: 4px;
      height: 4px;
      background-color: white;
      border-radius: 50%;
      margin-bottom: 2px;
    }
  }
}
</style>
