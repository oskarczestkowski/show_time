"use client"

import './calendar.css';

import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function CalendarElement() {
    

  const [value, onChange] = useState<Value>(new Date());
  const onChangeCalendar = (e:any)=>{
    console.log(e)
  }
  return (
    <div className='bg-200'>
      <Calendar onChange={onChangeCalendar} value={value} className={"bg-slate-600"}/>
    </div>
  );
}