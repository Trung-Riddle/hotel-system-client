import { ValidText } from '@components/common'
import { DatePickerCustom } from '@components/inputs'
import { useAppDispatch } from '@hooks/useApp'
import { Button, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdCardTravel } from 'react-icons/md'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { IoSearchSharp } from 'react-icons/io5'
import { modal } from '@redux/slices/app.slice'
import SearchDestination from './SearchDestination'
import toast from 'react-hot-toast'
import { pathUser } from '@utils/path'

const SearchBar = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useForm()
  const [isShowPerSearchPerson, setIsShowPerSearchPerson] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const address = watch('address')
  const dateRange = watch('dateRange')
  const personAndRooms = watch('personAndRooms')
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    console.log(address)
  }
  const handleSearchStart = () => {
    if (!address) return
    const params: any = {}
    if (address) params.address = address
    if (Object.keys(params).length === 0) toast('Hãy chọn bộ lọc bạn muốn tìm')
    else {
      navigate({
        pathname: pathUser.SEARCH,
        search: createSearchParams(params).toString()
      })
    }
  }
  useEffect(() => {
    console.log('Address value:', address);
  }, [address])
  return (
    <div className='gap-1 w-main bg-main-400 shadow-lg mx-auto p-2 grid grid-cols-12 rounded-md mt-[-45px]'>
      <form className='col-span-11 grid grid-cols-12 gap-1'>
        <div className='col-span-5 p-3 shadow-md border rounded-lg bg-main-500'>
          {/* <Input
            className=''
            containerProps={{
              className: 'h-[48px]'
            }}
            labelProps={{
              className: 'text-lg'
            }}
            autoComplete='off'
            variant='standard'
            color='white'
            size='lg'
            crossOrigin={'true'}
            label={'Bạn muốn đến đâu'}
            icon={<MdPlace color='white' size={20} />}
            {...register('address')}
            
            onClick={() => dispatch(modal({ isShowModal: true, modalContent: <SearchDestination onChange={(value: any) => setCustomValue('address', value)} />}))}
          /> */}
          <Button
            className='w-full h-full flex justify-center items-center border-2 text-gray-500 font-light'
            color='white'
            size='sm'
            // variant='outlined'
            onClick={() =>
              dispatch(
                modal({
                  isShowModal: true,
                  modalContent: <SearchDestination onChange={(value: any) => setCustomValue('address', value)} />
                })
              )
            }
          >
            <span className='w-1/12'>
              <MdCardTravel size={20} />
            </span>
            <span title={address || ''} className='mt-1 w-11/12 tracking-wide truncate'>
              {address || 'Bạn muốn đến đâu'}
            </span>
          </Button>
        </div>
        <div className='col-span-4 bg-main-500 p-3 shadow-md border rounded-lg flex items-center justify-center'>
          <DatePickerCustom
            id='dateRange'
            date={dateRange}
            setDate={(value: any) => setCustomValue('dateRange', value)}
            primaryColor='teal'
            inputClassName='w-full p-3 rounded-md'
            containerClassName=''
            placeholder='🗓️ Ngày nhận phòng - Ngày trả phòng'
            showShortCuts={false}
            readOnly={true}
          />
        </div>
        <div className='col-span-3 bg-main-500 p-3 shadow-md border rounded-lg flex items-center justify-center'></div>
      </form>
      <Button onClick={handleSearchStart} className='col-span-1 border bg-main-600 flex items-center justify-center'>
        <IoSearchSharp size={22} />
      </Button>
    </div>
  )
}

export default SearchBar
