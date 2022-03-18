import Sortable from 'sortablejs';
import { Controller } from './controller';
// eslint-disable-next-line no-unused-vars
import css from '../css/main.css';

const controller = new Controller();
controller.handleTheme();
controller.handleParams();
controller.handlePianoInput();
controller.handleKeyBoardInput();

const sortableContainer = document.getElementById('palette');
const sortable = new Sortable(sortableContainer, {
  animation: 150,
  onUpdate: (e) => controller.handleSort(e),
});
