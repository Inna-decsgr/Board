import React from 'react';

export default function Button({text, onClick, type, disabled, ariaCurrent}) {
  return (
    <button className='bg-main text-white px-4 py-2 rounded-sm hover:brightness-125 mx-1' onClick={onClick} type={type === 'submit' ? 'submit' : 'button'} disabled={disabled} aria-current={ariaCurrent}>
      {text}
    </button>
  );
}

