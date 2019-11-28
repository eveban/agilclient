import React, { Component } from 'react';
import classNames from 'classnames';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppBreadcrumb } from './AppBreadcrumb';
import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';
import DomHandler from 'primereact/components/utils/DomHandler';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import { withRouter } from 'react-router';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './ripple.js';

import GlobalStyle from './styles/global';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTopbarItem: null,
      layoutMode: 'overlay',
      mobileMenuActive: null,
      topbarMenuActive: null,
      currentRoute: null,
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
        label: 'Menu Modes',
        icon: 'settings',
        items: [
          {
            label: 'Static Menu',
            icon: 'view_quilt',
            command: event => {
              this.setState({ layoutMode: 'static' });
            },
          },
          {
            label: 'Overlay Menu',
            icon: 'flip_to-front',
            command: event => {
              this.setState({ layoutMode: 'overlay' });
            },
          },
          {
            label: 'Horizontal Menu',
            icon: 'border_horizontal',
            command: () => this.setState({ layoutMode: 'horizontal' }),
          },
          {
            label: 'Light Menu',
            icon: 'label',
            command: event => {
              this.setState({ darkMenu: false });
            },
          },
          {
            label: 'Dark Menu',
            icon: 'label_outline',
            command: event => {
              this.setState({ darkMenu: true });
            },
          },
        ],
      },
      {
        label: 'Colors',
        icon: 'palette',
        items: [
          {
            label: 'Layout Palette',
            icon: 'palette',
            items: [
              {
                label: 'Flat',
                icon: 'format_paint',
                items: [
                  {
                    label: 'Blue Grey - Green',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('bluegrey');
                    },
                  },
                  {
                    label: 'Indigo - Pink',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('indigo');
                    },
                  },
                  {
                    label: 'Pink - Amber',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('pink');
                    },
                  },
                  {
                    label: 'Deep Purple - Orange',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('deeppurple');
                    },
                  },
                  {
                    label: 'Blue - Amber',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('blue');
                    },
                  },
                  {
                    label: 'Light Blue - Blue Grey',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('lightblue');
                    },
                  },
                  {
                    label: 'Cyan - Amber',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('cyan');
                    },
                  },
                  {
                    label: 'Teal - Red',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('teal');
                    },
                  },
                  {
                    label: 'Green - Brown',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('green');
                    },
                  },
                  {
                    label: 'Light Green - Purple',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('lightgreen');
                    },
                  },
                  {
                    label: 'Lime - Blue Grey',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('lime');
                    },
                  },
                  {
                    label: 'Yellow - Teal',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('yellow');
                    },
                  },
                  {
                    label: 'Amber - Pink',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('amber');
                    },
                  },
                  {
                    label: 'Orange - Indigo',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('orange');
                    },
                  },
                  {
                    label: 'Deep Orange - Cyan',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('deeporange');
                    },
                  },
                  {
                    label: 'Brown - Cyan',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('brown');
                    },
                  },
                  {
                    label: 'Grey - Indigo',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('grey');
                    },
                  },
                ],
              },
              {
                label: 'Special',
                icon: 'format_paint',
                items: [
                  {
                    label: 'Reflection',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('reflection');
                    },
                  },
                  {
                    label: 'Moody',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('moody');
                    },
                  },
                  {
                    label: 'Cityscape',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('cityscape');
                    },
                  },
                  {
                    label: 'Cloudy',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('cloudy');
                    },
                  },
                  {
                    label: 'Storm',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('storm');
                    },
                  },
                  {
                    label: 'Palm',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('palm');
                    },
                  },
                  {
                    label: 'Flatiron',
                    icon: 'brush',
                    command: event => {
                      this.changeLayout('flatiron');
                    },
                  },
                ],
              },
            ],
          },
          {
            label: 'Themes',
            icon: 'brush',
            badge: '5',
            items: [
              {
                label: 'Blue Grey - Green',
                icon: 'brush',
                command: event => {
                  this.changeTheme('bluegrey');
                },
              },
              {
                label: 'Indigo - Pink',
                icon: 'brush',
                command: event => {
                  this.changeTheme('indigo');
                },
              },
              {
                label: 'Pink - Amber',
                icon: 'brush',
                command: event => {
                  this.changeTheme('pink');
                },
              },
              {
                label: 'Purple - Pink',
                icon: 'brush',
                command: event => {
                  this.changeTheme('purple');
                },
              },
              {
                label: 'Deep Purple - Orange',
                icon: 'brush',
                command: event => {
                  this.changeTheme('deeppurple');
                },
              },
              {
                label: 'Blue - Amber',
                icon: 'brush',
                command: event => {
                  this.changeTheme('blue');
                },
              },
              {
                label: 'Light Blue - Blue Grey',
                icon: 'brush',
                command: event => {
                  this.changeTheme('lightblue');
                },
              },
              {
                label: 'Cyan - Amber',
                icon: 'brush',
                command: event => {
                  this.changeTheme('cyan');
                },
              },
              {
                label: 'Teal - Red',
                icon: 'brush',
                command: event => {
                  this.changeTheme('teal');
                },
              },
              {
                label: 'Green - Brown',
                icon: 'brush',
                command: event => {
                  this.changeTheme('green');
                },
              },
              {
                label: 'Light Green - Purple',
                icon: 'brush',
                command: event => {
                  this.changeTheme('lightgreen');
                },
              },
              {
                label: 'Lime - Blue Grey',
                icon: 'brush',
                command: event => {
                  this.changeTheme('lime');
                },
              },
              {
                label: 'Yellow - Teal',
                icon: 'brush',
                command: event => {
                  this.changeTheme('yellow');
                },
              },
              {
                label: 'Amber - Pink',
                icon: 'brush',
                command: event => {
                  this.changeTheme('amber');
                },
              },
              {
                label: 'Orange - Indigo',
                icon: 'brush',
                command: event => {
                  this.changeTheme('orange');
                },
              },
              {
                label: 'Deep Orange - Cyan',
                icon: 'brush',
                command: event => {
                  this.changeTheme('deeporange');
                },
              },
              {
                label: 'Brown - Cyan',
                icon: 'brush',
                command: event => {
                  this.changeTheme('brown');
                },
              },
              {
                label: 'Grey - Indigo',
                icon: 'brush',
                command: event => {
                  this.changeTheme('grey');
                },
              },
            ],
          },
        ],
      },
      {
        label: 'Components',
        icon: 'list',
        badge: '2',
        badgeStyleClass: 'teal-badge',
        items: [
          { label: 'Sample Page', icon: 'desktop_mac', to: '/sample' },
          { label: 'Forms', icon: 'input', to: '/forms' },
          { label: 'Data', icon: 'grid_on', to: '/data' },
          { label: 'Panels', icon: 'content_paste', to: '/panels' },
          { label: 'Overlays', icon: 'content_copy', to: '/overlays' },
          { label: 'Menus', icon: 'menu', to: '/menus' },
          { label: 'Messages', icon: 'message', to: '/messages' },
          { label: 'Charts', icon: 'insert_chart', to: '/charts' },
          { label: 'Misc', icon: 'toys', to: '/misc' },
        ],
      },
      {
        label: 'Template Pages',
        icon: 'get_app',
        items: [
          { label: 'Empty Page', icon: 'hourglass_empty', to: '/empty' },
          {
            label: 'Landing Page',
            icon: 'flight_land',
            url: 'assets/pages/landing.html',
            target: '_blank',
          },
          { label: 'Login Page', icon: 'verified_user', to: '/login' },
          { label: 'Error Page', icon: 'error', to: '/error' },
          { label: '404 Page', icon: 'error_outline', to: '/notfound' },
          { label: 'Access Denied Page', icon: 'security', to: '/access' },
        ],
      },
      {
        label: 'Menu Hierarchy',
        icon: 'menu',
        items: [
          {
            label: 'Submenu 1',
            icon: 'subject',
            items: [
              {
                label: 'Submenu 1.1',
                icon: 'subject',
                items: [
                  { label: 'Submenu 1.1.1', icon: 'subject' },
                  { label: 'Submenu 1.1.2', icon: 'subject' },
                  { label: 'Submenu 1.1.3', icon: 'subject' },
                ],
              },
              {
                label: 'Submenu 1.2',
                icon: 'subject',
                items: [
                  { label: 'Submenu 1.2.1', icon: 'subject' },
                  { label: 'Submenu 1.2.2', icon: 'subject' },
                ],
              },
            ],
          },
          {
            label: 'Submenu 2',
            icon: 'subject',
            items: [
              {
                label: 'Submenu 2.1',
                icon: 'subject',
                items: [
                  { label: 'Submenu 2.1.1', icon: 'subject' },
                  { label: 'Submenu 2.1.2', icon: 'subject' },
                  { label: 'Submenu 2.1.3', icon: 'subject' },
                ],
              },
              {
                label: 'Submenu 2.2',
                icon: 'subject',
                items: [
                  { label: 'Submenu 2.2.1', icon: 'subject' },
                  { label: 'Submenu 2.2.2', icon: 'subject' },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Utils',
        icon: 'build',
        command: () => {
          window.location = '#/utils';
        },
      },
      {
        label: 'Docs',
        icon: 'find_in_page',
        command: () => {
          window.location = '#/documentation';
        },
      },
      {
        label: 'Buy Now',
        icon: 'credit_card',
        command: () => {
          window.location = 'https://www.primefaces.org/store';
        },
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
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
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
                  onTopbarMobileMenuButtonClick={
                    this.onTopbarMobileMenuButtonClick
                  }
                  topbarMenuActive={this.state.topbarMenuActive}
                />
                <AppBreadCrumbWithRouter />
                <div className="layout-content">
                  <Routes />
                  <GlobalStyle />
                </div>
                <AppFooter />

                {this.state.mobileMenuActive && (
                  <div className="layout-main-mask" />
                )}
              </div>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
