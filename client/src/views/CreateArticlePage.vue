<template>
  <section class="sidebar-block">
    <div class="header-block">
      <h1 class="title">Добавление новости</h1>
      <GuiButton class="header-block__button" @click="$router.back()" label="Назад" />
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="hasError">Произошла ошибка. Обратитесь к администратору.</div>
    <div v-else class="form">
      <GuiInput
        :label="title.label"
        :placeholder="title.placeholder"
        v-model="title.value"
        :required="title.requiredField"
        @input="title.error = !$event"
        @blur="title.error = !title.value"
        @focus="title.error = false"
        :error="title.error"
      />

      <GuiTextArea
        :label="text.label"
        :placeholder="text.placeholder"
        v-model="text.value"
        :required="text.requiredField"
        @input="text.error = !$event"
        @blur="text.error = !text.value"
        @focus="text.error = false"
        :error="text.error"
      />

      <GuiInput
        :label="user.label"
        :placeholder="user.placeholder"
        v-model="user.value"
        :required="user.requiredField"
        @input="user.error = !$event"
        @blur="user.error = !user.value"
        @focus="user.error = false"
        :error="user.error"
      />

      <GuiButton :label="buttonText" :disabled="isSubmitDisabled" @click="createArticle" />
    </div>
  </section>
</template>

<script>
import { nanoid } from 'nanoid';
import GuiInput from '../components/Gui/GuiInput.vue';
import GuiTextArea from '../components/Gui/GuiTextArea.vue';
import GuiButton from '../components/Gui/GuiButton.vue';
import newsApi from '../api/news';

export default {
  components: {
    GuiInput,
    GuiTextArea,
    GuiButton,
  },
  data() {
    return {
      title: {
        value: '',
        placeholder: 'Введите название статьи',
        label: 'Заголовок',
        requiredField: true,
        error: false,
      },
      text: {
        value: '',
        placeholder: 'Текст',
        label: 'Введите основной текст',
        requiredField: true,
        error: false,
      },
      user: {
        value: '',
        placeholder: 'Введите ваш логин или имя',
        label: 'Логин',
        requiredField: true,
        error: false,
      },
      buttonText: 'Добавить новость',
      isLoading: false,
      hasError: false,
    };
  },
  computed: {
    isSubmitDisabled() {
      return !this.title.value || !this.text.value || !this.user.value;
    },
  },
  methods: {
    createArticle() {
      const article = {
        id: nanoid(),
        title: this.title.value,
        text: this.text.value,
        user: this.user.value,
      };

      this.isLoading = true;

      newsApi
        .createNewsArticle(article)
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          console.error(err);
          this.hasError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });

      this.title.value = '';
      this.text.value = '';
      this.user.value = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-block {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.title {
  font-size: 36px;
  line-height: 48px;
}

.form {
  max-width: 600px;
  width: 100%;
  padding: 24px;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
}

.select {
  margin: 24px 0;
}

.header-block {
  margin: 48px 0 24px;
  &__button {
    max-width: 120px;
  }
}
</style>
