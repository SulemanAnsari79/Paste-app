import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filterdData = (pastes || []).filter((paste) =>
    paste?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  async function handleShare(){
     if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out!',
          text: 'Awesome content to share.',
          url: window.location.href,
        });
        console.log('Shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this browser.');
    }
  }

  return (
    <div>
      <input
        className='p-2 rounded-2xl min-w-[650px] mt-5 border'
        type="search"
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 px-70 py-10'>
        {
          filterdData.length > 0 &&
          filterdData.map(
            (paste) => {
              return (
                <div className='border rounded-2xl' key={paste?.id}>
                  <div className='text-2xl'>
                    <span className='font-bold'>Title:</span>
                    <span >{paste.title}</span>
                  </div>
                  <div className='text-xl' >
                    <span className='font-bold'>Content:</span>
                    <span >{paste.content}</span>
                  </div>

                  <div className='flex flex-column place-content-evenly p-10  text-sm '>
                    <button >
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                    </button>
                    <button  >
                      <a href={`/pastes/${paste?._id}`}>
                        View
                      </a>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard")
                    }}>
                      Copy
                    </button>
                    <button onClick={handleShare}>
                      Share
                    </button>
                    {paste.createdDt}
                  </div>
                </div>
              )
            }
          )
        }

      </div>
    </div>
)
}
export default Pastes