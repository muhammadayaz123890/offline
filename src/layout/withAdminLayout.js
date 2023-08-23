/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import { Button, Col, Layout, Row } from 'antd';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Component, useEffect } from 'react';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  UilListUl,
  UilBell,
  UilUser,
  UilPlay,
  UilMultiply,
  UilPause,
  UilCheck,
  UilAngleLeftB,
  UilCornerDownLeft,
} from '@iconscout/react-unicons';
import MenueItems from './MenueItems';
import CustomizerWrap from './overview/Customizer';
import { FooterStyle, LayoutContainer, SmallScreenAuthInfo, TopMenuSearch } from './Style';
import TopMenu from './TopMenu';
import Search from '../components/utilities/auth-info/Search';
import AuthInfo from '../components/utilities/auth-info/info';
import { ReactComponent as MySVG } from '../static/img/icon/left-bar.svg';
import { updateFooter } from '../redux/footer/actionCreator';

const { theme } = require('../config/theme/themeVariables');

const { Header, Sider, Content } = Layout;

const ThemeLayout = (WrappedComponent) => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        hide: true,
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }

    render() {
      const { collapsed, hide } = this.state;
      const { layoutMode, rtl, topMenu } = this.props;

      const left = !rtl ? 'left' : 'right';
      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const onShowHide = () => {
        this.setState({
          hide: !hide,
        });
      };

      const SideBarStyle = {
        margin: '63px 0 0 0',
        padding: `${!rtl ? '20px 20px 55px 0' : '20px 0 55px 20px'}`,
        overflowY: 'auto',
        height: '100vh',
        position: 'fixed',
        [left]: 0,
        zIndex: 988,
      };

      function renderThumb({ style }) {
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: '#F1F2F6',
        };
        return <div style={{ ...style, ...thumbStyle }} />;
      }
      const renderTrackVertical = () => {
        const thumbStyle = {
          position: 'absolute',
          width: '6px',
          transition: 'opacity 200ms ease 0s',
          opacity: 0,
          [rtl ? 'left' : 'right']: '0px',
          bottom: '2px',
          top: '2px',
          borderRadius: '3px',
        };
        return <div className="[&>div]:bg-regular dark:[&>div]:bg-[#32333f]" style={thumbStyle} />;
      };
      function renderView({ style }) {
        const customStyle = {
          marginRight: rtl && 'auto',
          [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div style={{ ...style, ...customStyle }} />;
      }
      renderThumb.propTypes = {
        style: propTypes.shape(propTypes.object),
      };
      renderView.propTypes = {
        style: propTypes.shape(propTypes.object),
      };

      return (
        <LayoutContainer>
          <Layout className="layout">
            <Header
              style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                [!rtl ? 'left' : 'right']: 0,
              }}
              className="p-0 flex items-center justify-between bg-white dark:bg-[#1b1e2b] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  h-[72px] z-998"
            >
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-5 pl-3 pr-5">
                  {!topMenu || window.innerWidth <= 991 ? (
                    <Button
                      type="link"
                      className="p-0 bg-transparent border-none dark:border-transparent dark:bg-transparent dark:text-white60 dark:hover:text-primary text-[#525768] hover:text-primary"
                      onClick={toggleCollapsed}
                    >
                      <MySVG />
                    </Button>
                  ) : null}
                  <Link to="/admin">
                    <img
                      className="w-full max-w-[120px] xs:max-w-[100px]"
                      src={
                        layoutMode === 'lightMode'
                          ? require(`../static/img/logo-new.png`)
                          : require(`../static/img/logo-new.png`)
                      }
                      alt=""
                    />
                  </Link>
                </div>

                <div className="flex items-center">
                  <Search />
                  <Link className="inline-flex text-light dark:text-white60" onClick={onShowHide} to="#">
                    <UilEllipsisV className="w-[18px] h-[18px]" />
                  </Link>
                </div>
              </div>
            </Header>
            <Row>
              <Col md={0} sm={24} xs={24}>
                <SmallScreenAuthInfo hide={hide}>
                  <AuthInfo rtl={rtl} />
                </SmallScreenAuthInfo>
              </Col>
            </Row>
            <Layout>
              {!topMenu || window.innerWidth <= 991 ? (
                <ThemeProvider theme={theme}>
                  <Sider
                    width={280}
                    style={SideBarStyle}
                    collapsed={collapsed}
                    theme={layoutMode === 'lightMode' ? 'light' : 'dark'}
                  >
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      // renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumb}
                      renderView={renderView}
                      renderTrackVertical={renderTrackVertical}
                    >
                      <MenueItems topMenu={topMenu} toggleCollapsed={toggleCollapsedMobile} />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ) : null}
              <Layout className="atbd-main-layout">
                <Content>
                  <WrappedComponent {...this.props} />
                  <FooterStyle className="bg-white dark:bg-[#1B1E2B] fixed z-50 bottom-0 shadow-[0_5px_10px_rgb(0,0,0,0.5)] rounded-t-2xl ">
                    <Col>
                      <Footer />
                    </Col>
                  </FooterStyle>
                </Content>
              </Layout>
            </Layout>
          </Layout>
          {window.innerWidth <= 991 ? (
            <span className={collapsed ? 'hexadash-shade' : 'hexadash-shade show'} onClick={toggleCollapsed} />
          ) : (
            ''
          )}
        </LayoutContainer>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      layoutMode: state.ChangeLayoutMode.mode,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  };

  LayoutComponent.propTypes = {
    layoutMode: propTypes.string,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
  };

  return connect(mapStateToProps)(LayoutComponent);
};

