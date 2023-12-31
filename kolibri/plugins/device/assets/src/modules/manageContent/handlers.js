export function showManageContentPage(store) {
  store.commit('manageContent/RESET_STATE');
  store.commit('manageContent/wizard/RESET_STATE');
  if (store.getters.canManageContent) {
    return Promise.all([
      store.dispatch('manageContent/refreshTaskList'),
      store.dispatch('manageContent/refreshChannelList'),
    ]).then(() => store.dispatch('notLoading'));
  }
  store.dispatch('notLoading');
  return Promise.resolve();
}
