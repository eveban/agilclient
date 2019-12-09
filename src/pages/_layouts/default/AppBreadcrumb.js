import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';

export function AppBreadcrumb({ location }) {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <div className="layout-breadcrumb">
      <ul>
        <li>
          <button className="p-link">
            <i className="material-icons">home</i>
          </button>
        </li>
        <li>{location.pathname}</li>
      </ul>

      <div className="layout-breadcrumb-options">
        <button className="p-link" title="Backup">
          <i className="material-icons">backup</i>
        </button>
        <button className="p-link" title="Bookmark">
          <i className="material-icons">bookmark</i>
        </button>
        <button
          className="p-link"
          title="Logout"
          type="button"
          onClick={handleSignOut}
        >
          <i className="material-icons">power_settings_new</i>
        </button>
      </div>
    </div>
  );
}
AppBreadcrumb.propTypes = {
  match: PropTypes.object,
};
