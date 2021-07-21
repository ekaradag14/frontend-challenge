import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';

const Slide = ({
	primaryColor,
	secondaryColor,
	index,
	mainText,
	secondaryText,
	slideIcon,
}) => {
	const classes = useStyles();
	return (
		<div className={classes.base}>
			<div className={classes.upperHalf}>
				<Avatar
					className={classes.index}
					style={{
						background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
					}}
				>
					{index}
				</Avatar>
				<div className={classes.mainText}>{mainText}</div>
				<div className={classes.secondaryText}>{secondaryText}</div>
			</div>
			<div
				className={classes.lowerHalf}
				style={{
					background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
				}}
			>
				<SvgIcon className={classes.slideIcon}>{slideIcon}</SvgIcon>
			</div>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	base: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	upperHalf: {
		height: '50%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	lowerHalf: {
		height: '50%',
		flexDirection: 'column',
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
	},
	slideIcon: {
		fontSize: '7rem',
		color: 'white',
	},
	index: {
		marginBottom: 25,
		height: '3.5rem',
		width: '3.5rem',
		fontSize: '2rem',
	},
	mainText: {
		fontSize: '3rem',
		marginTop: 10,
		marginBottom: 10,
		color: 'black',
		fontWeight: 'bold',
	},
	secondaryText: {
		fontSize: '1.5rem',
		color: 'gray',
	},
}));

export default Slide;
