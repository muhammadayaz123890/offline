import React from 'react';
import { Col, Row, Timeline } from 'antd';
import { UilClock } from '@iconscout/react-unicons';
import { TimelineNormalWrap } from '../../../ui-elements/ui-elements-styled';

function TabStats() {
  return (
    // <Row gutter={25}>
    //   <Col xxl={6} xl={8} xs={24}>
    <div className="bg-white w-full dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 h-80 text-[15px] mb-[25px] rounded-t-none rounded-10 relative">
      {/* <TimelineNormalWrap>
            <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10">
                <h1 className="mb-0 inline-block py-[16px] pt-5 overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom
                </h1>
              </div>
              <div className="p-[25px]">
                <Timeline>
                  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                  <Timeline.Item dot={<UilClock style={{ fontSize: '16px' }} />} color="red">
                    Technical testing 2015-09-01
                  </Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
              </div>
            </div>
          </TimelineNormalWrap> */}
    </div>
    //   </Col>
    // </Row>
  );
}

export default TabStats;
