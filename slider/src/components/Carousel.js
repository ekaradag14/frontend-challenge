import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Slide from './Slide';

const Carousel = ({ slidesArray }) => {
	return (
		<div className="wrapper" style={{ margin: '0 auto' }}>
			<Splide
				options={{
					rewind: true,
					perPage: 1,
					margin: 0,
					perMove: 1,
					width: '100%',
					height: '100vh',
					arrows: false,
					pagination: false,
				}}
			>
				{slidesArray.map((slide, index) => (
					<SplideSlide key={index}>
						<Slide
							primaryColor={slide.primaryColor}
							secondaryColor={slide.secondaryColor}
							mainText={slide.mainText}
							secondaryText={slide.secondaryText}
							slideIcon={slide.slideIcon}
							index={index + 1}
						/>
					</SplideSlide>
				))}
			</Splide>
		</div>
	);
};

export default Carousel;
