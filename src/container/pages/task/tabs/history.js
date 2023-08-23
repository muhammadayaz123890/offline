import React, { useState } from 'react';
import { Col, Row, Timeline } from 'antd';
import { TimelineNormalWrap } from '../../../ui-elements/ui-elements-styled';
import { Modal } from 'antd';
import moment from 'moment';
import Heading from '../../../../components/heading/heading';
import { GoogleMaps } from '../../../../components/maps/google-maps';

function TabHistory({ data }) {
  const { events } = data;
  const [modalMap, setModalMap] = useState(false);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  const locationOnMap = (coords) => {
    setCoords({ latitude: coords.latitude, longitude: coords.longitude });
    setModalMap(true);
  };

  return (
    <Row gutter={25}>
      <Col xxl={6} xl={8} xs={24}>
        <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] mb-[25px] rounded-t-none rounded-10 relative">
          <TimelineNormalWrap>
            <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10">
                <h1 className="mb-0 inline-block py-[16px] pt-5 overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom
                </h1>
              </div>
              <div className="p-[25px]">
                <Timeline>
                  {
                    // (events || [])
                    [...events].reverse().map((event) => {
                      console.log(event);
                      return (
                        <Timeline.Item>
                          {event !== undefined ? (
                            <div>
                              {`${event.title} - ${moment(event.start).format('lll')} `}
                              <br />
                              {`Autor: ${event.autor}`}
                              {event.coords && (
                                <>
                                  <br />
                                  <a href="#" onClick={() => locationOnMap(event.coords)}>
                                    Location on map
                                  </a>
                                </>
                              )}
                            </div>
                          ) : (
                            'Create a services site 2015-09-01'
                          )}
                        </Timeline.Item>
                      );
                    })
                  }
                  {/* <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item> */}
                  {/* <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item
                    dot={
                      <div className="text-red-500 dark:text-white flex p-0 m-0">
                        <UilClock style={{ fontSize: '16px' }} />
                      </div>
                    }
                  >
                    Technical testing 2015-09-01
                  </Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item> */}
                </Timeline>
              </div>
            </div>
          </TimelineNormalWrap>
        </div>
        <Modal open={modalMap} onCancel={() => setModalMap(false)} className="h-3/6 p-0" footer={<></>}>
          <div className=" mb-[0px] pt-[10px] h-full overflow-hidden rounded-[10px]">
            <Heading as="h4" className="text-xxl font-bold mb-2 ml-3">
              mapa
            </Heading>
            <div>
              <GoogleMaps latitude={coords.latitude} longitude={coords.longitude} />
            </div>
          </div>
        </Modal>
      </Col>
    </Row>
  );
}

export default TabHistory;
