export const SHOW_INFORM_MODAL = 'SHOW_INFORM_MODAL';
export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL';
export const CLOSE_INFORM_MODAL = 'CLOSE_INFORM_MODAL';
export const CLOSE_CONFIRM_MODAL = 'CLOSE_CONFIRM_MODAL';

export const showInfoModal = (textID='message', values={}) => ({
  type: 'SHOW_INFORM_MODAL',
  textID,
  values,
});

export const closeInfoModal = {
  type: 'CLOSE_INFORM_MODAL',
};

export const showConfirmModal = (textID='message', values={}, confirmCallback=()=>({})) => ({
  type: 'SHOW_CONFIRM_MODAL',
  textID,
  values,
  confirmCallback
});

export const closeConfirmModal = {
  type: 'CLOSE_CONFIRM_MODAL',
};
