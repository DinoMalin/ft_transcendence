import React from 'react';
import { Card } from '../utils/Card';
import { language } from '../../scripts/languages';

export function PlayerCard({lang, profile, admin}) {
  return (
    <Card className='flex items-center px-4 py-2 mb-4 w-80'>
      <div className="w-full flex items-center">
        <div className={`bg-[url(${profile.avatar})] bg-cover bg-center rounded-full border-2 border-white h-16 aspect-square mr-4`}></div>
        <div className="overflow-hidden">
          <h1 className="font font-semibold text-lg w-full overflow-hidden text-ellipsis">{profile.name}</h1>
          <h1 className="w-full">{language.level[lang]} {profile.level}</h1>
        </div>
      </div>
      {admin ? 
      <div className="bg-white aspect-square rounded-full ml-10 px-2 py-1 flex items-center shadow">
        <i className="fa-solid fa-crown text-black"></i>
      </div>
        : null}
    </Card>
  );
}