function Footer() {
  const footer = useSelector((state) => state.footer.number);
  const location = useLocation();
  return (
    <>{location.pathname.includes('/task/') ? footer === 2 ? <TaskFooter /> : <TaskDetailFooter /> : <MainFooter />}</>
  );
}

function MainFooter() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return (
    <div className="justify-between items-center flex px-4">
      <NavLink
        className={` ${
          pathname === '/admin' ? 'text-primary' : 'text-theme-gray dark:text-white60'
        }  text-[14px] flex flex-col justify-center items-center`}
        to="/admin"
      >
        <UilListUl className="w-5 h-5 " />
        {t('tasks')}
      </NavLink>
      <NavLink
        className={`${
          pathname.includes('notifications') ? 'text-primary' : 'text-theme-gray dark:text-white60'
        } flex flex-col justify-center items-center`}
        to="#"
      >
        <UilBell className="w-5 h-5 " />
        {t('notifications')}
      </NavLink>
      <NavLink
        className={`${
          pathname.includes('agents') ? 'text-primary' : 'text-theme-gray dark:text-white60'
        } flex flex-col justify-center items-center`}
        to="/admin/agents"
      >
        <UilUser className="w-5 h-5 " />
        {t('task_filter_agents')}
      </NavLink>
    </div>
  );
}

function TaskDetailFooter() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="justify-between items-center flex px-8">
      <NavLink
        className="text-theme-gray dark:text-white60 text-[14px] hover:text-primary flex flex-col justify-center items-center"
        to="/admin"
        onClick={() => dispatch(updateFooter(0))}
      >
        <UilCornerDownLeft className="w-5 h-5 text-gray-400" />
        {t('go_back')}
      </NavLink>
      <NavLink
        className=" dark:text-white60 text-[14px] text-primary flex flex-col justify-center items-center"
        to="#"
        onClick={() => dispatch(updateFooter(2))}
      >
        <UilPlay className="w-5 h-5 " />
        {t('start')}
      </NavLink>
    </div>
  );
}

function TaskFooter() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="justify-between items-center flex px-4">
      <NavLink
        className="text-red-600 flex flex-col justify-center items-center"
        to="#"
        onClick={() => dispatch(updateFooter(1))}
      >
        <UilMultiply className="w-5 h-5 " />
        {t('abort')}
      </NavLink>
      <NavLink className="text-primary flex flex-col justify-center items-center" to="#">
        <UilPause className="w-5 h-5 " />
        {t('pause')}
      </NavLink>
      <NavLink className="text-green-600 flex flex-col justify-center items-center" to="#">
        <UilCheck className="w-5 h-5 " />
        {t('finish')}
      </NavLink>
    </div>
  );
}

export default ThemeLayout;
