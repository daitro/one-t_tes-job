<template>
  <section class='news-list'>
    <div v-for="item in news" :key="item.id" @click="goToNewsArticle(item.id)" class='new-item'>
      <div class="new-item__user">{{ "Автор: " + item.user }}</div>
      <h2 class='new-item__title'>
        {{ item.title }}
      </h2>
      <p class="new-item__text">
        {{ item.text }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToNewsArticle(id) {
      this.$router.push({
        name: 'Article',
        params: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.news-list {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 862px) {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.new-item {
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  border: 1px solid rgb(245, 245, 245);
  box-shadow: 6px 6px 14px -8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  @media screen and (min-width:900px) {
    max-width: 416px;
  }

  &:hover {
    box-shadow: 8px 8px 14px -8px rgba(0, 0, 0, 0.35);
  }

  &:hover > &__title {
    color: #802be0;
  }

  &__title {
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    color: rgb(76, 4, 165);
    margin-bottom: 24px;
  }

  &__user {
    font-size: 14px;
    line-height: 24px;
    color: rgb(132, 132, 132);
    margin-bottom: 12px;
  }

  &__text {
    font-size: 14px;
    line-height: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
