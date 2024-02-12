import { AiFillStar, AiOutlineStar, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BiLike } from "react-icons/bi";
import Container from '../components/Container';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Reducers/Cart';
import axios from "axios";
import { useContext } from 'react';
import { Context } from '../../../MainContext';
import BestOffer from '../components/BestOffer';

function Home() {

  return (
    <>

      {/* -------------------Banner------------ */}
      <Container fluid={true} extraclass='banner hidden md:block '>

        <Container extraclass="h-[400px] md:h-[500px] flex md:justify-end justify-center">

          <img src="img/2iphone.png" alt="" className='h-[400px] md:h-[100%] ' />

        </Container>


      </Container>

      <Container>
        <BestOffer />
      </Container>


      {/* --------------Mobile Banner------------ */}
      <Container fluid={true} extraclass='banner-mobile md:hidden'>

        <Container extraclass="h-[400px] md:h-[600px] flex md:justify-end justify-center">

          <img src="img/beats_solo_2@2x.png" alt="" className='h-[400px] md:h-[100%] ' />

        </Container>

      </Container>

      {/* --------------------------------------- */}

      {/* -----Best Seller--- */}
      <BestSeller />
      {/* ------------------- */}



      {/* --------------FEATURED PRODUCTS----------- */}
      <FeaturedProduct />
      {/* ------------------------------------------ */}

    </>
  )
}

export default Home;


