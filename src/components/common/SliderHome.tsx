import React, { memo } from 'react'
import Title from './Title'
import Slider, { Settings, CustomArrowProps } from 'react-slick'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Button } from '@material-tailwind/react'

interface IProps {
  subTitle?: string
  title?: string
  count?: number
  children: React.ReactNode
}

function NextArrow(props: CustomArrowProps) {
  const { className, onClick } = props
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (onClick) {
      onClick(e)
    }
  }
  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      <Button
        color='teal'
        className='rounded-full px-2 mt-[-160%] ml-[-160%]'
        variant='gradient'
        size='sm'
        onClick={handleClick}
      >
        <FiChevronLeft size={20} />
      </Button>
    </div>
  )
}

function PrevArrow(props: CustomArrowProps) {
  const { className, onClick } = props
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (onClick) {
      onClick(e)
    }
  }
  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      <Button
        onClick={handleClick}
        color='teal'
        className='rounded-full px-2 mt-[-160%] ml-[15px]'
        variant='gradient'
        size='sm'
      >
        <FiChevronRight size={20} />
      </Button>
    </div>
  )
}
const SliderHome = ({ subTitle, title, count = 4, children }: IProps) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: count,
    lazyLoad: 'progressive',
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true
  }
  return (
    <div className='w-full flex flex-col my-4'>
      <Title px={false} line={false}>
        {title}
      </Title>
      {subTitle && <small className='text-gray-500 text-lg font-normal -mt-3 mb-5'>&nbsp;{subTitle}</small>}
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

export default memo(SliderHome)
