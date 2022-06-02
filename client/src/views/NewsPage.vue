<template>
  <div class="container">
    <div class="header-block">
      <h1 class="title">Новости</h1>

      <GuiButton class="header-block__button" :label="buttonText" @click="goToCreateArticlePage" />
    </div>

    <div class="sort-block">
      <GuiSelect
        class="sort-block__select"
        v-model="filterByName.value"
        :label="filterByName.label"
        :options="users"
      />

      <GuiSelect
        class="sort-block__select"
        v-model="sortSelect.value"
        :label="sortSelect.label"
        :options="sortSelect.options"
      />
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="hasError">Произошла ошибка. Обратитесь к администратору.</div>
    <NewsList v-else :news="news" />
  </div>
</template>

<script>
import GuiButton from '../components/Gui/GuiButton.vue';
import GuiSelect from '../components/Gui/GuiSelect.vue';
import NewsList from '../components/NewsList.vue';

const DEFAULT_VALUE = 'По умолчанию';

export default {
  name: 'NewsPage',
  components: {
    NewsList,
    GuiSelect,
    GuiButton,
  },
  data() {
    return {
      isLoading: false,
      hasError: false,
      buttonText: 'Добавить новость',
      sortSelect: {
        value: DEFAULT_VALUE,
        label: 'Сортировать:',
        options: [DEFAULT_VALUE, 'По заголовку'],
      },
      filterByName: {
        label: 'Выбрать автора:',
        value: DEFAULT_VALUE,
      },
    };
  },
  computed: {
    news() {
      let news = [...this.$store.state.newsList];

      if (this.filterByName.value !== DEFAULT_VALUE) {
        news = news.filter((article) => article.user === this.filterByName.value);
      }

      if (this.sortSelect.value === 'По заголовку') {
        return news.sort((a, b) => a.title.localeCompare(b.title));
      }

      return news;
    },
    users() {
      const allUsers = this.$store.state.newsList.map((article) => article.user);
      const uniqueUsers = new Set(allUsers);

      return [DEFAULT_VALUE, ...uniqueUsers];
    },
  },
  methods: {
    goToCreateArticlePage() {
      this.$router.push('/createArticle');
    },
  },
  created() {
    this.isLoading = true;
    this.$store
      .dispatch('getNewsList')
      .catch((error) => {
        console.error(error);
        this.hasError = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px 24px;
}

.header-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media screen and (max-width: 485px) {
    flex-wrap: wrap;
  }

  &__button {
    @media screen and (min-width: 485px) {
      max-width: 200px;
    }
  }
}

.title {
  max-width: 700px;
  font-size: 36px;
  line-height: 48px;
  color: rgb(24, 0, 101);
  font-weight: 600;
}

.sort-block {
  @media screen and (min-width: 485px) {
    display: flex;
    justify-content: space-between;
    max-width: 410px;
  }

  &__select {
    width: 100%;

    @media screen and (min-width: 485px) {
      max-width: 200px;
    }
  }
}
</style>
