import { ClassroomResource, FacilityUserResource } from 'kolibri.resources';
import { localeCompare } from 'kolibri.utils.i18n';
import { _userState } from '../mappers';

export function sortUsersByFullName(users) {
  return users.sort((a, b) => {
    return localeCompare(a.full_name, b.full_name);
  });
}

export function showClassEditPage(store, classId) {
  store.dispatch('preparePage');
  const facilityId = store.getters.activeFacilityId;
  const promises = [
    FacilityUserResource.fetchCollection({ getParams: { member_of: classId }, force: true }),
    ClassroomResource.fetchModel({ id: classId, force: true }),
    ClassroomResource.fetchCollection({ getParams: { parent: facilityId }, force: true }),
  ];
  store.commit('classEditManagement/SET_DATA_LOADING', true);
  Promise.all(promises)
    .then(([facilityUsers, classroom, classrooms]) => {
      store.commit('classEditManagement/SET_DATA_LOADING', false);
      store.commit('classEditManagement/SET_STATE', {
        modalShown: false,
        currentClass: classroom,
        classes: classrooms,
        classLearners: sortUsersByFullName(facilityUsers).map(_userState),
        classCoaches: sortUsersByFullName(classroom.coaches).map(_userState),
      });
      store.dispatch('notLoading');
    })
    .catch(error => {
      store.dispatch('notLoading');
      store.dispatch('handleError', error);
    });
}
