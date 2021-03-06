import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars, faAngleDown, faEnvelope, faLock, faEye, faEyeSlash, faPlus,
  faTimes, faCheck, faEdit, faTrashAlt, faShoppingCart, faAngleLeft,
  faAngleRight, faAngleDoubleDown, faAngleDoubleUp, faInfoCircle,
  faExclamationCircle, faUser, faPhoneAlt, faExclamationTriangle,
  faTags, faMinus, faFlag, faAngleDoubleLeft, faAngleDoubleRight, faChair, faCouch,
  faStar, faBed, faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faClipboard, faAddressCard,
} from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faBars, faAngleDown, faEnvelope, faLock, faEye, faEyeSlash, faPlus,
  faTimes, faCheck, faEdit, faTrashAlt, faShoppingCart, faAngleLeft,
  faAngleRight, faClipboard, faAngleDoubleDown, faAngleDoubleUp, faInfoCircle,
  faInstagram, faFacebook, faExclamationCircle, faUser, faPhoneAlt, faExclamationTriangle,
  faAddressCard, faTags, faMinus, faFlag, faAngleDoubleLeft, faAngleDoubleRight,
  faChair, faCouch, faGithub, faStar, faBed, faTags, faAngleUp,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
