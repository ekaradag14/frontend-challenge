import Carousel from './components/Carousel';
import ColorizeIcon from '@material-ui/icons/Colorize';
import PaletteIcon from '@material-ui/icons/Palette';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
let slidesArray = [
	{
		primaryColor: 'rgb(127,63,246)',
		secondaryColor: 'rgb(117,229,235)',
		mainText: 'Gradients',
		secondaryText: 'Start, end, angle',
		slideIcon: <InvertColorsIcon />,
	},
	{
		primaryColor: 'rgb(117,229,235)',
		secondaryColor: 'rgb(248,244,98)',
		mainText: 'Presets',
		secondaryText: 'Manage presets',
		slideIcon: <PaletteIcon />,
	},
	{
		primaryColor: 'rgb(248,244,98)',
		secondaryColor: 'rgb(229,68,129)',
		mainText: 'Colors',
		secondaryText: 'Pick any color',
		slideIcon: <ColorizeIcon />,
	},
];
const App = () => {
	return <Carousel slidesArray={slidesArray} />;
};

export default App;
