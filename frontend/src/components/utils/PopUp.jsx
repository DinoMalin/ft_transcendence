import React, { useState } from 'react';
import { Card } from './Card';


export function PopUp({ active, setActive, children, className = "", clear = () => {} }) {
  function handleClick() {
    setActive(false);
    clear();
  }
  return (
    <div className={`${active ? null : "hidden"} w-screen h-screen absolute bg-black/60 top-0 left-0 z-50 flex justify-center items-center`}>
      <Card className='px-3 py-3 flex flex-col items-end'>
        <i onClick={handleClick} className="fa-solid fa-xmark cursor-pointer"></i>
        <div className={`p-6 ${className}`}>
					{children}
				</div>
      </Card>
    </div>
  );
}
