import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdArrowDropDown } from 'react-icons/md';

function MenuBar() {


    const adminMenu = [
        {
            name: "Dashboard",
            url: "/admin",
            children: null
        },
        {
            name: "Category",
            url: null,
            children: [
                {
                    name: "Add",
                    url: "category/add"
                },
                {
                    name: "View",
                    url: "category"
                }
            ]
        },
        {
            name: "Product",
            url: null,
            children: [
                {
                    name: "Add",
                    url: "product/add"
                },
                {
                    name: "View",
                    url: "product"
                }
            ]
        },
        {
            name: "Color",
            url: null,
            children: [
                {
                    name: "Add",
                    url: "color/add"
                },
                {
                    name: "View",
                    url: "color"
                }
            ]
        },
        {
            name: "Users",
            url: "/admin/users",
            children: null
        },
        {
            name: "Admin Register",
            url: "/admin/admin-register",
            children: null
        }
    ]

    return (
        <>
            <div className=' text-3xl text-center pb-1 mb-5 border-b-[2px]'>
                <span>Admin Panel</span>
            </div>
            <ul>
                {
                    adminMenu.map(
                        (item, index) => {
                            return <Items item={item} key={index} />
                        }
                    )
                }
            </ul>
        </>
    )
}

export default MenuBar

const Items = ({ item }) => {

    const [toggle, setToggle] = useState(false);

    return (
        <>
            {
                item.children === null
                    ?
                    <Link to={item.url}>
                        <li className='cursor-pointer my-2'>{item.name}</li>
                    </Link>
                    :
                    <li className='cursor-pointer my-2' onClick={() => setToggle(!toggle)}>

                        <span className='flex gap-2 items-center font-bold'>{item.name}
                            <MdArrowDropDown className='text-2xl' style={{ transform: toggle === true ? "rotate(-180deg)" : "rotate(0deg)", transition: "500ms" }} />
                        </span>
                        <ul className='pl-3 text-black'>
                            {
                                item.children.map(
                                    (child, index) => {
                                        return (

                                            <Link to={child.url} key={index}>
                                                <li className={` ${toggle === false ? "scale-0 h-[0]" : "scale-100 h-[100] my-2 p-1 pl-2"} duration-200 origin-top-left cursor-pointer  bg-white rounded`} >
                                                    {child.name}
                                                </li>
                                            </Link>
                                        )
                                    }
                                )
                            }
                        </ul>
                    </li>
            }
        </>
    )
}