import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';


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
  const ShareModal = ({ url, title }) => {
  const [open, setOpen] = useState(false);


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
                  <div>
                    Title: {paste.title}
                  </div>
                  <div>
                    Content: {paste.content}
                  </div>

                  <div className='flex flex-column gap-3 place-content-evenly p-10 '>
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
                    <div className='flex gap-1' >
                        <div>
                          <button onClick={() => setOpen(true)}>Share</button>
                          <Modal open={open} onClose={() => setOpen(false)}>
                            <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, mx: 'auto', mt: '20%', width: 300 }}>
                              <h3>Share this content</h3>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <FacebookShareButton url={url} quote={title}>
                                  <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton url={url} title={title}>
                                  <TwitterIcon size={32} round />
                                </TwitterShareButton>
                              </div>
                            </Box>
                          </Modal>
                        </div>

                        {/* <button  >
                          Share
                        </button> */}
                         <button>
                            <FacebookIcon size={32} round  />
                         </button>
                         
                          <button>
                            <TwitterIcon size={32} round />
                          </button>
                          
                          <button>
                            <WhatsappIcon size={32} round />
                          </button>
                    </div>
                  </div>
                  <div>
                    {paste.createdAt}
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
}

export default Pastes