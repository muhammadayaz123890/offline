import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Pagination, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Heading from '../../../components/heading/heading';
import { PaginationStyle } from '../../styled';
import { updateFooter } from '../../../redux/footer/actionCreator';

const GridCard = lazy(() => import('./GridCard'));

function Grid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const project = useSelector((state) => state.projects.data);
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

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  const handleOnClick = (id) => {
    dispatch(updateFooter(1));
    navigate(`/admin/task/${id}`);
  };

  return (
    <Row gutter={20}>
      {projects.length ? (
        projects.map((value) => {
          return (
            <Col key={value._id ?? value.id} xl={8} md={12} xs={24} className="mb-[20px]">
              <Suspense
                fallback={
                  <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active />
                  </div>
                }
              >
                <GridCard value={value} onclick={() => handleOnClick(value._id ?? value.id)} />
              </Suspense>
            </Col>
          );
        })
      ) : (
        <Col md={24}>
          <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
            <Heading>Data Not Found!</Heading>
          </div>
        </Col>
      )}
      <Col xs={24} className="pb-30">
        <PaginationStyle>
          <div className="ant-pagination-custom-style mb-[34px] text-end">
            {projects.length ? (
              <Pagination
                onChange={onHandleChange}
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                pageSize={10}
                defaultCurrent={1}
                total={40}
              />
            ) : null}
          </div>
        </PaginationStyle>
      </Col>
    </Row>
  );
}

export default Grid;
