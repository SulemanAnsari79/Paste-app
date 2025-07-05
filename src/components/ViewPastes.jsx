import React  from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPastes = () => {

  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0];
  console.log("Final paste")

  return (
    <div >
      <div className='flex flex-row gap-10 place-content-center'>
        <input
          className='border p-1 rounded-2xl mt-2 px-4 w-[500px]'
          type="text"
          placeholder='Enter title here'
          value={paste.title}
          disabled
          // onChange={(e) => setTitle(e.target.value)}
        />

      </div>

      <div className='mt-8'>
        <textarea
          className='border rounded-2xl mt-4, min-w-[500px] p-4'
          value={paste.content}
          rows={20}
          disabled
        />
      </div>

    </div>
  )
}

export default ViewPastes
