import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { scrapService, submitScrapService, getWebsService, getCategoriesService } from '../services/scrap.services';

function Scrap() {
    const inputUrlRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const webSelectorRef = useRef();
    const categorySelectorRef = useRef();

    useEffect(() => {
        getWebsFromServer();
    }, [])

    const [data, setData] = useState(null);
    const [webs, setWebs] = useState(null);
    const [webSelected, setWebSelected] = useState(null);
    const [categorySelected, setCategorySelected] = useState(null);
    const [categories, setCategories] = useState(null);
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

    const getWebsFromServer = async (e) => {
        const response = await getWebsService();
        setWebs(response.data);
    }

    const changeSelect = () => {
        const value = webSelectorRef.current.value;
        const text = webSelectorRef.current.options[webSelectorRef.current.selectedIndex].value;
        setWebSelected(text);
        searchWebCategories(text);
    }
    const changeCategorySelect = () => {
        const value = categorySelectorRef.current.value;
        const text = categorySelectorRef.current.options[categorySelectorRef.current.selectedIndex].value;
        setCategorySelected(text);
    }

    const searchWebCategories = async (webId) => {
        // console.log(webId);
        const response = await getCategoriesService({ "webId": webId });
        setCategories(response.data);
        // console.log(response.data);
    }

    const submitDataDb = async (e) => {
        e.preventDefault();
        const response = await submitScrapService({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            image: data.image,
            category: categorySelected,
        })
        setData(null);
        setDataSubmited(true);
        console.log(response);
    }
    return (
        <div className='flex flex-col justify-center items-center content-center align-items-center'>
            <div className="w-1/2 bg-slate-300">
                <h1>SCRAP</h1>

                <h3>SELECT WEB</h3>
                {webs !== null &&
                    <div class="flex justify-center">
                        <div class="mb-3 xl:w-96">
                            <select class="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" ref={webSelectorRef} onChange={changeSelect}>
                                <option selected>WEB SELECTOR</option>
                                {webs.map((web) => {
                                    return (<option value={web._id}>{web.url}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                }
                {categories !== null &&
                    <>
                        <h3>Category Selector</h3>

                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <select class="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" ref={categorySelectorRef} onChange={changeCategorySelect}>
                                    <option selected>WEB SELECTOR</option>
                                    {categories.map((category) => {
                                        return (<option value={category._id}>{category.name}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </>
                }
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