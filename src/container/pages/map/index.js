import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { UilCrosshair, UilMoon, UilTrafficLight, UilVectorSquare } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import React from 'react';
import { GoogleMaps } from '../../../components/maps/google-maps';
import { Button } from '../../../components/buttons/buttons';

function Map() {
  return (
    <div className="bg-white dark:bg-[#1B1E2B] h-full overflow-hidden">
      <Button
        //  onClick={showModal}
        className="z-40 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] fixed bottom-[80px] right-4 flex items-center justify-center text-sm font-semibold text-white rounded-full h-14 w-14 dark:text-white87"
        size="default"
        type="primary"
        key="1"
      >
        <Link to="#" className="flex items-center gap-[6px]">
          <UilPlus className="w-[22px] h-[22px]" />
        </Link>
      </Button>
      <Button
        //  onClick={showModal}
        className="z-40 bg-white p-1 rounded-full fixed top-[85px] left-[10px] flex items-center justify-center text-sm font-semibold text-light dark:text-white60 dark:bg-[#1b1e2b] border-none h-[41px] w-[41px] "
      >
        <UilVectorSquare className="w-[28px] h-[28px]" />
      </Button>
      <Button
        //  onClick={showModal}
        className="z-40 bg-white p-1  rounded-full fixed top-[140px] right-[10px] flex items-center justify-center text-sm font-semibold text-light dark:text-white60 dark:bg-[#1b1e2b] border-none h-[41px] w-[41px] "
      >
        <UilTrafficLight className="w-[28px] h-[28px]" />
      </Button>
      <Button
        //  onClick={showModal}
        className="z-40 bg-white p-1  rounded-full fixed top-[197px] right-[10px] flex items-center justify-center text-sm font-semibold text-light dark:text-white60 dark:bg-[#1b1e2b] border-none h-[41px] w-[41px] "
      >
        <UilMoon className="w-[28px] h-[28px]" />
      </Button>
      <Button
        //  onClick={showModal}
        className="z-40 bg-white p-1 rounded-full fixed top-[85px] right-[10px] flex items-center justify-center text-sm font-semibold text-light dark:text-white60 dark:bg-[#1b1e2b] border-none h-[41px] w-[41px] "
      >
        <UilCrosshair className="w-[28px] h-[28px]" />
      </Button>
      <div>
        <GoogleMaps
          latitude="55.797897"
          longitude="-1.077641"
          height="calc(100% - 136px)"
          width="100%"
          position="fixed"
        />
      </div>
    </div>
  );
}

export default Map;
