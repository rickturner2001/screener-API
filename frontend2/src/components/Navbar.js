import {useState, useEffect, useContext} from "react";
import {createPortal} from "react-dom";
import {SignupModal} from "./SignupModal";
import {LoginModal} from "./LoginModal";
import AuthContext from "../context/AuthContext";
import {MailIcon} from "@heroicons/react/solid";
import {
    CodeIcon,
    CollectionIcon, FlagIcon, FolderOpenIcon,
    HomeIcon,
    LightBulbIcon,
    NewspaperIcon,
    PresentationChartBarIcon,
    UserIcon
} from "@heroicons/react/outline";
import {Dropdown} from "react-daisyui";

const themeChange = require("theme-change")


export const Navbar = (props) => {

    const {user, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        themeChange.themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    const navbarOptions = [['Home', "/application", false,], ["strategies", "/strategies", false], ["Report a bug", "", false],
        ["Other", "", false], ["About", "", false], ["Watchlists", "/watchlists", false]]
    const [isOpen, setIsOpen] = useState(false)
    // const [isSigningUp, setIsSigningUp] = useState(false)

    const DropDownMenu = () =>{
        return(
            <div className={'flex justify-center'}>
            <ul
                className="menu menu-compact dropdown-content mt-6 p-2 shadow bg-base-100 rounded-box w-[80vw] absolute sm:top-[10%] lg:top-[5%] ">
                <div className={'flex justify-center items-start mb-3 '}>
                    <div className={'w-[100%] h-[100%}'}>
                        <h3 className={'text-base font-bold text-center opacity-80 mb-6'}>General</h3>
                        <div className={'flex flex-col gap-4'}>
                            <li className={'flex  items-center w-100%]'}><div className={'flex  items-center justify-center gap-2'}><a href={'/application'}>Home</a> <HomeIcon className={'w-5 h-5'}/></div></li>
                            <li className={'flex  items-center w-100%]'}><div className={'flex  items-center justify-center gap-2'}><a href={'/watchlists'}>Watchlists</a><CollectionIcon className={'w-5 h-5'} /></div></li>
                            <li className={'flex  items-center w-100%]'}><div className={'flex  items-center justify-center gap-2'}><a href={"/news"}>News</a><NewspaperIcon className={'w-5 h-5'}/></div></li>
                            <li className={'flex  items-center w-100%]'}><div className={'flex  items-center justify-center gap-2'}><a href={"/strategies"}>Strategies</a><PresentationChartBarIcon className={'w-5 h-5'}/> </div></li>
                        </div>

                    </div>
                    <div className={'w-[100%] h-[100%}'}>
                        <h3 className={'text-base font-bold text-center opacity-80 mb-6'}>Personal</h3>
                        <div className={'flex flex-col gap-4'}>
                            <li className={'flex items-center'}><div className={'flex gap-2'}><a href={"/application"}>Profile</a> <UserIcon className={'w-5 h-5'}/></div></li>
                            <li className={'flex items-center'}><div className={'flex gap-2'}><a href={"/my-watchlists"}>My watchlists</a><CollectionIcon className={'w-5 h-5'}/></div></li>
                            <li className={'flex items-center'}><div className={'flex gap-2'}><a href={'/my-strategies'}>My strategies</a><LightBulbIcon className={'w-5 h-5'}/></div></li>
                        </div>
                    </div>
                    <div className={'w-[100%] h-[100%}'}>
                        <h3 className={'text-base font-bold text-center opacity-80 mb-6'}>Miscellaneous</h3>
                        <div className={'flex flex-col gap-4'}>
                            <li className={'flex items-center'}><div className={'flex gap-2'}><a href={"/report-bug"}>Report a Bug</a><FlagIcon className={'w-5 h-5'}/></div></li>
                            <li className={'flex items-center'}><div className={'flex gap-2'}><a href={"/documentation"}>Documentation</a> <FolderOpenIcon className={'w-5 h-5'}/></div></li>
                            <li className={'flex items-center'}><div className={'flex gap-2'}><a href={'/api'}>API</a> <CodeIcon className={'w-5 h-5'}/></div></li>
                        </div>
                    </div>
                    <div className={'w-[100%] h-[100%}'}>
                        <h3 className={'text-base font-bold text-center opacity-80 mb-6'}>Contacts</h3>
                        <div className={'flex flex-col gap-4'}>
                            <li className={'flex items-center'}><a href={"/application"}><MailIcon className={'w-5 h-5'}/></a></li>
                            <li className={'flex items-center'}><a href={"/application"}><svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a></li>
                        </div>
                    </div>
                </div>
            </ul>
            </div>

        )
    }
    const handleDropdown = () => {
        setIsOpen(!isOpen)
        document.getElementById('root').style.transition = "opacity 0.3s ease-in"
        if(!isOpen){
            document.getElementById('root').style.opacity = 0.6
        }else{
            document.getElementById('root').style.opacity = 1
        }

    }
    return (
        <>
            <nav className="navbar bg-base-300">
                <div className="navbar-start">
                    <div className='flex gap-4'>
                        <div className="dropdown">
                            <label className="btn btn-ghost btn-circle" onClick={handleDropdown}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h7"/>
                                </svg>
                            </label>
                            {isOpen ? createPortal(<DropDownMenu/>, document.getElementById('overlay-root')) : <></>}
                        </div>
                        <label className="swap swap-rotate">

                            <input type="checkbox"/>

                            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" data-toggle-theme="dark, bumblebee" data-act-class="ACTIVECLASS">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                            </svg>

                            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" data-toggle-theme="bumblebee,dark" data-act-class="ACTIVECLASS">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                            </svg>

                        </label>
                    </div>
                </div>
                <div className="navbar-center">
                    <a href='#' className="btn btn-ghost normal-case text-xl">MarketHero</a>
                </div>
                <div className="navbar-end mr-4">
                    <>

                        {!user ? (
                            <>
                                <label htmlFor="login-modal" className="btn modal-button btn-accent btn-sm">Log
                                    in</label>
                                <label htmlFor="SignupModal"
                                       className="btn modal-button btn-ghost btn-sm ml-4">SignUp</label>
                            </>
                        ) : <button className="btn modal-button btn-accent btn-sm" onClick={logoutUser}>Log
                            out</button>}


                    </>
                </div>
            </nav>
            {createPortal(<SignupModal/>, document.getElementById("overlay-root"))}
            {createPortal(<LoginModal/>, document.getElementById("overlay-root"))}
        </>
    )
}


