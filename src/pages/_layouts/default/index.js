import React, { Component } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import DomHandler from 'primereact/components/utils/DomHandler';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import { withRouter } from 'react-router';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppBreadcrumb } from './AppBreadcrumb';

import { Dashboard } from '../../../components/Dashboard';
import Rotas from '../../../components/Rotas';
import RotaCity from '../../../components/RotaCity';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './ripple';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTopbarItem: null,
      layoutMode: 'static', // 'overlay',
      mobileMenuActive: null,
      topbarMenuActive: null,
      // currentRoute: null,
      menuActive: false,
    };

    this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onTopbarMobileMenuButtonClick = this.onTopbarMobileMenuButtonClick.bind(
      this
    );
    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onSidebarMouseEnter = this.onSidebarMouseEnter.bind(this);
    this.onSidebarMouseLeave = this.onSidebarMouseLeave.bind(this);
    this.onToggleMenuClick = this.onToggleMenuClick.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }

  onWrapperClick(event) {
    if (
      !this.menuClick &&
      !this.menuButtonClick &&
      this.state.mobileMenuActive
    ) {
      this.setState({ mobileMenuActive: false });
    }

    if (!this.topbarMenuClick && !this.topbarMenuButtonClick) {
      this.setState({
        activeTopbarItem: null,
        topbarMenuActive: false,
      });
    }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isOverlay()) {
        this.setState({
          menuActive: false,
        });
      }
    }

    this.menuClick = false;
    this.menuButtonClick = false;
    this.topbarMenuClick = false;
    this.topbarMenuButtonClick = false;
  }

  onTopbarItemClick(event) {
    this.topbarMenuClick = true;
    if (this.state.activeTopbarItem === event.item)
      this.setState({ activeTopbarItem: null });
    else this.setState({ activeTopbarItem: event.item });

    event.originalEvent.preventDefault();
  }

  onMenuButtonClick(event) {
    this.menuButtonClick = true;

    if (this.isMobile()) {
      this.setState({ mobileMenuActive: !this.state.mobileMenuActive });
    }

    event.preventDefault();
  }

  onTopbarMobileMenuButtonClick(event) {
    this.topbarMenuButtonClick = true;
    this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
    event.preventDefault();
  }

  onToggleMenuClick(event) {
    this.setState({
      layoutMode: this.state.layoutMode !== 'static' ? 'static' : 'overlay',
    });
  }

  onSidebarClick(event) {
    this.menuClick = true;
  }

  onSidebarMouseEnter(event) {
    if (this.sidebarTimeout) {
      clearTimeout(this.sidebarTimeout);
    }
    DomHandler.addClass(this.sidebar, 'layout-sidebar-active');
  }

  onSidebarMouseLeave(event) {
    this.sidebarTimeout = setTimeout(() => {
      DomHandler.removeClass(this.sidebar, 'layout-sidebar-active');
    }, 250);
  }

  onRootMenuItemClick(event) {
    this.setState({
      menuActive: !this.state.menuActive,
    });
  }

  onMenuItemClick(event) {
    if (!event.item.items && this.isHorizontal()) {
      this.setState({
        menuActive: false,
      });
    }
  }

  createMenu() {
    this.menu = [
      { label: 'Dashboard', icon: 'dashboard', to: '/' },

      {
        label: 'Rotas',
        icon: 'dashboard',
        items: [
          { label: 'Rotas', icon: 'directions_bus', to: '/rotas' },
          { label: 'Mapa Clientes', icon: 'room', to: '/RotaCity' },
        ],
      },
    ];
  }

  changeTheme(theme) {
    this.changeStyleSheetUrl('theme-css', theme, 'theme');
  }

  changeLayout(theme) {
    this.changeStyleSheetUrl('layout-css', theme, 'layout');
  }

  changeStyleSheetUrl(id, value, prefix) {
    const element = document.getElementById(id);
    const urlTokens = element.getAttribute('href').split('/');
    urlTokens[urlTokens.length - 1] = `${prefix}-${value}.css`;
    const newURL = urlTokens.join('/');
    element.setAttribute('href', newURL);
  }

  isMobile() {
    return window.innerWidth <= 1024;
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isOverlay() {
    return this.state.layoutMode === 'overlay';
  }

  isHorizontal() {
    return this.state.layoutMode === 'horizontal';
  }

  render() {
    const wrapperClass = classNames('layout-wrapper', {
      'layout-wrapper-static': this.state.layoutMode === 'static',
      'layout-wrapper-active': this.state.mobileMenuActive,
      'layout-menu-horizontal': this.state.layoutMode === 'horizontal',
    });
    const sidebarClassName = classNames('layout-sidebar', {
      'layout-sidebar-dark': this.state.darkMenu,
    });
    const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

    return (
      <div className={wrapperClass} onClick={this.onWrapperClick}>
        <div
          ref={el => (this.sidebar = el)}
          className={sidebarClassName}
          onClick={this.onSidebarClick}
          onMouseEnter={this.onSidebarMouseEnter}
          onMouseLeave={this.onSidebarMouseLeave}
        >
          <div className="sidebar-logo">
            <button className="p-link">
              <img alt="logo" src="assets/layout/images/logo-slim.png" />
              <span className="app-name">SERENITY</span>
            </button>
            <button
              className="p-link sidebar-anchor"
              title="Toggle Menu"
              onClick={this.onToggleMenuClick}
            >
              {' '}
            </button>
          </div>

          <ScrollPanel
            ref={el => (this.layoutMenuScroller = el)}
            style={{ height: '100%' }}
          >
            <div className="layout-menu-container">
              <AppMenu
                model={this.menu}
                onRootMenuItemClick={this.onRootMenuItemClick}
                layoutMode={this.state.layoutMode}
                active={this.state.menuActive}
                onMenuItemClick={this.onMenuItemClick}
              />
            </div>
          </ScrollPanel>
        </div>
        <div className="layout-main">
          <AppTopbar
            layoutMode={this.state.layoutMode}
            activeTopbarItem={this.state.activeTopbarItem}
            onTopbarItemClick={this.onTopbarItemClick}
            onMenuButtonClick={this.onMenuButtonClick}
            onTopbarMobileMenuButtonClick={this.onTopbarMobileMenuButtonClick}
            topbarMenuActive={this.state.topbarMenuActive}
          />

          <AppBreadCrumbWithRouter />
          <div className="layout-content">
            <Route path="/" exact component={Dashboard} />
            <Route path="/rotas" component={Rotas} />
            <Route path="/RotaCity" component={RotaCity} />
          </div>

          <AppFooter />

          {this.state.mobileMenuActive && <div className="layout-main-mask" />}
        </div>
      </div>
    );
  }
}

export default App;
