/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Progress, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { UilMapMarker, UilUserMd, UilKeySkeletonAlt } from '@iconscout/react-unicons';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { textRefactor } from '../../../components/utilities/utilities';
import { updateFooter } from '../../../redux/footer/actionCreator';

function GridCard({ value, className, onclick }) {
  const {
    id,
    _id,
    idOptional,
    title,
    job_status_,
    status,
    equipo,
    percentage,
    cliente,
    cuestionario,
    job_description_,
    team_id_,
    template_id_,
    fleet_id_,
    customer_id_,
    datetime_end_before_,
    datetime_start_before_,
    customFieldsConfig,
  } = value;
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const handleOnClick = () => {
  //   dispatch(updateFooter(1));
  //   navigate(`/admin/task/${_id}`);
  // };
  const { team_name_ } = team_id_ ?? {};
  const { template_name } = template_id_ ?? {};
  const { customer_address_ } = customer_id_ ?? {};
  const { first_name_, last_name_ } = fleet_id_ ?? {};
  const { needOtp } = customFieldsConfig ?? {};
  const { t } = useTranslation();
  const decodeString = (string) => {
    let stringDecoded = string;
    try {
      stringDecoded = decodeURIComponent(escape(string));
    } catch (error) {
      console.log(error);
    }
    return stringDecoded;
  };

  return (
    <>
      <div
        className={`${
          typeof className === 'string' ? className : 'bg-white dark:bg-white10 rounded-[10px] hover:cursor-pointer'
        }`}
        role="button"
        tabIndex="-1"
        onClick={onclick}
      >
        <div className="p-6">
          <div className="flex items-center justify-between overflow-y-hidden overflow-x-auto">
            {/* <div className="flex w-full justify-between items-center"> */}
            <h1 className="flex flex-wrap items-center -m-0.5 text-base">
              <Link
                to={`/admin/project/projectDetails/${id ?? _id}`}
                className="m-0.5 ltr:mr-[11px] rtl:ml-[11px] text-dark dark:text-white87"
              >
                {idOptional ?? title}
              </Link>
            </h1>
            <div className="flex gap-1.5">
              <Tag
                className={`text-white border-none ltr:mr-0 rtl:ml-0 uppercase text-[10px] ${
                  true
                    ? 'bg-danger'
                    : status === 'en progreso'
                    ? 'bg-primary'
                    : status === 'pausada'
                    ? 'bg-warning'
                    : status === 'completada'
                    ? 'bg-success'
                    : 'bg-dark'
                } `}
              >
                RETRASADA
              </Tag>
              <Tag
                className={`text-white border-none ltr:mr-0 rtl:ml-0 uppercase text-[10px] ${
                  job_status_ === 'paused'
                    ? 'bg-[#8231D3]'
                    : job_status_ === 'failed'
                    ? 'bg-danger'
                    : job_status_ === 'inprogress'
                    ? 'bg-yellow-300 text-black'
                    : job_status_ === 'created'
                    ? 'bg-gray-500'
                    : job_status_ === 'successful'
                    ? 'bg-success text-black'
                    : 'bg-dark'
                } `}
              >
                {job_status_ ?? status}
              </Tag>
            </div>

            {/* </div> */}

            {/* <h1 className="flex flex-wrap items-center -m-0.5 text-base"> */}
            {/* </h1> */}
            {/* <Dropdown
              content={
                <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4">
                  <Link
                    className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
                    to="#"
                  >
                    Total Income
                  </Link>
                  <Link
                    className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
                    to="#"
                  >
                    Total Expense
                  </Link>
                  <Link
                    className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
                    to="#"
                  >
                    Total Tax
                  </Link>
                  <Link
                    className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
                    to="#"
                  >
                    Net Profit
                  </Link>
                </div>
              }
            >
              <Link to="#" className="text-light-extra dark:text-white60">
                <UilEllipsisH />
              </Link>
            </Dropdown> */}
          </div>
          <div className="mt-[10px] pt-2 dark:border-white10 border-t-1">
            {job_description_ && (
              <div>
                <p className="text-body dark:text-white60 mb-[8px]">{job_description_}</p>
              </div>
            )}
            <div
              // className="flex items-center justify-between xs:gap-x-1 gap-x-12 gap-y-[5px] flex-wrap"
              className="grid items-center grid-cols-2 justify-between xs:gap-x-1 gap-x-10 gap-y-[5px] flex-wrap"
            >
              <div>
                <span className="mb-[3px] text-body dark:text-white60 text-[13px]">{t('task_team')}</span>
                <p className="font-medium text-body dark:text-white60 mb-1.5">{team_name_ ?? 'team_name'}</p>
              </div>
              <div>
                <span className="mb-[3px] text-body dark:text-white60 text-[13px]">{t('template')}</span>
                <p className="font-medium text-body dark:text-white60 mb-1.5">{template_name ?? 'template_name'}</p>
              </div>
              <div>
                <span className="mb-[3px] text-body dark:text-white60 text-[13px]">{t('task_start_before')}</span>
                <p className="font-medium text-primary m-0">{moment(datetime_start_before_).format('ll')}</p>
                <p className="font-medium text-primary m-0">{moment(datetime_start_before_).format('LT')}</p>
              </div>
              <div>
                <span className="mb-[3px] text-body dark:text-white60 text-[13px]">{t('task_end_before')}</span>
                <p className="font-medium text-danger m-0">{moment(datetime_end_before_).format('ll')}</p>
                <p className="font-medium text-danger m-0">{moment(datetime_end_before_).format('LT')}</p>
              </div>
            </div>
          </div>
          <div className="mt-[12px] dark:border-white10 border-t-1 pt-[12px]">
            <ul className="flex flex-col flex-wrap gap-[8px] mb-0">
              <li className="flex items-center leading-[1.3] text-light dark:text-white60 gap-[12px]">
                <UilMapMarker className="w-[16px] h-[16px] min-w-[16px]" />
                {typeof customer_address_ === 'string' ? decodeString(customer_address_) : 'customer_address'}
              </li>
              <li className="flex items-center text-light dark:text-white60 gap-[12px]">
                <UilUserMd className="w-[16px] h-[16px]" />
                {`${first_name_ ?? 'firstName'} ${last_name_ ?? 'lastName'}`}
              </li>
              {needOtp === true && (
                <li className="flex items-center text-light dark:text-white60 gap-[12px]">
                  <UilKeySkeletonAlt className="w-[16px] h-[16px]" />
                  5903
                </li>
              )}
            </ul>
          </div>
          {/* <div>
            <p className="text-body dark:text-white60 mt-[15px] mb-[25px]">
              <span className="text-gray-400">Equipo: </span> <br /> {idOptional}
            </p>
            <p className="text-body dark:text-white60 mt-[15px] mb-[25px]">
              <span className="text-gray-400">Cliente: </span> <br /> {cliente}
            </p>
            <p className="text-body dark:text-white60 mt-[15px] mb-[25px]">
              <span className="text-gray-400">Cuestionario: </span> <br /> {cuestionario}
            </p>
          </div>
          <div className="flex items-center mb-[15px] gap-x-[30px]">
            <div className="flex flex-col">
              <span className="text-xs mb-0.5 text-body dark:text-white60">Empezar antes de</span>
              <strong className="font-medium text-body dark:text-white60">26 Dec 2019</strong>
            </div>
            <div className="flex flex-col">
              <span className="text-xs mb-0.5 text-body dark:text-white60">Terminar antes de</span>
              <strong className="font-medium text-body dark:text-white60">18 Mar 2020</strong>
            </div>
          </div> */}
          {/* <Progress
            percent={status === 'complete' ? 100 : percentage}
            strokeWidth={5}
            status="primary"
            className=" ltr:[&>span.ant-progress-text]:ml-2 rtl:[&>span.ant-progress-text]:mr-2 [&>span.ant-progress-text]:text-body dark:[&>span.ant-progress-text]:text-white60 [&>span.ant-progress-text]:text-xs [&>span.ant-progress-text]:font-medium [&.ant-progress-status-success>.ant-progress-text>span]:text-success"
          />
          <p className="mt-0.5 text-body dark:text-white60 text-xs">12/15 Task Completed</p> */}
        </div>
      </div>
    </>
  );
}

GridCard.propTypes = {
  value: PropTypes.object,
};

export default GridCard;
