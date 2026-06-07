import React, { useState,useEffect,useRef } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1,setImage1]=useState(false);
  const [image2,setImage2]=useState(false);
  const [image3,setImage3]=useState(false);
  const [image4,setImage4]=useState(false);
  const [loading, setLoading] = useState(false);

  const [name,setName] =useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("Men")
  const [subCategory,setSubCategory]=useState("Topwear")
  const [bestseller,setBestseller]=useState(false)
  const [sizes,setSizes]=useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const catRef = useRef();
  const subRef = useRef();
  
  const onSubmitHandler=async(e)=>{
    e.preventDefault();

    try{
      setLoading(true);
      const formData=new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      console.log("IMAGE1:", image1);
      const response = await axios.post(
          backendUrl + "/api/product/add",
          formData,
          {
            headers: {
              token: token,
              "Content-Type": "multipart/form-data"
            }
          }
        );
      
      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }
      else{
        toast.error(response.data.message)
      }
      
    }
    catch(error){
      console.log("ERROR:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || error.message)
    }
    finally {
      setLoading(false); 
    }

  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
      if (subRef.current && !subRef.current.contains(e.target)) {
        setSubOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='flex flex-col w-full items-start gap-3 '>
        <p>Upload Image</p>

        <div className='flex gap-4 flex-wrap'>
  
          {[image1, image2, image3, image4].map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index + 1}`}
              className='w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange-500 transition overflow-hidden'
            >
              {!img ? (
                  <img 
                    src={assets.upload_area} 
                    className='scale-90' 
                    alt=""
                  />

              ) : (
                <div className='w-32 h-32 relative group'>
                  
                  <img
                    src={URL.createObjectURL(img)}
                    className='w-full h-full object-cover rounded-xl'
                    alt=""
                  />

                  {/* Hover overlay */}
                  <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition'>
                    <p className='text-white text-xs'>Change</p>
                  </div>

                </div>
              )}

              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }}
              />
            </label>
          ))}

        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input required onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-300 ' type="text" placeholder='Type here' />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea required  onChange={(e)=>setDescription(e.target.value)} value={description}  className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-300 ' placeholder='Enter Description' />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        {/* CATEGORY */}
        <div className='relative' ref={catRef}>
          <p className='mb-2'>Product category</p>

          <div 
            onClick={() => setCatOpen(!catOpen)}
            className='w-full px-3 py-2 border rounded-md cursor-pointer bg-white flex justify-between items-center'
          >
            {category}
            <span></span>
          </div>

          <div className={`absolute w-full bg-white border rounded-md mt-1 shadow-md overflow-hidden transition-all duration-300 
            ${catOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            
            {["Men", "Women", "Kids"].map((item) => (
              <p
                key={item}
                onClick={() => {
                  setCategory(item);
                  setCatOpen(!catOpen);
                  setSubOpen(false)
                }}
                className={`px-3 py-2 text-align-center cursor-pointer hover:bg-orange-100 
                ${category === item ? 'bg-orange-200 text-orange-600' : ''}`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div className='relative' ref={subRef}>
          <p className='mb-2'>Sub category</p>

          <div 
            onClick={() => {setSubOpen(!subOpen)}}
            className='w-full px-5 py-2 text-align-center border rounded-md cursor-pointer bg-white flex justify-between items-center'
          >
            {subCategory}
            <span><img src={assets.arrow} alt="" /></span>
          </div>

          <div className={`absolute w-full bg-white border rounded-md mt-1 shadow-md overflow-hidden transition-all duration-100 
            ${subOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            
            {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
              <p
                key={item}
                onClick={() => {
                  setSubCategory(item);
                  setSubOpen(!catOpen);
                }}
                className={`px-3 py-2 text-align-center cursor-pointer hover:bg-orange-100 
                ${subCategory === item ? 'bg-orange-200 text-orange-600' : ''}`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div>
          <p className='mb-2'>Product Price</p>
          <input
            required
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
            className='w-full px-3 py-2 sm:w-[120px] border rounded-md focus:border-orange-500 outline-none'
            type="number"
            placeholder='25'
          />
        </div>

      </div>

      <div>
        <p>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev =>prev.includes("S") ? prev.filter(item=>item!=="S"):[...prev,"S"])}>
            <p className={`${sizes.includes("S")? "bg-orange-200 border border-orange-600":"bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={()=>setSizes(prev =>prev.includes("M") ? prev.filter(item=>item!=="M"):[...prev,"M"])}>
            <p className={`${sizes.includes("M")? "bg-orange-200 border border-orange-600":"bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=>setSizes(prev =>prev.includes("L") ? prev.filter(item=>item!=="L"):[...prev,"L"])}>
            <p className={`${sizes.includes("L")? "bg-orange-200 border border-orange-600":"bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev =>prev.includes("XL") ? prev.filter(item=>item!=="XL"):[...prev,"XL"])}>
            <p className={`${sizes.includes("XL")? "bg-orange-200 border border-orange-600":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev =>prev.includes("XXL") ? prev.filter(item=>item!=="XXL"):[...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL")? "bg-orange-200 border border-orange-600":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox"  id='bestseller' className='bg-orange-500'/>
        <label className='cursor-pointer ' htmlFor="bestseller"> Add to bestseller</label>
      </div>

     <button
        type="submit"
        disabled={loading}
        className={`w-28 py-3 mt-4 flex items-center justify-center gap-2 rounded-md text-sm font-medium
        transition-all duration-100 ease-out
        ${loading 
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-black text-white hover:bg-gray-700 hover:shadow-sm active:scale-[0.98] "
        }`}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        {loading ? "Adding..." : "ADD"}
      </button>
    </form>
    
  )
}

export default Add
