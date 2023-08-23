import { UilMap, UilFilter } from '@iconscout/react-unicons';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Filters from './Filters';

const SearchBar = React.memo(() => {
  const { t } = useTranslation();
  const [openFilters, setOpenFilters] = useState(false);
  const [form] = Form.useForm();

  const [state, setState] = useState({
    openSearch: false,
  });

  const openSearchbar = (e) => {
    e.preventDefault();
    setState({
      ...state,
      openSearch: true,
    });
  };
  const closeSearchbar = (e) => {
    e.preventDefault();
    setState({
      ...state,
      openSearch: false,
    });
  };

  const onOpenFilter = (e) => {
    e.preventDefault();
    setOpenFilters(true);
  };

  const { openSearch } = state;

  return (
    <div className="flex items-center ">
      {/* <div
        className={
          openSearch
            ? 'null ssm:fixed ssm:top-[72px] ssm:bg-white ssm:dark:bg-[#1b1d2a] ssm:rounded-[6px] ssm:ltr:ssm:right-[10px] rtl:ssm:left-[10px] ssm:min-w-[280px] ssm:z-[98] '
            : 'opacity-0 invisible w-0'
        }
      >
        <Form form={form} name="hexadash-search">
          <Form.Item name="search-input" className="mb-0">
            <Input
              className="bg-transparent dark:bg-transparent p-1.5 min-ssm:border-none ssm:h-[48px] ssm:px-[20px] ssm:dark:shadow-none ssm:border-1 ssm:border-regular dark:ssm:border-white10"
              placeholder="Search Here"
            />
          </Form.Item>
        </Form>
      </div> */}
      <div className="flex items-center xs:gap-2 gap-4 min-w-max">
        <Link
          to="/admin/calendar"
          // onClick={(e) => e.preventDefault()}
          className="flex relative w-15 h-4 dark:text-white60"
        >
          <span className="min-w-max bg-primary text-[11px] flex items-center text-[#fff] rounded-4 p-[10px]">
            {moment().format('ll')}
          </span>
        </Link>
        <Link
          to="/admin/map"
          //  onClick={(e) => e.preventDefault()}
          className="flex relative text-[#0074D9] w-5 h-5 dark:text-white60"
        >
          <UilMap />
        </Link>

        <Link to="/" onClick={onOpenFilter} className="flex relative text-[#0074D9] w-5 h-5 dark:text-white60">
          <UilFilter />
        </Link>
        <Link
          to="/"
          onClick={(e) => closeSearchbar(e)}
          className={openSearch ? 'flex relative w-4 h-4 text-theme-gray dark:text-white60' : 'hidden opacity-0'}
        >
          <UilTimes />
        </Link>
      </div>
      <Modal
        open={openFilters}
        onCancel={() => setOpenFilters(false)}
        okText={t('task_filter_btn_ok')}
        cancelText={t('task_filter_btn_cancel')}
        closeIcon={<></>}
      >
        <Filters />
      </Modal>
    </div>
  );
});

export default SearchBar;
