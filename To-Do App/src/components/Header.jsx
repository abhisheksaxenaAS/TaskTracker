import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='flex justify-around bg-slate-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>myTask</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold hover:underline transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold hover:underline transition-all'>Your Tasks</li>        
      </ul>
    </nav>
  )
}

export default Header