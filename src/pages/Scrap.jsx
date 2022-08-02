import React, { useState } from 'react'
import { useRef } from 'react'
import { scrapService, submitScrapService } from '../services/scrap.services';

function Scrap() {
    const inputUrlRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();

    const [data, setData] = useState(null);
    const [dataSubmited, setDataSubmited] = useState(false);
    const [loadingScrap, setLoadingScrap] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDataSubmited(false);
        setLoadingScrap(true);
        setData(null);
        const response = await scrapService({ "url": inputUrlRef.current.value });
        setData(response.data);
        setLoadingScrap(false);
    }
    const submitDataDb = async (e) => {
        e.preventDefault();
        const response = await submitScrapService({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            image: data.image,
        })
        setData(null);
        setDataSubmited(true);
        console.log(response);
    }
    return (
        <div className='flex flex-col justify-center items-center content-center align-items-center'>
            <div className="w-1/2 bg-slate-300">
                <h1>SCRAP</h1>
                <form action="" className='flex flex-col justify-center' onSubmit={handleSubmit}>
                    <label htmlFor="url">Insert URL</label>
                    <input type="text" name='url' ref={inputUrlRef} />
                    <button type="submit" className=''>SCRAP IT!</button>
                </form>
            </div>
            {loadingScrap === true && <div>Loading</div>}
            {dataSubmited === true && <div>DATA SUBMITED TO DB</div>}
            {data !== null &&
                <div className='mt-12 bg-slate-300 w-9/12 flex flex-col justify-center items-center content-center align-items-center'>
                    <label htmlFor="title">TITLE</label>
                    <input type="text" name="title" value={data.title} className="w-full" ref={titleRef} />
                    <label htmlFor="description">DESCRIPTION</label>
                    <textarea type="text" name="description" value={data.description} className="w-full" ref={descriptionRef} />
                    <label htmlFor="price">PRICE</label>
                    <input type="text" name="price" value={data.price} className="w-full" ref={priceRef} />
                    <img src={data.image} alt="" srcset="" />
                    <button type="submit" onClick={submitDataDb}>INSERT ALL DATA</button>
                </div>
            }
        </div>
    )
}

export default Scrap