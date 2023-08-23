import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Skeleton } from 'antd';
import { UilClockEight, UilClockThree, UilFileInfoAlt, UilUsersAlt, UilUserPlus } from '@iconscout/react-unicons/';
import { Link, useParams } from 'react-router-dom';
import Heading from '../../../../components/heading/heading';
import FieldList from '../../../../components/TemplateForm';
// import GridCard from '../../../project/overview/GridCard';

const GridCard = lazy(() => import('../../../project/overview/GridCard'));

function TabDetails({ data }) {
  const project = useSelector((state) => state.projects.data);
  const { t } = useTranslation();
  const { id } = useParams();
  const [state, setState] = useState({
    projects: project,
    current: 0,
    pageSize: 0,
  });
  const { projects } = state;

  useEffect(() => {
    if (project) {
      setState({
        projects: project,
      });
    }
  }, [project]);

  return (
    <>
      <Col xxl={6} xl={8} xs={24} className="p-0">
        {/* <div className="bg-white dark:bg-white10 mb-[25px] p-[25px] rounded-t-none rounded-[10px] gap-[25px] flex flex-wrap min-xl:flex-col xl:justify-between">
          <div className="flex items-center gap-x-5">
            <Link
              to="#"
              className="flex items-center justify-center bg-primary-transparent text-primary w-[60px] h-[60px] rounded-xl"
            >
              <UilUsersAlt className="w-[25px] h-[25px]" />
            </Link>
            <div>
              <Heading as="h5" className="text-dark uppercase dark:text-white87 text-[18px] font-semibold mb-[3px]">
                {t('task_team')}
              </Heading>
              <p className="mb-0 text-body dark:text-white60">Total Task</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <Link
              to="#"
              className="flex items-center justify-center bg-secondary-transparent text-secondary w-[60px] h-[60px] rounded-xl"
            >
              <UilClockEight className="w-[25px] h-[25px]" />
            </Link>
            <div>
              <Heading as="h5" className="text-dark uppercase dark:text-white87 text-[18px] font-semibold mb-[3px]">
                {t('task_start_before')}
              </Heading>
              <p className="mb-0 text-body dark:text-white60">August 15, 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <Link
              to="#"
              className="flex items-center justify-center bg-success-transparent text-success w-[60px] h-[60px] rounded-xl"
            >
              <UilClockThree className="w-[25px] h-[25px]" />
            </Link>
            <div>
              <Heading as="h5" className="text-dark uppercase dark:text-white87 text-[18px] font-semibold mb-[3px]">
                {t('task_end_before')}
              </Heading>
              <p className="mb-0 text-body dark:text-white60">December 15, 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <Link
              to="#"
              className="flex items-center justify-center bg-warning-transparent text-warning w-[60px] h-[60px] rounded-xl"
            >
              <UilFileInfoAlt className="w-[25px] h-[25px]" />
            </Link>
            <div>
              <Heading as="h5" className="text-dark uppercase dark:text-white87 text-[18px] font-semibold mb-[3px]">
                {t('task_description')}
              </Heading>
              <p className="mb-0 text-body dark:text-white60">Description...</p>
            </div>
          </div>
        </div> */}
        {/* <Col key={value.id} xl={8} md={12} xs={24} className="mb-[20px]"> */}
        <Suspense
          fallback={
            <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
              <Skeleton active />
            </div>
          }
        >
          <GridCard
            value={data ?? projects[0]}
            className="bg-white dark:bg-white10 rounded-[10px] rounded-t-none mb-8 hover:cursor-pointer"
          />
        </Suspense>
        {/* </Col> */}
      </Col>
      {/* <Col xxl={6} xl={8} xs={24} className="p-0">
        <div className="bg-white dark:bg-white10 min-4xl:min-h-[485px] mb-[25px] rounded-[10px]">
          <div className="px-[25px] py-[18px] border-b border-regular dark:border-white10">
            <Heading as="h3" className="m-0 text-lg font-semibold text-dark dark:text-white87">
              {t('task_about_project')}
            </Heading>
          </div>
          <div className="p-[25px]">
            <div>
              <p className="text-body dark:text-white60">{content}</p>
              <p className="text-body dark:text-white60">{id}</p>
            </div>
            <div className="flex items-center mt-[42px] gap-x-20 gap-y-[15px] flex-wrap">
              <div>
                <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Project Owner</span>
                <p className="font-medium text-body dark:text-white60">Peter Jackson</p>
              </div>
              <div>
                <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Budget</span>
                <p className="font-medium text-body dark:text-white60">$56,700</p>
              </div>
              <div>
                <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Start Date</span>
                <p className="font-medium text-primary m-0">28 Dec 2019</p>
                <p className="font-medium text-primary">08:00 AM</p>
              </div>
              <div>
                <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Deadline</span>
                <p className="font-medium text-danger m-0">18 Mar 2020</p>
                <p className="font-medium text-danger">09:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </Col> */}
      <Col xxl={6} xl={8} xs={24} className="p-0">
        <div className="bg-white dark:bg-white10 min-h-[485px] mb-[25px] rounded-[10px]">
          <div className="flex items-center justify-between px-[25px] py-3 border-b border-regular dark:border-white10">
            <Heading as="h3" className="m-0 text-lg font-semibold text-dark dark:text-white87">
              {t('task_questionnaire')}
            </Heading>
            {/* <Button
              className="flex items-center gap-x-1.5 h-[38px] px-3 text-xs font-medium dark:text-white87 dark:bg-transparent dark:border-white10"
              outlined
              type="white"
              size="small"
            >
              <UilUserPlus className="w-[14px] h-[14px]" /> Add Users
            </Button> */}
          </div>
          <div className="flex flex-col gap-y-[25px] p-[25px]">
            <FieldList
              depth={0}
              formParentName={`customFields`}
              data={{
                _id: id,
              }}
            />
          </div>
        </div>
      </Col>
    </>
  );
}

export default TabDetails;
