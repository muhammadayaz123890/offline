import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Progress, Spin, Button as AntButton } from 'antd';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import UilChartPie from '@iconscout/react-unicons/icons/uil-chart-pie';
import UilWebGridAlt from '@iconscout/react-unicons/icons/uil-web-grid-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import UilUserPlus from '@iconscout/react-unicons/icons/uil-user-plus';
import { Link, NavLink, Routes, Route, useParams } from 'react-router-dom';
import { useIndexedDB } from 'react-indexed-db-hook';
import { SyncOutlined } from '@ant-design/icons';
import { useHookForm, HookFormProvider } from 'mui-react-hook-form-plus';

import { getTask } from '../../../../config/dataService/requests';
import FileListCard from '../../../project/overview/FileListCard';
import { GlobalUtilityStyle } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { filterSinglePage } from '../../../../redux/chat/actionCreator';
import TabDetails from '../tabs/details';
import TabCustomer from '../tabs/customer';
import TabHistory from '../tabs/history';
import TabStats from '../tabs/stats';

// const TaskList = lazy(() => import('./overview/TaskList'));
// const Activities = lazy(() => import('../.././overview/Activities'));

const tabs = [
  {
    id: 1,
    label: 'details',
    content: (data) => <TabDetails data={data} />,
  },
  { id: 2, label: 'customer', content: (data) => <TabCustomer data={data} /> },
  { id: 3, label: 'history', content: (data) => <TabHistory data={data} /> },
  { id: 4, label: 'stats', content: (data) => <TabStats data={data} /> },
];

function FloatButton({ onClick }) {
  return (
    <AntButton
      style={{
        position: 'fixed',
        right: 0,
        bottom: '10%',
        zIndex: 99,
      }}
      type="primary"
      shape="circle"
      icon={<SyncOutlined />}
      size="large"
      onClick={onClick}
    />
  );
}

function TaskDetails() {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.data);
  const [selectedProject, setSelectedProject] = useState({});
  const { id } = useParams();
  // useEffect(() => {
  //   if (!dispatch) {
  //     dispatch(filterSinglePage(parseInt(params.id, 10)));
  //   }
  // }, [params.id, dispatch]);

  // const { title, content } = project[0];
  const [activeValue, setActiveValue] = useState('details');
  const { add, update, getByID } = useIndexedDB('task');
  const [task, setTask] = useState(null);
  const methods = useHookForm({
    defaultValues: {
      _id: id || '',
    },
  });

  useEffect(() => {
    async function fetchData() {
      const possibleTask = await getByID(id);
      console.log('posibble taslk', possibleTask);
      if (possibleTask) {
        setTask(possibleTask);
        const parsedField = JSON.parse(possibleTask.customFields || '[]');
        console.log(parsedField);
        methods.setValue('customFields', parsedField);
      } else {
        const taskAux = await getTask(id);
        setTask(taskAux);
        const parsedField = JSON.parse(taskAux.customFields || '[]').map((item) => {
          return {
            ...item,
            child_items: JSON.parse(item?.child_items || '[]'),
          };
        });
        console.log(parsedField);
        methods.setValue('customFields', parsedField);
      }
    }
    fetchData();
  }, []);

  return (
    <HookFormProvider {...methods}>
      <div className="flex items-center justify-between pt-[20px] pb-[35px] px-[25px] flex-wrap gap-[15px] sm:justify-center">
        <FloatButton
          onClick={() => {
            let customFieldAux = methods.getValues('customFields');
            update({ ...task, customFields: JSON.stringify(customFieldAux) }).then(
              (event) => {
                console.log('ID Generated: ', event);
              },
              (error) => {
                console.log(error);
              },
            );
          }}
        />
        <div className="inline-flex flex-wrap items-center gap-5 md:justify-center">
          <Heading as="h4" className="text-dark w-full text-center dark:text-white87 text-[20px] font-semibold mb-0">
            {/* {title} */}
            {/* {id} */}
            Task Detail
          </Heading>
          {/* <div className="flex items-center gap-x-3">
            <Button
              className="h-[35px] px-[14px] text-sm font-semibold rounded-md"
              size="default"
              type="primary"
              key="1"
            >
              <Link to="#" className="flex items-center gap-[6px] text-xs font-medium">
                <UilPlus className="w-[14px] h-[14px]" /> Add Task
              </Link>
            </Button>
            <Button
              className="h-[35px] px-[14px] text-xs font-semibold rounded-md dark:text-white87 dark:bg-white10 dark:border-white10 dark:hover:bg-white30 transition duration-300"
              size="default"
              type="default"
              key="2"
            >
              <Link to="#" className="flex items-center gap-[6px]">
                <UilCheck className="w-[14px] h-[14px]" /> Mark as Complete
              </Link>
            </Button>
          </div> */}
        </div>
        {/* <div className="inline-flex items-center gap-x-5">
          <Link
            to="#"
            className="flex items-center gap-x-1.5 bg-white dark:bg-white10 text-primary h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white10 rounded-md"
          >
            <UilEditAlt className="w-[14px] h-[14px]" />
            Edit
          </Link>
          <Link
            to="#"
            className="flex items-center gap-x-1.5 bg-white dark:bg-white10 dark:hover:bg-white30 text-danger h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white10 rounded-md transition duration-300"
          >
            <UilTrashAlt className="w-[14px] h-[14px]" />
            Remove
          </Link>
        </div> */}
      </div>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xxl={16} lg={15} xs={24}>
            <GlobalUtilityStyle>
              <div className=" dark:bg-white10 rounded-[10px] mb-[25px]">
                <nav className="bg-white w-full dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 flex items-center gap-x-[30px] px-[25px] rounded-lg rounded-b-none py-0 border-b border-regular dark:border-white10">
                  {tabs.map(({ label, id: key }) => (
                    <NavLink
                      key={key}
                      to="#"
                      onClick={() => {
                        setActiveValue(label);
                      }}
                      className={`relative py-5 text-sm font-medium capitalize after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:w-full after:h-[1px] ${
                        activeValue === label
                          ? 'text-primary after:block after:bg-primary'
                          : 'text-body dark:text-white60 after:none'
                      }`}
                    >
                      {t(`task_${label}`)}
                    </NavLink>
                  ))}
                </nav>
                <div className="min-h-[435px] w-full flex pt-[0px] pb-0.5">
                  {tabs.map(
                    ({ label, content, id: key }) =>
                      activeValue === label && (
                        <div className="w-full rounded-b-lg" key={key}>
                          {content(task)}
                        </div>
                      ),
                  )}
                </div>
              </div>
            </GlobalUtilityStyle>
          </Col>

          {/* <Col xxl={8} xs={24}>
            <FileListCard />
          </Col> */}
        </Row>
      </main>
    </HookFormProvider>
  );
}

export default TaskDetails;
