/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Container from './Container';

const BestOffer = () => {

    const [day, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [second, setSecond] = useState();

    let interval;

    const countDown = () => {

        const destination = new Date('March 10 2024').getTime();

        interval = setInterval(
            () => {
                const now = new Date().getTime();
                const different = destination - now;

                const days = Math.floor(different / (1000 * 60 * 60 * 24));
                const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                const minutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60));
                const second = Math.floor(different % (1000 * 60) / (1000));

                if (destination < 0) {
                    clearInterval(interval.current)
                } else {
                    setDays(days);
                    setHours(hours);
                    setMinutes(minutes);
                    setSecond(second);
                }
            }
        );
    }

    useEffect(
        () => {
            countDown()
        },
        []
    )


    return (
        <Container >
            <div className='mt-2 hidden md:flex px-5 justify-center items-center gap-9'>
                {/* <div className='uppercase text-center font-bold bg-[#456b98] text-white p-5 rounded-[100%]'>Flash deal</div> */}
                <div className='text'><span className='font-bold text-3xl text-[#456b98]'>Hurry up !</span> <span> Offer ends in:</span></div>
                <div className='flex gap-4 items-center  text-center my-4'>
                    <div>
                        <div className='bg-blue-100 rounded-[100%] p-3 font-bold'>{day}</div>
                        <div className='py-2'>Days</div>
                    </div>
                    <div>
                        <div className='bg-blue-100 rounded-[100%] p-3 font-bold'>{hours}</div>
                        <div className='py-2'>Hours</div>
                    </div>
                    <div>
                        <div className='bg-blue-100 rounded-[100%] p-3 font-bold'>{minutes}</div>
                        <div className='py-2'>Mins</div>
                    </div>
                    <div>
                        <div className='bg-blue-100 rounded-[100%] p-3 font-bold'>{second}</div>
                        <div className='py-2'>Sec</div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default BestOffer