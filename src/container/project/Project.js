import React, { lazy, useState, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { useQuery, useQueryClient } from 'react-query';
import CreateTask from './overview/CreateTask';
import { Button } from '../../components/buttons/buttons';
import { filterProjectByStatus, sortingProjectByCategory } from '../../redux/project/actionCreator';
import { getTasks } from '../../config/dataService/requests';

const Grid = lazy(() => import('./overview/Grid'));
const List = lazy(() => import('./overview/List'));

function Project() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchData = useSelector((state) => state.headerSearchData);
  const countOpen = useSelector((state) => state.projects.countOpen);
  const countProgress = useSelector((state) => state.projects.countProgress);
  const countCompleted = useSelector((state) => state.projects.countCompleted);
  const user = useSelector((state) => state.auth.user);
  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: ['open'],
  });

  const queryClient = useQueryClient();

  // Queries
  const query = useQuery('tasks', getTasks);

  const { notData, visible } = state;

  const onChangeCategory = (value) => {
    setState({
      ...state,
      categoryActive: value,
    });
    dispatch(
      filterProjectByStatus({
        data: query.data,
        filter: value,
      }),
    );
  };

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };
  const path = '.';

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  return (
    <>
      <Button
        onClick={showModal}
        className="z-40 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] fixed bottom-[80px] right-4 flex items-center justify-center text-sm font-semibold text-white rounded-full h-14 w-14 dark:text-white87"
        size="default"
        type="primary"
        key="1"
      >
        <Link to="#" className="flex items-center gap-[6px]">
          <UilPlus className="w-[22px] h-[22px]" />
        </Link>
      </Button>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xs={24}>
            <div className="flex items-center w-full mb-3 flex-wrap justify-between 3xl:justify-center gap-[15px]">
              <div className="mt-2 flex items-center w-full flex-row gap-[10px] lg:justify-center">
                <nav className="flex items-center justify-between bg-white dark:bg-white10 w-full py-[9px] rounded-[5px]">
                  <ul className="flex justify-between w-full items-center mb-0 ">
                    <li className="ltr:border-r rtl:border-l px-2 dark:border-white10 last:border-none">
                      <Link
                        onClick={() => onChangeCategory(['created'])}
                        to="#"
                        className={`flex items-center  ${
                          state.categoryActive == ['open']
                            ? 'text-primary dark:text-white87'
                            : 'text-light dark:text-white60'
                        }`}
                      >
                        {t('open')}
                        <span className="ml-2 bg-primary rounded-6 text-white text-[10px] px-[3px]">{countOpen}</span>
                      </Link>
                    </li>
                    <li className="ltr:border-r rtl:border-l px-2 dark:border-white10 last:border-none">
                      <Link
                        onClick={() => onChangeCategory(['inprogress', 'paused'])}
                        to="#"
                        className={`flex items-center  ${
                          state.categoryActive === 'inprogress' || state.categoryActive === 'paused'
                            ? 'text-primary dark:text-white87'
                            : 'text-light dark:text-white60'
                        }`}
                      >
                        {t('in_progress')}
                        <span className="ml-2 bg-primary rounded-6 text-white text-[10px] px-[3px]">
                          {countProgress}
                        </span>
                      </Link>
                    </li>
                    <li className="ltr:border-r rtl:border-l px-2 dark:border-white10 last:border-none">
                      <Link
                        onClick={() => onChangeCategory(['successful', 'failed'])}
                        to="#"
                        className={`flex items-center  ${
                          (state.categoryActive === 'successful' || state.categoryActive === 'failed')
                            ? 'text-primary dark:text-white87'
                            : 'text-light dark:text-white60'
                        }`}
                      >
                        {t('close')}
                        <span className="ml-1 bg-primary rounded-6 text-white text-[10px] px-[3px]">
                          {countCompleted}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div>
              <Suspense
                fallback={
                  <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
                    <Spin />
                  </div>
                }
              >
                <Routes>
                  <Route index element={<Grid />} />
                  <Route path="grid" element={<Grid />} />
                  <Route path="list" element={<List />} />
                </Routes>
              </Suspense>
            </div>
          </Col>
        </Row>
        <CreateTask onCancel={onCancel} visible={visible} />
      </main>
    </>
  );
}

export default Project;
