import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  // Решение

  // В материалах курса немного другая реализация которая всегда создает дефолтный контейнер, но зачем, лучше ведь создавать только если он не передан
  // const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  // const toaster = createApp(TheToaster).mount(container ?? addDefaultContainer());
  if (!container) {
    container = document.body.appendChild(document.createElement('div'))
  }

  // Создание отдельного экземпляра приложения это стандартная практика? Выглядит как-то неаккурантно,
  // мне кажется лучше было бы как-то подключить все в рамках основного приложения и дать возможность пользователю поставить компонент
  // TheTopProgressBar в желаемое место в приложении, не обязательно сверху, как router дает поставить RouterView там где нужно
  const progressUI = createApp(TheTopProgressBar).mount(container);

  function start(loader) {
    //Почему тут в webstorm не работает навигация по коду, он не понимает что это метод start относится к TheTopProgressBar потому что мы его обернули в createApp?
    progressUI.start(loader)
  }
  function finish(loader) {
    progressUI.finish(loader)
  }
  function fail() {
    progressUI.fail()
  }

  if (router) {
    router.beforeEach((to, from, next) => {
      start(to.fullPath);
      next();
    })
    router.afterEach((to, from) => {
      finish(to.fullPath);
    })
    router.onError((error) => {
      fail();
    })
  }

  const progress = {
    start,
    finish,
    fail,
    install(app) {
      const progress = this;
      app.provide(PROGRESS_KEY, progress);
      app.config.globalProperties.$progress = progress;
      app.component('TheTopProgressBar', TheTopProgressBar);
    },
  };

  return progress
}
