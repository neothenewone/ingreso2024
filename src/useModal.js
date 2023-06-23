import {useState} from 'react';

export const useModal=(initialValue)=>{
const [isOpen,setlsOpen]=useState(initialValue)

const openModal=()=>setlsOpen(true);
const closeModal=()=>setlsOpen(false);
return [isOpen,openModal,closeModal]
}
