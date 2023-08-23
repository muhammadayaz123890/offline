import React, { Suspense, lazy, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Skeleton, Progress, Select, Tag } from 'antd';
import { UilAngleDown } from '@iconscout/react-unicons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { GlobalUtilityStyle } from '../styled';

const { Option } = Select;
const TeamList = lazy(() => import('../dashboard/overview/demoFour/TeamList'));

const tagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      className="dark:bg-white10 dark:text-white60 text-theme-gray"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

function Agent() {
  const { t } = useTranslation();

  const countAvailable = useState(1);
  const countBusy = useState(2);
  const countDisconnected = useState(3);
  const [state, setState] = useState({
    visible: false,
    categoryActive: 'availiable',
  });
  const [openSelect, setOpenSelect] = useState(false);
  const onChangeCategory = (value) => {
    setState({
      ...state,
      categoryActive: value,
    });
  };

  return (
    <>
      <PageHeader
        title={t('task_filter_agents')}
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[20px] bg-transparent sm:flex-col"
      />

      <GlobalUtilityStyle>
        <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[20px] bg-transparent">
          <Row justify="center" gutter={25}>
            <Col xxl={16} xs={24}>
              <Row gutter={25}>
                <Col lg={12} xs={24} className="mb-[20px]">
                  <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] rounded-10 relative">
                    <div className="flex items-center min-sm:h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
                      <Select
                        //  className="w-full items-center rounded-6 "
                        bordered={false}
                        placeholder="Seleccione un Team"
                        tagRender={tagRender}
                        style={{
                          width: '100%',
                        }}
                        showArrow
                        mode="multiple"
                      >
                        <Option className="dark:bg-white10" value="">
                          team 1
                        </Option>
                        <Option className="dark:bg-white10" value="one">
                          team 2
                        </Option>
                        <Option className="dark:bg-white10" value="two">
                          team 3
                        </Option>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 justify-between p-[15px]">
                      <div className="flex flex-col justify-center items-center">
                        <Progress type="circle" percent={30} width={80} />
                        <span className="font-medium">{t('open')}</span>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <Progress type="circle" percent={70} width={80} strokeColor="#FFD01F" />
                        <span className="font-medium">{t('in_progress')}</span>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <Progress type="circle" percent={80} width={80} strokeColor="#66E715" />
                        <span className="font-medium">{t('close')}</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={12} xs={24} className="mb-[10px]">
                  <nav className="flex items-center justify-between bg-white dark:bg-white10 w-full py-[9px] rounded-[5px]">
                    <ul className="flex justify-between w-full items-center mb-0 ">
                      <li className="ltr:border-r rtl:border-l px-2 dark:border-white10 last:border-none">
                        <Link
                          onClick={() => onChangeCategory('availiable')}
                          to="#"
                          className={`flex items-center  ${
                            state.categoryActive === 'availiable'
                              ? 'text-primary dark:text-white87'
                              : 'text-light dark:text-white60'
                          }`}
                        >
                          {t('available')}
                          <span className="ml-2 bg-primary rounded-6 text-white text-[10px] px-[3px]">
                            {countAvailable}
                          </span>
                        </Link>
                      </li>
                      <li className="ltr:border-r rtl:border-l px-2 dark:border-white10 last:border-none">
                        <Link
                          onClick={() => onChangeCategory('busy')}
                          to="#"
                          className={`flex items-center  ${
                            state.categoryActive === 'busy'
                              ? 'text-primary dark:text-white87'
                              : 'text-light dark:text-white60'
                          }`}
                        >
                          {t('busy')}
                          <span className="ml-2 bg-primary rounded-6 text-white text-[10px] px-[3px]">{countBusy}</span>
                        </Link>
                      </li>
                      <li className="ltr:border-r rtl:border-l px-2 dark:border-white10 last:border-none">
                        <Link
                          onClick={() => onChangeCategory('disconnected')}
                          to="#"
                          className={`flex items-center  ${
                            state.categoryActive === 'disconnected'
                              ? 'text-primary dark:text-white87'
                              : 'text-light dark:text-white60'
                          }`}
                        >
                          {t('disconnected')}
                          <span className="ml-1 bg-primary rounded-6 text-white text-[10px] px-[3px]">
                            {countDisconnected}
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </Col>
                <Col lg={12} xs={24} className="mb-[25px]">
                  <Suspense
                    fallback={
                      <Cards headless>
                        <Skeleton active />
                      </Cards>
                    }
                  >
                    <TeamList />
                  </Suspense>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </GlobalUtilityStyle>
    </>
  );
}

export default Agent;
