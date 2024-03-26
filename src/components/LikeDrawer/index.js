import { Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { actions } from '../../redux/store';
import './style.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { useGetWishlistProductQuery, useLikeProductMutation } from '../../api/Product';
import { useEffect, useState } from 'react';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';

function LikeDrawer() {
    const DialogOpen = useSelector((state) => state.modal.Like);

    const { data: LikeProductsData, isFetching: likeProductFetching } = useGetWishlistProductQuery({}, { skip: !DialogOpen.open });

    const navigate = useNavigate();

    const [LikeProduct, { isLoading }] = useLikeProductMutation();

    const [likeProductsData, setLikeProductsData] = useState([]);

    useEffect(() => {
        setLikeProductsData(LikeProductsData?.data)
    }, [LikeProductsData])



    const onCancel = () => {
        actions.modal.closeLikeDrawer();
    }


    const likeProducts = async (productId) => {
        actions.loder.setLoading(true);
        try {
            const body = {
                pid: productId
            }
            const response = await LikeProduct(body);
            actions.like.setLike(response?.data?.data?.length);
        }
        catch (error) {
            console.log(error)

        }

        actions.loder.setLoading(false);
    }

    const navigetHome = () => {
        navigate("/home")
        onCancel()
    }

    console.log(likeProductsData, "likeProductsData")

    return (
        <>
            <Drawer
                className='like_drawer'
                anchor="right"
                open={DialogOpen.open}
                onClose={onCancel}
                transitionDuration={1000}
            >
                <div className='like_drawer_div' style={{ width: "400px" }}>
                    <div className="drawer_header_wrapper">

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "5px", height: "0px" }}>

                                <p className='like_title'
                                    style={{
                                        color: '#212121',
                                        fontSize: '24px',
                                        fontWeight: "600",
                                        marginLeft: "0.5rem"
                                    }}>
                                    {"My Wishlist"}
                                </p>
                                <FavoriteIcon className='text-main' />
                            </div>
                            <div onClick={onCancel}>
                                <CloseIcon className="cursor-pointer text-black mr-[0.5rem]" />
                            </div>
                        </div>
                    </div>

                    <div className='like_products p-[0.8rem]' >

                        {/* product is not Empty  then  show this diev only  */}
                        {likeProductFetching ? (
                            <div className='flex justify-center items-center h-[90vh]'>
                                <Loader height={"50"} width={"50"} />
                            </div>

                        ) : (likeProductsData?.length ? (likeProductsData?.map((product, index) => {
                            return (
                                <div className='w-[100%] paperboxshadow  flex justify-center items-center  mb-[1rem] '  >
                                    <div className='flex items-center '>
                                        <div className='like_img  flex justify-center items-center p-[0.2rem]' >
                                            <div>
                                                <img className='w-[100%] h-[100%] object-cover' src={product?.thumbnail}></img>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: '0.5rem' }}>
                                        <div style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}>
                                            <div onClick={() => { likeProducts(product?._id) }}>
                                                <FavoriteIcon className='text-[20px] text-red cursor-pointer like_icon' />
                                            </div>
                                        </div>

                                        <div className='flex flex-col' >
                                            <div >
                                                <span className='text-black text-[18px] like_name' style={{ fontWeight: "600" }}>{product?.name}</span>
                                            </div>
                                            <div>
                                                <span className='text-main text-[16px] like_price' style={{ fontWeight: "600" }}>{`${product?.price.toLocaleString('en-IN')} ₹`}</span>
                                            </div>
                                            <div className='flex items-center gap-[5px] mt-[0.2rem]'>
                                                <StarIcon className='text-yellow start_icon' />
                                                <span className='rating_text'>{"3.5"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                    </div>
                                </div>)

                        })) : (<div className='flex flex-col gap-[5px] items-center  justify-center h-[80vh]'>
                            <div>
                                <span className='text-black text-[23px] noitem_title'>Your Wishlist is empty!</span>
                            </div>
                            <div className='flex text-center mt-[2rem]' >
                                <span className='text-main text-[17px] noitem_link underline  decoration-main cursor-pointer' onClick={navigetHome}>Continue Shopping</span>
                            </div>
                        </div>))}


                        {/* product is Empty  then  show this diev only  */}


                    </div>
                </div>

            </Drawer>
        </>
    );
}

export default LikeDrawer;
