import { Drawer, Grid, Slider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import FilterListIcon from '@mui/icons-material/FilterList';
import './style.scss';
import { actions } from '../../../redux/store';
import Buttons from '../Buttons';
import Kid from "../../../assets/image/Kid.png"
import { useEffect, useState } from 'react';
import { useGetAllBrandApiQuery } from '../../../api/Brand';
import { useGetAllCategoryQuery } from '../../../api/Category';
import Loader from '../Loader';

//silder
function ProductFilterDrawer(
    { filterStartPrice,
        filterEndPrice,
        filterBeand,
        filterCategory,
        setFilterStartPrice,
        setFilterEndPrice,
        setFilterBeand,
        setFilterCategory, }) {

    const DialogOpen = useSelector((state) => state.modal.ProductFilter);
    const onCancel = () => {
        actions.modal.closeProductFilterDrawer();
    }

    const { data: categoryApiData, isFetching: categoryFetching } = useGetAllCategoryQuery({}, { skip: !DialogOpen.open })
    const { data: brandApiData, isFetching: brandFetching } = useGetAllBrandApiQuery({}, { skip: !DialogOpen.open });

    const [brandData, setBrandData] = useState([])
    const [categoryData, setCategoryData] = useState([])

    useEffect(() => {
        setBrandData(brandApiData?.data)
        setCategoryData(categoryApiData?.data)
    }, [brandApiData, categoryApiData])


    console.log(brandData, "brandData")

    //category select

    const [selectedCategory, setSelectedCategory] = useState([])

    const selectedCategorys = (id) => {
        if (selectedCategory.includes(id)) {
            // If id is already in selectedCategory, remove it
            const updatedCategories = selectedCategory.filter((categoryId) => categoryId !== id);
            setSelectedCategory(updatedCategories);
        } else {
            // Add the id to selectedCategory if it's not already present
            setSelectedCategory([id]);
        }
    }

    //brand selectd 
    const [selectedBrand, setSelectedBrand] = useState([])

    console.log(selectedBrand, "selectedBrand")

    const selectedBrands = (id) => {
        if (selectedBrand.includes(id)) {
            // If id is already in selectedCategory, remove it
            const updatedBarnds = selectedBrand.filter((BrandId) => BrandId !== id);
            setSelectedBrand(updatedBarnds);
        } else {
            // Add the id to selectedCategory if it's not already present
            setSelectedBrand([...selectedBrand, id]);
        }
    }


    //silder


    const [priceRange, setpriceRange] = useState(["", ""]);

    const minDistance = 10;

    const handleChangePriceRange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setpriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
        } else {
            setpriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
        }
    };

    const valuetext = (value) => {
        return `$${value}`;
    };

    const handleProductFilter = () => {
        setFilterStartPrice(priceRange[0])
        setFilterEndPrice(priceRange[1])
        setFilterBeand(selectedBrand)
        setFilterCategory(selectedCategory)

        onCancel()
    }

    const handleReset = () => {
        setFilterStartPrice("")
        setFilterEndPrice("")
        setFilterBeand("")
        setFilterCategory("")
        onCancel()
    }

    return (
        <>
            <Drawer
                className='filter_drawer'
                anchor="right"
                open={DialogOpen.open}
                onClose={onCancel}
                transitionDuration={1000}
            >
                <div className='filter_drawer_div' style={{ width: "500px" }}>
                    <div className="filter_drawer_header">

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "5px", height: "0px" }}>

                                <p className='filter_title'
                                    style={{
                                        color: '#212121',
                                        fontSize: '24px',
                                        fontWeight: "600",
                                        marginLeft: "0.5rem"
                                    }}>
                                    {"Filter"}
                                </p>
                                <FilterListIcon className='text-main' style={{ fontSize: "30px" }} />
                            </div>
                            <div onClick={onCancel}>
                                <CloseIcon className="cursor-pointer text-black mr-[0.5rem]" />
                            </div>
                        </div>
                    </div>


                    {brandFetching && categoryFetching ? (

                        <div className='flex justify-center items-center h-[90vh]'>
                            <Loader height={"50"} width={"50"} />
                        </div>

                    ) : (<div className='filter_div  p-[0.5rem]' style={{ cursor: "pointer", overflow: 'auto', paddingBottom: "6rem" }}>

                        <div className='category_div'>
                            <div>
                                <span className='text-black category_heading underline  decoration-main' >{"Category"}</span>
                            </div>
                            <div className='category_options mt-[0.5rem]'>
                                <Grid container spacing={2}>
                                    {categoryData?.map((category, index) => {
                                        return (
                                            <>
                                                <Grid item xs={12} lg={4} md={4} sm={6}   >
                                                    <div className={`paperboxshadow gap-[5px] flex items-center p-[0.4rem] rounded-[10px] category_itembox ${selectedCategory.includes(category?._id) ? `selectedbox` : `nonselected`}  `} onClick={() => selectedCategorys(category?._id)} >
                                                        <div style={{ overflow: "hidden", height: '23px', width: "23px", alignItems: "center", display: "flex" }} className='category_img'>
                                                            <img width={"100%"} height={"100%"} src={category?.icon} style={{ objectFit: "cover" }} />
                                                        </div>

                                                        <div>
                                                            <span className='text-black ctaegoty_item_title' >{category?.name}</span>
                                                        </div>

                                                    </div>
                                                </Grid>
                                            </>
                                        )
                                    })}
                                </Grid>
                            </div>
                        </div>

                        <div className='price_div mt-[1.5rem]'>

                            <div>
                                <span className='text-black price_heading underline  decoration-main' >{"Price Range"}</span>
                            </div>

                            <div className='flex flex-col gap-[5px] mt-[0.5rem]'>
                                <span className='text-black sprice flex items-center gap-[5px]'>
                                    <span className='text-[13px]'>{"Start price "}</span>
                                    <span className='text-[14px] text-lighttext'>₹{priceRange[0]}</span>
                                </span>
                                <div className='flex items-center justify-center'>
                                    <Slider
                                        max={50000}
                                        min={1000}
                                        value={priceRange}
                                        onChange={handleChangePriceRange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                        disableSwap
                                        size={"small"}
                                    />
                                </div>

                                <span className='text-black eprice flex items-center gap-[5px]'>
                                    <span className='text-[13px]'>{"End price"}</span>
                                    <span className='text-[14px] text-lighttext'>₹{priceRange[1]}</span>
                                </span>
                            </div>
                        </div>


                        <div className='brand_div mt-[1.5rem] '>
                            <div>
                                <span className='text-black barnd_heading underline  decoration-main' >{"Brand"}</span>
                            </div>
                            <div className='category_options mt-[0.5rem]'>
                                <Grid container spacing={2}>
                                    {brandData?.map((brand, index) => {
                                        return (
                                            <>
                                                <Grid item xs={12} lg={4} md={4} sm={6}  >
                                                    <div className={`paperboxshadow gap-[5px] flex items-center p-[0.4rem] rounded-[10px] brand_itembox ${selectedBrand.includes(brand?._id) ? `selectedbox` : `nonselected`}`} onClick={() => selectedBrands(brand?._id)}>
                                                        <div style={{ overflow: "hidden", height: '23px', width: "23px", alignItems: "center", display: "flex" }} className='brand_img'>
                                                            <img width={"100%"} height={"100%"} src={brand?.icon} style={{ objectFit: "cover" }} />
                                                        </div>

                                                        <div>
                                                            <span className='text-black barnd_item_title' >{brand?.name}</span>
                                                        </div>

                                                    </div>
                                                </Grid>
                                            </>
                                        )
                                    })}
                                </Grid>
                            </div>
                        </div>
                    </div>)}



                </div>

                <div className="filter_drawer_footer ">

                    <div className='flex justify-end gap-[10px]'>
                        <Buttons onClick={handleReset} type={'submit'} text={"Reset"} variant={'outlined'} className={'reset_btn'} />
                        <Buttons onClick={handleProductFilter} type={'submit'} text={"Apply"} variant={'contained'} className={'apply_btn'} />
                    </div>
                </div>

            </Drawer >
        </>
    );
}

export default ProductFilterDrawer;
