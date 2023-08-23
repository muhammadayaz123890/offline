/* eslint-disable react/prop-types */
import UilSlidersV from '@iconscout/react-unicons/icons/uil-sliders-v';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckboxGroup } from '../../checkbox/checkbox';
import Heading from '../../heading/heading';
import { Slider } from '../../slider/slider';

const Filters = React.memo(() => {
  const { t } = useTranslation();
  const [state, setState] = useState({ byTeam: [], byStatusTask: [], byClient: [], byQuestionnaire: [], agents: [] });

  const onClear = () => {
    setState({ byTeam: [], byStatusTask: [], byClient: [], byQuestionnaire: [], agents: [] });
  };

  const onChange = (value, type) => {
    setState((prev) => ({ ...prev, [type]: value }));
  };

  const optionsByTeam = [
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">
          CPE - TEAM
          {/* <span className="text-xs text-light dark:text-white60">25</span> */}
        </div>
      ),
      value: 'cpe-team',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">CPE - TEAM2</div>
      ),
      value: 'cpe-team2',
    },
    {
      label: <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">DEFAULT</div>,
      value: 'default',
    },
  ];

  const optionsStatusTask = [
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">ASSIGNED</div>
      ),
      value: 'assigned',
    },
    {
      label: <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">FAILED</div>,
      value: 'failed',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">INPROGRESS</div>
      ),
      value: 'inprogress',
    },
  ];

  const optionsByClient = [
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">TEST CLIENT</div>
      ),
      value: 'test-client',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">TEST CLIENT 2</div>
      ),
      value: 'test-client-2',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">TEST CLIENT 3</div>
      ),
      value: 'test-client-3',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">TEST CLIENT 4</div>
      ),
      value: 'test-client-4',
    },
  ];

  const optionsByQuestionnaire = [
    {
      label: <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">CPE</div>,
      value: 'cpe',
    },
  ];

  const optionsAgents = [
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">ADMINMAAS</div>
      ),
      value: 'adminmaas',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white60">
          ALEXANDER_GONZALEz
        </div>
      ),
      value: 'alexander_gonzalez',
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative rony">
        <div className="py-[16px] px-[25px] border-regular dark:border-white10 border-b">
          <Heading as="h4" className="flex items-center mb-0 text-base font-medium text-dark dark:text-white87">
            <UilSlidersV className="w-4 h-4 ltr:mr-3 rtl:ml-3 text-light" />
            {t('task_filters')}
          </Heading>
        </div>
        <div className="p-[25px]">
          <div className="mb-[30px]">
            <Heading as="h5" className="mb-2.5 text-[15px] uppercase text-dark dark:text-white87 font-semibold">
              {t('task_filter_by_team')}
            </Heading>
            <CheckboxGroup
              options={optionsByTeam}
              onChange={(e) => {
                onChange(e, 'byTeam');
              }}
              value={state.byTeam}
              className="flex flex-col gap-y-[10px] [&>label]:m-0 [&>label>span:not(:first-child)]:w-full"
            />

            {/* <div className="sidebar-single__action">
              <Link className="inline-block mt-2 text-primary text-[13px] font-medium" to="#">
                See more
              </Link>
            </div> */}
          </div>
          <div className="mb-[30px]">
            <Heading as="h5" className="mb-2.5 text-[15px] uppercase text-dark dark:text-white87 font-semibold">
              {t('task_filter_by_task_status')}
            </Heading>
            <CheckboxGroup
              options={optionsStatusTask}
              onChange={(e) => {
                onChange(e, 'byStatusTask');
              }}
              value={state.byStatusTask}
              className="flex flex-col gap-y-[10px] [&>label]:m-0 [&>label>span:not(:first-child)]:w-full"
            />

            {/* <div className="sidebar-single__action">
              <Link className="inline-block mt-2 text-primary text-[13px] font-medium" to="#">
                See more
              </Link>
            </div> */}
          </div>
          <div className="mb-[30px]">
            <Heading as="h5" className="mb-2.5 text-[15px] uppercase text-dark dark:text-white87 font-semibold">
              {t('task_filter_by_client')}
            </Heading>
            <CheckboxGroup
              options={optionsByClient}
              onChange={(e) => {
                onChange(e, 'byClient');
              }}
              value={state.byClient}
              className="flex flex-col gap-y-[10px] [&>label]:m-0 [&>label>span:not(:first-child)]:w-full"
            />
          </div>

          <div>
            <Heading as="h5" className="mb-2.5 text-[15px] uppercase text-dark dark:text-white87 font-semibold">
              {t('task_filter_by_questionnaire')}
            </Heading>
            <CheckboxGroup
              options={optionsByQuestionnaire}
              onChange={(e) => {
                onChange(e, 'byQuestionnaire');
              }}
              value={state.byQuestionnaire}
              className="flex flex-col gap-y-[10px] [&>label]:m-0 [&>label>span:not(:first-child)]:w-full"
            />
          </div>
          <div>
            <Heading as="h5" className="mb-2.5 text-[15px] text-dark dark:text-white87 font-semibold">
              {t('task_filter_agents')}
            </Heading>
            <CheckboxGroup
              options={optionsAgents}
              onChange={(e) => {
                onChange(e, 'agents');
              }}
              value={state.agents}
              className="flex flex-col gap-y-[10px] [&>label]:m-0 [&>label>span:not(:first-child)]:w-full"
            />
          </div>
        </div>
      </div>
      <button className="text-[#000000b7] dark:text-white87" type="button" onClick={onClear}>
        {t('task_filter_btn_clear')}
      </button>
    </>
  );
});

export default Filters;
