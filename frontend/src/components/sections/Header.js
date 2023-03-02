import { useState, useContext, Fragment } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import useAuth from '../../hooks/useAuth'
// components
import Modal from '../Modal'
import Logo from '../../assets/logo.png'
// icons
import { AiOutlineSearch, AiOutlineDown, AiOutlineMenu } from 'react-icons/ai'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { Menu, Transition } from '@headlessui/react'
import { useSearchParams } from 'react-router-dom'

export default function Header() {
  let [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')

  const navigation = [
    { name: 'Profile', href: '/profile', private: true },
    { name: 'Register', href: '/register', private: false },
  ]
  const { isAuth } = useAuth()

  const filteredNavigation = isAuth
    ? navigation.filter((item) => item.private)
    : navigation.filter((item) => !item.private)

  const [searchModal, setSearchModal] = useState(false)
  const [searchInput, setSearchInput] = useState(() => searchQuery || '')

  const navigate = useNavigate()

  const findProducts = (event) => {
    event.preventDefault()
    if (searchInput.length > 0 && searchInput) {
      navigate({
        pathname: 'search',
        search: `?q=${searchInput}`,
      })
      setSearchModal(false)
    }
  }

  return (
    <>
      <nav className='bg-slate-100 flex justify-between items-center border-gray-200 px-2 sm:px-4 py-2.5 md:py-1 rounded top-0 z-50 sticky'>
        <div id='logo flex-1'>
          <NavLink to=''>
            <img className='text-2xl bold' src={Logo} width={130} aly='logo' />
          </NavLink>
        </div>
        {/* learge screen nav  */}
        <div className='flex justify-center items-center gap-6'>
          <ul className=' space-x-2 text-gray-700 fond-bold capitalize hidden md:flex'>
            {filteredNavigation.map((nav) => {
              return (
                <>
                  <li>
                    <NavLink
                      to={nav.href}
                      className={({ isActive }) =>
                        isActive ? 'text-indigo-400' : ''
                      }
                      key={nav.href}
                    >
                      {nav.name}
                    </NavLink>
                  </li>
                </>
              )
            })}
          </ul>
          {/* xl search box */}
          <div className='w-full hidden md:block'>
            <form onSubmit={findProducts}>
              <div className='max-w-md mx-auto'>
                <div className='relative flex items-center w-full h-12 rounded-lg focus-within:shadow-sm bg-white overflow-hidden border-2 border-indigo-500 '>
                  <div className='grid place-items-center h-full w-12 text-gray-500'>
                    <AiOutlineSearch className='text-xl' />
                  </div>

                  <input
                    className='peer h-full w-full outline-none text-sm text-gray-700 pr-2 '
                    type='text'
                    id='search'
                    placeholder='Search something..'
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                  />
                </div>
              </div>
            </form>
          </div>
          {/* shopping cart */}
          <div>
            <NavLink to='cart'>
              <RiShoppingCart2Line className='text-2xl' />
            </NavLink>
          </div>
          {/* mobile search box */}
          <div>
            <AiOutlineSearch
              className='text-2xl md:hidden cursor-pointer'
              onClick={() => setSearchModal(true)}
            />
          </div>
          {/* mobile menu */}
          <div className='md:hidden'>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='inline-flex w-full justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                  <AiOutlineMenu className='text-xl' />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='px-1 py-1 '>
                    {filteredNavigation.map((nav) => {
                      return (
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to={nav.href}
                              className={`${
                                active
                                  ? 'bg-violet-400 text-white'
                                  : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {nav.name}
                            </NavLink>
                          )}
                        </Menu.Item>
                      )
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </nav>
      <Modal isOpen={searchModal} closeModal={setSearchModal}>
        <form onSubmit={findProducts}>
          <div className='max-w-md mx-auto'>
            <div className='relative flex items-center w-full h-12 rounded-lg focus-within:shadow-sm bg-white overflow-hidden border-2 border-indigo-500 '>
              <div className='grid place-items-center h-full w-12 text-gray-500'>
                <AiOutlineSearch className='text-xl' />
              </div>

              <input
                className='peer h-full w-full outline-none text-sm text-gray-700 pr-2 '
                type='text'
                id='search'
                placeholder='Search something..'
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}
