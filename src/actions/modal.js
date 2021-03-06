import defaultErrorHandler from '../generic/errorHandlers';
import { ApiTwoFactorAuth } from '../generic/api';
import { updateProfile } from './profile';

export const SHOW_INFORM_MODAL = 'SHOW_INFORM_MODAL';
export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL';
export const CLOSE_INFORM_MODAL = 'CLOSE_INFORM_MODAL';
export const CLOSE_CONFIRM_MODAL = 'CLOSE_CONFIRM_MODAL';
export const SHOW_TWO_FACTOR_AUTH_MODAL = 'SHOW_TWO_FACTOR_AUTH_MODAL';
export const CLOSE_TWO_FACTOR_AUTH_MODAL = 'CLOSE_TWO_FACTOR_AUTH_MODAL';
export const SHOW_CODE_INFO_MODAL = 'SHOW_CODE_INFO_MODAL';
export const CLOSE_CODE_INFO_MODAL = 'CLOSE_CODE_INFO_MODAL';
export const SHOW_UPGRADE_TARIFF_MODAL = 'SHOW_UPGRADE_TARIFF_MODAL';
export const CLOSE_UPGRADE_TARIFF_MODAL = 'CLOSE_UPGRADE_TARIFF_MODAL';
export const SHOW_COMMIT_TOKENS_MODAL = 'SHOW_COMMIT_TOKENS_MODAL';
export const CLOSE_COMMIT_TOKENS_MODAL = 'CLOSE_COMMIT_TOKENS_MODAL';
export const SHOW_CREATE_GROUP_MODAL = 'SHOW_CREATE_GROUP_MODAL';
export const CLOSE_CREATE_GROUP_MODAL = 'CLOSE_CREATE_GROUP_MODAL';
export const SHOW_ADD_CONTRACT_TO_GROUP_MODAL = 'SHOW_ADD_CONTRACT_TO_GROUP_MODAL';
export const CLOSE_ADD_CONTRACT_TO_GROUP_MODAL = 'CLOSE_ADD_CONTRACT_TO_GROUP_MODAL';
export const SHOW_TELEGRAM_VERIFY_CODE = 'SHOW_TELEGRAM_VERIFY_CODE';
export const CLOSE_TELEGRAM_VERIFY_CODE = 'CLOSE_TELEGRAM_VERIFY_CODE';

const Api2FA = new ApiTwoFactorAuth();

export function enableTwoFactorAuthModal() {
  return async dispatch => {
    try {
      const {secret, user: {name: username}} = await Api2FA.enable();
      return dispatch(showTwoFactorAuthModal ('enable', {secret, username}));
    }
    catch(err){
      defaultErrorHandler(err, dispatch);
    }
  };
}

export function disableTwoFactorAuthModal() {
  return dispatch => {
    dispatch(showTwoFactorAuthModal('disable'));
  };
}

export function disable2FA (currentCode) {
  return async dispatch =>
    await Api2FA.disable(currentCode).then(data => dispatch(updateProfile(data.user)));
}

export function confirm2FA (currentCode) {
  return async dispatch => {
    await Api2FA.confirm(currentCode).then(data => dispatch(updateProfile(data.user)));
    return currentCode;
  };
}

export const showInfoModal = (textID='message', values={}, body) => ({
  type: 'SHOW_INFORM_MODAL',
  textID,
  values,
  body,
});

export const closeInfoModal = () => ({
  type: 'CLOSE_INFORM_MODAL',
});

export const showCodeModal = (titleID='', textID='message', code='', key='') => ({
  type: 'SHOW_CODE_INFO_MODAL',
  textID,
  titleID,
  key,
  code,
});

export const closeCodeModal = () => ({
  type: 'CLOSE_CODE_INFO_MODAL',
});

export const showConfirmModal = (textID='message', values={}, confirmCallback=()=>({}), body) => ({
  type: 'SHOW_CONFIRM_MODAL',
  textID,
  values,
  confirmCallback,
  body
});

export const closeConfirmModal = () => ({
  type: 'CLOSE_CONFIRM_MODAL',
});

export const showTwoFactorAuthModal = (mode, authData={username:'', secret:''}, onTwoFactorAuthSubmit) => {
  return {
    type: 'SHOW_TWO_FACTOR_AUTH_MODAL',
    mode,
    authData,
    onTwoFactorAuthSubmit,
  };
};

export const closeTwoFactorAuthModal = () => ({
  type: 'CLOSE_TWO_FACTOR_AUTH_MODAL',
});

export const showUpgradeTariffModal = (textId = 'message', values = {}, body) => ({
  type: 'SHOW_UPGRADE_TARIFF_MODAL',
  textId,
  values,
  body,
});

export const closeUpgradeTariffModal = () => ({
  type: 'CLOSE_UPGRADE_TARIFF_MODAL',
});

export const showCommitTokensModal = () => ({
  type: SHOW_COMMIT_TOKENS_MODAL,
});

export const closeCommitTokensModal = () => ({
  type: CLOSE_COMMIT_TOKENS_MODAL,
});

export const showCreateGroupModal = () => ({
  type: 'SHOW_CREATE_GROUP_MODAL',
});

export const closeCreateGroupModal = () => ({
  type: 'CLOSE_CREATE_GROUP_MODAL',
});

export const showAddContractToGroupModal = (group, contracts) => ({
  type: 'SHOW_ADD_CONTRACT_TO_GROUP_MODAL',
  group,
  contracts,
});

export const showTelergramVerifyCodeModal = (code) => ({
  type: SHOW_TELEGRAM_VERIFY_CODE,
  code,
});

export const closeTelegramVerifyCodeModal = () => ({
  type: CLOSE_TELEGRAM_VERIFY_CODE
});

export const closeAddContractToGroupModal = () => ({
  type: 'CLOSE_ADD_CONTRACT_TO_GROUP_MODAL',
});