const BestSeller = () => {

  const { apiBaseUrl, cartBaseUrl, notify } = useContext(Context);

  let { category } = useSelector(store => store.category);
  let { product, prodImgUrl } = useSelector(store => store.product);
  const { user } = useSelector(store => store.user)
  // const { selectedProd } = useSelector(store => store.selectedProd)
  const dispatch = useDispatch();
  const { slug } = useParams();

  product = product.filter(
    (prod) => {
      if (prod.bestseller === true) {
        return true;
      } else {
        return false;
      }
    }
  )

  const categoryData = category.filter(
    (cat) => {
      if (cat.slug === slug) {
        return true;
      } else {
        return false;
      }
    }
  )

  let showProduct = product;

  if (categoryData[0] !== undefined) {
    showProduct = product.filter(
      (prod) => {
        if (prod.category_id === categoryData[0]._id) {
          return true;
        } else {
          return false;
        }
      }
    )
  }

  const cartHandler = (data) => {
    dispatch(addToCart(data));
    if (user !== null) {
      axios.post(apiBaseUrl + cartBaseUrl + `/add-to-cart/${user._id}`, data)
        .then(
          (success) => {
            notify(success.data.msg, "success");
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
    }
  }

  return (

    <>

      <Container>

        <div className='fs-2 text-center fw-bold mt-5 mb-3'>BEST SELLER</div>

        <ul className='hidden md:flex justify-center gap-5'>
          <Link to={'/'}>
            <li className='hover:text-blue-700 cursor-pointer'>All</li>
          </Link>
          {
            category.map(
              (cat, index) => {
                return (
                  <Link to={`/${cat.slug}`} key={index}>
                    <li className="hover:text-blue-700 cursor-pointer">
                      {cat.name}
                    </li>
                  </Link>
                );
              }
            )
          }
        </ul>

        <select className='block md:hidden mx-auto border w-72 text-center bg-gray-200 p-2 rounded'>

          {
            category.map(
              (item, index) => {
                return (
                  <option key={index} >
                    {item.name}
                  </option>
                )
              }
            )
          }

        </select>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 lg:p-3 p-5'>
          {
            showProduct.map(
              (prod, index) => {
                return (
                  <div
                    key={index}
                    className=" hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] duration-500 border-[3px] text-center my-2"
                  >
                    <div className="relative duration-500 flex justify-center py-3 px-3 border-b-[1px]">

                      <img src={prodImgUrl + prod.image} alt="" className="" />

                      <div className=" opacity-[0] hover:opacity-[1] duration-500 flex items-center justify-center bg-[rgba(225,225,225,0.8)]  absolute top-0 h-full w-full left-0 ">

                        <div className="fs-[80px] md:fs-[50px] fw-bold flex gap-3 ">

                          <button className="hover:bg-blue-300 duration-500 border-[2px] border-blue-400 hover:text-white rounded-[50%] p-3">
                            <BiLike />
                          </button>

                          <Link>

                            <button
                              // onClick={() => dispatch(addToCart({prodId: prod._id}))}
                              onClick={() => cartHandler({ prodId: prod._id })}
                              className="hover:bg-blue-300 duration-500 border-[2px] border-blue-400 hover:text-white rounded-[50%] p-3">
                              <AiOutlineShoppingCart />
                            </button>

                          </Link>

                        </div>

                      </div>

                    </div>

                    <div className="fs-5 fw-bold my-3">{prod.name}</div>

                    <div className="flex justify-center my-2 fs-5 gap-1 text-yellow-400">
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiOutlineStar />
                      </span>
                    </div>

                    <div className="flex justify-center gap-4 fs-5 fw-bold mb-3">
                      <div className="text-red-600">{prod.final}</div>
                      <div className="opacity-50 line-through ">{prod.price}</div>
                    </div>
                  </div>
                );
              }
            )
          }
        </div>

        <div className='fw-bold text-center fs-4 text-blue-700  md:pb-10 my-5'>LODE MORE</div>

      </Container>

      <Container fluid={true} extraclass='hidden lg:block bg-[#2E90E5] mt-[80px] h-[460px]'>

        <Container extraclass="grid grid-cols-2 gap-[200px] h-full">

          <div className='h-full flex flex-col justify-center md:gap-4 text-white pl-9'>

            <div className=' text-[50px]'>iPhone 6 Plus</div>

            <div className='text-[25] text-[30px]'>Performance and design. Taken right to the edge.</div>

            <div className='fw-bold'>SHOP NOW</div>

          </div>

          <div className='relative'>

            <img src="img/iphone_6_plus.png" alt="" className=' absolute right-0 bottom-[0px]' />

          </div>

        </Container>

      </Container>

      <Container fluid={true} extraclass=' lg:hidden bg-[#2E90E5] mt-[80px] '>

        <Container extraclass="relative z-[888] h-[600px] sm:h-[690px]" >

          <div className='p-5 grid gap-4 text-white'>

            <div className=' text-[35px] sm:text-[45px]'>iPhone 6 Plus</div>

            <div className='text-[25px] sm:text-[30px]'>Performance and design. <br /> Taken right to the edge.</div>

            <div className='fw-bold my-4'>SHOP NOW</div>

          </div>

          {/* <div className='relative'> */}

          <img src="img/iphone_6_plus.png" alt="" className='w-[65%] absolute right-0 bottom-0' />

          {/* </div> */}

        </Container>

      </Container>

      <Container>

        <div className="lg:grid grid-cols-3 gap-4 py-5 px-5 md:px-0">

          <div className='text-center grid gap-4 mt-5'>

            <div className='flex justify-center'><img src="img/shipping.svg" alt="" /></div>
            <div className='fw-bold fs-5 uppercase'>Free Shipping</div>
            <div className=''>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, velit ad delectus fugiat, ab explicabo voluptas praesentium sunt excepturi quis numquam facere labore commodi asperiores enim, ex nisi consequatur saepe.</p>
            </div>

          </div>

          <div className='text-center grid gap-4 mt-5'>

            <div className='flex justify-center'><img src="img/refund.svg" alt="" /></div>
            <div className='fw-bold fs-5  upppercase'>100% REFUND</div>
            <div className=''>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, velit ad delectus fugiat, ab explicabo voluptas praesentium sunt excepturi quis numquam facere labore commodi asperiores enim, ex nisi consequatur saepe.</p>
            </div>

          </div>

          <div className='text-center grid gap-4 mt-5'>

            <div className='flex justify-center'><img src="img/support.svg" alt="" /></div>
            <div className='fw-bold fs-5 '>SUPPORT 24/7</div>
            <div className=''>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, velit ad delectus fugiat, ab explicabo voluptas praesentium sunt excepturi quis numquam facere labore commodi asperiores enim, ex nisi consequatur saepe.</p>
            </div>

          </div>

        </div>
      </Container>

    </>
  )
}

const FeaturedProduct = () => {

  const FEproducts = [
    {
      image: "img/beats_solo_2.png",
      name: "Beats Solo 2 On Ear Headphones - Black",
      rating: "<AiFillStar/>",
      discount: "$499",
      price: "$599"
    },
    {
      image: "img/H-squared.png",
      name: "H-Squared tvTray",
      rating: "<AiFillStar/>",
      discount: "$499",
      price: "$599"
    },
    {
      image: "img/Netatmo_rain.png",
      name: "Netatmo Rain Gauge",
      rating: "<AiFillStar/>",
      discount: "$499",
      price: "$599"
    }
  ]

  return (

    <Container className="my-5">

      <div className='uppercase fs-2 fw-bold text-center mt-5 py-3'>Featured Product</div>

      <div className='flex justify-center items-center fw-bold'>

        <div className='fs-1 pr-3'><IoIosArrowBack /></div>

        <div className='md:grid grid-cols-3 gap-3 py-3'>

          {
            FEproducts.map(
              (product, index) => {
                return (
                  <div key={index} className='hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:border duration-500 grid gap-2 grid-cols-2 p-3 py-5'>

                    <div className='border flex justify-center items-center p-1'>
                      <img src={product.image} alt="" />
                    </div>

                    <div className='grid gap-2'>

                      <div>{product.name}</div>

                      <div className='flex text-yellow-500'>
                        <span><AiFillStar /></span>
                        <span><AiFillStar /></span>
                        <span><AiFillStar /></span>
                        <span><AiFillStar /></span>
                        <span><AiOutlineStar /></span>
                      </div>

                      <div className='flex gap-3 fw-bold mb-3'>
                        <div className='text-red-600'>{product.discount}</div>
                        <div className='opacity-50 line-through '>{product.price}</div>
                      </div>

                    </div>

                  </div>
                )
              }
            )
          }

        </div>

        <div className='pl-3 fs-1'><IoIosArrowForward /></div>

      </div>
    </Container>
  )
}
