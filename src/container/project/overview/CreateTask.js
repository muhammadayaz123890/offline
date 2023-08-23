import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Form, Input, Select, Col, Row, DatePicker, TimePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { UilPlusCircle, UilMapMarker } from '@iconscout/react-unicons';
import propTypes from 'prop-types';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

function CreateTask({ visible, onCancel }) {
  const [form] = Form.useForm();
  const start = moment();
  const end = moment().add(3, 'hours');
  const { t } = useTranslation();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <Modal
      className="update"
      type={state.modalType}
      title="Crear nueva tarea"
      visible={state.visible}
      footer={[
        <div key="1" className="ml-[100px] flex items-center gap-[10px]">
          <Button
            size="default"
            type="primary"
            key="submit"
            className="px-5 font-medium h-11 dark:bg-primary"
            onClick={handleOk}
          >
            {t('create')}
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            className="m-0 px-5 font-medium h-11 dark:text-white87 dark:bg-white10 dark:border-white10"
            outlined
            onClick={handleCancel}
          >
            {t('task_filter_btn_cancel')}
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="px-1.5">
        <Form form={form} name="createProject" onFinish={handleOk}>
          {/* <div className="flex items-center mb-[25px]">
            <span className="min-w-[90px] text-light dark:text-white60">Titulo</span>
            <Form.Item name="project" label="" className="mb-0 w-full">
              <Input
                className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                placeholder="Task Name"
              />
            </Form.Item>
          </div> */}
          <div className="flex items-center mb-[25px]">
            <span className="min-w-[90px] text-light dark:text-white60">{t('task_start_before')}</span>
            <div className="flex flex-col items-center w-full gap-2">
              <Form.Item className="mb-0 w-full" name="eventStartDate" initialValue={moment(start)}>
                <DatePicker
                  className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
              <Form.Item className="mb-0 w-full" name="eventStartTime" initialValue={moment(start)}>
                <TimePicker
                  className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                  format="h:mm:ss A"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center mb-[25px]">
            <span className="min-w-[90px] text-light dark:text-white60">{t('task_end_before')}</span>
            <div className="flex flex-col items-center w-full gap-2">
              <Form.Item className="mb-0 w-full" name="eventEndDate" initialValue={moment(start)}>
                <DatePicker
                  className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
              <Form.Item className="mb-0 w-full" name="eventEndTime" initialValue={moment(start)}>
                <TimePicker
                  className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                  format="h:mm:ss A"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center mb-[25px]">
            <span className="min-w-[90px] text-light dark:text-white60">{t('task_customer')}</span>
            <div className="flex flex-col items-center w-full gap-1">
              <div className="flex items-center justify-between w-full">
                <Button
                  size="default"
                  key="add"
                  className="flex p-0 h-7 flex-row justify-center items-center gap-1 mb-0 w-full text-11 font-medium text-primary border-none hover:bg-gray-300 dark:bg-transparent"
                  onClick={() => {}}
                >
                  <UilPlusCircle className="w-4 h-4 " />
                  {t('add_one')}
                </Button>
                <Button
                  size="default"
                  key="near"
                  className=" p-0 h-7 flex flex-row justify-center items-center gap-1 mb-0 w-full text-11 font-medium text-primary border-none hover:bg-gray-300 dark:bg-transparent"
                  onClick={() => {}}
                >
                  <UilMapMarker className="w-4 h-4" />
                  {t('close_to_me')}
                </Button>
              </div>
              <Form.Item className="mb-0 w-full" name="client" initialValue="" label="">
                <Select
                  className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                  showSearch
                  optionFilterProp="children"
                  onChange={handleChange}
                >
                  <Option value="1">cliente 1</Option>
                  <Option value="one">cliente 2</Option>
                  <Option value="two">cliente 3</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center mb-[25px]">
            <span className="min-w-[90px] text-light dark:text-white60">{t('team')}</span>
            <Form.Item className="mb-0 w-full" name="team" initialValue="" label="">
              <Select
                className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
                defaultValue="12"
              >
                <Option value="12">Equipo 1</Option>
                <Option value="one2">Equipo 2</Option>
                <Option value="two2">Equipo 3</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex items-center mb-[25px]">
            <span className="min-w-[90px] text-light dark:text-white60">{t('task_questionnaire')}</span>
            <Form.Item className="mb-0 w-full" name="questionary" initialValue="" label="">
              <Select
                className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
              >
                <Option value="13">Cuestionario 1</Option>
                <Option value="one3">Cuestionario 2</Option>
                <Option value="two3">Cuestionario 3</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex items-center mb-[25px]">
            <span className="min-w-[90px] text-light dark:text-white60">{t('task_agent')}</span>
            <Form.Item className="mb-0 w-full" name="agent" initialValue="" label="">
              <Select
                className="w-full d-flex items-center border-normal dark:border-white10 rounded-6"
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
              >
                <Option value="14">Assign Agent 1</Option>
                <Option value="one4">Assign Agent 2</Option>
                <Option value="two4">Assign Agent 3</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex items-center mb-[25px]">
            <span className="min-w-[90px] text-light dark:text-white60">{t('task_description')}</span>
            <Form.Item name="description" label="" className="mb-0 w-full">
              <Input.TextArea
                rows={4}
                placeholder="Project Description"
                className="w-full  d-flex items-center border-normal dark:border-white10 rounded-6"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

CreateTask.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateTask;
