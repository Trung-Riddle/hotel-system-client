import React, { memo } from 'react'
import Datepicker, { ColorKeys, DateValueType } from 'react-tailwindcss-datepicker'

interface IDatePicker {
  id: string
  date: DateValueType
  setDate: any
  primaryColor: ColorKeys
  inputClassName?: any
  containerClassName?: any
  placeholder?: string
  showShortCuts?: boolean
  readOnly?: boolean
}
const DatePickerCustom = ({ id, date, setDate, primaryColor, inputClassName, containerClassName, placeholder, showShortCuts = true, readOnly }: IDatePicker) => {
  return (
    <div className='w-full'>
      <Datepicker
        inputId={id}
        showShortcuts={showShortCuts}
        placeholder={placeholder}
        inputClassName={inputClassName}
        containerClassName={containerClassName}
        primaryColor={primaryColor}
        onChange={(value) => setDate(value)}
        value={date}
        i18n='vi'
        readOnly={readOnly}
      />
    </div>
  )
}

export default memo(DatePickerCustom)
