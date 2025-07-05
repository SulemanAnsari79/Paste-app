import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes,updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch=useDispatch();
  const allPastes=useSelector((state)=>state.paste.pastes);

  useEffect(() => {
    if(pasteId){
      const paste=allPastes.find((p)=>p._id===pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [allPastes,pasteId])

  function createPaste(){
    const paste={
      title:title,
      content:value,
      _id:pasteId ||
      Date.now().toString(36),
      createDt:new Date().toISOString(),
    }
    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }else{
      //create
      dispatch(addToPastes(paste));
    }
    setTitle('');
    setValue('');
    setSearchParams ({});
  }

  return (
    <div >
      <div className='flex flex-row gap-9 place-content-center mt-4'>
        <input
          className='border rounded-2xl mt-2 pl-4 w-[500px] '
          type="text"
          placeholder='Enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste}
        className='p-2 rounded-2xl mt-2' >
          {
            pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button>

      </div>

      <div className='mt-8'>
        <textarea
          className='border rounded-2xl mt-2 p-4 w-[700px]'
          value={value}
          placeholder='Enter Content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}

        />
      </div>

    </div>
  )
}

export default Home
