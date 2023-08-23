/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { UilUserCircle, UilAt, UilPhoneAlt } from '@iconscout/react-unicons/';
import Heading from '../../../../components/heading/heading';
import { GoogleMaps } from '../../../../components/maps/google-maps';

function TabCustomer({
  customerName = 'agranel aguada',
  address = 'calle 124, San Cristobal',
  phone = '+58-6482938434',
  email = 'test@gmail.com',
  data: { customer_id_ },
}) {
  const { t } = useTranslation();
  const {
    customer_address_,
    customer_email_,
    customer_latitude_,
    customer_longitude_,
    customer_phone_,
    customer_username_,
  } = customer_id_;

  return (
    <Row gutter={25}>
      <Col xxl={6} xl={8} xs={24}>
        <div className="bg-white dark:bg-white10 mb-[25px] p-[25px] rounded-t-none rounded-[10px] gap-[25px] flex flex-wrap min-xl:flex-col xl:justify-between">
          <div className="flex items-center gap-x-5">
            <Link
              to="#"
              className="flex items-center justify-center bg-primary-transparent text-primary w-[60px] h-[60px] rounded-xl"
            >
              <UilUserCircle className="w-[25px] h-[25px]" />
            </Link>
            <div>
              <Heading as="h5" className="text-dark uppercase dark:text-white87 text-[18px] font-semibold mb-[3px]">
                {customer_username_ ?? 'username'}
              </Heading>
              <p className="mb-0 text-body dark:text-white60">{customer_address_ ?? 'address'}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5 w-full">
            <Link
              to="#"
              className="flex items-center justify-center bg-secondary-transparent text-secondary w-[60px] h-[60px] rounded-xl"
            >
              <UilPhoneAlt className="w-[25px] h-[25px]" />
            </Link>
            <div>
              <Heading as="h5" className="text-dark uppercase dark:text-white87 text-[18px] font-semibold mb-[3px]">
                {t('task_phone')}
              </Heading>
              <p className="mb-0 text-body dark:text-white60">{customer_phone_ ?? 'phone'}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <Link
              to="#"
              className="flex items-center justify-center bg-success-transparent text-success w-[60px] h-[60px] rounded-xl"
            >
              <UilAt className="w-[25px] h-[25px]" />
            </Link>
            <div>
              <Heading as="h5" className="text-dark uppercase dark:text-white87 text-[18px] font-semibold mb-[3px]">
                {t('task_email')}
              </Heading>
              <p className="mb-0 text-body dark:text-white60">{customer_email_ ?? 'email'}</p>
            </div>
          </div>
        </div>
      </Col>
      <Col xxl={6} xl={8} xs={24}>
        <div className="bg-white dark:bg-white10 mb-[25px] pt-[25px] overflow-hidden rounded-[10px]">
          <Heading as="h4" className="text-xxl font-bold mb-2 ml-3">
            {t('task_map')}
          </Heading>
          <div>
            <GoogleMaps latitude={customer_latitude_ ?? '55.797897'} longitude={customer_longitude_ ?? '-1.077641'} />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default TabCustomer;
