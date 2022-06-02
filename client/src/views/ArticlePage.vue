<template>
  <div class="article-block">
    <GuiButton class="article-block__button-back" @click="$router.back()" label="Назад" />
    <div v-if="isLoadingArticle">Loading...</div>
    <div v-else-if="hasErrorOfGetArticle">Произошла ошибка. Обратитесь к администратору.</div>
    <template v-else>
      <article class="article">
        <h2 class="title">Статья на тему</h2>
        <h2 class="title title--highlight">{{ article.title }}</h2>
        <div class="article__user">{{ article.user }}</div>
        <div class="article__email">{{ article.email }}</div>
        <p class="article__text">{{ article.text }}</p>
      </article>

      <div class="comments-block">
        <h2 class="title">Коментарии</h2>

        <div class="comments">
          <div class="comment" v-for="(comment, index) in article.comments" :key="index">
            <div class="comment__user">{{ comment.user }}</div>
            <p class="comment__text">{{ comment.text }}</p>
          </div>
        </div>

        <div class="comments-block__text">Вы можете оставить комментарий под этим постом</div>

        <div v-if="isLoadingComment">Loading...</div>
        <div v-else-if="hasErrorOfCreateComment">
          Произошла ошибка. Попробуйте добавить комментарий позже.
        </div>
        <div v-else class="comments-block__form">
          <GuiInput v-model="fieldUser.value" :label="fieldUser.label" />
          <GuiTextArea v-model="fieldText.value" :label="fieldText.label" />
          <GuiButton
            :disabled="!fieldUser.value || !fieldText.value"
            @click="addNewComment"
            label="Добавить комментарий"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import newsApi from '../api/news';
import GuiButton from '../components/Gui/GuiButton.vue';
import GuiInput from '../components/Gui/GuiInput.vue';
import GuiTextArea from '../components/Gui/GuiTextArea.vue';

export default {
  components: {
    GuiTextArea,
    GuiButton,
    GuiInput,
  },
  data() {
    return {
      article: {
        user: null,
        email: null,
        title: null,
        text: null,
        id: null,
        comments: [],
      },

      fieldUser: {
        label: 'Ваше имя',
        value: '',
      },
      fieldText: {
        label: 'Комментарий',
        value: '',
      },
      isLoadingArticle: false,
      hasErrorOfGetArticle: false,
      isLoadingComment: false,
      hasErrorOfCreateComment: false,
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.isLoadingArticle = true;

      return newsApi
        .getNewsArticleById(this.$route.params.id)
        .then((response) => {
          this.article = response.data;
        })
        .catch((error) => {
          this.hasErrorOfGetArticle = true;
          console.error(error);
        })
        .finally(() => {
          this.isLoadingArticle = false;
        });
    },
    addNewComment() {
      this.isLoadingComment = true;

      const newComment = {
        id: nanoid(),
        text: this.fieldText.value,
        user: this.fieldUser.value,
      };

      const payload = {
        newsId: this.article.id,
        comment: newComment,
      };

      newsApi
        .addNewComment(payload)
        .then(() => this.getArticle())
        .catch((error) => {
          this.hasErrorOfCreateComment = true;
          console.error(error);
        })
        .finally(() => {
          this.isLoadingComment = false;
          this.fieldUser.value = '';
          this.fieldText.value = '';
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.article-block {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px 24px;

  &__button-back {
    max-width: 120px;
  }
}

.title {
  max-width: 700px;
  font-size: 36px;
  line-height: 48px;
  color: rgb(24, 0, 101);
  font-weight: 600;

  &--highlight {
    max-width: 100%;
    color: rgb(41, 41, 41);
    background-color: rgb(245, 246, 255);
    margin-top: 24px;
    padding: 12px;
  }
}

.article {
  &__user {
    font-size: 18px;
    line-height: 24px;
    margin: 12px 0 12px;
  }

  &__email {
    color: rgb(162, 162, 162);
  }

  &__text {
    max-width: 500px;
    font-size: 18px;
    line-height: 24px;
    margin: 24px 0 48px;
    padding-top: 12px;
    border-top: 1px solid rgb(215, 215, 215);
  }
}

.comments-block {
  &__text {
    margin: 12px 0 20px;
    color: rgb(150, 150, 150);
  }
}

.comment {
  padding: 12px 0;

  &:not(&:last-child) {
    border-bottom: 1px solid rgb(229, 229, 229);
  }

  &__user {
    font-size: 15px;
    line-height: 30px;
  }

  &__text {
    font-size: 18px;
    line-height: 20px;
    color: rgb(81, 81, 81);
  }
}
</style>
