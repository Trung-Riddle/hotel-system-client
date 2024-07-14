import { apiGetDistricts, apiGetProvinces, apiGetWards } from '@api/app'
import { Title } from '@components/common'
import { SelectLib } from '@components/inputs'
import { useAppDispatch } from '@hooks/useApp'
import { Button } from '@material-tailwind/react'
import { modal } from '@redux/slices/app.slice'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  onChange?: any
}
const SearchDestination = ({ onChange }: Props) => {
  const { setValue, watch, formState: isDirty } = useForm()
  const [provinces, setProvinces] = useState<any>([])
  const [disTricts, setDistricts] = useState<any>([])
  const [wards, setWards] = useState([])
  const selectedProvince = watch('selectedProvince')
  const selectedDistrict = watch('selectedDistrict')
  const selectedWard = watch('selectedWard')
  const dispatch = useAppDispatch()
  const fetchProvinces = async () => {
    const response = await apiGetProvinces()
    if (response.status === 200) {
      setProvinces(response.data)
    }
  }
  const fetchDistricts = async (provinceCode: string) => {
    const response = await apiGetDistricts(provinceCode)
    if (response.status === 200) setDistricts(response.data)
  }
  const fetchWards = async (code: string) => {
    const response = await apiGetWards(code)
    if (response.status === 200) setWards(response.data)
  }
  useEffect(() => {
    fetchProvinces()
  }, [])
  useEffect(() => {
    if (selectedProvince?.value) {
      fetchDistricts(selectedProvince.value)
    }
  }, [selectedProvince])
  useEffect(() => {
    if (selectedDistrict?.value) {
      fetchWards(selectedDistrict.value)
    }
  }, [selectedDistrict])
  const setCustomValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }
  const handleSubmit = () => {
    onChange(
      `${selectedWard ? selectedWard.name + ', ' : ''}${selectedDistrict ? selectedDistrict.name + ', ' : ''}${
        selectedProvince ? selectedProvince.name : ''
      }`
    )
    dispatch(modal({ isShowModal: false, modalContent: null }))
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='lg:w-[70%] md:w-[80%] sm:w-[90%] max-h-[70%] grid grid-rows-6 h-full overflow-y-auto bg-white rounded-md'
    >
      <Title line={true}>Chọn tỉnh thành / phường xã muốn đến</Title>
      <div className='row-span-5'>
        <div className='grid grid-cols-2 p-4 gap-4'>
          <SelectLib
            placeholder='Chọn tỉnh thành'
            onChange={(val: any) => setCustomValue('selectedProvince', val)}
            options={provinces.map((el: any) => ({ ...el, label: el.name, value: el.idProvince }))}
            value={selectedProvince}
            className='col-span-1'
          />
          <SelectLib
            placeholder='Chọn quận/huyện'
            onChange={(val: any) => setCustomValue('selectedDistrict', val)}
            options={disTricts.map((el: any) => ({ ...el, label: el.name, value: el.idDistrict }))}
            value={selectedDistrict}
            className='col-span-1'
          />
          
        </div>
        <div className="px-4">
        <SelectLib
            placeholder='Chọn thị trấn / phường / xã'
            onChange={(val: any) => setCustomValue('selectedWard', val)}
            options={wards.map((el: any) => ({ ...el, label: el.name, value: el.idCommune }))}
            value={selectedWard}
            className='col-span-1'
          />
        </div>
      </div>
      <div className='px-4 py-6 row-span-1 flex gap-4 items-center justify-center'>
        <Button title='Hãy chọn địa chỉ cần tìm trước' disabled={!isDirty} onClick={handleSubmit}>
          Xác nhận
        </Button>
        <Button onClick={() => dispatch(modal({ isShowModal: false, modalContent: null }))}>Thoát</Button>
      </div>
    </div>
  )
}

export default SearchDestination
