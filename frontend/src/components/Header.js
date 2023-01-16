import { useState, useContext, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineDown, AiOutlineMenu } from 'react-icons/ai'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { Menu, Transition } from '@headlessui/react'
import Modal from './Modal'
export default function Header() {
  const navigation = [{ name: 'Home', href: 'Home' }]
  const [searchModal, setSearchModal] = useState(false)
  const SearchBox = () => {
    return (
      <form>
        <div class='max-w-md mx-auto'>
          <div class='relative flex items-center w-full h-12 rounded-lg focus-within:shadow-sm bg-white overflow-hidden border border-indigo-200'>
            <div class='grid place-items-center h-full w-12 text-gray-300'>
              <AiOutlineSearch className='text-xl' />
            </div>

            <input
              class='peer h-full w-full outline-none text-sm text-gray-700 pr-2'
              type='text'
              id='search'
              placeholder='Search something..'
            />
          </div>
        </div>
      </form>
    )
  }
  return (
    <>
      <nav class='bg-slate-100 flex justify-between border-gray-200 px-2 sm:px-4 py-2.5 md:py-1 rounded top-0 z-50 sticky'>
        <div id='logo flex-1'>
          <h1>SAMISTORE</h1>
        </div>
        <div className='flex justify-center items-center gap-6'>
          <ul className='space-x-2 text-gray-700 fond-bold capitalize hidden md:block'>
            {navigation.map((nav) => {
              return (
                <li>
                  <NavLink
                    to={nav.href}
                    className={({ isActive }) =>
                      isActive ? 'text-indigo-400' : ''
                    }
                  >
                    {nav.name}
                  </NavLink>
                </li>
              )
            })}
          </ul>
          <div className='w-full hidden md:block'>
            <SearchBox />
          </div>
          <div>
            <RiShoppingCart2Line className='text-2xl' />
          </div>
          <div>
            <AiOutlineSearch
              className='text-2xl md:hidden'
              onClick={() => setSearchModal(true)}
            />
          </div>
          <div className='md:hidden'>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='inline-flex w-full justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                  <AiOutlineMenu />
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
                    {navigation.map((nav) => {
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
        <SearchBox />
      </Modal>
    </>
  )
}
